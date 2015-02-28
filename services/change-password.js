"use strict";

var sessionStore = require("../lib/session-store");
var hasAuthenticated = require("../lib/has-authenticated");
var changePassword = require("../lib/change-password");


function changePasswordService(req, res) {
    var authKey = req.body.authKey;

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res.end(JSON.stringify(err));
        }
        else {

            var jar = sessionStore.getJar(authKey),
                currentPassword = req.body.currentPassword,
                newPassword = req.body.newPassword,
                newPasswordRepeat = req.body.repeatNewPassword;

            changePassword(currentPassword, newPassword, newPasswordRepeat, jar, function (err, response) {
                if (err) {
                    res.end(JSON.stringify(err));
                } else {
                    if (response) {
                        res.end(JSON.stringify({"code": 200, "message": "password changed successfully"}));
                    } else {
                        res.end(JSON.stringify({"code": 200, "message": "password did not change successfully"}));
                    }
                }
            });
        }
    });

}

module.exports = changePasswordService;