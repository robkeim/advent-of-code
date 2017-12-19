// https://adventofcode.com/2017/day/19

const Utils = require('./utils.js');

function part1(input) {
    return calculate(input, false);
}

function part2(input) {
    return calculate(input, true);
}

function calculate(input, returnNumSteps) {
    const continueDir = /[|-]/;
    const letter = /[A-Z]/;
    let maze = {};

    // Parse input and create maze
    let lines = input.split('\n');
    let width = lines[0].length;
    let height = lines.length;
    let startX = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let char = lines[y].charAt(x);

            if (char !== ' ') {
                maze[x + '_' + y] = char;

                if (y === 0) {
                    startX = x;
                }
            }
        }
    }

    let dir = 'down';
    let x = startX;
    let y = 0;
    let result = '';
    let numSteps = 0;

    while (true) {
        let value = maze[x + '_' + y];

        if (!value) {
            break;
        }

        numSteps++;

        switch (dir) {
            case 'up':
                if (continueDir.test(value)) {
                    y--;
                } else if (letter.test(value)) {
                    result += value;
                    y--;
                } else if (value === '+') {
                    let neighbors = getNeighborValues(maze, x, y);
                    if (neighbors[0]) {
                        y--;
                    } else if (neighbors[1]) {
                        dir = 'right';
                        x++;
                    } else if (neighbors[3]) {
                        dir = 'left';
                        x--;
                    } else {
                        throw Error('Invalid input');
                    }
                } else {
                    throw Error('Invalid input');
                }
                break;
            case 'right':
                if (continueDir.test(value)) {
                    x++;
                } else if (letter.test(value)) {
                    result += value;
                    x++;
                } else if (value === '+') {
                    let neighbors = getNeighborValues(maze, x, y);
                    if (neighbors[1]) {
                        x++;
                    } else if (neighbors[0]) {
                        dir = 'up';
                        y--;
                    } else if (neighbors[2]) {
                        dir = 'down';
                        y++;
                    } else {
                        throw Error('Invalid input');
                    }
                } else {
                    throw Error('Invalid input');
                }
                break;
            case 'down':
                if (continueDir.test(value)) {
                    y++;
                } else if (letter.test(value)) {
                    result += value;
                    y++;
                } else if (value === '+') {
                    let neighbors = getNeighborValues(maze, x, y);
                    if (neighbors[2]) {
                        y--;
                    } else if (neighbors[1]) {
                        dir = 'right';
                        x++;
                    } else if (neighbors[3]) {
                        dir = 'left';
                        x--;
                    } else {
                        throw Error('Invalid input');
                    }
                } else {
                    throw Error('Invalid input');
                }
                break;
            case 'left':
                if (continueDir.test(value)) {
                    x--;
                } else if (letter.test(value)) {
                    result += value;
                    x--;
                } else if (value === '+') {
                    let neighbors = getNeighborValues(maze, x, y);
                    if (neighbors[3]) {
                        x--;
                    } else if (neighbors[0]) {
                        dir = 'up';
                        y--;
                    } else if (neighbors[2]) {
                        dir = 'down';
                        y++;
                    } else {
                        throw Error('Invalid input');
                    }
                } else {
                    throw Error('Invalid input');
                }
                break;
        }
    }

    if (returnNumSteps) {
        return numSteps;
    } else {
        return result;
    }
}

function getNeighborValues(maze, x, y) {
    return [
        maze[x + '_' + (y - 1)],
        maze[(x + 1) + '_' + y],
        maze[x + '_' + (y + 1)],
        maze[(x - 1) + '_' + y]
    ];
}

function printMaze(maze, width, height) {
    for (let y = 0; y < height; y++) {
        let line = '';
        for (let x = 0; x < width; x++) {
            line += maze[x + '_' + y] || ' ';
        }
        console.log(line);
    }
}

function runPart1() {
    Utils.assertAreEqual('ABCDEF', part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function runPart2() {
    Utils.assertAreEqual(38, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
