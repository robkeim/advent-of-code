// https://adventofcode.com/2015/day/6

const Utils = require('./utils.js');

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

runPart1();
