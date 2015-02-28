"use strict";

var cheerio = require("cheerio");
var util = require("../lib/util");

function isPasswordChanged(body) {

    body = util.decode(body);

    var $ = cheerio.load(body),
        text = $('div').filter('.hata').first().text().trim();

    return text == "Şifreniz başarıyla değiştirildi.";
}


module.exports = isPasswordChanged;