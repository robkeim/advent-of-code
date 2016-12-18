using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/18
    public static class Day18
    {
        public static int CountSafeSquares(string line, int numLines)
        {
            var numSafeSquares = 0;

            while (numLines-- > 0)
            {
                numSafeSquares += line.Count(c => c == '.');

                var nextLine = new StringBuilder(line.Length);

                for (int i = 0; i < line.Length; i++)
                {
                    var substring = string.Format("{0}{1}{2}",
                        i == 0 ? '.' : line[i - 1],
                        line[i],
                        i == line.Length - 1 ? '.' : line[i + 1]);

                    switch (substring)
                    {
                        case "^^.":
                        case ".^^":
                        case "^..":
                        case "..^":
                            nextLine.Append('^');
                            break;
                        default:
                            nextLine.Append('.');
                            break;
                    }
                }

                line = nextLine.ToString();
            }

            return numSafeSquares;
        }
    }
}
