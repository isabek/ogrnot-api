"use strict";

var loginToOgrnot = require("../lib/login");
var util = require("../lib/util");

function handleAuthenticate(sessionStore, req, res) {

    var user = req.body.user,
        pass = req.body.pass;

    loginToOgrnot(user, pass, function (err, jar) {
        if (err) {
            res.end(JSON.stringify(err));
        } else {
            var authKey = util.hash([user, Date.now()].join('_'));
            sessionStore.setKey(authKey, jar);
            res.end(JSON.stringify({authKey: authKey}));
        }
    });
}

module.exports = handleAuthenticate;