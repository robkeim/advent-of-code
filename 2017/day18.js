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

    get executeOneCycle() {
        if (this.index < 0 || this.index >= this.instructions.length) {
            return false;
        }

        let match = this.regex.exec(this.instructions[this.index]);

        if (!match) {
            throw Error('Invalid instruction: ' + this.instructions[this.index]);
        }

        let needToIncrement = true;

        switch (match[1]) {
            case 'snd':
                this.numSends++;
                let valueToSend;
                if (match[2].match(this.letters)) {
                    valueToSend = this.registers[match[2]] || 0;
                } else {
                    valueToSend = parseInt(match[2]);
                }
                this.sendFn(valueToSend);
                break;
            case 'set':
                if (match[3].match(this.letters)) {
                    this.registers[match[2]] = this.registers[match[3]] || 0;
                } else {
                    this.registers[match[2]] = parseInt(match[3]);
                }
                break;
            case 'add':
                if (match[3].match(this.letters)) {
                    this.registers[match[2]] += this.registers[match[3]] || 0;
                } else {
                    this.registers[match[2]] += parseInt(match[3]);
                }
                break;
            case 'mul':
                if (match[3].match(this.letters)) {
                    this.registers[match[2]] *= this.registers[match[3]] || 0;
                } else {
                    this.registers[match[2]] *= parseInt(match[3]);
                }
                break;
            case 'mod':
                if (match[3].match(this.letters)) {
                    this.registers[match[2]] %= this.registers[match[3]] || 0;
                } else {
                    this.registers[match[2]] %= parseInt(match[3]);
                }
                break;
            case 'rcv':
                if (this.receiveQueue.length === 0) {
                    return false;
                }

                this.registers[match[2]] = this.receiveQueue.shift();
                break;
            case 'jgz':
                let shouldJump = 0;
                if (match[2].match(this.letters)) {
                    shouldJump = this.registers[match[2]] || 0;
                } else {
                    shouldJump = parseInt(match[2]);
                }

                if (shouldJump > 0) {
                    let offset = 0;
                    if (match[3].match(this.letters)) {
                        offset = this.registers[match[3]] || 0;
                    } else {
                        offset = parseInt(match[3]);
                    }

                    if (offset !== 0) {
                        needToIncrement = false;
                        this.index += offset;
                    }
                }
                break;
            default:
                throw Error('Unrecognized instruction: ' + match[1]);
        }

        if (needToIncrement) {
            this.index++;
        }

        return true;
    }
}

function part2(input) {
    let program1 = new Machine(input, 0);
    let program2 = new Machine(input, 1);
    program1.setSendFunction(program2.receiveValue);
    program2.setSendFunction(program1.receiveValue);

    let result = true;

    while (result) {
        result = program1.executeOneCycle || program2.executeOneCycle;
    }

    return program1.numSends;
}

function runPart2() {
    Utils.assertAreEqual(3, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
