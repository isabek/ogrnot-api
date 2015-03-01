"use strict";

var sessionStore = require("../lib/session-store");
var hasAuthenticated = require("../lib/has-authenticated");
var studentTranscript = require("../lib/student-transcript");

function studentTranscriptService(req, res) {
    var authKey = req.query.authKey;

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res.end(JSON.stringify(err));
        } else {
            var jar = sessionStore.getJar(authKey);

            studentTranscript(jar, function (err, transcript) {
                if (err) {
                    res.end(JSON.stringify(err));
                } else {
                    res.end(JSON.stringify(transcript));
                }
            });
        }
    });
}

module.exports = studentTranscriptService;