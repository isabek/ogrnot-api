var cheerio = require("cheerio");

function isLoggedIn(body) {
    var $ = cheerio.load(body);
    return $("input[name='frm_transkript']").attr('value') === "Transkript";
}

module.exports = {
    isLoggedIn: isLoggedIn
};