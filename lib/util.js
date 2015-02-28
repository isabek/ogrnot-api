"use strict";

var crypto = require("crypto");
var iconvLite = require("iconv-lite");

var util = {
    hash: function md5(x) {
        return crypto.createHash('md5').update(x).digest('hex');
    },
    decode: function decode(body, encode) {
        return iconvLite.decode(body, encode || "ISO-8859-9");
    },
    error: function error(code, message, description) {
        var err = new Error();
        err.code = code;
        err.message = message;
        err.description = description;
        
        return err;
    }
};

module.exports = util;