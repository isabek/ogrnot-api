"use strict";

var httpStatus = require("http-status");
var util = require("./util");
var config = require("./../config/config");

function checkAppKeyHeader(req, res, next) {
    if (!req.header("appKey") || req.header("appKey") != config.appKey) {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .end(JSON.stringify(util.error(httpStatus.UNAUTHORIZED, httpStatus[httpStatus.UNAUTHORIZED])));
    }
    next();
}

module.exports = checkAppKeyHeader;