"use strict";

var app = require("./api").app;

var host = process.env.HOST || '0.0.0.0',
    port = process.env.PORT || 8080;

process.on("uncaughtException", function (err) {
    console.log(err);
    console.trace(err);

    setTimeout(process.end, 1000);
});

app.listen(port, host, function () {
    console.log("Server running on %s:%d", host, port);
});