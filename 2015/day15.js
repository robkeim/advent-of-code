// https://adventofcode.com/2015/day/15

const Utils = require('./utils.js');

function part1(input) {
    const regex = /[a-zA-Z]+: capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories -?\d+/;

    let ingredients = input.split('\n').map(line => {
        let match = regex.exec(line);

        if (!match) {
            throw Error('Invalid line format: ' + line);
        }

        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseInt(match[4])];
    });

    let possibilities = getPossibilities(ingredients.length, 100, []);

    let bestScore = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < possibilities.length; i++) {
        let capacity = 0;
        let durability = 0;
        let flavor = 0;
        let texture = 0;

        for (let j = 0; j < possibilities[i].length; j++) {
            capacity += ingredients[j][0] * possibilities[i][j];
            durability += ingredients[j][1] * possibilities[i][j];
            flavor += ingredients[j][2] * possibilities[i][j];
            texture += ingredients[j][3] * possibilities[i][j];
        }

        capacity = Math.max(0, capacity);
        durability = Math.max(0, durability);
        flavor = Math.max(0, flavor);
        texture = Math.max(0, texture);

        let score = capacity * durability * flavor * texture;

        if (score > bestScore) {
            bestScore = score;
        }
    }

    return bestScore;
}

function getPossibilities(ingredients, quantity, soFar) {
    if (ingredients === 1) {
        soFar.push(quantity);
        return [soFar];
    }

    let solutions = [];

    for (let i = 0; i <= quantity; i++) {
        let next = Array.from(soFar);
        next.push(i);
        solutions.push(...getPossibilities(ingredients - 1, quantity - i, next));
    }

    return solutions;
}

function runPart1() {
    Utils.assertAreEqual(62842880, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
