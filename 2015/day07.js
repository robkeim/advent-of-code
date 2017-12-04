// https://adventofcode.com/2015/day/7

const Utils = require('./utils.js');

function part1(input) {
    let knownValues = {};
    let instructions = [];

    let assignRegex = /^(\S+) -> ([a-z]+)$/;
    let notRegex = /^NOT (\S+) -> ([a-z]+)$/;
    let twoOperandRegex = /^(\S)+ (AND|OR|LSHIFT|RSHIFT) (\S+) -> ([a-z]+)$/;

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

            if (value !== undefined) {
                knownValues[match[2]] = value;
                instructions.splice(index, 1);
            }

            continue;
        }

        // Handle NOT operator
        match = notRegex.exec(instructions[index]);

        if (match) {
            let value = parseInt(match[1]) || knownValues[match[1]];

            if (value !== undefined) {
                // This simulates the bitwise NOT since JavaScript doesn't have an unsigned bitwise NOT
                knownValues[match[2]] = 65535 - value;
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
                    if (valOp1 !== undefined && valOp2 !== undefined) {
                        knownValues[match[4]] = valOp1 & valOp2;
                        instructions.splice(index, 1);
                    }
                    break;
                case 'OR':
                    if (valOp1 !== undefined && valOp2 !== undefined) {
                        knownValues[match[4]] = valOp1 | valOp2;
                        instructions.splice(index, 1);
                    }
                    break;
                case 'LSHIFT':
                    if (valOp1 !== undefined && valOp2 !== undefined) {
                        // This bit shifting isn't working since it's not respecting the 16 bit size limit
                        knownValues[match[4]] = (valOp1 << valOp2);
                        instructions.splice(index, 1);
                    }
                    break;
                case 'RSHIFT':
                    if (valOp1 !== undefined && valOp2 !== undefined) {
                        knownValues[match[4]] = valOp1 >>> valOp2;
                        instructions.splice(index, 1);
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
    Utils.assertAreEqual(65534, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(65534, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(65534, part1('<puzzle input: download from adventofcode.com>'));

    // Test AND operator
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));

    // Test OR operator
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));

    //part1('<puzzle input: download from adventofcode.com>');
    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
