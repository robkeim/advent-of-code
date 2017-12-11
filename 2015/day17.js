// https://adventofcode.com/2015/day/17

const Utils = require('./utils.js');

function part1(numLiters, input) {
    const jars = input.split('\n').map(v => parseInt(v));

    let combinations = getCombinations(jars.length);
    let result = 0;

    for (let i = 0; i < combinations.length; i++) {
        let total = 0;

        for (let j = 0; j < jars.length; j++) {
            if (combinations[i][j]) {
                total += jars[j];
            }
        }

        if (total === numLiters) {
            result++;
        }
    }

    return result;
}

function getCombinations(numDigits) {
    let combinations = [];
    for(let i = 0; i < (1 << numDigits); i++) {
        let combination = [];
        for(let j = 0; j < numDigits; j++) {
            combination.push(i & (1 << j) ? 1 : 0);
        }
        combinations.push(combination);
    }
    return combinations;
}

function runPart1() {
    Utils.assertAreEqual(4, part1(25, '<puzzle input: download from adventofcode.com>'));

    console.log(part1(150, '<puzzle input: download from adventofcode.com>'));
}

function part2(numLiters, input) {
    const jars = input.split('\n').map(v => parseInt(v));

    let combinations = getCombinations(jars.length);
    let result = 0;
    let minNumJars = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < combinations.length; i++) {
        let total = 0;

        for (let j = 0; j < jars.length; j++) {
            if (combinations[i][j]) {
                total += jars[j];
            }
        }

        if (total === numLiters) {
            let numJars = combinations[i].filter(v => v === 1).length;

            if (numJars < minNumJars) {
                minNumJars = numJars;
                result = 1;
            } else if (numJars === minNumJars) {
                result++;
            }
        }
    }

    return result;
}

function runPart2() {
    Utils.assertAreEqual(3, part2(25, '<puzzle input: download from adventofcode.com>'));

    console.log(part2(150, '<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
