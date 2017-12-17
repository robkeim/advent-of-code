// https://adventofcode.com/2017/day/16

const Utils = require('./utils.js');

function part1(list, input) {
    list = list.split('');

    let instructions = parseInstructions(input.split(','));
    list = runOneRound(list, instructions);

    return list.join('');
}

function parseInstructions(instructions) {
    const regex = /([sxp])(\d+|[a-z])\/?(\d+|[a-z])?/;
    let result = [];

    for (let i = 0; i < instructions.length; i++) {
        let match = regex.exec(instructions[i]);

        if (!match) {
            throw Error('Invalid instruction format: ' + instructions[i]);
        }

        switch (match[1]) {
            case 's':
                result.push(['s', parseInt(match[2])]);
                break;
            case 'x':
                result.push(['x', parseInt(match[2]), parseInt(match[3])]);
                break;
            case 'p':
                result.push(['p', match[2], match[3]]);
                break;
            default:
                throw Error('Invalid instruction');
        }
    }

    return result;
}

function runOneRound(list, instructions) {
    for (let i = 0; i < instructions.length; i++) {
        switch (instructions[i][0]) {
            case 's':
                let itemsToInsert = list.splice(list.length - instructions[i][1]);
                list.splice(0, 0, ...itemsToInsert);
                break;
            case 'x':
                let p1 = instructions[i][1];
                let p2 = instructions[i][2];
                let tmp = list[p2];
                list[p2] = list[p1];
                list[p1] = tmp;
                break;
            case 'p':
                let index1 = list.indexOf(instructions[i][1]);
                let index2 = list.indexOf(instructions[i][2]);
                list[index2] = instructions[i][1];
                list[index1] = instructions[i][2];
                break;
            default:
                throw Error('Invalid instruction');
        }
    }

    return list;
}

function part2(list, input) {
    let originalList = list.split('');
    list = list.split('');
    let instructions = parseInstructions(input.split(','));
    let positions = {};

    let repeat = 0;
    let i = 0;
    while (true) {
        let key = list.join('');

        if (positions[key]) {
            repeat = i;
            break;
        } else {
            let result = runOneRound(list, instructions);
            positions[key] = result;
            list = result;
        }

        i++;
    }

    let remainder = 1000000000 % repeat;
    list = originalList;

    for (let i = 0; i < remainder; i++) {
        list = runOneRound(list, instructions);
    }

    return list.join('');
}

function runPart1() {
    Utils.assertAreEqual('baedc', part1('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));
}

function runPart2() {
    console.log(part2('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
