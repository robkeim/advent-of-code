// https://adventofcode.com/2017/day/10

const Utils = require('./utils.js');

function part1(listLength, input) {
    let lengths = input.split(',').map(v => parseInt(v));

    let list = [];

    for (let i = 0; i < listLength; i++) {
        list.push(i);
    }

    let curPos = 0;
    let skipSize = 0;

    for (let i = 0; i < lengths.length; i++) {
        let curLength = lengths[i];
        list = reverse(list, curPos, curLength);

        curPos += curLength + skipSize;
        skipSize++;

        curPos %= list.length;
    }

    return list[0] * list[1];
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
    /*console.log([1, 2, 3] + ' = ' + reverse([1, 2, 3], 0, 0));
    console.log([1, 2, 3] + ' = ' + reverse([1, 2, 3], 0, 1));
    console.log([2, 1, 3] + ' = ' + reverse([1, 2, 3], 0, 2));
    console.log([3, 2, 1] + ' = ' + reverse([1, 2, 3], 0, 3));
    console.log([1, 3, 2] + ' = ' + reverse([1, 2, 3], 1, 2));
    console.log([3, 2, 1] + ' = ' + reverse([1, 2, 3], 2, 2));
    console.log([1, 2, 3, 4, 5] + ' = ' + reverse([1, 2, 3, 4, 5], ));*/
    Utils.assertAreEqual(12, part1(5, '<puzzle input: download from adventofcode.com>'));

    console.log(part1(256, '<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
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

function runPart2() {
    Utils.assertAreEqual('a2582a3a0e66e6e86e3812dcb672a272', part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual('33efeb34ea91902bb2f59c9920caa6cd', part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual('3efbe78a8d82f29979031a4aa0b16a9d', part2('<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual('63960835bcdc130f0b66d7ff4f6a5a8e', part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
