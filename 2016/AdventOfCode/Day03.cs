using System;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/3
    public static class Day03
    {
        public static int CountValidTriangles(string input)
        {
            var total = 0;
            foreach (var line in input.Split("\n".ToCharArray()))
            {
                var numbers = line.Split(" ".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

                if (IsValidTriangle(numbers[0], numbers[1], numbers[2]))
                {
                    total++;
                }
            }

            return total;
        }

        public static int CountValidVerticalTriangles(string input)
        {
            var total = 0;

            var lines = input.Split("\n".ToCharArray());

            for (int i = 0; i < lines.Length; i += 3)
            {
                var line0 = lines[i].Split(" ".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
                var line1 = lines[i + 1].Split(" ".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
                var line2 = lines[i + 2].Split(" ".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

                for (int j = 0; j <= 2; j++)
                {
                    if (IsValidTriangle(line0[j], line1[j], line2[j]))
                    {
                        total++;
                    }
                }
            }

            return total;
        }

        private static bool IsValidTriangle(string side0, string side1, string side2)
        {
            var num0 = int.Parse(side0);
            var num1 = int.Parse(side1);
            var num2 = int.Parse(side2);

            return num0 < num1 + num2
                   && num1 < num0 + num2
                   && num2 < num0 + num1;
        }
    }
}