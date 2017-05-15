"use strict";

var request = require("request");
var httpStatus = require("http-status");
var config = require("../config/config");

var isPasswordChanged = require("../lib/change-password-parser");

function changePassword(currentPassword, newPassword, newPasswordRepeat, jar, cb) {
    request({
        method: "post",
        uri: config.domain + "index.php?page=sifre",
        jar: jar,
        followAllRedirects: true,
        formData: {
            "frm_gecerli": currentPassword,
            "frm_yeni": newPassword,
            "frm_yeni2": newPasswordRepeat,
            "page": "sifre"
        },
        encoding: 'binary',
        headers: {
            "user-agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2",
            "referer": config.domain + "index.php"
        }
    }, function (err, response, body) {
        if (err) return cb(util.error(response.statusCode, httpStatus[response.statusCode]));
        cb(null, isPasswordChanged(body));
    });
}

module.exports = changePassword;