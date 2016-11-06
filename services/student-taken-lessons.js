"use strict";

var httpStatus = require("http-status");

var sessionStore = require("../lib/session-store");
var hasAuthenticated = require("../lib/has-authenticated");
var studentTakenLessons = require("../lib/student-taken-lessons");

function studentTakenLessonsService(req, res) {
    var authKey = req.header("authorization");

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res
                .status(err.code)
                .json(err);
        } else {
            var jar = sessionStore.getJar(authKey);

            studentTakenLessons(jar, function (err, lessons) {
                if (err) {
                    res
                        .status(err.code)
                        .json(err);
                } else {
                    res
                        .status(httpStatus.OK)
                        .json(lessons);
                }
            });
        }
    });
}

module.exports = studentTakenLessonsService;