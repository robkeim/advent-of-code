// https://adventofcode.com/2017/day/8

const Utils = require('./utils.js');

function part1(input) {
    const registers = {};
    const instructionRegex = /([a-z]+) (inc|dec) (-?\d+) if ([a-z]+) ([!=<>]=?) (-?\d+)/;

    input.split('\n').forEach(line => {
        let match = instructionRegex.exec(line);

        if (!match) {
            throw Error('Invalid line format: ' + line);
        }

        let targetRegister = match[1];
        let targetRegisterValue = registers[targetRegister] || 0;
        let instruction = match[2];
        let changeValue = parseInt(match[3]);
        let conditionalRegister = match[4];
        let conditionalRegisterValue = registers[conditionalRegister] || 0;
        let conditionalOperation = match[5];
        let conditionalValue = parseInt(match[6]);

        let conditionIsTrue = false;

        switch (conditionalOperation) {
            case '<':
                conditionIsTrue = conditionalRegisterValue < conditionalValue;
                break;
            case '<=':
                conditionIsTrue = conditionalRegisterValue <= conditionalValue;
                break;
            case '>':
                conditionIsTrue = conditionalRegisterValue > conditionalValue;
                break;
            case '>=':
                conditionIsTrue = conditionalRegisterValue >= conditionalValue;
                break;
            case '==':
                conditionIsTrue = conditionalRegisterValue === conditionalValue;
                break;
            case '!=':
                conditionIsTrue = conditionalRegisterValue !== conditionalValue;
                break;
            default:
                throw Error('Unsupported operation: ' + conditionalOperation);
        }

        if (conditionIsTrue) {
            switch (instruction) {
                case 'inc':
                    registers[targetRegister] = targetRegisterValue + changeValue;
                    break;
                case 'dec':
                    registers[targetRegister] = targetRegisterValue - changeValue;
                    break;
                default:
                    throw Error('Invalid instruction: ' + instruction);
            }
        }
    });

    let maxValue = -1;

    for (let i in registers) {
        if (registers[i] > maxValue) {
            maxValue = registers[i];
        }
    }

    return maxValue;
}

function runPart1() {
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    const registers = {};
    const instructionRegex = /([a-z]+) (inc|dec) (-?\d+) if ([a-z]+) ([!=<>]=?) (-?\d+)/;
    let maxValue = -1;

    input.split('\n').forEach(line => {
        let match = instructionRegex.exec(line);

        if (!match) {
            throw Error('Invalid line format: ' + line);
        }

        let targetRegister = match[1];
        let targetRegisterValue = registers[targetRegister] || 0;
        let instruction = match[2];
        let changeValue = parseInt(match[3]);
        let conditionalRegister = match[4];
        let conditionalRegisterValue = registers[conditionalRegister] || 0;
        let conditionalOperation = match[5];
        let conditionalValue = parseInt(match[6]);

        let conditionIsTrue = false;
        let newValue = 0;

        switch (conditionalOperation) {
            case '<':
                conditionIsTrue = conditionalRegisterValue < conditionalValue;
                break;
            case '<=':
                conditionIsTrue = conditionalRegisterValue <= conditionalValue;
                break;
            case '>':
                conditionIsTrue = conditionalRegisterValue > conditionalValue;
                break;
            case '>=':
                conditionIsTrue = conditionalRegisterValue >= conditionalValue;
                break;
            case '==':
                conditionIsTrue = conditionalRegisterValue === conditionalValue;
                break;
            case '!=':
                conditionIsTrue = conditionalRegisterValue !== conditionalValue;
                break;
            default:
                throw Error('Unsupported operation: ' + conditionalOperation);
        }

        if (conditionIsTrue) {
            switch (instruction) {
                case 'inc':
                    newValue = targetRegisterValue + changeValue;

                    if (newValue > maxValue) {
                        maxValue = newValue;
                    }

                    registers[targetRegister] = newValue;
                    break;
                case 'dec':
                    newValue = targetRegisterValue - changeValue;

                    if (newValue > maxValue) {
                        maxValue = newValue;
                    }

                    registers[targetRegister] = newValue;
                    break;
                default:
                    throw Error('Invalid instruction: ' + instruction);
            }
        }
    });

    return maxValue;
}

function runPart2() {
    Utils.assertAreEqual(10, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
