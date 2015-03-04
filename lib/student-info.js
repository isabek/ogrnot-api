"use strict";

var request = require("request");
var httpStatus = require("http-status");

var studentInfoParser = require("./student-info-parser");
var util = require("./util");

function studentInfo(jar, cb) {
    request({
        method: "get",
        uri: "http://ogrnot.manas.kg/index.php?page=bilgiler",
        jar: jar,
        followAllRedirects: true,
        encoding: 'binary',
        headers: {
            "user-agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2",
            "referer": "http://ogrnot.manas.kg/index.php"
        }
    }, function (err, response, body) {
        if (err) return cb(util.error(response.statusCode, httpStatus[response.statusCode]));
        cb(null, studentInfoParser(body));
    });
}

module.exports = studentInfo;