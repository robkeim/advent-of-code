// https://adventofcode.com/2015/day/21

const Utils = require('./utils.js');

function part1(bossDamage, bossArmor, bossHitPoints) {
    return calculate(bossDamage, bossArmor, bossHitPoints).minAndWin;
}

function part2(bossDamage, bossArmor, bossHitPoints) {
    return calculate(bossDamage, bossArmor, bossHitPoints).maxAndLose;
}

function calculate(bossDamage, bossArmor, bossHitPoints) {
    let weapons = [
        [8, 4],
        [10, 5],
        [25, 6],
        [40, 7],
        [74, 8],
    ];

    let armor = [
        [0, 0], // Simulate selecting no armor
        [13, 1],
        [31, 2],
        [53, 3],
        [75, 4],
        [102, 5],
    ];

    let rings = [
        [0, 0, 0], // Simulate not selecting a ring
        [25, 1, 0],
        [50, 2, 0],
        [100, 3, 0],
        [20, 0, 1],
        [40, 0, 2],
        [80, 0, 3],
    ];

    let minAndWinGold = Number.MAX_SAFE_INTEGER;
    let maxAndLoseGold = Number.MIN_SAFE_INTEGER;
    for (let w = 0; w < weapons.length; w++) {
        for (let a = 0; a < armor.length; a++) {
            for (let r1 = 0; r1 < rings.length; r1++) {
                for (let r2 = 0; r2 < rings.length; r2++) {
                    if (r1 === r2 && r1 === 0) { // We can't buy two of the same ring
                        continue;
                    }

                    let playerDamage = 0;
                    let playerArmor = 0;
                    let goldSpent = 0;

                    let weapon = weapons[w];
                    goldSpent += weapon[0];
                    playerDamage += weapon[1];

                    let curArmor = armor[a];
                    goldSpent += curArmor[0];
                    playerArmor += curArmor[1];

                    let ring = rings[r1];
                    goldSpent += ring[0];
                    playerDamage += ring[1];
                    playerArmor += ring[2];

                    ring = rings[r2];
                    goldSpent += ring[0];
                    playerDamage += ring[1];
                    playerArmor += ring[2];

                    if (winSimulation(playerDamage, playerArmor, 100,
                            bossDamage, bossArmor, bossHitPoints)) {
                        if (goldSpent < minAndWinGold) {
                            minAndWinGold = goldSpent;
                        }
                    } else {
                        if (goldSpent > maxAndLoseGold) {
                            maxAndLoseGold = goldSpent;
                        }
                    }
                }
            }
        }
    }

    return {
        minAndWin: minAndWinGold,
        maxAndLose: maxAndLoseGold,
    };
}

function winSimulation(playerDamage, playerArmor, playerHitPoints,
                       bossDamage, bossArmor, bossHitPoints) {
    playerDamage = Math.max(1, playerDamage - bossArmor);
    bossDamage = Math.max(1, bossDamage - playerArmor);

    while (true) {
        bossHitPoints -= playerDamage;

        if (bossHitPoints <= 0) {
            return true;
        }

        playerHitPoints -= bossDamage;

        if (playerHitPoints <= 0) {
            return false;
        }
    }
}

function runPart1() {
    Utils.assertAreEqual(true, winSimulation(5, 5, 8, 7, 2, 12));

    console.log(part1('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));
}

function runPart2() {
    console.log(part2('<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>', '<puzzle input: download from adventofcode.com>'));
}

runPart1();
runPart2();
