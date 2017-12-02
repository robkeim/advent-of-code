// https://adventofcode.com/2015/day/4
const Utils = require('./utils.js');

function part1(secretKey) {
    let counter = 0;

    while (true) {
        const hash = Utils.md5(secretKey + counter);

        if (hash.startsWith('00000')) {
            return counter;
        }

        counter++;
    }
}

function runPart1() {
    Utils.assertAreEqual(609043, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1048970, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(secretKey) {
    let counter = 0;

    while (true) {
        const hash = Utils.md5(secretKey + counter);

        if (hash.startsWith('000000')) {
            return counter;
        }

        counter++;
    }
}

function runPart2() {
    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
// This takes a couple of minutes to complete
runPart2();
