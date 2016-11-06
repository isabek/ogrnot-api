"use strict";

var httpStatus = require("http-status");
var util = require("./util");

function checkAuthRequirements(req, res, next) {
    if (!req.body.hasOwnProperty("number") || !req.body.hasOwnProperty("password")) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .end(JSON.stringify(util.error(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST])));
    }
    next();
}

module.exports = checkAuthRequirements;