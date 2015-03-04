"use strict";

var httpStatus = require("http-status");

var sessionStore = require("../lib/session-store");
var hasAuthenticated = require("../lib/has-authenticated");
var studentTranscript = require("../lib/student-transcript");

function studentTranscriptService(req, res) {
    var authKey = req.query.authKey;

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res
                .status(err.code)
                .json(err);
        } else {
            var jar = sessionStore.getJar(authKey);

            studentTranscript(jar, function (err, transcript) {
                if (err) {
                    res
                        .status(err.code)
                        .json(err);
                } else {
                    res
                        .status(httpStatus.OK)
                        .json(transcript);
                }
            });
        }
    });
}

module.exports = studentTranscriptService;