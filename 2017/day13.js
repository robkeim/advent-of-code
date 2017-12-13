// https://adventofcode.com/2017/day/13

const Utils = require('./utils.js');

function part1(input) {
    const regex = /(\d+): (\d+)/;

    let totalSeverity = 0;
    let lines = input.split('\n');

    for (let i in lines) {
        let match = regex.exec(lines[i]);

        if (!match) {
            throw Error('Invalid line format: ' + lines[i]);
        }

        let depth = parseInt(match[1]);
        let range = parseInt(match[2]);

        let curPos = depth % (2 * (range - 1));

        if (curPos === 0) {
            totalSeverity += depth * range;
        }
    }

    return totalSeverity;
}

function runPart1() {
    Utils.assertAreEqual(24, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    const regex = /(\d+): (\d+)/;

    let delay = -1;
    let validSolution = false;
    let lines = input.split('\n');

    while (!validSolution) {
        validSolution = true;
        delay++;

        for (let i in lines) {
            let match = regex.exec(lines[i]);

            if (!match) {
                throw Error('Invalid line format: ' + lines[i]);
            }

            let depth = parseInt(match[1]);
            let range = parseInt(match[2]);

            let curPos = (depth + delay) % (2 * (range - 1));

            if (curPos === 0) {
                validSolution = false;
                break;
            }
        }
    }

    return delay;
}

function runPart2() {
    Utils.assertAreEqual(10, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
