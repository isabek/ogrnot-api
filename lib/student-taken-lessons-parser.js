var cheerio = require("cheerio");
var util = require("../lib/util");

function studentTakenLessonsParser(body) {
//    body = util.decode(body);

    var $ = cheerio.load(body);
    var table = $('table').filter('.bgc15').eq(3);

    console.log(table.text())

//    console.log(lessons);

//        .find('tr')
//        .filter(isLessonRow)
//        .map(function (index, lesson) {
//            return {
//                'code': parseLessonCode(lesson)
//            }
//        }).get();


//    return lessons;
}


function getElem(table, index) {
    return cheerio(table).find('tr').eq(index);
}

function parseElemChildText(elem, index) {
    index = index || 1;
    return elem.children().eq(index).text().trim();
}
function parseNumber(table) {
    return parseElemChildText(getElem(table, 1));
}

function isLessonRow(index, elem) {
    return cheerio(elem).hasClass('bgc15');
}

function parseLessonCode(row) {
    return row.children().eq(0).text();
}

function parseLessonName(row) {

}

function parseLessonCredit(row) {

}


module.exports = studentTakenLessonsParser;