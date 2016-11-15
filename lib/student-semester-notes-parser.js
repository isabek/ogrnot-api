"use strict";

var cheerio = require("cheerio");
var util = require("../lib/util");

function semesterNotesParser(body) {
    body = util.decode(body);
    var $ = cheerio.load(body);

    var content = $('table[class="bgc9"]')
        .find('div[class="hucre"]')
        .eq(1)
        .find('table')
        .first()
        .find('tr');

    var lessons = [], lesson = {};

    content
        .filter(function (index, elem) {
            return cheerio(elem).text().trim().indexOf("anket doldurmalısınız") === -1;
        })
        .map(function (index, elem) {
            cheerio(elem).is(function () {
                var result = cheerio(elem).find('td[class="bgc11"]');

                if (isLessonName(this)) {
                    if (lesson['name']) {
                        lessons.push(lesson);
                        lesson = {};
                    }
                    lesson['name'] = cheerio(this).text().trim();
                }

                if (isLesson(this)) {
                    if (!lesson['exams']) {
                        lesson['exams'] = [];
                    }

                    lesson['exams'].push({
                        name: result.eq(0).text().trim(),
                        mark: result.eq(1).text().trim(),
                        avg: result.eq(2).text().trim()
                    });
                }
            });
        });


    if (lesson['name']) {
        lessons.push(lesson);
    }

    return {
        lessons: lessons
    };
}

function isLessonName(elem) {
    return cheerio(elem).find('td[class="bgc20"]').length === 1;
}

function isLesson(elem) {
    return cheerio(elem).find('td[class="bgc11"]').length === 3 && cheerio(elem).find('tr').length === 0;
}

module.exports = semesterNotesParser;