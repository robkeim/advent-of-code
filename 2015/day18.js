// https://adventofcode.com/2015/day/18

const Utils = require('./utils.js');

function part1(numSteps, input) {
    let lightsOn = new Set();
    let lines = input.split('\n');

    for (let y in lines) {
        let lights = lines[y].split('');

        for (let x in lights) {
            if (lights[x] === '#') {
                lightsOn.add(x + '_' + y);
            } else if (lights[x] === '.') {
                // Don't do anything
            } else {
                throw Error('Invalid character in line: ' + lines[y]);
            }
        }
    }

    let width = lines[0].length;
    let height = lines.length;

    for (let step = 0; step < numSteps; step++) {
        let nextIteration = new Set();

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let onNeighbors = 0;

                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) {
                            continue;
                        }

                        if (lightsOn.has((x + i) + '_' + (y + j))) {
                            onNeighbors++;
                        }
                    }
                }

                let curCoord = x + '_' + y;
                if (lightsOn.has(curCoord)) {
                    if (onNeighbors === 2 || onNeighbors === 3) {
                        nextIteration.add(curCoord);
                    }
                } else {
                    if (onNeighbors === 3) {
                        nextIteration.add(curCoord);
                    }
                }
            }
        }

        lightsOn = nextIteration;
    }

    return lightsOn.size;
}

function runPart1() {
    Utils.assertAreEqual(4, part1(4, '<puzzle input: download from adventofcode.com>'));

    console.log(part1(100, '<puzzle input: download from adventofcode.com>'));
}

runPart1();
