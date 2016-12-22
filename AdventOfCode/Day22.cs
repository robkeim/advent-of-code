using System.Linq;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/22
    public static class Day22
    {
        public static int CountViablePairs(string input)
        {
            var nodes = input
                .Split("\n".ToCharArray())
                .Select(line => Node.CreateNode(line))
                .Where(n => n != null)
                .ToList();

            var result = 0;
            
            foreach (var nodeA in nodes)
            {
                if (nodeA.Used == 0)
                {
                    continue;
                }

                foreach (var nodeB in nodes)
                {
                    if (nodeA.ToString() == nodeB.ToString())
                    {
                        continue;
                    }

                    if (nodeA.Used <= nodeB.Avail)
                    {
                        result++;
                    }
                }
            }

            return result;
        }

        private class Node
        {
            private Node()
            {
            }

            // Sample format
            // Filesystem              Size  Used  Avail  Use%
            // /dev/grid/node-x0-y0     94T   72T    22T   76%
            public static Node CreateNode(string input)
            {
                var regex = new Regex(@"/dev/grid/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%");
                var match = regex.Match(input);

                if (!match.Success)
                {
                    return null;
                }

                return new Node
                {
                    X = int.Parse(match.Groups[1].ToString()),
                    Y = int.Parse(match.Groups[2].ToString()),
                    Size = int.Parse(match.Groups[3].ToString()),
                    Used = int.Parse(match.Groups[4].ToString()),
                    Avail = int.Parse(match.Groups[5].ToString()),
                    UsedPercent = int.Parse(match.Groups[6].ToString())
                };
            }

            public int X { get; private set; }
            public int Y { get; private set; }
            public int Size { get; private set; }
            public int Used { get; private set; }
            public int Avail { get; private set; }
            public int UsedPercent { get; private set; }

            public override string ToString()
            {
                return $"{X}_{Y}";
            }
        }
    }
}
