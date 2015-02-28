"use strict";

var request = require("request"),
    isLoggedIn = require("./parser").isLoggedIn,
    util = require("./util");

function loginToOgrnot(user, password, cb) {
    var jar = request.jar();

    request({
        method: "post",
        uri: "http://ogrnot.manas.kg/index.php",
        jar: jar,
        followAllRedirects: true,
        formData: {
            "frm_kullanici": user,
            "frm_sifre": password
        },
        headers: {
            "user-agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2",
            "referer": "http://ogrnot.manas.kg/index.php",
            "encoding": "UTF-8"
        },
        "encoding": "binary"
    }, function (err, response, body) {
        if (err) return cb(util.error(1000, "Connection error"));

        checkIfLoggedIn(body, function (isConnected) {
            if (!isConnected) return cb(util.error(401, "Not Logged In"));
            cb(null, jar);
        });
    });
}

function checkIfLoggedIn(body, cb) {
    var result = isLoggedIn(body);
    cb(result);
}

module.exports = loginToOgrnot;