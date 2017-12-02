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

function part2(input) {
    return input.split('\n').map(line => {
        let values = line.split(' ').map(value => parseInt(value));

        for (let i = 0; i < values.length; i++) {
            for (let j = i + 1; j < values.length; j++) {
                if (values[i] % values[j] === 0) {
                    return values[i] / values[j];
                } else if (values[j] % values[i] === 0) {
                    return values[j] / values[i];
                }
            }
        }

        throw Error('No divisible elements in the row');
    }).reduce((a, b) => a + b, 0);
}

function runPart2() {
    Utils.assertAreEqual(9, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
