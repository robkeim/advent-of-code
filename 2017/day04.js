// https://adventofcode.com/2017/day/4

const Utils = require('./utils.js');

function part1(input) {
    const validPassphrases = input.split('\n').filter(line => {
       if (!line) {
           return false;
       }

       const words = line.split(' ').filter(w => w);
       let uniqueWords = new Set();

       words.forEach(word => uniqueWords.add(word));

       return words.length === uniqueWords.size;
    });

    return validPassphrases.length;
}

function runPart1() {
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    const validPassphrases = input.split('\n').filter(line => {
        if (!line) {
            return false;
        }

        const words = line.split(' ').filter(w => w);
        let uniqueWords = new Set();

        words.forEach(word => {
            uniqueWords.add(word.split('').sort().join(''));
        });

        return words.length === uniqueWords.size;
    });

    return validPassphrases.length;
}

function runPart2() {
    Utils.assertAreEqual(1, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(1, part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(0, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
