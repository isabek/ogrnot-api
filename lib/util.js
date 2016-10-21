"use strict";

var crypto = require("crypto");
var iconv = require('iconv');

var util = {
    hash: function md5(x) {
        return crypto.createHash('md5').update(x).digest('hex');
    },
    decode: function decode(body, encode) {
        body = new Buffer(body, 'binary');
        var conv = new iconv.Iconv('windows-1254', 'utf8');
        return conv.convert(body).toString();
    },
    error: function error(code, message, description) {
        var err = new Error();
        err.code = code;
        err.message = message;
        err.description = description;

        return err;
    },
    removeRightDash: function (str) {
        return str.replace(/-\s*$/, "");
    },
    removeLeftDash: function (str) {
        return str.replace(/^-/, "");
    },
    capitalize: function (str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(function (chunk) {
                return util._capitalize(chunk);
            })
            .join(' ');
    },
    _capitalize: function _capitalize(str) {
        if (str) {
            return str.substr(0, 1).toUpperCase() + str.substr(1);
        }
    }
};

module.exports = util;