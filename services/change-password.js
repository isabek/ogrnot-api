"use strict";

var httpStatus = require("http-status");

var sessionStore = require("../lib/session-store");
var hasAuthenticated = require("../lib/has-authenticated");
var changePassword = require("../lib/change-password");


function changePasswordService(req, res) {
    var authKey = req.body.authKey;

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res
                .status(err.code)
                .json(err);
        }
        else {

            var jar = sessionStore.getJar(authKey),
                currentPassword = req.body.currentPassword,
                newPassword = req.body.newPassword,
                newPasswordRepeat = req.body.repeatNewPassword;

            changePassword(currentPassword, newPassword, newPasswordRepeat, jar, function (err, response) {
                if (err) {
                    res.status(err.code).json(err);
                } else {
                    if (response) {
                        res
                            .status(httpStatus.OK)
                            .json({"code": "PASSWORD_CHANGED", "message": "password changed successfully"});
                    } else {
                        res
                            .status(httpStatus.OK)
                            .json({"code": "PASSWORD_NOT_CHANGED", "message": "password did not change successfully"});
                    }
                }
            });
        }
    });

}

module.exports = changePasswordService;