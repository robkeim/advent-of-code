// https://adventofcode.com/2017/day/3

const Utils = require('./utils.js');

// The pattern to calculate the spiral is:
// Right 1, Up 1, Left 2, Down 2, Right 3, Up 3, Left 4, Down 4, Right 5...
function part1(input) {
    let curX = 0;
    let curY = 0;

    let curDir = 'R';
    let numInCurDirection = 1;
    let remainingInCurDirection = numInCurDirection;
    while (--input > 0) {
        if (remainingInCurDirection === 0) {
            switch (curDir) {
                case 'R':
                    curDir = 'U';
                    break;
                case 'U':
                    curDir = 'L';
                    numInCurDirection++;
                    break;
                case 'L':
                    curDir = 'D';
                    break;
                case 'D':
                    curDir = 'R';
                    numInCurDirection++;
                    break;
                default:
                    throw Error('Invalid direction');
            }

            remainingInCurDirection = numInCurDirection;
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

        remainingInCurDirection--;
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

function part2(input) {
    let curX = 0;
    let curY = 0;

    let squareNum = 2;
    let squares = new Set();
    squares['0_0'] = 1;
    let curDir = 'R';
    let numInCurDirection = 1;
    let remainingInCurDirection = numInCurDirection;
    while (true) {
        if (remainingInCurDirection === 0) {
            switch (curDir) {
                case 'R':
                    curDir = 'U';
                    break;
                case 'U':
                    curDir = 'L';
                    numInCurDirection++;
                    break;
                case 'L':
                    curDir = 'D';
                    break;
                case 'D':
                    curDir = 'R';
                    numInCurDirection++;
                    break;
                default:
                    throw Error('Invalid direction');
            }

            remainingInCurDirection = numInCurDirection;
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

        remainingInCurDirection--;

        let sumOfNeighbors = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const key = (curX + i) + '_' + (curY + j);
                const value = squares[key];

                if (value !== undefined) {
                    sumOfNeighbors += squares[key];
                }
            }
        }

        if (sumOfNeighbors > input) {
            return sumOfNeighbors;
        }

        squares[curX + '_' + curY] = sumOfNeighbors;
        squareNum++;
    }
}

function runPart2() {
    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
