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
        preparatory: parsePreparatory(content),
        undergraduate: parseUndergraduate(content)
    };
}

function parsePreparatory(content) {

    var preparatory = content
        .find('tr')
        .eq(1)
        .find('tr.bgc11')
        .map(function (index, elem) {
            var tds = cheerio(elem).children();
            return {
                code: tds.eq(0).text().trim(),
                name: tds.eq(1).text().trim(),
                mark: tds.eq(2).text().trim(),
                credit: tds.eq(3).text().trim()
            }
        }).get();
    
    return {
        lessons: preparatory
    };
}

function parseUndergraduate(content) {
    var undergraduate = content
        .find('table[align="center"][cellpadding="1"][cellspacing="1"]')
        .first()
        .children()
        .filter(isSemester);


    var semesters = [],
        semester = {},
        general = {};

    undergraduate.each(function (index, elem) {

        if (index % 2 == 0) {
            if (semester['name']) {
                semesters.push(semester);
                semester = {};
            }
        }

        if (index % 2 == 0) {
            semester["name"] = parseSemesterName(elem);
            semester["lessons"] = parseUndergraduateLessons(elem);
        } else {

            var genel = cheerio(elem)
                .find('tr.bgc16')
                .first()
                .children()
                .eq(0)
                .text()
                .trim();


            var result = cheerio(elem)
                .find("td.bgc11");

            var gpa = result.eq(2).text(),
                totalCredit = result.eq(0).text(),
                totalAverage = result.eq(1).text();

            if (genel.indexOf("Genel") == 0) {
                general = {
                    'gpa': gpa,
                    'totalCredit': totalCredit,
                    'totalAverage': totalAverage
                };

                semester['gpa'] = 0;
                semester['totalCredit'] = 0;
                semester['totalAverage'] = 0;

            } else {
                semester['gpa'] = gpa;
                semester['totalCredit'] = totalCredit;
                semester['totalAverage'] = totalAverage;
            }
        }
    });

    if (semester['name']) {
        semesters.push(semester);
    }

    return {
        semesters: semesters,
        general: general
    };
}

function parseSemesterName(elem) {
    return cheerio(elem)
        .find('tr.bgc20')
        .first()
        .text()
        .replace(/(\r\n|\n|\r)/gm, " ")
        .trim();
}

function parseUndergraduateLessons(elem) {
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