var sessionStore = require("../lib/session-store");
var handleAuthenticate = require("../lib/handle-authenticate");

function authenticateService(req, res) {
    handleAuthenticate(sessionStore, req, res);
}

module.exports = authenticateService;