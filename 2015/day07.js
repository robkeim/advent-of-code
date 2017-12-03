// https://adventofcode.com/2015/day/7

const Utils = require('./utils.js');

function part1(input) {
    let knownValues = {};
    let instructions = [];

    let assignRegex = /^(\S+) -> ([a-z]+)$/;
    let notRegex = /^NOT (\S+) -> ([a-z]+)$/;
    let twoOperandRegex = /^(\S)+ (AND) (\S+) -> ([a-z]+)$/;

    input.split('\n').filter(line => line).forEach(line => {
        instructions.push(line);
    });

    let index = -1;
    while (true) {
        if (knownValues['a'] !== undefined) {
            return knownValues['a'];
        }

        index++;
        index %= instructions.length;

        // Handle assign operator
        let match = assignRegex.exec(instructions[index]);

        if (match) {
            let value = parseInt(match[1]) || knownValues[match[1]];

            if (value) {
                knownValues[match[2]] = value;
                instructions.splice(index, 1);
            }

            continue;
        }

        // Handle NOT operator
        match = notRegex.exec(instructions[index]);

        if (match) {
            let value = parseInt(match[1]) || knownValues[match[1]];

            if (value) {
                knownValues[match[2]] = ~value;
                instructions.splice(index, 1);
            }

            continue;
        }

        // Handle operators with two operands
        match = twoOperandRegex.exec(instructions[index]);

        if (match) {
            let valOp1 = parseInt(match[1]) || knownValues[match[1]];
            let valOp2 = parseInt(match[3]) || knownValues[match[3]];

            switch (match[2]) {
                case 'AND':
                    if (valOp1 && valOp2) {
                        knownValues[match[4]] = valOp1 & valOp2;
                    }
                    break;
                default:
                    throw Error('Unsupported two operand argument');
            }
            continue;
        }

        throw Error('Invalid line');
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

    // Test AND operator
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));

    //console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
