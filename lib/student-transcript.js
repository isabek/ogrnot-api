"use strict";

var request = require("request");
var studentTranscriptParser = require("./student-transcript-parser");
var htmlFixer = require("./html-fixer");

function studentTranscript(jar, cb) {
    request({
        method: "get",
        uri: "http://ogrnot.manas.kg/index.php?page=transkript",
        jar: jar,
        followAllRedirects: true,
        headers: {
            "user-agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2",
            "referer": "http://ogrnot.manas.kg/index.php"
        },
        encoding: 'binary'
    }, function (err, response, body) {
        if (err) return cb(util.error(1000, "Connection error"));

        htmlFixer(body, function (err, html) {
            if (err) {
                cb(util.error(1001, "Parsing error"));
            } else {
                cb(null, studentTranscriptParser(html));
            }
        });
    });
}

module.exports = studentTranscript;