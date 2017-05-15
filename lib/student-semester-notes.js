"use strict";

var request = require("request");
var httpStatus = require("http-status");
var config = require("../config/config");

var semesterNotesParser = require("./student-semester-notes-parser");
var util = require("./util");

function semesterNotes(jar, cb){

    request({
        method: "get",
        uri: config.domain + "index.php?page=not",
        jar: jar,
        followAllRedirects: true,
        encoding: 'binary',
        headers: {
            "user-agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2",
            "referer": config.domain + "index.php"
        }
    }, function (err, response, body) {
        if (err) return cb(util.error(response.statusCode, httpStatus[response.statusCode]));
        cb(null, semesterNotesParser(body));
    });
}

module.exports = semesterNotes;