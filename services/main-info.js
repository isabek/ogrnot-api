"use strict";

var sessionStore = require("../lib/session-store");
var hasAuthenticated = require("../lib/has-authenticated");
var mainInfo = require("../lib/main-info");

function mainInfoService(req, res) {
    var authKey = req.query.authKey;

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res.end(JSON.stringify(err));
        } else {
            var jar = sessionStore.getJar(authKey);

            mainInfo(jar, function (err, mainInfo) {
                if (err) {
                    res.end(JSON.stringify(err));
                } else {
                    res.end(JSON.stringify(mainInfo));
                }
            });
        }
    });
}

module.exports = mainInfoService;