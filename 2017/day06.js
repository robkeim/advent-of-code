// https://adventofcode.com/2017/day/6

const Utils = require('./utils.js');

function part1(input) {
    let nodes = input.split('\t').map(v => parseInt(v));
    let positions = new Set();

    while (true) {
        let position = nodes.join('_');

        if (positions.has(position)) {
            return positions.size;
        } else {
            positions.add(position);
        }

        let index = 0;
        let maxValue = -1;

        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] > maxValue) {
                maxValue = nodes[i];
                index = i;
            }
        }

        nodes[index] = 0;

        for (let i = 0; i < maxValue; i++) {
            nodes[(index + 1 + i) % nodes.length]++;
        }
    }
}

function runPart1() {
    Utils.assertAreEqual(5, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    let nodes = input.split('\t').map(v => parseInt(v));
    let positions = new Set();
    let iteration = 1;
    let positionIteration = {};

    while (true) {
        let position = nodes.join('_');

        if (positions.has(position)) {
            return positions.size - positionIteration[position] + 1;
        } else {
            positionIteration[position] = iteration++;
            positions.add(position);
        }

        let index = 0;
        let maxValue = -1;

        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] > maxValue) {
                maxValue = nodes[i];
                index = i;
            }
        }

        nodes[index] = 0;

        for (let i = 0; i < maxValue; i++) {
            nodes[(index + 1 + i) % nodes.length]++;
        }
    }
}

function runPart2() {
    Utils.assertAreEqual(4, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
