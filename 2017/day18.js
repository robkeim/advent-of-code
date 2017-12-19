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

class Machine {
    constructor(input, num) {
        this.letters = /[a-z]/;
        this.regex = /(snd|set|add|mul|mod|rcv|jgz) ([a-z]|-?\d+) ?([a-z]|-?\d+)?/;
        this.instructions = input.split('\n');
        this.registers = {};
        this.registers['p'] = num;
        this.index = 0;
        this.receiveQueue = [];
        this.numSends = 0;
    }

    setSendFunction(fn) {
        this.sendFn = fn;
    }

    receiveValue(value) {
        this.receiveQueue.push(value);
    }

    get totalSends() {
        return this.numSends;
    }

    getValue(input) {
        return input.match(this.letters)
            ? this.registers[input] || 0
            : parseInt(input);
    }

    get executeOneCycle() {
        if (this.index < 0 || this.index >= this.instructions.length) {
            return false;
        }

        let match = this.regex.exec(this.instructions[this.index]);

        if (!match) {
            throw Error('Invalid instruction: ' + this.instructions[this.index]);
        }

        switch (match[1]) {
            case 'snd':
                this.numSends++;
                this.sendFn(this.getValue(match[2]));
                break;
            case 'set':
                this.registers[match[2]] = this.getValue(match[3]);
                break;
            case 'add':
                this.registers[match[2]] += this.getValue(match[3]);
                break;
            case 'mul':
                this.registers[match[2]] *= this.getValue(match[3]);
                break;
            case 'mod':
                this.registers[match[2]] %= this.getValue(match[3]);
                break;
            case 'rcv':
                if (this.receiveQueue.length === 0) {
                    return false;
                }

                this.registers[match[2]] = this.receiveQueue.shift();
                break;
            case 'jgz':
                let shouldJump = this.getValue(match[2]);

                if (shouldJump > 0) {
                    let offset = this.getValue(match[3]);

                    if (offset !== 0) {
                        // Remove one from the offset because there is an increment below
                        this.index += (offset - 1);
                    }
                }
                break;
            default:
                throw Error('Unrecognized instruction: ' + match[1]);
        }

        this.index++;

        return true;
    }
}

function part2(input) {
    let program0 = new Machine(input, 0);
    let program1 = new Machine(input, 1);
    program0.setSendFunction(program1.receiveValue);
    program1.setSendFunction(program0.receiveValue);

    let p0Result = true;
    let p1Result = true;

    while (p0Result || p1Result) {
        p0Result = program0.executeOneCycle;
        p1Result = program1.executeOneCycle;
    }

    return program0.numSends;
}

function runPart2() {
    Utils.assertAreEqual(3, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
