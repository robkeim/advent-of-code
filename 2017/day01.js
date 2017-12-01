const Utils = require('./utils.js');

function part1(input) {
    input = input + input[0];

    let total = 0;

    for (let i = 0; i < input.length - 1; i++) {
        if (input[i] === input[i + 1]) {
            total += parseInt(input[i]);
        }
    }

    return total;
}

function runPart1() {
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(4, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(9, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    const length = input.length;
    input = input + input;

    let total = 0;

    for (let i = 0; i < length; i++) {
        if (input[i] === input[i + (length / 2)]) {
            total += parseInt(input[i]);
        }
    }

    return total;
}

function runPart2() {
    Utils.assertAreEqual(6, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(4, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(12, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(4, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
