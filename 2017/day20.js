// https://adventofcode.com/2017/day/20

const Utils = require('./utils.js');

const pX = 0;
const pY = 1;
const pZ = 2;
const vX = 3;
const vY = 4;
const vZ = 5;
const aX = 6;
const aY = 7;
const aZ = 8;
const prevDist = 9;

function part1(input) {
    const regex = /p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>/;

    let points = input.split('\n').map(line => {
        let match = regex.exec(line);

        if (!match) {
            throw Error('Invalid line format: ' + line);
        }

        return [
            parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), // position
            parseInt(match[4]), parseInt(match[5]), parseInt(match[6]), // velocity
            parseInt(match[7]), parseInt(match[8]), parseInt(match[9]), // acceleration
            Number.MAX_SAFE_INTEGER
        ];
    });

    let valuesHaveStabilized = false;
    while (!valuesHaveStabilized || true) { // The stabilization logic isn't correct so I just ran for a while and look when the output stopped changing
        valuesHaveStabilized = true;

        //console.log('\nIteration:');
        for (let i = 0; i < points.length; i++) {
            let c = points[i];
            /*console.log(
                    'p=<' + c[pX] + ',' + c[pY] + ',' + c[pZ]
                + ', v=<' + c[vX] + ',' + c[vY] + ',' + c[vZ]
                + ', a=<' + c[aX] + ',' + c[aY] + ',' + c[aZ] + '>');*/

            // Update velocity
            points[i][vX] += points[i][aX];
            points[i][vY] += points[i][aY];
            points[i][vZ] += points[i][aZ];

            // Update position
            points[i][pX] += points[i][vX];
            points[i][pY] += points[i][vY];
            points[i][pZ] += points[i][vZ];

            // Recalculate distance
            let distance = Math.abs(points[i][pX]) + Math.abs(points[i][pY]) + Math.abs(points[i][pZ]);

            let xIsStable = points[i][aX] === 0 || Math.sign(points[i][aX]) === Math.sign(points[i][vX]);
            let yIsStable = points[i][aY] === 0 || Math.sign(points[i][aY]) === Math.sign(points[i][vY]);
            let zIsStable = points[i][aZ] === 0 || Math.sign(points[i][aZ]) === Math.sign(points[i][vZ]);

            if (!xIsStable || !yIsStable || !zIsStable || distance < prevDist) {
                valuesHaveStabilized = false;
            }

            points[i][prevDist] = distance;
        }

        let closetParticle = -1;
        let closestDistance = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < points.length; i++) {
            let distance = Math.abs(points[i][pX]) + Math.abs(points[i][pY]) + Math.abs(points[i][pZ]);

            if (distance < closestDistance) {
                closestDistance = distance;
                closetParticle = i;
            }
        }

        console.log('Closest particle = ' + closetParticle);
    }

    /*let closetParticle = -1;
    let closestDistance = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < points.length; i++) {
        let distance = Math.abs(points[i][pX]) + Math.abs(points[i][pY]) + Math.abs(points[i][pZ]);

        if (distance < closestDistance) {
            closestDistance = distance;
            closetParticle = i;
        }
    }*/

    return closetParticle;
}

function runPart1() {
    //Utils.assertAreEqual(0, part1('<puzzle input: download from adventofcode.com>'));

    console.log(part1('<puzzle input: download from adventofcode.com>'));
}

function part2(input) {
    const regex = /p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>/;

    let points = input.split('\n').map(line => {
        let match = regex.exec(line);

        if (!match) {
            throw Error('Invalid line format: ' + line);
        }

        return [
            parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), // position
            parseInt(match[4]), parseInt(match[5]), parseInt(match[6]), // velocity
            parseInt(match[7]), parseInt(match[8]), parseInt(match[9]), // acceleration
        ];
    });

    while (true) {
        //console.log('\nIteration:');
        let positions = new Set();
        let duplicates = new Set();

        for (let i = 0; i < points.length; i++) {
            let c = points[i];
            /*console.log(
                    'p=<' + c[pX] + ',' + c[pY] + ',' + c[pZ]
                + ', v=<' + c[vX] + ',' + c[vY] + ',' + c[vZ]
                + ', a=<' + c[aX] + ',' + c[aY] + ',' + c[aZ] + '>');*/

            // Update velocity
            points[i][vX] += points[i][aX];
            points[i][vY] += points[i][aY];
            points[i][vZ] += points[i][aZ];

            // Update position
            points[i][pX] += points[i][vX];
            points[i][pY] += points[i][vY];
            points[i][pZ] += points[i][vZ];

            let position = points[i][pX] + '_' + points[i][pY] + '_' + points[i][pZ];

            if (positions.has(position)) {
                duplicates.add(position);
            } else {
                positions.add(position);
            }
        }

        points = points.filter(point => {
            let position = point[pX] + '_' + point[pY] + '_' + point[pZ];
            return !duplicates.has(position);
        });

        console.log('Num particles = ' + points.length);
    }
}

function runPart2() {
    //part2('<puzzle input: download from adventofcode.com>');

    part2('<puzzle input: download from adventofcode.com>');
}

//runPart1();
runPart2();
