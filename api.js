var Router = require("node-simple-router");
var http = require("http");
var sessionStore = require("./lib/session-store");
var handleAuthenticate = require("./lib/handle-authenticate");
var hasAuthenticated = require("./lib/has-authenticated");
var studentInfo = require("./lib/student-info");
var studentTakenLessons = require("./lib/student-taken-lessons");

var router = new Router();

router.post('/authenticate', function (req, res) {
    handleAuthenticate(sessionStore, req, res);
});

router.get('/student-info', function (req, res) {

    var authKey = req.body.authKey;

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
});

router.get('/student-taken-lessons', function (req, res) {

    var authKey = req.body.authKey;

    hasAuthenticated(sessionStore, authKey, function (err) {
        if (err) {
            res.end(JSON.stringify(err));
        } else {
            var jar = sessionStore.getJar(authKey);

            studentTakenLessons(jar, function (err, lessons) {
                if (err) {
                    res.end(JSON.stringify(err));
                } else {
                    res.end(JSON.stringify(lessons));
                }
            });
        }
    });
});

var server = http.createServer(router);

server.listen(3000, function () {
    console.log("Server running on port:", 3000);
});
