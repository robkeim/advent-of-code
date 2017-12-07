// https://adventofcode.com/2015/day/12

const Utils = require('./utils.js');

function part1(input) {
    let result = 0;

    let regex = /(-?\d+)/g;
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

function part2(input) {
    let json = JSON.parse(input);
    return traverseAndSum(json);
    let result = 0;

    let regex = /(-?\d+)/g;
    let matches;
    while ((matches = regex.exec(input)) !== null) {
        result += parseInt(matches[1]);
    }

    return result;
}

function traverseAndSum(object) {
    let sum = 0;
    let hasRed = false;

    for (let i in object) {
        if (object[i] === "red") {
            hasRed = true;
            break;
        }
    }

    if (!hasRed || object.constructor === Array) {
        for (let i in object) {
            if (typeof(object[i]) === "number") {
                sum += parseInt(object[i]);
            } else if (object[i] !== null && typeof(object[i]) === "object") {
                sum += traverseAndSum(object[i]);
            }
        }
    }

    return sum;
}

function runPart2() {
    Utils.assertAreEqual(6, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(4, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(6, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
