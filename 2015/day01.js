// https://adventofcode.com/2015/day/1

const Utils = require('./utils.js');

function part1(input) {
    let total = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '(') {
            total++;
        } else {
            total--;
        }
    }

    return total;
}

function runPart1() {
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(-1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(-1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(-3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(-3, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    let total = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '(') {
            total++;
        } else {
            total--;
        }

        if (total < 0) {
            return i + 1;
        }
    }

    throw Error('Santa never reached the basement');
}

function runPart2() {
    Utils.assertAreEqual(1, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(5, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
