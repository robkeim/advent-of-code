// https://adventofcode.com/2015/day/6

const Utils = require('./utils.js');

// The runtime for this for the puzzle input is ~10 sec. Using arrays would probably be faster, but I'd need to verify.
function part1(input) {
    let lights = new Set();
    let regex = /(turn on|toggle|turn off) (\d+),(\d+) through (\d+),(\d+)/;

    input.split('\n').filter(line => line).forEach(line => {
        let match = regex.exec(line);

        if (!match) {
            throw Error('Invalid line format');
        }

        let minX = parseInt(match[2]);
        let minY = parseInt(match[3]);
        let maxX = parseInt(match[4]);
        let maxY = parseInt(match[5]);

        for (let i = minX; i <= maxX; i++) {
            for (let j = minY; j <= maxY; j++) {
                const key = i + '_' + j;
                if (match[1] === 'turn on') {
                    lights.add(key);
                } else if (match[1] === 'toggle') {
                    if (lights.has(key)) {
                        lights.delete(key);
                    } else {
                        lights.add(key);
                    }
                } else if (match[1] === 'turn off') {
                    lights.delete(key);
                } else {
                    throw new Error('Unsupported command');
                }
            }
        }
    });

    return lights.size;
}

function runPart1() {
    Utils.assertAreEqual(9, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(5, part1('<puzzle input: download from adventofcode.com>'))

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    let lights = {};
    let regex = /(turn on|toggle|turn off) (\d+),(\d+) through (\d+),(\d+)/;

    input.split('\n').filter(line => line).forEach(line => {
        let match = regex.exec(line);

        if (!match) {
            throw Error('Invalid line format');
        }

        let minX = parseInt(match[2]);
        let minY = parseInt(match[3]);
        let maxX = parseInt(match[4]);
        let maxY = parseInt(match[5]);

        for (let i = minX; i <= maxX; i++) {
            for (let j = minY; j <= maxY; j++) {
                const key = i + '_' + j;
                if (match[1] === 'turn on') {
                    if (lights[key] === undefined) {
                        lights[key] = 1;
                    } else {
                        lights[key]++;
                    }
                } else if (match[1] === 'toggle') {
                    if (lights[key] === undefined) {
                        lights[key] = 2;
                    } else {
                        lights[key] += 2;
                    }
                } else if (match[1] === 'turn off') {
                    const value = lights[key];
                    if (value !== undefined && value > 0) {
                        lights[key] = value - 1;
                    }
                } else {
                    throw new Error('Unsupported command');
                }
            }
        }
    });

    let totalLight = 0;
    for (var light in lights) {
        totalLight += lights[light];
    }

    return totalLight;
}

function runPart2() {
    Utils.assertAreEqual(9, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
