// https://adventofcode.com/2015/day/14

const Utils = require('./utils.js');

function part1(totalTime, input) {
    const lineRegex = /[^ ]+ can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./;
    let maxDistance = -1;

    input.split('\n').forEach(line => {
       let match = lineRegex.exec(line);

       if (!match) {
           throw Error('Invalid line format: ' + line);
       }

       let speed = parseInt(match[1]);
       let flyingDuration = parseInt(match[2]);
       let restingDuration = parseInt(match[3]);

       let timePerCycle = flyingDuration + restingDuration;
       let distance = Math.floor(totalTime / timePerCycle) * (speed * flyingDuration);

       let remainingTime = Math.min(totalTime % timePerCycle, flyingDuration);
       distance += remainingTime * speed;

       if (distance > maxDistance) {
           maxDistance = distance;
       }
    });

    return maxDistance;
}

function runPart1() {
    Utils.assertAreEqual(1120, part1(1000, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(10, part1(1, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(20, part1(2, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(20, part1(3, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(20, part1(4, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(20, part1(5, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(30, part1(6, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(40, part1(7, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(40, part1(8, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(40, part1(9, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(40, part1(10, '<puzzle input: download from adventofcode.com>'));
    Utils.assertAreEqual(50, part1(11, '<puzzle input: download from adventofcode.com>'));

    console.log(part1(2503, '<puzzle input: download from adventofcode.com>'));
}

runPart1();
