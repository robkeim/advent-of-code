// https://adventofcode.com/2017/day/12

const Utils = require('./utils.js');

function part1(input) {
    const lineRegex = /(\d+) <-> ([0-9, ]+)/;

    let pipes = {};
    let lines = input.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let match = lineRegex.exec(line);

        if (!match) {
            throw Error('Invalid line format: ' + line);
        }

        let source = parseInt(match[1]);
        let destination = match[2]
            .split(', ')
            .filter(m => m.length > 0)
            .map(m => parseInt(m));

        pipes[source] = destination;
    }

    let connected = new Set();
    let toProcess = [];

    connected.add(0);
    toProcess.push(0);

    while (toProcess.length > 0) {
        let values = pipes[toProcess.pop()];

        for (let i = 0; i < values.length; i++) {
            let value = values[i];

            if (!connected.has(value)) {
                connected.add(value);
                toProcess.push(value);
            }
        }
    }

    return connected.size;
}

function runPart1() {
    Utils.assertAreEqual(6, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    const lineRegex = /(\d+) <-> ([0-9, ]+)/;

    let pipes = {};
    let lines = input.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let match = lineRegex.exec(line);

        if (!match) {
            throw Error('Invalid line format: ' + line);
        }

        let source = parseInt(match[1]);
        let destination = match[2]
            .split(', ')
            .filter(m => m.length > 0)
            .map(m => parseInt(m));

        pipes[source] = destination;
    }

    let numGroups = 0;

    while (true) {
        let next = null;

        for (let pipe in pipes) {
            next = parseInt(pipe);
            break;
        }

        if (next === null) {
            break;
        }

        numGroups++;
        let connected = new Set();
        let toProcess = [];

        connected.add(next);
        toProcess.push(next);

        while (toProcess.length > 0) {
            let processing = toProcess.pop();
            let values = pipes[processing];
            delete pipes[processing];

            for (let i = 0; i < values.length; i++) {
                let value = values[i];

                if (!connected.has(value)) {
                    connected.add(value);
                    toProcess.push(value);
                }
            }
        }
    }
    return numGroups;
}

function runPart2() {
    Utils.assertAreEqual(2, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
