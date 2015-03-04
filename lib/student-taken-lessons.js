"use strict";

var request = require("request");
var httpStatus = require("http-status");

var studentTakenLessonsParser = require("./student-taken-lessons-parser");

function studentTakenLessons(jar, cb) {
    request({
        method: "get",
        uri: "http://ogrnot.manas.kg/index.php?page=dersleri",
        jar: jar,
        followAllRedirects: true,
        headers: {
            "user-agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2",
            "referer": "http://ogrnot.manas.kg/index.php"
        },
        encoding: 'binary'
    }, function (err, response, body) {
        if (err) return cb(util.error(response.statusCode, httpStatus[response.statusCode]));
        cb(null, studentTakenLessonsParser(body));
    });
}

module.exports = studentTakenLessons;