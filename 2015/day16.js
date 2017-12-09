// https://adventofcode.com/2015/day/16

const Utils = require('./utils.js');

function part1(input) {
    let solution = -1;

    let qualities = [
        'children: 3',
        'cats: 7',
        'samoyeds: 2',
        'pomeranians: 3',
        'akitas: 0',
        'vizslas: 0',
        'goldfish: 5',
        'trees: 3',
        'cars: 2',
        'perfumes: 1',
    ];

    input.split('\n').forEach(line => {
        line += ',';
        let isSolution = true;

        for (let i in qualities) {
            let trimmedQuality = qualities[i].split(':')[0];

            if (line.includes(trimmedQuality) && !line.includes(qualities[i] + ',')) {
                isSolution = false;
                break;
            }
        }

        if (isSolution) {
            solution = line.split(':')[0].substring(4);
        }
    });

    return solution;
}

function runPart1() {
    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    let solution = -1;

    let qualities = [
        'children: 3',
        'samoyeds: 2',
        'akitas: 0',
        'vizslas: 0',
        'cars: 2',
        'perfumes: 1',
    ];

    input.split('\n').forEach(line => {
        line += ',';
        let isSolution = true;

        for (let i in qualities) {
            let trimmedQuality = qualities[i].split(':')[0];

            if (line.includes(trimmedQuality) && !line.includes(qualities[i] + ',')) {
                isSolution = false;
                break;
            }
        }

        let match = undefined;
        if (match = /cats: (\d+),/.exec(line)) {
            if (parseInt(match[1]) <= 7) {
                isSolution = false;
            }
        }

        if (match = /trees: (\d+),/.exec(line)) {
            if (parseInt(match[1]) <= 3) {
                isSolution = false;
            }
        }

        if (match = /pomeranians: (\d+),/.exec(line)) {
            if (parseInt(match[1]) >= 3) {
                isSolution = false;
            }
        }

        if (match = /goldfish: (\d+),/.exec(line)) {
            if (parseInt(match[1]) >= 5) {
                isSolution = false;
            }
        }

        if (isSolution) {
            solution = line.split(':')[0].substring(4);
        }
    });

    return solution;
}

function runPart2() {
    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
