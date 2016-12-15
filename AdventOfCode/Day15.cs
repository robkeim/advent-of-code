using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/15
    public static class Day15
    {
        // Each tuple represents <size, position at t=0>
        public static int TimingIsEverything(List<Tuple<int, int>> discs)
        {
            var length = discs.Count;
            var sizes = discs.Select(d => d.Item1).ToArray();
            var startPositions = new int[length];

            for (int i = 0; i < length; i++)
            {
                startPositions[i] = (discs[i].Item2 + 1 + i) % sizes[i];
            }

            var result = 0;

            while (true)
            {
                var resultFound = true;

                for (int i = 0; i < length; i++)
                {
                    if ((startPositions[i] + result) % sizes[i] != 0)
                    {
                        resultFound = false;
                        break;
                    }
                }

                if (resultFound)
                {
                    return result;
                }

                result++;
            }
        }
    }
}
