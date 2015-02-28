"use strict";

var cheerio = require("cheerio");
var util = require("../lib/util");

function studentTranscriptParser(body) {
    body = util.decode(body);
    var $ = cheerio.load(body);

    var languages = $('table[align=left]')
        .eq(1)
        .find('tr.bgc11')
        .children();

    var lessons = {
        'code': languages.eq(0).text(),
        'name': languages.eq(1).text(),
        'mark': languages.eq(2).text(),
        'credit': languages.eq(3).text()
    };

    console.log(lessons);
}

module.exports = studentTranscriptParser;