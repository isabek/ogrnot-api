"use strict";

var cheerio = require("cheerio");
var util = require("../lib/util");

function studentTranscriptParser(body) {
    body = util.decode(body);
    var $ = cheerio.load(body);

    var content = $('table[class="bgc9"]')
        .first()
        .find('table[align="left"][cellpadding="3"][cellspacing="1"]')
        .first();

    return {
        preparatory: parsePreparatory(),
        undergraduate: parseUndergraduate(content)
    };
}

function parsePreparatory() {
    return {
        lessons: []
    };
}

function parseUndergraduate(content) {
    var undergraduate = content
        .find('table[align="center"][cellpadding="1"][cellspacing="1"]')
        .first()
        .children()
        .filter(isSemester);


    var semesters = [],
        semester = {};

    undergraduate.each(function (index, elem) {

        if (index % 2 == 0) {
            if (semester['name']) {
                semesters.push(semester);
                semester = {};
            }
        }

        if (index % 2 == 0) {
            semester["name"] = parseSemesterName(elem);
            semester["lessons"] = parseLessons(elem);
        } else {
            var result = cheerio(elem)
                .find("td.bgc11");

            semester['gpa'] = result.eq(2).text();
            semester['totalCredit'] = result.eq(0).text();
            semester['totalAverage'] = result.eq(1).text();
        }
    });

    if (semester['name']) {
        semesters.push(semester);
    }

    return {
        semesters: semesters
    };
}

function parseSemesterName(elem) {
    return cheerio(elem)
        .find('tr.bgc20')
        .first()
        .text()
        .replace(/(\r\n|\n|\r)/gm, "")
        .trim();
}

function parseLessons(elem) {
    return cheerio(elem).find("tr.bgc14")
        .map(function (index, elem) {
            var lessonBody = cheerio(elem).children();
            return {
                code: parseCode(lessonBody),
                name: parseName(lessonBody),
                mark: parseMark(lessonBody),
                credit: parseCredit(lessonBody),
                supplement: parseSupplement(lessonBody)
            }
        })
        .get();
}

function parseCode(elem) {
    return elem.eq(0).text();
}

function parseName(elem) {
    return elem.eq(1).text();
}

function parseMark(elem) {
    return elem.eq(2).text();
}

function parseCredit(elem) {
    return elem.eq(4).text();
}

function parseSupplement(elem) {
    return elem.eq(4).text();
}

function isSemester(index, elem) {
    return cheerio(elem).find("table").length == 1;
}

module.exports = studentTranscriptParser;