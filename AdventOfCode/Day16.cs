using System;
using System.Text;

namespace AdventOfCode
{
    public static class Day16
    {
        // https://adventofcode.com/2016/day/16
        public static string GetDragonChecksum(string input, int diskSize)
        {
            var data = GetData(input, diskSize);

            return CalculateChecksum(data);
        }

        private static string GetData(string input, int diskSize)
        {
            if (input.Length >= diskSize)
            {
                return input.Substring(0, diskSize);
            }

            var result = new StringBuilder(input.Length);

            for (int i = input.Length - 1; i >= 0; i--)
            {
                result.Append(input[i] == '0' ? '1' : '0');
            }

            return GetData($"{input}0{result}", diskSize);
        }

        private static string CalculateChecksum(string input)
        {
            if (input.Length % 2 != 0)
            {
                return input;
            }

            var result = new StringBuilder(input.Length / 2);

            for (int i = 0; i < input.Length; i += 2)
            {
                result.Append(input[i] == input[i + 1] ? '1' : '0');
            }

            return CalculateChecksum(result.ToString());
        }
    }
}
