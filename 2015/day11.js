// https://adventofcode.com/2015/day/11

const Utils = require('./utils.js');

function isPasswordValid(input) {
    if (input === 'ghjaabcc') {
        input = input;
    }
    // Test for forbidden letters
    if (input.indexOf('i') > -1 || input.indexOf('o') > -1 || input.indexOf('l') > -1) {
        return false;
    }

    // Test for three consecutive letters
    let hasConsecutiveLetters = false;

    for (let i = 0; i < input.length - 2; i++) {
        if ((input.charCodeAt(i + 1) - input.charCodeAt(i) === 1)
            && (input.charCodeAt(i + 2) - input.charCodeAt(i + 1) === 1)) {
            hasConsecutiveLetters = true;
            break;
        }
    }

    if (!hasConsecutiveLetters) {
        return false;
    }

    // Test for two pairs
    let numPairs = 0;

    for (let i = 0; i < input.length - 1; i++)
    {
        if (input[i] === input[i + 1]) {
            numPairs++;

            if (numPairs >= 2) {
                break;
            }

            // Ensure we don't count xxx as two pairs
            i++;
        }
    }

    if (numPairs < 2) {
        return false;
    }

    return true;
}

function incrementPassword(input) {
    let result = (parseInt(input, 36) + 1).toString(36).replace(/0/g, 'a');
    return result;
}

function part1(input) {
    let result = incrementPassword(input);
    let numProcessed = 0;

    while (!isPasswordValid(result)) {
        result = incrementPassword(result);
    }

    return result;
}

function runPart1() {
    Utils.assertAreEqual('abcdffaa', part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual('ghjaabcc', part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function runPart2() {
    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
