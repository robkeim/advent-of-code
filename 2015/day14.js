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

function part2(totalTime, input) {
    const lineRegex = /([^ ]+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./;
    let raindeer = {};

    input.split('\n').forEach(line => {
        let match = lineRegex.exec(line);

        if (!match) {
            throw Error('Invalid line format: ' + line);
        }

        let name = match[1];
        let speed = parseInt(match[2]);
        let flyingDuration = parseInt(match[3]);
        let restingDuration = parseInt(match[4]);

        raindeer[name] = {
            speed: speed,
            flyingDuration: flyingDuration,
            restingDuration: restingDuration,
            points: 0,
        };
    });

    for (let i = 1; i <= totalTime; i++) {
        let maxDistance = -1;
        let winners = [];

        for (let name in raindeer) {
            let distance = calculateDistance(i, raindeer[name]);

            if (distance > maxDistance) {
                maxDistance = distance;
                winners = [name];
            } else if (distance === maxDistance) {
                winners.push(name);
            }
        }

        for (let i in winners) {
            raindeer[winners[i]].points++;
        }
    }

    let maxPoints = -1;

    for (let name in raindeer) {
        let points = raindeer[name].points;

        if (points > maxPoints) {
            maxPoints = points;
        }
    }

    return maxPoints;
}

function calculateDistance(time, raindeer) {
    let timePerCycle = raindeer.flyingDuration + raindeer.restingDuration;
    let distance = Math.floor(time / timePerCycle) * (raindeer.speed * raindeer.flyingDuration);

    let remainingTime = Math.min(time % timePerCycle, raindeer.flyingDuration);
    return distance + remainingTime * raindeer.speed;
}

function runPart2() {
    Utils.assertAreEqual(689, part2(1000, '<puzzle input: download from adventofcode.com>'));

    console.log(part2(2503, '<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
