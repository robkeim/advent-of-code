// https://adventofcode.com/2017/day/6

const Utils = require('./utils.js');

function part1(input) {
    let nodes = input.split('\t').map(v => parseInt(v));
    let positions = new Set();

    while (true) {
        let position = nodes.join('_');
        console.log(position);

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

runPart1();
