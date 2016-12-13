using System;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/13
    public static class Day13
    {
        public static int FindShortestPath(int favNumber, int x, int y)
        {
            var target = new Coordinate(x, y);
            var itemsToProcess = new Queue<Tuple<Coordinate, int>>();
            var visitedLocations = new Dictionary<Coordinate, int>();
            var tuple = CreateCoordinateAndDepth(1, 1, 0);
            visitedLocations[tuple.Item1] = 0;
            itemsToProcess.Enqueue(tuple);

            while (itemsToProcess.Count != 0)
            {
                var item = itemsToProcess.Dequeue();
                var curPos = item.Item1;
                var depth = item.Item2;
                
                if (target.Equals(curPos))
                {
                    return depth;
                }

                foreach (var neighbor in curPos.GetNeighbors())
                {
                    if (IsOpenSpace(neighbor, favNumber))
                    {
                        int curDepth;
                        if (!visitedLocations.TryGetValue(neighbor, out curDepth))
                        {
                            curDepth = int.MaxValue;
                        }

                        if (depth + 1 < curDepth)
                        {
                            visitedLocations[neighbor] = depth + 1;
                            itemsToProcess.Enqueue(CreateCoordinateAndDepth(neighbor, depth + 1));
                        }
                    }
                }
            }

            return -1;
        }
        
        private static Tuple<Coordinate, int> CreateCoordinateAndDepth(int x, int y, int depth)
        {
            return CreateCoordinateAndDepth(new Coordinate(x, y), depth);
        }

        private static Tuple<Coordinate, int> CreateCoordinateAndDepth(Coordinate coord, int depth)
        {
            return new Tuple<Coordinate, int>(coord, depth);
        }

        private static void PrintBoard(int favNumber, int xMax, int yMax, Dictionary<Coordinate, int> visitedLocations)
        {
            Console.WriteLine();

            for (int y = 0; y <= yMax; y++)
            {
                for (int x = 0; x <= xMax; x++)
                {
                    var coord = new Coordinate(x, y);

                    var result = !IsOpenSpace(coord, favNumber)
                        ? "#"
                        : visitedLocations.ContainsKey(new Coordinate(x, y))
                            ? "0"
                            : ".";

                    Console.Write(result);
                }
                Console.WriteLine();
            }
        }

        private static bool IsOpenSpace(Coordinate coord, int favNumber)
        {
            var number =
                favNumber
                + coord.X * coord.X
                + 3 * coord.X
                + 2 * coord.X * coord.Y
                + coord.Y
                + coord.Y * coord.Y;

            var binary = Convert.ToString(number, 2);
            
            return binary.Count(c => c == '1') % 2 == 0;
        }

        private struct Coordinate
        {
            public int X { get; }
            public int Y { get; }

            public Coordinate(int x, int y)
            {
                X = x;
                Y = y;
            }

            public List<Coordinate> GetNeighbors()
            {
                var result = new List<Coordinate>();

                result.Add(new Coordinate(X + 1, Y));
                result.Add(new Coordinate(X, Y + 1));

                if (X >= 1)
                {
                    result.Add(new Coordinate(X - 1, Y));
                }

                if (Y >= 1)
                {
                    result.Add(new Coordinate(X, Y - 1));
                }

                return result;
            }

            public override bool Equals(object obj)
            {
                if (obj is Coordinate)
                {
                    var castObj = (Coordinate)obj;

                    return X == castObj.X && Y == castObj.Y;
                }

                return false;
            }

            public override string ToString()
            {
                return $"({X}, {Y})";
            }
        }
    }
}
