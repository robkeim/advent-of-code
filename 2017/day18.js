// https://adventofcode.com/2017/day/18

const Utils = require('./utils.js');

function part1(input) {
    const letters = /[a-z]/;
    const regex = /(snd|set|add|mul|mod|rcv|jgz) ([a-z]|-?\d+) ?([a-z]|-?\d+)?/;
    let instructions = input.split('\n');
    let registers = {};
    let index = 0;
    let lastSound = undefined;

    while (index >= 0 && index < instructions.length) {
        let match = regex.exec(instructions[index]);

        if (!match) {
            throw Error('Invalid instruction: ' + instructions[index]);
        }

        let needToIncrement = true;

        switch (match[1]) {
            case 'snd':
                if (match[2].match(letters)) {
                    lastSound = registers[match[2]] || 0;
                } else {
                    lastSound = parseInt(match[2]);
                }
                break;
            case 'set':
                if (match[3].match(letters)) {
                    registers[match[2]] = registers[match[3]] || 0;
                } else {
                    registers[match[2]] = parseInt(match[3]);
                }
                break;
            case 'add':
                if (match[3].match(letters)) {
                    registers[match[2]] += registers[match[3]] || 0;
                } else {
                    registers[match[2]] += parseInt(match[3]);
                }
                break;
            case 'mul':
                if (match[3].match(letters)) {
                    registers[match[2]] *= registers[match[3]] || 0;
                } else {
                    registers[match[2]] *= parseInt(match[3]);
                }
                break;
            case 'mod':
                if (match[3].match(letters)) {
                    registers[match[2]] %= registers[match[3]] || 0;
                } else {
                    registers[match[2]] %= parseInt(match[3]);
                }
                break;
            case 'rcv':
                let value = 0;
                if (match[2].match(letters)) {
                    value = registers[match[2]] || 0;
                } else {
                    value = parseInt(match[2]);
                }

                if (value !== 0) {
                    return lastSound;
                }
                break;
            case 'jgz':
                let shouldJump = 0;
                if (match[2].match(letters)) {
                    shouldJump = registers[match[2]] || 0;
                } else {
                    shouldJump = parseInt(match[2]);
                }

                if (shouldJump > 0) {
                    let offset = 0;
                    if (match[3].match(letters)) {
                        offset = registers[match[3]] || 0;
                    } else {
                        offset = parseInt(match[3]);
                    }

                    if (offset !== 0) {
                        needToIncrement = false;
                        index += offset;
                    }
                }
                break;
            default:
                throw Error('Unrecognized instruction: ' + match[1]);
        }

        if (needToIncrement) {
            index++;
        }
    }

    throw Error('No solution found');
}

function runPart1() {
    Utils.assertAreEqual(4, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
