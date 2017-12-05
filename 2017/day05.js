// https://adventofcode.com/2017/day/5

const Utils = require('./utils.js');

function part1(input) {
    let instructions = input
        .split('\n')
        .filter(line => line)
        .map(line => parseInt(line));

    let curLine = 0;
    let numSteps = 0;

    while (curLine >= 0 && curLine < instructions.length) {
        let offset = instructions[curLine];
        instructions[curLine]++;
        curLine += offset;
        numSteps++;
    }

    return numSteps;
}

function runPart1() {
    Utils.assertAreEqual(5, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    let instructions = input
        .split('\n')
        .filter(line => line)
        .map(line => parseInt(line));

    let curLine = 0;
    let numSteps = 0;

    while (curLine >= 0 && curLine < instructions.length) {
        let offset = instructions[curLine];

        if (offset >= 3) {
            instructions[curLine]--;
        } else {
            instructions[curLine]++;
        }

        curLine += offset;
        numSteps++;
    }

    return numSteps;
}

function runPart2() {
    Utils.assertAreEqual(10, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
