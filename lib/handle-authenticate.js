"use strict";

var loginToOgrnot = require("../lib/login");
var util = require("../lib/util");

function handleAuthenticate(sessionStore, req, res) {
    var number = req.body.number,
        password = req.body.password;

    loginToOgrnot(number, password, function (err, jar) {
        if (err) {
            res
                .status(err.code)
                .json(err);
        } else {
            var authKey = util.hash([number, Date.now()].join('_'));
            sessionStore.setKey(authKey, jar);
            res.end(JSON.stringify({authKey: authKey}));
        }
    });
}

module.exports = handleAuthenticate;