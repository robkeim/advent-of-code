// https://adventofcode.com/2017/day/3

const Utils = require('./utils.js');

// The pattern to calculate the spiral is:
// Right 1, Up 1, Left 2, Down 2, Right 3, Up 3, Left 4, Down 4, Right 5...
function part1(input) {
    let curX = 0;
    let curY = 0;

    let curDir = 'R';
    let curNum = 1;
    let remaining = curNum;
    while (--input > 0) {
        if (remaining === 0) {
            switch (curDir) {
                case 'R':
                    curDir = 'U';
                    break;
                case 'U':
                    curDir = 'L';
                    curNum++;
                    break;
                case 'L':
                    curDir = 'D';
                    break;
                case 'D':
                    curDir = 'R';
                    curNum++;
                    break;
                default:
                    throw Error('Invalid direction');
            }

            remaining = curNum;
        }

        switch (curDir) {
            case 'R':
                curX++;
                break;
            case 'U':
                curY++;
                break;
            case 'L':
                curX--;
                break;
            case 'D':
                curY--;
                break;
            default:
                throw Error('Invalid direction');
        }

        remaining--;
    }

    return Math.abs(curX) + Math.abs(curY);
}

function runPart1() {
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(2, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(31, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
