using System;
using System.Collections.Generic;
using System.Text;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/6
    public static class Day06
    {
        public static string DecodeMessageWithMostOccuringLetter(string input)
        {
            return DecodeMessage(input, GetMostOccuring);
        }

        public static string DecodeMessageWithLeastOccuringLetter(string input)
        {
            return DecodeMessage(input, GetLeastOccuring);
        }

        private static string DecodeMessage(string input, Func<Dictionary<char, int>, char> extractChar)
        {
            var splitLines = input.Split("\n".ToCharArray());

            var passwordLength = splitLines[0].Length;

            var frequencies = new Dictionary<char, int>[passwordLength];

            for (int i = 0; i < passwordLength; i++)
            {
                frequencies[i] = new Dictionary<char, int>();
            }

            foreach (var line in splitLines)
            {
                for (int i = 0; i < passwordLength; i++)
                {
                    var character = line[i];

                    if (!frequencies[i].ContainsKey(character))
                    {
                        frequencies[i][character] = 0;
                    }

                    frequencies[i][character]++;
                }
            }

            var result = new StringBuilder(passwordLength);

            foreach (var frequency in frequencies)
            {
                result.Append(extractChar(frequency));
            }

            return result.ToString();
        }
        
        private static char GetMostOccuring(Dictionary<char, int> input)
        {
            var maxOccurances = int.MinValue;
            var result = ' ';

            foreach (var key in input.Keys)
            {
                var occurances = input[key];

                if (occurances > maxOccurances)
                {
                    maxOccurances = occurances;
                    result = key;
                }
            }

            return result;
        }

        private static char GetLeastOccuring(Dictionary<char, int> input)
        {
            var maxOccurances = int.MaxValue;
            var result = ' ';

            foreach (var key in input.Keys)
            {
                var occurances = input[key];

                if (occurances < maxOccurances)
                {
                    maxOccurances = occurances;
                    result = key;
                }
            }

            return result;
        }
    }
}
