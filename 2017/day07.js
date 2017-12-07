// https://adventofcode.com/2017/day/7

const Utils = require('./utils.js');

function part1(input) {
    const lines = input.split('\n').filter(line => line);

    const candidateRoots = new Set();
    const leaves = new Set();

    const regex = /([a-z]+) \(\d+\)(?: -> ([a-z, ]+))?/;

    lines.forEach(line => {
        let match = regex.exec(line);

        if (match[2]) {
            candidateRoots.add(match[1]);

            match[2].split(',').forEach(word => {
                leaves.add(word.trim());
            });
        } else {
            leaves.add(match[1]);
        }
    });

    let root = undefined;

    candidateRoots.forEach(item => {
        if (!leaves.has(item)) {
            root = item;
        }
    });

    if (!root) {
        throw Error('Invalid tree configuration');
    }

    return root;
}

function runPart1() {
    Utils.assertAreEqual('tknk', part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(root, input) {
    const lines = input.split('\n').filter(line => line);

    const weights = {};
    const childNodeMapping = {};

    const regex = /([a-z]+) \((\d+)\)(?: -> ([a-z, ]+))?/;

    lines.forEach(line => {
        let match = regex.exec(line);

        weights[match[1]] = parseInt(match[2]);

        if (match[3]) {
            let children = match[3].split(',').map(word => {
                return word.trim();
            });

            childNodeMapping[match[1]] = children;
        }
    });

    // I'm not proud of this exception driven design, but it's a programming contest
    // and this is the fastest idea that came to mind :)
    try {
        findMissingWeight(weights, childNodeMapping, root);
    } catch (e) {
        return parseInt(e.message);
    }

    throw Error('No imbalances found in tree');
}

function findMissingWeight(weights, mapping, curNode) {
    if (!mapping[curNode]) {
        return weights[curNode];
    }

    let children = mapping[curNode];
    let childWeights = children.map(c => findMissingWeight(weights, mapping, c));

    let distinctWeights = new Set(childWeights);

    if (distinctWeights.size !== 1) {
        debugger;
        let targetWeight = childWeights[0] === childWeights[1]
            ? childWeights[0]
            : childWeights[0] === childWeights[2]
                ? childWeights[0]
                : childWeights[1];

        let invalidIndex = 0;

        while (childWeights[invalidIndex] === targetWeight) {
            invalidIndex++;
        }

        let result = weights[children[invalidIndex]] - (childWeights[invalidIndex] - targetWeight);
        throw Error(result);
    }

    return weights[curNode] + childWeights.reduce(function(total, num) { return total + num}, 0);
}

function runPart2() {
    Utils.assertAreEqual(60, part2('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
