"use strict";

var util = require("./util");
var httpStatus = require("http-status");

function hasAuthenticated(sessionStore, authKey, cb) {
    if (!sessionStore.hasKey(authKey)) {
        return cb(util.error(httpStatus.UNAUTHORIZED, httpStatus[httpStatus.UNAUTHORIZED]));
    }

    cb();
}

module.exports = hasAuthenticated;