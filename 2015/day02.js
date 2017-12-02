// https://adventofcode.com/2015/day/2

const Utils = require('./utils.js');

function part1(input) {
    let total = 0;

    let lines = input.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        let dimensions = line.split('x');
        let l = parseInt(dimensions[0]);
        let w = parseInt(dimensions[1]);
        let h = parseInt(dimensions[2]);
        total += 2 * (l * w + w * h + h * l) + Math.min(l * w, w * h, h * l);
    }

    return total;
}

function runPart1() {
    Utils.assertAreEqual(58, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(43, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    let total = 0;

    let lines = input.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        let dimensions = line.split('x');
        let l = parseInt(dimensions[0]);
        let w = parseInt(dimensions[1]);
        let h = parseInt(dimensions[2]);

        let values = [l, w, h];
        values = values.sort((a, b) => { return a > b });

        total += 2 * (values[0] + values[1]) + l * w * h;
    }

    return total;
}

function runPart2() {
    Utils.assertAreEqual(34, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(14, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
