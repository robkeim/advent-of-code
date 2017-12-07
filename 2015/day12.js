// https://adventofcode.com/2015/day/12

const Utils = require('./utils.js');

function part1(input) {
    let result = 0;

    var regex = /(-?\d+)/g;
    let matches;
    while ((matches = regex.exec(input)) !== null) {
        result += parseInt(matches[1]);
    }

    return result;
}

function runPart1() {
    Utils.assertAreEqual(6, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(6, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
