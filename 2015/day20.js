// https://adventofcode.com/2015/day/20

const Utils = require('./utils.js');

function part1(input) {
    input /= 10; // Remove the factor of 10

    let houses = [];

    for (let elf = 1; elf <= input; elf++) {
        for (let index = elf; index <= input; index += elf) {
            houses[index] = (houses[index] || 0) + elf;
        }
    }

    for (let i = 0; i < houses.length; i++) {
        if (houses[i] >= input) {
            return i;
        }
    }

    throw Error('Selected array size too small');
}

function runPart1() {
    Utils.assertAreEqual(8, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
