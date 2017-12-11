// https://adventofcode.com/2017/day/11
const Utils = require('./utils.js');

function part1(input) {
    let dirs = input.split(',');
    let q = 0;
    let r = 0;

    for (let i in dirs) {
        switch (dirs[i]) {
            case 'n':
                r--;
                break;
            case 'ne':
                q++;
                r--;
                break;
            case 'se':
                q++;
                break;
            case 's':
                r++;
                break;
            case 'sw':
                q--;
                r++;
                break;
            case 'nw':
                q--;
                break;
            default:
                throw Error('Invalid direction: ' + dir);
        }
    }

    return calcDir(0, 0, q, r);
}

function calcDir(q1, r1, q2, r2) {
    return (Math.abs(q1 - q2) + Math.abs(q1 + r1 - q2 - r2) + Math.abs(r1 - r2)) / 2;
}

function runPart1() {
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(2, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    let dirs = input.split(',');
    let q = 0;
    let r = 0;
    let max = 0;

    for (let i in dirs) {
        switch (dirs[i]) {
            case 'n':
                r--;
                break;
            case 'ne':
                q++;
                r--;
                break;
            case 'se':
                q++;
                break;
            case 's':
                r++;
                break;
            case 'sw':
                q--;
                r++;
                break;
            case 'nw':
                q--;
                break;
            default:
                throw Error('Invalid direction: ' + dir);
        }

        max = Math.max(max, calcDir(0, 0, q, r));
    }

    return max;
}

function runPart2() {
    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
