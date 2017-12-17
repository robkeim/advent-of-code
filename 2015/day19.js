// https://adventofcode.com/2015/day/19

const Utils = require('./utils.js');

function part1(molecule, input) {
    let regex = /([a-zA-Z]+) => ([a-zA-Z]+)/;
    let replacments = [];
    let lines = input.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let match = regex.exec(lines[i]);

        if (!match) {
            throw Error('Invalid line format: ' + lines[i]);
        }

        replacments.push([match[1], match[2]]);
    }

    let results = new Set();

    for (let i = 0; i < replacments.length; i++) {
        let toFind = replacments[i][0];
        let toReplace = replacments[i][1];
        let indicies = getIndiciesOf(toFind, molecule);

        for (let j = 0; j < indicies.length; j++) {
            let result = molecule.repeat(1).split('');
            result.splice(indicies[j], toFind.length, ...toReplace);
            results.add(result.join(''));
        }

    }

    return results.size;
}

function getIndiciesOf(pattern, string) {
    let results = [];

    let i = string.indexOf(pattern, 0);
    while (i !== -1) {
        results.push(i);
        i = string.indexOf(pattern, i + 1);
    }

    return results;
}

function runPart1() {
    Utils.assertAreEqual(4, part1('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));
}

runPart1();
