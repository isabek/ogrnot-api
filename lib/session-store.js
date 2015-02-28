"use strict";

var SessionStore = {
    keys: {},
    hasKey: function (key) {
        return this.keys[key] != undefined;
    },
    setKey: function (key, jar) {
        this.keys[key] = jar;
    },
    getJar: function (key) {
        return this.keys[key];
    }
};

module.exports = SessionStore;
