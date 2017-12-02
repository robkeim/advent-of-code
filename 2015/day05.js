// https://adventofcode.com/2015/day/5

const Utils = require('./utils.js');

function part1(input) {
    let numNiceWords = input.split('\n').filter(value => {
        // Check the number of vowels
        const numVowels = value
            .split('')
            .filter(letter => letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u')
            .length;

        if (numVowels < 3) {
            return false;
        }

        // Check for a double letter
        let hasDoubleLetter = false;

        for (let i = 0; i < value.length - 1; i++) {
            if (value[i] === value[i + 1]) {
                hasDoubleLetter = true;
                break;
            }
        }

        if (!hasDoubleLetter) {
            return false;
        }

        // Check special strings
        if (value.includes('ab') || value.includes('cd') || value.includes('pq') || value.includes('xy')) {
            return false;
        }

        return true;
    });

    return numNiceWords.length;
}

function runPart1() {
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
