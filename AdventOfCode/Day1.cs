using System;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/1
    public static class Day1
    {
        public static int FindDistanceFromHQ(string rawInput)
        {
            var xPos = 0;
            var yPos = 0;
            var heading = Heading.North;

            foreach (var rawDir in rawInput.Split(",".ToCharArray()).Select(ri => ri.Trim()))
            {
                var direction = rawDir[0];
                var distance = int.Parse(rawDir.Substring(1));

                heading = heading.GetNewHeading(direction);

                switch (heading)
                {
                    case Heading.North:
                        yPos += distance;
                        break;
                    case Heading.East:
                        xPos += distance;
                        break;
                    case Heading.South:
                        yPos -= distance;
                        break;
                    case Heading.West:
                        xPos -= distance;
                        break;
                }
            }

            return Math.Abs(xPos) + Math.Abs(yPos);
        }

        public static int FindFirstIntersection(string rawInput)
        {
            var xPos = 0;
            var yPos = 0;
            var heading = Heading.North;
            var visitedPositions = new HashSet<string>();
            var foundIntersection = false;

            foreach (var rawDir in rawInput.Split(",".ToCharArray()).Select(ri => ri.Trim()))
            {
                var direction = rawDir[0];
                var distance = int.Parse(rawDir.Substring(1));

                heading = heading.GetNewHeading(direction);

                for (int i = 0; i < distance; i++)
                {
                    switch (heading)
                    {
                        case Heading.North:
                            yPos++;
                            break;
                        case Heading.East:
                            xPos++;
                            break;
                        case Heading.South:
                            yPos--;
                            break;
                        case Heading.West:
                            xPos--;
                            break;
                    }

                    var curPos = $"{xPos}_{yPos}";
                    if (!visitedPositions.Contains(curPos))
                    {
                        visitedPositions.Add(curPos);
                    }
                    else
                    {
                        foundIntersection = true;
                        break;
                    }
                }

                if (foundIntersection)
                {
                    break;
                }
            }

            return Math.Abs(xPos) + Math.Abs(yPos);
        }

        private static Heading GetNewHeading(this Heading current, char direction)
        {
            var offset = direction == 'R' ? 1 : -1;
            return (Heading)(((int)current + offset + 4) % 4);
        }

        private enum Heading
        {
            North,
            East,
            South,
            West
        }
    }
}
