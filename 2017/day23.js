// https://adventofcode.com/2017/day/23

const Utils = require('./utils.js');

function part1(input) {
    const letters = /[a-z]/;
    const regex = /(set|sub|mul|jnz) ([a-h]|-?\d+) ?([a-h]|-?\d+)?/;
    let instructions = input.split('\n');
    let registers = {};
    let index = 0;
    let totalMul = 0;
    registers['a'] = 1;

    while (index >= 0 && index < instructions.length) {
        let match = regex.exec(instructions[index]);

        if (!match) {
            throw Error('Invalid instruction: ' + instructions[index]);
        }

        let needToIncrement = true;

        switch (match[1]) {
            case 'set':
                if (match[3].match(letters)) {
                    registers[match[2]] = registers[match[3]] || 0;
                } else {
                    registers[match[2]] = parseInt(match[3]);
                }
                break;
            case 'sub':
                if (match[3].match(letters)) {
                    registers[match[2]] -= registers[match[3]] || 0;
                } else {
                    registers[match[2]] -= parseInt(match[3]);
                }
                break;
            case 'mul':
                totalMul++;
                if (match[3].match(letters)) {
                    registers[match[2]] *= registers[match[3]] || 0;
                } else {
                    registers[match[2]] *= parseInt(match[3]);
                }
                break;
            case 'jnz':
                let shouldJump = 0;
                if (match[2].match(letters)) {
                    shouldJump = registers[match[2]] || 0;
                } else {
                    shouldJump = parseInt(match[2]);
                }

                if (shouldJump !== 0) {
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

    return totalMul;
}

function runPart1() {
    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

// I needed assistance from the forums on this one. I incorrectly decoded the assembly
function runPart2() {
    let b = (99 * 100) + 100000;
    let c = b + 17000;
    let h = 0;

    for (let i = b; i <= c; i += 17) {
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                h++; // This value isn't prime so count it
                break;
            }
        }
    }

    console.log(h);
}

runPart1();
runPart2();
