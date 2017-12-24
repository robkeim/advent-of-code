// https://adventofcode.com/2017/day/24

const Utils = require('./utils.js');

function part1(input) {
    let regex = /(\d+)\/(\d+)/;

    let components = input.split('\n').map(line =>
    {
       let match = regex.exec(line);

       if (!match) {
           throw Error('Invalid line format: ' + line);
       }

       return [parseInt(match[1]), parseInt(match[2])];
    });

    return buildBridge(components, []);
}

function buildBridge(components, soFar) {
    let maxScore = calcBridgeValue(soFar);
    let lastValue = soFar.length === 0 ? 0 : soFar[soFar.length - 1][1];

    for (let i = 0; i < components.length; i++) {
        let remainingComponents, newChain, newValue;

        if (components[i][0] === lastValue) {
            remainingComponents = components.slice(0);
            remainingComponents.splice(i, 1);
            newChain = soFar.slice(0);
            newChain.push(components[i]);
            newValue = buildBridge(remainingComponents, newChain);

            if (newValue > maxScore) {
                maxScore = newValue;
            }
        }

        if (components[i][1] === lastValue) {
            remainingComponents = components.slice(0);
            remainingComponents.splice(i, 1);
            newChain = soFar.slice(0);
            newChain.push(components[i].reverse());
            newValue = buildBridge(remainingComponents, newChain);

            if (newValue > maxScore) {
                maxScore = newValue;
            }
        }
    }

    return maxScore;
}

function calcBridgeValue(bridge) {
    let value = 0;

    for (let i = 0; i < bridge.length; i++) {
        value += (bridge[i][0] + bridge[i][1]);
    }

    return value;
}

function runPart1() {
    Utils.assertAreEqual(31, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    let regex = /(\d+)\/(\d+)/;

    let components = input.split('\n').map(line =>
    {
        let match = regex.exec(line);

        if (!match) {
            throw Error('Invalid line format: ' + line);
        }

        return [parseInt(match[1]), parseInt(match[2])];
    });

    return buildBridge2(components, [])[1];
}

function buildBridge2(components, soFar) {
    let maxScore = calcBridgeValue2(soFar);
    let lastValue = soFar.length === 0 ? 0 : soFar[soFar.length - 1][1];

    for (let i = 0; i < components.length; i++) {
        let remainingComponents, newChain, newValue;

        if (components[i][0] === lastValue) {
            remainingComponents = components.slice(0);
            remainingComponents.splice(i, 1);
            newChain = soFar.slice(0);
            newChain.push(components[i]);
            newValue = buildBridge2(remainingComponents, newChain);

            if (newValue[0] > maxScore[0] || (newValue[0] === maxScore[0] && newValue[1] > maxScore[1])) {
                maxScore = newValue;
            }
        }

        if (components[i][1] === lastValue) {
            remainingComponents = components.slice(0);
            remainingComponents.splice(i, 1);
            newChain = soFar.slice(0);
            newChain.push(components[i].reverse());
            newValue = buildBridge2(remainingComponents, newChain);

            if (newValue[0] > maxScore[0] || (newValue[0] === maxScore[0] && newValue[1] > maxScore[1])) {
                maxScore = newValue;
            }
        }
    }

    return maxScore;
}

function calcBridgeValue2(bridge) {
    let value = 0;

    for (let i = 0; i < bridge.length; i++) {
        value += (bridge[i][0] + bridge[i][1]);
    }

    return [bridge.length, value];
}

function runPart2() {
    Utils.assertAreEqual(19, part2('<puzzle input: download from adventofcode.com>'));

    console.log(part2('<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
