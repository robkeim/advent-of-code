using System;
using System.Text;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/9
    public static class Day09
    {
        public static int GetDecompressedLength(string input)
        {
            var repeatRegex = new Regex(@"\((\d+)x(\d+)\)");

            var result = new StringBuilder();
            var curCharIndex = 0;

            while (curCharIndex < input.Length)
            {
                var curChar = input[curCharIndex];
                if (curChar != '(')
                {
                    result.Append(curChar);
                    curCharIndex++;
                }
                else
                {
                    var closeIndex = input.IndexOf(")", curCharIndex, StringComparison.InvariantCulture);
                    var repeatString = input.Substring(curCharIndex, closeIndex - curCharIndex + 1);

                    var match = repeatRegex.Match(repeatString);
                    var length = int.Parse(match.Groups[1].ToString());
                    var num = int.Parse(match.Groups[2].ToString());

                    var stringToRepeat = input.Substring(curCharIndex + match.Length, length);

                    for (int i = 0; i < num; i++)
                    {
                        result.Append(stringToRepeat);
                    }

                    curCharIndex += match.Length + length;
                }
            }

            var resultString = result.ToString().Replace(" ", string.Empty);
            return resultString.Length;
        }

        public static long GetRecursiveDecompressedLength(string input)
        {
            var repeatRegex = new Regex(@"\((\d+)x(\d+)\)");

            if (!input.Contains("("))
            {
                return input.Length;
            }

            var startIndex = input.IndexOf("(", StringComparison.InvariantCulture);
            
            input = input.Substring(startIndex);

            var match = repeatRegex.Match(input);
            var length = int.Parse(match.Groups[1].ToString());
            var num = int.Parse(match.Groups[2].ToString());

            return startIndex + num * GetRecursiveDecompressedLength(input.Substring(match.Length, length)) + GetRecursiveDecompressedLength(input.Substring(match.Length + length));
        }
    }
}
