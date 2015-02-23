var loginToOgrnot = require("../lib/login");
var studentInfo = require("../lib/student-info");
var studentTakenLessons = require("../lib/student-taken-lessons");

loginToOgrnot("1004.01029", "aDi93", function (err, jar) {
    if (err) {
        console.log(err);
    }
    studentTakenLessons(jar, function (err, studentInfo) {
        console.log(studentInfo);
    });
});