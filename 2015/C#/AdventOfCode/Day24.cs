using System;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode
{
    public static class Day24
    {
        const string input = "<puzzle input: download from adventofcode.com>";

        // Part 2 answer: 80393059
        public static void Part1()
        {
            var packages = input
                .Split("\n".ToCharArray())
                .Select(int.Parse)
                .ToArray();

            var weightPerBin = packages.Sum(p => p) / 3;

            var permutations = new List<List<int>>();

            // I got this idea to do this as a bitwise computation here: https://stackoverflow.com/a/3319597
            for (int num = 0; num < (1 << 30); num++)
            {
                var permutation = new List<int>();
                var sum = 0;

                for (int i = 0; i < 29; i++)
                {
                    if (((num >> i) & 1) == 1)
                    {
                        permutation.Add(packages[i]);
                        sum += packages[i];

                        if (sum > weightPerBin)
                        {
                            break;
                        }
                    }
                }

                if (sum == weightPerBin)
                {
                    permutations.Add(permutation);
                }
            }

            permutations = permutations
                .OrderBy(p => p.Count)
                .ToList();

            var minNumPackages = permutations.First().Count;

            permutations = permutations
                .Where(p => p.Count == minNumPackages)
                .ToList();

            var result = permutations
                .Select(p => GetQuantumEntanglement(p))
                .Min();

            Console.WriteLine(result);
        }

        private static long GetQuantumEntanglement(List<int> values)
        {
            var result = 1L;

            foreach (var value in values)
            {
                result *= value;
            }

            return result;
        }
    }
}
