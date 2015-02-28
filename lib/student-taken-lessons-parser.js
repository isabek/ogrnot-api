"use strict";

var cheerio = require("cheerio");
var util = require("../lib/util");

function studentTakenLessonsParser(body) {
    body = util.decode(body);

    var $ = cheerio.load(body);
    return $('table[cellspacing="6"]')
        .first()
        .children()
        .filter(isLessonRow)
        .map(function (index, elem) {
            return {
                code: parseLessonCode(elem),
                name: parseLessonName(elem),
                credit: parseLessonCredit(elem)
            }
        }).get();
}

function isLessonRow(index, elem) {
    return cheerio(elem).hasClass('bgc15')
}

function parseLessonCode(row) {
    return cheerio(row).children().eq(0).text().trim();
}

function parseLessonName(row) {
    return cheerio(row).children().eq(1).text().trim();
}

function parseLessonCredit(row) {
    return cheerio(row).children().eq(2).text().trim();
}


module.exports = studentTakenLessonsParser;