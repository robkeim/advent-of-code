// https://adventofcode.com/2015/day/13

const Utils = require('./utils.js');

function part1(input) {
    return calculate(input, false);
}

function part2(input) {
    return calculate(input, true);
}

function calculate(input, includeSelf) {
    const regex = /([a-zA-Z]+) would (gain|lose) (\d+) happiness units by sitting next to ([a-zA-Z]+)./;

    let lines = input.split('\n');
    let weights = {};
    let people = new Set();

    for (let i = 0; i < lines.length; i++) {
        let match = regex.exec(lines[i]);

        if (!match) {
            throw Error('Invalid line format: ' + lines[i]);
        }

        let weight = parseInt(match[3]);

        if (match[2] === 'lose') {
            weight *= -1;
        }

        people.add(match[1]);
        people.add(match[4]);
        weights[match[1] + '_' + match[4]] = weight;
    }

    if (includeSelf) {
        people.add('Me');
    }

    let permutations = calcPermutations(Array.from(people.keys()));
    let maxHappiness = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < permutations.length; i++) {
        let happiness = 0;
        let permutation = permutations[i];

        for (let j = 0; j < permutation.length; j++) {
            let curPerson = permutation[j];
            let leftSide = permutation[(j - 1 + permutation.length) % permutation.length];
            let rightSide = permutation[(j + 1) % permutation.length];

            happiness += weights[curPerson + '_' + leftSide] || 0;
            happiness += weights[curPerson + '_' + rightSide] || 0;
        }

        if (happiness > maxHappiness) {
            maxHappiness = happiness;
        }
    }

    return maxHappiness;
}

function calcPermutations(arr) {
    let result = [];
    for(let i = 0; i < arr.length; i++) {
        let rest = calcPermutations(arr.slice(0, i).concat(arr.slice(i + 1)));

        if (rest.length === 0) {
            result.push([arr[i]]);
        } else {
            for (let j = 0; j < rest.length; j++) {
                result.push([arr[i]].concat(rest[j]));
            }
        }
    }

    return result;
}

function runPart1() {
    Utils.assertAreEqual(330, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function runPart2() {
    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
