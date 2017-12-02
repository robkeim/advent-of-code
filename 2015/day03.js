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

runPart1();
