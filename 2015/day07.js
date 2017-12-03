// https://adventofcode.com/2015/day/7

const Utils = require('./utils.js');

function part1(input) {
    let knownValues = {};
    let instructions = [];

    let assignRegex = /^(\S+) -> ([a-z]+)$/;
    let notRegex = /^NOT (\S+) -> ([a-z]+)$/;

    input.split('\n').filter(line => line).forEach(line => {
        instructions.push(line);
    });

    let index = -1;
    while (true) {
        if (knownValues['a']) {
            return knownValues['a'];
        }

        index++;
        index %= instructions.length;

        // Handle assign operator
        let match = assignRegex.exec(instructions[index]);

        if (match) {
            let value = parseInt(match[1]);

            if (value) {
                knownValues[match[2]] = value;
                instructions.splice(index, 1);
            } else if (knownValues[match[1]]) {
                knownValues[match[2]] = knownValues[match[1]];
                instructions.splice(index, 1);
            }

            continue;
        }

        // Handle NOT operator
        match = notRegex.exec(instructions[index]);

        if (match) {
            let value = parseInt(match[1]);

            if (value) {
                knownValues[match[2]] = ~value;
                instructions.splice(index, 1);
            } else if (knownValues[match[1]]) {
                knownValues[match[2]] = ~knownValues[match[1]];
                instructions.splice(index, 1);
            }

            continue;
        }
    }
}

function runPart1() {
    // Test assign operator
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));

    // Test NOT operator
    Utils.assertAreEqual(-2, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(-2, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(-2, part1('<puzzle input: download from adventofcode.com>'));

    //console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
