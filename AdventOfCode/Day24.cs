using System;
using System.Collections.Generic;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/24
    public static class Day24
    {
        public static int FindShortestPath(string input, bool returnToStart)
        {
            var lines = input.Split("\n".ToCharArray());

            int maxX = lines[0].Length;
            int maxY = lines.Length;
            var grid = new char[maxX, maxY];
            var xPos = new int[8];
            var yPos = new int[8];

            for (int y = 0; y < maxY; y++)
            {
                for (int x = 0; x < maxX; x++)
                {
                    var cur = lines[y][x];
                    int val;

                    if (int.TryParse(cur.ToString(), out val))
                    {
                        xPos[val] = x;
                        yPos[val] = y;
                    }

                    grid[x, y] = cur;
                }
            }

            var distances = new int[8, 8];

            for (int start = 0; start < 8; start++)
            {
                for (int dest = start + 1; dest < 8; dest++)
                {
                    var distance = CalculateMinDistance(start, dest, maxX, maxY, xPos, yPos, grid);
                    distances[start, dest] = distance;
                    distances[dest, start] = distance;
                }
            }
            
            var min = int.MaxValue;
            
            foreach (var perm in GetPermutations("1234567"))
            {
                var permutation = "0" + perm; // Also start at 0
                var distance = 0;
                for (int i = 0; i < 7; i++)
                {
                    distance += distances[int.Parse(permutation[i].ToString()), int.Parse(permutation[i + 1].ToString())];
                }

                if (returnToStart)
                {
                    distance += distances[int.Parse(permutation[7].ToString()), int.Parse(permutation[0].ToString())];
                }
                
                min = Math.Min(min, distance);
            }
            
            return min;
        }

        private static int CalculateMinDistance(int start, int dest, int maxX, int maxY, int[] xPos, int[] yPos, char[,] grid)
        {
            var states = new Queue<State>();
            var visited = new HashSet<string>();

            var state = new State(0, xPos[start], yPos[start]);
            states.Enqueue(state);
            visited.Add(state.ToString());

            while (states.Count != 0)
            {
                state = states.Dequeue();

                if (grid[state.X, state.Y] == '#')
                {
                    continue;
                }

                if (state.X == xPos[dest] && state.Y == yPos[dest])
                {
                    return state.NumSteps;
                }
                
                // rename to next
                var next = State.Incremenet(state, xOffset: -1);

                if (state.X > 0 && visited.Add(next.ToString()))
                {
                    states.Enqueue(next);
                }

                next = State.Incremenet(state, xOffset: 1);

                if (state.X < maxX - 1 && visited.Add(next.ToString()))
                {
                    states.Enqueue(next);
                }

                next = State.Incremenet(state, yOffset: -1);

                if (state.Y > 0 && visited.Add(next.ToString()))
                {
                    states.Enqueue(next);
                }

                next = State.Incremenet(state, yOffset: 1);

                if (state.Y < maxX - 1 && visited.Add(next.ToString()))
                {
                    states.Enqueue(next);
                }
            }

            throw new Exception("Unreachable code");
        }
        
        private class State
        {
            public int NumSteps { get; set; }
            public int X { get; set; }
            public int Y { get; set; }

            public State(int numSteps, int x, int y)
            {
                NumSteps = numSteps;
                X = x;
                Y = y;
            }
            
            public static State Incremenet(State state, int xOffset = 0, int yOffset = 0)
            {
                return new State(state.NumSteps + 1, state.X + xOffset, state.Y + yOffset);
            }

            public override string ToString()
            {
                return $"{X}_{Y}";
            }
        }

        private static List<string> GetPermutations(string input)
        {
            return GetPermutations(string.Empty, input);
        }

        private static List<string> GetPermutations(string soFar, string remaining)
        {
            if (remaining.Length == 0)
            {
                return new List<string> { soFar };
            }

            var results = new List<string>();

            for (int i = 0; i < remaining.Length; i++)
            {
                var nextSoFar = $"{soFar}{remaining[i]}";
                var nextRemaining = remaining.Remove(i, 1);

                results.AddRange(GetPermutations(nextSoFar, nextRemaining));
            }

            return results;
        }
    }
}
