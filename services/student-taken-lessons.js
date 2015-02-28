"use strict";

var sessionStore = require("../lib/session-store");
var hasAuthenticated = require("../lib/has-authenticated");
var studentTakenLessons = require("../lib/student-taken-lessons");

function studentTakenLessonsService(req, res) {
    var authKey = req.query.authKey;

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res.end(JSON.stringify(err));
        } else {
            var jar = sessionStore.getJar(authKey);

            studentTakenLessons(jar, function (err, lessons) {
                if (err) {
                    res.end(JSON.stringify(err));
                } else {
                    res.end(JSON.stringify(lessons));
                }
            });
        }
    });
}

module.exports = studentTakenLessonsService;