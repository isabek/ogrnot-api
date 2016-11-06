"use strict";

var cheerio = require("cheerio");
var config = require('../config/config');
var util = require("../lib/util");

function parseStudentInfo(body) {
    body = util.decode(body);

    var $ = cheerio.load(body);
    var table = $('table').filter('.bgc15').first();

    return {
        'number': parseNumber(table),
        'name': parseName(table),
        'surname': parseSurname(table),
        'birthplace': parseBirthPlace(table),
        'birthday': parseBirthday(table),
        'father': parseFather(table),
        'mother': parseMother(table),
        'nationality': parseNationality(table),
        'photo': parsePhoto(table)
    }
}

function getElem(table, index) {
    return cheerio(table).find('tr').eq(index);
}

function parseElemChildText(elem, index) {
    index = index || 1;
    var text = elem.children().eq(index).text().trim();
    return util.capitalize(util.normalize(text));
}
function parseNumber(table) {
    return parseElemChildText(getElem(table, 1));
}
function parseName(table) {
    return parseElemChildText(getElem(table, 2));
}
function parseSurname(table) {
    return parseElemChildText(getElem(table, 3));
}
function parseBirthPlace(table) {
    return parseElemChildText(getElem(table, 4));
}
function parseBirthday(table) {
    var text = parseElemChildText(getElem(table, 5));
    var regex = /([0-9]{1,2} [A-Za-z]{2,4} [0-9]{4})/;
    if (regex.test(text)) {
        var parts = regex.exec(text);
        if (parts && parts.length > 0) {
            return parts[0];
        }
    }

    return text;
}
function parseFather(table) {
    return parseElemChildText(getElem(table, 6));
}
function parseMother(table) {
    return parseElemChildText(getElem(table, 7));
}
function parseNationality(table) {
    return parseElemChildText(getElem(table, 8));
}
function parsePhoto(table) {
    try {
        var imagePath = getElem(table, 1)
            .children().eq(2)
            .find('img')
            .attr('src').replace('\\', '/');
        return config.domain.concat(imagePath);
    }
    catch (err) {
        console.log("Exception raised when parsing student's photo: ", err)
    }
    return null;
}

module.exports = parseStudentInfo;