// https://adventofcode.com/2017/day/10

const Utils = require('./utils.js');

/*function part1(length, input) {
    let lengths = input.split(',').map(v => parseInt(v));

    let list = [];

    for (let i = 0; i < length; i++) {
        list.push(i);
    }

    // Always reset curPos to 0 for each iteration?
    let curPos = 0;
    let skipSize = 0;
    let startIndex = 0;

    for (let i = 0; i < lengths.length; i++) {
        let curLength = lengths[i];
        let splice = list.splice(0, curLength);

        for (let j = 0; j < splice.length; j++) {
            list.splice(0, 0, splice[j]);
        }

        console.log(list.join(' ') + ' -> index: ' + startIndex + ' value: ' + list[startIndex]);

        curPos += curLength + skipSize;
        skipSize++;

        curPos %= length;

        let newList = [];

        for (let j = 0; j < list.length; j++) {
            newList.push(list[(j + curPos) % list.length]);
        }

        list = newList;
        startIndex = (startIndex + list.length - curPos - 1) % list.length;
        curPos = 0;
    }

    return list[startIndex - 1] * list[startIndex];
    //return list[startIndex] * list[(startIndex + 1) % list.length];
}*/

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
}

function runPart2() {
    //Utils.assertAreEqual(6, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
