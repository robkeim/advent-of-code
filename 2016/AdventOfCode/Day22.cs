using System;
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

        // My approach here was to print the grid and count by hand, as this is similar to the 15 tile puzzles. First you have to navigate using the Manhattan distance
        // to be next to the target data in the upper right, ensuring that you avoid any "blocked" nodes with too much data. Then perform a series of shifts to move the
        // target over one space at a time which is calculated by the formula in NumMoves.
        public static void PrintGrid(string input)
        {
            var nodes = input
                .Split("\n".ToCharArray())
                .Select(line => Node.CreateNode(line))
                .Where(n => n != null)
                .ToList();

            var xMax = nodes.Max(n => n.X);
            var yMax = nodes.Max(n => n.Y);

            for (int y = 0; y < yMax; y++)
            {
                for (int x = 0; x < xMax; x++)
                {
                    var node = nodes.Single(n => n.X == x && n.Y == y);
                    
                    Console.Write(node.Size > 100 ? "#" : node.Used == 0 ? "_" : ".");
                }

                Console.WriteLine();
            }
        }

        public static int NumMoves(int size)
        {
            return size == 1
                ? 1
                : 5 + NumMoves(size - 1);
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
