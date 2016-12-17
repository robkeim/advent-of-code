using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/17
    public static class Day17
    {
        public static string TwoStepsForward(string input)
        {
            var elementsToProcess = new Queue<State>();

            elementsToProcess.Enqueue(new State(0, 0, string.Empty));

            while (elementsToProcess.Count != 0)
            {
                var curElem = elementsToProcess.Dequeue();
                var xPos = curElem.XPos;
                var yPos = curElem.YPos;
                var moves = curElem.Moves;
                
                if (xPos == 3 && yPos == 3)
                {
                    return moves;
                }

                var hash = CalculateMd5Hash(input, moves);

                // Up
                if (yPos > 0 && DoorIsOpen(hash[0]))
                {
                    elementsToProcess.Enqueue(new State(xPos, yPos - 1, $"{moves}U"));
                }

                // Down
                if (yPos < 3 && DoorIsOpen(hash[1]))
                {
                    elementsToProcess.Enqueue(new State(xPos, yPos + 1, $"{moves}D"));
                }

                // Left
                if (xPos > 0 && DoorIsOpen(hash[2]))
                {
                    elementsToProcess.Enqueue(new State(xPos - 1, yPos, $"{moves}L"));
                }

                // Right
                if (xPos < 3 && DoorIsOpen(hash[3]))
                {
                    elementsToProcess.Enqueue(new State(xPos + 1, yPos, $"{moves}R"));
                }
            }

            return "No valid path exists";
        }

        public static int LongestPath(string input)
        {
            var longestPath = int.MinValue;
            var elementsToProcess = new Queue<State>();

            elementsToProcess.Enqueue(new State(0, 0, string.Empty));

            while (elementsToProcess.Count != 0)
            {
                var curElem = elementsToProcess.Dequeue();
                var xPos = curElem.XPos;
                var yPos = curElem.YPos;
                var moves = curElem.Moves;

                if (xPos == 3 && yPos == 3)
                {
                    Console.WriteLine($"Path length {moves.Length}");
                    longestPath = Math.Max(longestPath, moves.Length);
                    continue;
                }

                var hash = CalculateMd5Hash(input, moves);

                // Up
                if (yPos > 0 && DoorIsOpen(hash[0]))
                {
                    elementsToProcess.Enqueue(new State(xPos, yPos - 1, $"{moves}U"));
                }

                // Down
                if (yPos < 3 && DoorIsOpen(hash[1]))
                {
                    elementsToProcess.Enqueue(new State(xPos, yPos + 1, $"{moves}D"));
                }

                // Left
                if (xPos > 0 && DoorIsOpen(hash[2]))
                {
                    elementsToProcess.Enqueue(new State(xPos - 1, yPos, $"{moves}L"));
                }

                // Right
                if (xPos < 3 && DoorIsOpen(hash[3]))
                {
                    elementsToProcess.Enqueue(new State(xPos + 1, yPos, $"{moves}R"));
                }
            }

            return longestPath;
        }

        private static bool DoorIsOpen(char c)
        {
            return c >= 'b' && c <= 'f';
        }

        private static string CalculateMd5Hash(string input, string moves)
        {
            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(Encoding.UTF8.GetBytes($"{input}{moves}"));

                return string.Concat(hash.Select(h => h.ToString("x2"))).Substring(0, 4);
            }
        }

        private class State
        {
            public int XPos { get; }
            public int YPos { get; }
            public string Moves { get; }

            public State(int xPos, int yPos, string moves)
            {
                XPos = xPos;
                YPos = yPos;
                Moves = moves;
            }
        }
    }
}
