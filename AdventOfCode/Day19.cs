using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/19
    public static class Day19
    {
        public static int LuckyElf(int size)
        {
            var queue = new Queue<int>(size);

            foreach (var val in Enumerable.Range(1, size))
            {
                queue.Enqueue(val);
            }

            var skip = true;

            while (queue.Count > 1)
            {
                var value = queue.Dequeue();

                if (skip)
                {
                    queue.Enqueue(value);
                    skip = false;
                }
                else
                {
                    skip = true;
                }
            }

            return queue.Dequeue();
        }

        // This solution is O(n^2) and takes a few minutes to run for my sample input, but it's good enough for a programming competition :)
        public static int LuckyElfAcross(int size)
        {
            var elves = new List<int>(size);
            elves.AddRange(Enumerable.Range(1, size));

            var curIndex = 0;

            while (elves.Count > 1)
            {
                var indexToRemove = (curIndex + elves.Count / 2) % elves.Count;

                elves.RemoveAt(indexToRemove);

                if (indexToRemove > curIndex)
                {
                    curIndex++;
                }

                curIndex %= elves.Count;
            }

            return elves[0];
        }
    }
}
