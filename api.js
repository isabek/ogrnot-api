"use strict";

var studentTakenLessons = require("./services/student-taken-lessons");
var authenticate = require("./services/authenticate");
var studentInfo = require("./services/student-info");
var changePassword = require("./services/change-password");
var mainInfo = require("./services/main-info");
var studentTranscript = require("./services/student-transcript");
var semesterNotes = require("./services/student-semester-notes");

var allowCrossDomain = require("./lib/allow-cross-domain");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/v1/authenticate', authenticate);
app.get('/api/v1/main-info', mainInfo);
app.get('/api/v1/student-info', studentInfo);
app.get('/api/v1/student-taken-lessons', studentTakenLessons);
app.get('/api/v1/student-transcript', studentTranscript);
app.put('/api/v1/change-password', changePassword);
app.get('/api/v1/student-semester-notes', semesterNotes);

module.exports = {
    app: app
};

