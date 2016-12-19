using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
