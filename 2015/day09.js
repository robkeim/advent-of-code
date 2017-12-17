// https://adventofcode.com/2015/day/9
const Utils = require('./utils.js');

function part1(input) {
    return calculate(input, false);
}

function part2(input) {
    return calculate(input, true);
}

function calculate(input, useLongest) {
    const regex = /([a-zA-Z]+) to ([a-zA-Z]+) = (\d+)/;
    let lines = input.split('\n');
    let cities = new Set();
    let distances = {};

    for (let i = 0; i < lines.length; i++) {
        let match = regex.exec(lines[i]);

        if (!match) {
            throw Error('Invalid line format: ' + lines[i]);
        }

        let distance = parseInt(match[3]);
        distances[match[1] + '_' + match[2]] = distance;
        distances[match[2] + '_' + match[1]] = distance;
        cities.add(match[1]);
        cities.add(match[2]);
    }

    let permutations = Utils.permutations(Array.from(cities.keys()));
    let result = useLongest ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < permutations.length; i++) {
        let distance = 0;

        for (let j = 0; j < permutations[i].length - 1; j++) {
            distance += distances[permutations[i][j] + '_' + permutations[i][j + 1]] || 0;
        }

        if (!useLongest && distance < result) {
            result = distance;
        }

        if (useLongest && distance > result) {
            result = distance;
        }
    }

    return result;
}

function runPart1() {
    Utils.assertAreEqual(605, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function runPart2() {
    Utils.assertAreEqual(982, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
