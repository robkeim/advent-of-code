using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/14
    public static class Day14
    {
        public static int GetIndexFor64thOneTimePadKey(string salt, bool stretchHashes)
        {
            var tripleRepeatRegex = new Regex(@"(\S)\1\1", RegexOptions.Compiled);

            var index = 0;
            var resultsFound = 0;

            while (resultsFound < 64)
            {
                var hash = HashPasswordCached(salt, index, stretchHashes);
                var tripleRepeatResult = tripleRepeatRegex.Match(hash);

                if (tripleRepeatResult.Success)
                {
                    var fiveRepeatRegex = new Regex($@"({tripleRepeatResult.Groups[1]})\1\1\1\1");

                    for (int i = 0; i < 1000; i++)
                    {
                        hash = HashPasswordCached(salt, index + i + 1, stretchHashes);
                        var fiveRepeatResult = fiveRepeatRegex.Match(hash);

                        if (fiveRepeatResult.Success)
                        {
                            Console.WriteLine($"ResultsFound = {resultsFound}, Index = {index}");

                            resultsFound++;
                            break;
                        }
                    }
                }

                index++;
            }
            
            return index - 1;
        }

        private static readonly Dictionary<string, string> _passwords = new Dictionary<string, string>();

        private static string HashPasswordCached(string salt, int val, bool stretchHashes)
        {
            var key = $"{salt}_{val}";

            string result;
            if (!_passwords.TryGetValue(key, out result))
            {
                result = HashPassword(salt, val, stretchHashes);
                _passwords[key] = result;
            }

            return result;
        }

        private static string HashPassword(string salt, int val, bool stretchHashes)
        {
            byte[] hash;

            using (var md5 = MD5.Create())
            {
                hash = md5.ComputeHash(Encoding.UTF8.GetBytes($"{salt}{val}"));
                
                if (stretchHashes)
                {
                    for (int i = 0; i < 2016; i++)
                    {
                        hash = md5.ComputeHash(Encoding.UTF8.GetBytes($"{string.Concat(hash.Select(h => h.ToString("x2")))}"));
                    }
                }
            }

            return string.Concat(hash.Select(h => h.ToString("x2")));
        }
    }
}
