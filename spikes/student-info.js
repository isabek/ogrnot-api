var loginToOgrnot = require("../lib/login");
var studentTranscript = require("../lib/student-transcript");

loginToOgrnot("1004.01029", "aDi93", function (err, jar) {
    if (err) {
        console.log(err);
    }
    studentTranscript(jar, function (err, studentInfo) {
        console.log(studentInfo);
    });
});