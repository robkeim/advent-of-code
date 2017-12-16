// https://adventofcode.com/2017/day/16

const Utils = require('./utils.js');

function part1(list, input) {
    const regex = /([sxp])(\d+|[a-z])\/?(\d+|[a-z])?/;
    list = list.split('');

    let instructions = input.split(',');

    for (let i = 0; i < instructions.length; i++) {
        let match = regex.exec(instructions[i]);

        if (!match) {
            throw Error('Invalid instruction format: ' + instructions[i]);
        }

        switch (match[1]) {
            case 's':
                let itemsToInsert = list.splice(list.length - parseInt(match[2]));
                list.splice(0, 0, ...itemsToInsert);
                break;
            case 'x':
                let p1 = parseInt(match[2]);
                let p2 = parseInt(match[3]);
                let tmp = list[p2];
                list[p2] = list[p1];
                list[p1] = tmp;
                break;
            case 'p':
                let index1 = list.indexOf(match[2]);
                let index2 = list.indexOf(match[3]);
                list[index2] = match[2];
                list[index1] = match[3];
                break;
            default:
                throw Error('Invalid instruction');
        }
    }

    return list.join('');
}

function runPart1() {
    Utils.assertAreEqual('baedc', part1('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));
}

runPart1();
