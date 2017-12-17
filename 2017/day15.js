// https://adventofcode.com/2017/day/15

const Utils = require('./utils.js');

function part1(genA, genB) {
    let result = 0;

    for (let i = 0; i < 40000000; i++) {
        genA = (genA * 16807) % 2147483647;
        genB = (genB * 48271) % 2147483647;

        if ((genA & 0xFFFF) === (genB & 0xFFFF)) {
            result++;
        }
    }

    return result;
}

function runPart1() {
    Utils.assertAreEqual(588, part1('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));
}

function part2(genA, genB) {
    let result = 0;

    for (let i = 0; i < 5000000; i++) {
        do {
            genA = (genA * 16807) % 2147483647;
        } while (genA % 4 !== 0);

        do {
            genB = (genB * 48271) % 2147483647;
        } while (genB % 8 !== 0);

        if ((genA & 0xFFFF) === (genB & 0xFFFF)) {
            result++;
        }
    }

    return result;
}

function runPart2() {
    Utils.assertAreEqual(309, part2('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
