// https://adventofcode.com/2017/day/9

const Utils = require('./utils.js');

function part1(input) {
    input = cleanString(input);

    let curDepth = 0;
    let numGroups = 0;
    let score = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '{') {
            curDepth++;
        } else if (input[i] === '}') {
            score += curDepth;
            curDepth--;
            numGroups++;
        }
    }

    return score;
}

function cleanString(input) {
    input = input.replace(/!./g, '');
    return input.replace(/<[^>]*?>/g, '')
}

function runPart1() {
    Utils.assertAreEqual('', cleanString('<>'));
    Utils.assertAreEqual('', cleanString('<random characters>'));
    Utils.assertAreEqual('', cleanString('<<<<>'));
    Utils.assertAreEqual('', cleanString('<{!>}>'));
    Utils.assertAreEqual('', cleanString('<!!>'));
    Utils.assertAreEqual('', cleanString('<!!!>>'));
    Utils.assertAreEqual('', cleanString('<{o"i!a,<{i<a>'));

    // Testing for the number of groups (return numGroups)
    /*Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(6, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(5, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(2, part1('<puzzle input: download from adventofcode.com>'));*/

    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(6, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(5, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(16, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(9, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(9, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
