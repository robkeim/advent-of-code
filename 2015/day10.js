// https://adventofcode.com/2015/day/10

const Utils = require('./utils.js');

function encodeSequence(input) {
    let result = '';

    let prevChar = input[0];
    let total = 0;
    let index = 0;

    while (index < input.length) {
        if (input[index] === prevChar) {
            total++;
        } else {
            result += total + prevChar;
            total = 1;
            prevChar = input[index];
        }

        index++;
    }

    result += total + prevChar;

    return result;
}

function part1(input) {
    let result = input;
    for (let i = 0; i < 40; i++) {
        result = encodeSequence(result);
    }

    return result.length;
}

function runPart1() {
    Utils.assertAreEqual('11', encodeSequence('1'));
    Utils.assertAreEqual('21', encodeSequence('11'));
    Utils.assertAreEqual('1211', encodeSequence('21'));
    Utils.assertAreEqual('111221', encodeSequence('1211'));
    Utils.assertAreEqual('312211', encodeSequence('111221'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
