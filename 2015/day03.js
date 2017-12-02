// https://adventofcode.com/2015/day/3

const Utils = require('./utils.js');

function part1(input) {
    let locations = new Set();

    locations.add('0_0');
    let curX = 0;
    let curY = 0;

    for (let i = 0; i < input.length; i++) {
        switch (input[i]) {
            case '>':
                curX++;
                break;
            case '<':
                curX--;
                break;
            case '^':
                curY++;
                break;
            case 'v':
                curY--;
                break;
            default:
                throw Error('unexpected direction');
        }

        locations.add(curX + '_' + curY);
    }

    return locations.size;
}

function runPart1() {
    Utils.assertAreEqual(2, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(4, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(2, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    let locations = new Set();

    locations.add('0_0');
    let curX = 0;
    let curY = 0;

    let curXRoboSanta = 0;
    let curYRoboSanta = 0;

    for (let i = 0; i < input.length; i += 2) {
        switch (input[i]) {
            case '>':
                curX++;
                break;
            case '<':
                curX--;
                break;
            case '^':
                curY++;
                break;
            case 'v':
                curY--;
                break;
            default:
                throw Error('unexpected direction');
        }

        locations.add(curX + '_' + curY);

        switch (input[i + 1]) {
            case '>':
                curXRoboSanta++;
                break;
            case '<':
                curXRoboSanta--;
                break;
            case '^':
                curYRoboSanta++;
                break;
            case 'v':
                curYRoboSanta--;
                break;
            default:
                throw Error('unexpected direction');
        }

        locations.add(curXRoboSanta + '_' + curYRoboSanta);
    }

    return locations.size;
}

function runPart2() {
    Utils.assertAreEqual(3, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(11, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
