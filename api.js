"use strict";

var studentTakenLessons = require("./services/student-taken-lessons");
var authenticate = require("./services/authenticate");
var studentInfo = require("./services/student-info");

var allowCrossDomain = require("./lib/allow-cross-domain");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/authenticate', authenticate);
app.get('/student-info', studentInfo);
app.get('/student-taken-lessons', studentTakenLessons);

app.listen(3000, function () {
    console.log("Server running on port:", 3000);
});
