"use strict";

var httpStatus = require("http-status");

var sessionStore = require("../lib/session-store");
var hasAuthenticated = require("../lib/has-authenticated");
var mainInfo = require("../lib/main-info");

function mainInfoService(req, res) {
    var authKey = req.query.authKey;

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res
                .status(err.code)
                .json(err);
        } else {
            var jar = sessionStore.getJar(authKey);

            mainInfo(jar, function (err, mainInfo) {
                if (err) {
                    res
                        .status(err.code)
                        .json(err);
                } else {
                    res
                        .status(httpStatus.OK)
                        .json(mainInfo);
                }
            });
        }
    });
}

module.exports = mainInfoService;