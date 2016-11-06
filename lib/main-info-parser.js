"use strict";
var cheerio = require("cheerio");
var util = require("./util");
var domUtil = require("./dom-util");

function mainInfoParser(body) {
    body = util.decode(body);

    var $ = cheerio.load(body);

    var trs = $('table[cellpadding="3"]')
        .first()
        .find('td[class="bgc11"]');

    return {
        number: parseStudentNumber(trs.eq(0)),
        faculty: parseStudentFaculty(trs.eq(1)),
        department: parseStudentDepartment(trs.eq(2))
    };
}

function parseStudentNumber(tr) {
    return domUtil.getText(tr);
}

function parseStudentFaculty(tr) {
    return util.capitalize(util.removeLeftDash(util.normalize(domUtil.getText(tr))));
}

function parseStudentDepartment(tr) {
    return util.capitalize(util.removeLeftDash(util.normalize(domUtil.getText(tr))));
}

module.exports = mainInfoParser;