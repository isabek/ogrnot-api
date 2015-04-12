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


    var lessons = [], lesson = {}, isLessonNameExist = false, isLessonExist = false;

    content.map(function (index, elem) {
        var data = cheerio(elem).find('td[class="bgc11"]');


        if (isLessonName(data)) {
            lesson['name'] = data.text().trim();
            isLessonNameExist = true;
        }

        if (isLesson(data)) {
            lesson['exam'] = data.eq(0).text().trim();
            lesson['mark'] = data.eq(1).text().trim()
            lesson['avg'] = data.eq(2).text().trim()
            isLessonExist = true;
        }

        if(isLessonExist && isLessonNameExist){
            lessons.push(lesson);

            lesson = {};
            isLessonExist = false;
            isLessonNameExist = false;
        }

    });

    return {
        lessons: lessons
    };
}

function isLessonName(body) {
    return body.length === 1;
}

function isLesson(body) {
    return body.length === 3;
}

module.exports = semesterNotesParser;