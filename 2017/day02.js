// https://adventofcode.com/2017/day/2

const Utils = require('./utils.js');

function part1(input) {
    return input.split('\n').map(line => {
        let values = line.split(' ').map(value => parseInt(value));
        let max = values.reduce((a, b) => Math.max(a, b));
        let min = values.reduce((a, b) => Math.min(a, b));
        return max - min;
    }).reduce((a, b) => a + b, 0);
}

function runPart1() {
    Utils.assertAreEqual(18, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
