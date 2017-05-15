"use strict";

var request = require("request");
var httpStatus = require("http-status");
var config = require("../config/config");

var studentTranscriptParser = require("./student-transcript-parser");
var htmlFixer = require("./html-fixer");
var util = require("./util");

function studentTranscript(jar, cb) {
    request({
        method: "get",
        uri: config.domain + "index.php?page=transkript",
        jar: jar,
        followAllRedirects: true,
        headers: {
            "user-agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2",
            "referer": config.domain + "index.php"
        },
        encoding: 'binary'
    }, function (err, response, body) {
        if (err) return cb(util.error(response.statusCode, httpStatus[response.statusCode]));

        htmlFixer(body, function (err, html) {
            if (err) {
                cb(util.error(httpStatus.OK, "HTML_FIXER_ERROR" , "Parsing error"));
            } else {
                cb(null, studentTranscriptParser(html));
            }
        });
    });
}

module.exports = studentTranscript;