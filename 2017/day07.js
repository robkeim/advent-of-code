// https://adventofcode.com/2017/day/7

const Utils = require('./utils.js');

function part1(input) {
    const lines = input.split('\n').filter(line => line);

    const candidateRoots = new Set();
    const leaves = new Set();

    const regex = /([a-z]+) \(\d+\)(?: -> ([a-z, ]+))?/;

    lines.forEach(line => {
        let match = regex.exec(line);

        if (match[2]) {
            candidateRoots.add(match[1]);

            match[2].split(',').forEach(word => {
                leaves.add(word.trim());
            });
        } else {
            leaves.add(match[1]);
        }
    });

    let root = undefined;

    candidateRoots.forEach(item => {
        if (!leaves.has(item)) {
            root = item;
        }
    });

    if (!root) {
        throw Error('Invalid tree configuration');
    }

    return root;
}

function runPart1() {
    Utils.assertAreEqual('tknk', part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
