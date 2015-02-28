"use strict";

var util = require("./util");

function hasAuthenticated(sessionStore, authKey, cb) {
    if (!sessionStore.hasKey(authKey)) {
        return cb(util.error(401, "Unauthorized"));
    }

    cb();
}

module.exports = hasAuthenticated;