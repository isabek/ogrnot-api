"use strict";

var httpStatus = require("http-status");

var sessionStore = require("../lib/session-store");
var hasAuthenticated = require("../lib/has-authenticated");
var studentSemesterNotes = require("../lib/student-semester-notes");

function semesterNotesService(req, res) {
    var authKey = req.query.authKey;

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res
                .status(err.code)
                .json(err);
        } else {
            var jar = sessionStore.getJar(authKey);

            studentSemesterNotes(jar, function (err, student) {
                if (err) {
                    res
                        .status(err.code)
                        .json(err);
                } else {
                    res
                        .status(httpStatus.OK)
                        .json(student);
                }
            });
        }
    });
}

module.exports = semesterNotesService;