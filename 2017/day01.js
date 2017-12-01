function assertAreEqual(expected, actual) {
    if (expected === actual) {
        console.log('OK ' + expected);
    } else {
        console.log('Expected = ' + expected);
        console.log('Actual   = ' + actual);
        throw Error('Unexpected results');
    }
}

function part1(input) {
    input = input + input[0];

    let total = 0;

    for (let i = 0; i < input.length - 1; i++) {
        if (input[i] === input[i + 1]) {
            total += parseInt(input[i]);
        }
    }

    return total;
}

function runPart1() {
    assertAreEqual(3, part1('<puzzle input: download from adventofcode.com>'));
    assertAreEqual(4, part1('<puzzle input: download from adventofcode.com>'));
    assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));
    assertAreEqual(9, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

runPart1();
