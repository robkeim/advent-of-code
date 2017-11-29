using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/7
    public static class Day07
    {
        public static int CountTlsSupport(string input)
        {
            var total = 0;

            foreach (var line in input.Split("\n".ToCharArray()))
            {
                var result = MatchInsideBrackets(line);

                var isMatch = result.Item2 == false
                       && MatchAbba(result.Item1);

                if (isMatch)
                {
                    total++;
                }
            }
            
            return total;
        }
        
        private static Tuple<string, bool> MatchInsideBrackets(string line)
        {
            var bracketRegex = new Regex(@"\[[a-z]*\]");
            var match = bracketRegex.Match(line);

            while (match.Success)
            {
                var matchValue = match.Groups[0].ToString();

                if (MatchAbba(matchValue))
                {
                    return new Tuple<string, bool>(null, true);
                }
                else
                {
                    line = line.Replace(matchValue, "|");
                    match = bracketRegex.Match(line);
                }
            }

            return new Tuple<string, bool>(line, false);
        }

        private static bool MatchAbba(string line)
        {
            var abbaRegex = new Regex(@"([a-z])([a-z])\2\1", RegexOptions.Compiled);
            var matchResult = abbaRegex.Match(line);

            return matchResult.Success && matchResult.Groups[1].ToString() != matchResult.Groups[2].ToString();
        }
        
        public static int CountSslSupport(string input)
        {
            var total = 0;

            foreach (var line in input.Split("\n".ToCharArray()))
            {
                var results = MatchInsideBracketsSsl(line);
                var modifiedLine = results.Item1;

                if (results.Item2.Any(bab => modifiedLine.Contains(bab)))
                {
                    total++;
                }
            }

            return total;
        }

        private static Tuple<string, List<string>> MatchInsideBracketsSsl(string line)
        {
            var bracketRegex = new Regex(@"\[[a-z]*\]");
            var match = bracketRegex.Match(line);
            var results = new List<string>();

            while (match.Success)
            {
                var matchValue = match.Groups[0].ToString();

                results.AddRange(MatchAba(matchValue));
                line = line.Replace(matchValue, "|");
                match = bracketRegex.Match(line);
            }

            return new Tuple<string, List<string>>(line, results);
        }

        // I originally tried this with a regex but couldn't figure out how to not get the consumed characters to not be part of a future match
        // so I switched and did this with if statements
        // Here's an example that didn't work:
        // abab
        // With the regex:
        // ([a-z])([a-z])\1
        // Would match aba and since that was "consumed" the bab would not be matched
        private static IEnumerable<string> MatchAba(string line)
        {
            var result = new List<string>();

            for (int i = 0; i < line.Length - 2; i++)
            {
                var a = line[i];
                var b = line[i + 1];

                if (a == line[i + 2]
                    && a != b
                    && a != '|' && a != '[' && a != ']'
                    && b != '|' && b != '[' && b != ']')
                {
                    result.Add($"{b}{a}{b}");
                }
            }
            
            return result.Distinct();
        }
    }
}
