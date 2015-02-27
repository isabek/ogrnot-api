var sessionStore = require("../lib/session-store");
var hasAuthenticated = require("../lib/has-authenticated");
var studentInfo = require("../lib/student-info");

function studentInfoService(req, res) {
    var authKey = req.query.authKey;

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res.end(JSON.stringify(err));
        } else {
            var jar = sessionStore.getJar(authKey);

            studentInfo(jar, function (err, student) {
                if (err) {
                    res.end(JSON.stringify(err));
                } else {
                    res.end(JSON.stringify(student));
                }
            });
        }
    });
}

module.exports = studentInfoService;