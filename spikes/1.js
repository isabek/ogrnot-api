var loginToOgrnot = require("../lib/login");
var studentSemesterNotesParser = require("../lib/student-semester-notes");

loginToOgrnot("1004.01029", "aDi93", function (err, jar) {
    if(err){
        console.log(err);
    }else
    {
        studentSemesterNotesParser(jar, function (err, studentSemester) {

            if(err){
                console.log(err);
            }
            else
            {
                console.log(studentSemester);
            }
        });
    }
});
