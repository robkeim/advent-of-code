// https://adventofcode.com/2017/day/14

const Utils = require('./utils.js');

function part1(input) {
    let numUsedSquares = 0;

    for (let i = 0; i < 128; i++) {
        let hash = knotHash(input + '-' + i);

        let line = hash.split('').map(c => hexToBin(c)).join('');

        numUsedSquares += line.split('').filter(c => c === '1').length;
    }

    return numUsedSquares;
}

function hexToBin(input) {
    if (input.length !== 1) {
        throw Error('Invalid input: ' + input);
    }

    switch (input) {
        case '0':
            return '0000';
        case '1':
            return '0001';
        case '2':
            return '0010';
        case '3':
            return '0011';
        case '4':
            return '0100';
        case '5':
            return '0101';
        case '6':
            return '0110';
        case '7':
            return '0111';
        case '8':
            return '1000';
        case '9':
            return '1001';
        case 'a':
            return '1010';
        case 'b':
            return '1011';
        case 'c':
            return '1100';
        case 'd':
            return '1101';
        case 'e':
            return '1110';
        case 'f':
            return '1111';
        default:
            throw Error('Invalid input: ' + input);
    }
}

function knotHash(input) {
    let list = [];

    for (let i = 0; i < 256; i++) {
        list.push(i);
    }

    let lengths = input
        .split('')
        .map(c => c.charCodeAt(0))
        .concat([17, 31, 73, 47, 23]);

    let curPos = 0;
    let skipSize = 0;

    for (let i = 0; i < 64; i++) {
        let result = applyOneRound(list, lengths, curPos, skipSize);
        list = result.list;
        curPos = result.curPos;
        skipSize = result.skipSize;
    }

    let blocksToHash = [];

    for (let i = 0; i < 256; i += 16) {
        blocksToHash.push(list.slice(i, i + 16));
    }

    let hashes = blocksToHash.map(block => {
        return block.reduce((acc, cur) => acc ^ cur);
    });

    let hexHashes = hashes.map(hash => {
        // Ensure that each hex has a leading 0 if needed
        return ('0' + hash.toString(16)).slice(-2);
    });

    return hexHashes.join('');
}

function applyOneRound(list, lengths, curPos, skipSize) {
    for (let i = 0; i < lengths.length; i++) {
        let curLength = lengths[i];
        list = reverse(list, curPos, curLength);

        curPos += curLength + skipSize;
        skipSize++;

        curPos %= list.length;
    }

    return {
        list: list,
        curPos: curPos,
        skipSize: skipSize,
    };
}

function reverse(arr, start, length) {
    if (start < 0 || length < 0 || length > arr.length) {
        throw Error('Invalid request for array');
    }

    let reversedArr = [];

    for (let i = 0; i < length; i++) {
        reversedArr.push(arr[(start + i) % arr.length]);
    }

    reversedArr.reverse();

    for (let i = 0; i < length; i++) {
        arr[(start + i) % arr.length] = reversedArr[i];
    }

    return arr;
}

function runPart1() {
    Utils.assertAreEqual(8108, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
