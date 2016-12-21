using System;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode
{
    public static class Day20
    {
        // https://adventofcode.com/2016/day/20
        public static uint GetLowestFirewallValue(string input)
        {
            var ranges = new List<Tuple<uint, uint>>();
            var maxValue = 1U;
            
            foreach (var line in input.Split("".ToCharArray(), StringSplitOptions.RemoveEmptyEntries))
            {
                var split = line.Split("-".ToCharArray());
                ranges.Add(new Tuple<uint, uint>(uint.Parse(split[0]), uint.Parse(split[1])));
            }

            ranges = ranges.OrderBy(t => t.Item1).ToList();

            var potentialValues = ranges.TakeWhile(t => t.Item1 <= maxValue + 1).ToList();

            while (potentialValues.Count > 0)
            {
                ranges = ranges.Skip(potentialValues.Count).ToList();
                maxValue = potentialValues.Max(t => t.Item2);
                potentialValues = ranges.TakeWhile(t => t.Item1 <= maxValue + 1).ToList();
            }

            return maxValue + 1;
        }
        
        public static uint CountNumAllowedIps(string input)
        {
            var ranges = new List<Tuple<uint, uint>>();

            foreach (var line in input.Split("".ToCharArray(), StringSplitOptions.RemoveEmptyEntries))
            {
                var split = line.Split("-".ToCharArray());
                ranges.Add(new Tuple<uint, uint>(uint.Parse(split[0]), uint.Parse(split[1])));
            }

            ranges = ranges.OrderBy(t => t.Item1).ToList();

            var index = 0;

            while (index < ranges.Count - 1)
            {
                var first = ranges[index];
                var second = ranges[index + 1];
                
                if (first.Item2 >= second.Item1 - 1)
                {
                    ranges.RemoveRange(index, 2);
                    ranges.Insert(index, new Tuple<uint, uint>(first.Item1, Math.Max(first.Item2, second.Item2)));
                }
                else
                {
                    index++;
                }
            }

            var sum = ranges.Sum(t => t.Item2 - t.Item1 + 1);

            return uint.MaxValue - (uint)sum + 1;
        }
    }
}
