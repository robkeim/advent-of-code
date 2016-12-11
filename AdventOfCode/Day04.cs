using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/4
    public static class Day04
    {
        public static int FindRealRooms(string input)
        {
            var regex = new Regex(@"(\D+)(\d+)\[(.+?)\]");

            var sum = 0;

            foreach (var line in input.Split("\n".ToCharArray()))
            {
                var result = regex.Match(line);

                var letters = result.Groups[1].ToString();
                var room = int.Parse(result.Groups[2].ToString());
                var checksum = result.Groups[3].ToString();

                var calculatedChecksum = GetNMostOccuringLetters(letters);

                if (checksum == calculatedChecksum)
                {
                    sum += room;
                }
            }

            return sum;
        }

        private static string GetNMostOccuringLetters(string input)
        {
            var frequencies = new Dictionary<char, int>();

            foreach (var letter in input)
            {
                if (letter == '-')
                {
                    continue;
                }

                if (!frequencies.ContainsKey(letter))
                {
                    frequencies[letter] = 0;
                }

                frequencies[letter]++;
            }
            
            var mostOccuringLetters = frequencies
                .OrderByDescending(kv => kv.Value)
                .ThenBy(kv => kv.Key)
                .Take(5)
                .Select(kv => kv.Key);

            var result = new StringBuilder(5);

            foreach (var letter in mostOccuringLetters)
            {
                result.Append(letter);
            }

            return result.ToString();
        }

        public static int FindSecretRoom(string input)
        {
            var regex = new Regex(@"(\D+)-(\d+)");
            
            foreach (var line in input.Split("\n".ToCharArray()))
            {
                var result = regex.Match(line);

                var letters = result.Groups[1].ToString();
                var room = int.Parse(result.Groups[2].ToString());
                var decrypted = DecryptString(letters, room);

                if (decrypted == "northpole object storage")
                {
                    return room;
                }
            }

            throw new Exception("No northpole object storage room found");
        }

        private static string DecryptString(string input, int shiftAmount)
        {
            var result = new StringBuilder(input.Length);

            foreach (var letter in input)
            {
                if (letter == '-')
                {
                    result.Append(' ');
                }
                else
                {
                    result.Append((char)((letter - 'a' + shiftAmount) % 26 + 'a'));
                }
            }
            
            return result.ToString();
        }
    }
}

