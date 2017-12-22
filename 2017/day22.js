// https://adventofcode.com/2017/day/22

const Utils = require('./utils.js');

const dirNorth = 0;
const dirEast = 1;
const dirSouth = 2;
const dirWest = 3;

function part1(iterations, input) {
    let infectedNodes = new Set();
    let curX = 0;
    let curY = 0;
    let curDir = dirNorth;
    let causedInfections = 0;

    // Initialize infected nodes
    let lines = input.split('\n').reverse();
    let index = Math.floor(lines.length / 2);

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines.length; x++) {
            if (lines[y][x] === '#') {
                infectedNodes.add((x - index) + '_' + (y - index));
            }
        }
    }

    // Simulate the iterations
    for (let i = 0; i < iterations; i++) {
        let curNode = curX + '_' + curY;
        // Step 1
        if (infectedNodes.has(curNode)) {
            curDir = (curDir + 1) % 4;
        } else {
            curDir = (curDir - 1 + 4) % 4;
        }

        // Step 2
        if (!infectedNodes.has(curNode)) {
            infectedNodes.add(curNode);
            causedInfections++;
        } else {
            infectedNodes.delete(curNode);
        }

        // Step 3
        switch (curDir) {
            case dirNorth:
                curY++;
                break;
            case dirEast:
                curX++;
                break;
            case dirSouth:
                curY--;
                break;
            case dirWest:
                curX--;
                break;
            default:
                throw Error('Invalid dir: ' + curDir);
        }
    }

    return causedInfections;
}

function printGrid(infectedNodes) {
    for (let y = 4; y >= -4; y--) {
        let line =  '';
        for (let x = -4; x <= 4; x++) {
            if (curX === x && curY === y) {
                if (infectedNodes.has(x + '_' + y)) {
                    line += 'I';
                } else {
                    line += 'C';
                }
            } else {
                if (infectedNodes.has(x + '_' + y)) {
                    line += '#';
                } else {
                    line += '.';
                }
            }
        }
        console.log(line);
    }
}

function runPart1() {
    Utils.assertAreEqual(5, part1(7, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(41, part1(70, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(5587, part1(10000, '<puzzle input: download from adventofcode.com>'));

    console.log(part1(10000, '<puzzle input: download from adventofcode.com>'));
}

function part2(iterations, input) {
    let infectedNodes = {};
    let curX = 0;
    let curY = 0;
    let curDir = dirNorth;
    let causedInfections = 0;

    // Initialize infected nodes
    let lines = input.split('\n').reverse();
    let index = Math.floor(lines.length / 2);

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines.length; x++) {
            if (lines[y][x] === '#') {
                infectedNodes[(x - index) + '_' + (y - index)] = 'I';
            } else {
                infectedNodes[(x - index) + '_' + (y - index)] = 'C';
            }
        }
    }

    // Simulate the iterations
    for (let i = 0; i < iterations; i++) {
        let curNode = curX + '_' + curY;
        // Step 1
        switch (infectedNodes[curNode] || 'C') {
            case 'C':
                // Turn left
                curDir = (curDir - 1 + 4) % 4;
                break;
            case 'W':
                // Don't turn
                break;
            case 'I':
                // Turn right
                curDir = (curDir + 1) % 4;
                break;
            case 'F':
                // Reverse
                curDir = (curDir + 2) % 4;
                break;
            default:
                throw Error('Invalid state');
        }

        // Step 2
        switch (infectedNodes[curNode] || 'C') {
            case 'C':
                infectedNodes[curNode] = 'W';
                break;
            case 'W':
                causedInfections++;
                infectedNodes[curNode] = 'I';
                break;
            case 'I':
                infectedNodes[curNode] = 'F';
                break;
            case 'F':
                infectedNodes[curNode] = 'C';
                break;
            default:
                throw Error('Invalid state');
        }

        // Step 3
        switch (curDir) {
            case dirNorth:
                curY++;
                break;
            case dirEast:
                curX++;
                break;
            case dirSouth:
                curY--;
                break;
            case dirWest:
                curX--;
                break;
            default:
                throw Error('Invalid dir: ' + curDir);
        }
    }

    return causedInfections;
}

function runPart2() {
    Utils.assertAreEqual(26, part2(100, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(2511944, part2(10000000, '<puzzle input: download from adventofcode.com>'));

    console.log(part2(10000000, '<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
