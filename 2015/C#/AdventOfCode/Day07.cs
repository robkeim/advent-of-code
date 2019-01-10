using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    public static class Day07
    {
        // Sample
        //private const string INPUT = "<puzzle input: download from adventofcode.com>";

        // Part 1
        //private const string INPUT = "<puzzle input: download from adventofcode.com>";

        // Part 2
        private const string INPUT = "<puzzle input: download from adventofcode.com>";
        private static readonly Dictionary<string, ushort> _values = new Dictionary<string, ushort>();
        private static readonly Regex _setValueRegex = new Regex(@"^([a-z0-9]+) -> ([a-z]+)$");
        private static readonly Regex _notRegex = new Regex(@"^NOT ([a-z]+) -> ([a-z]+)$");
        private static readonly Regex _twoOperandRegex = new Regex(@"^([a-z0-9]+) (AND|OR|LSHIFT|RSHIFT) ([a-z0-9]+) -> ([a-z]+)$");

        // Part 1: 956
        // Part 2: 40149
        public static void Part1()
        {
            var lines = INPUT.Split("\n".ToCharArray()).ToArray();
            var index = -1;

            while (lines.Length > 0)
            {
                index++;
                index %= lines.Length;

                var line = lines[index];

                var match = _setValueRegex.Match(line);

                if (match.Success)
                {
                    var parsedValue = ParseValue(match.Groups[1]);

                    if (parsedValue.HasValue)
                    {
                        _values[match.Groups[2].ToString()] = parsedValue.Value;
                        lines = lines.Where(l => l != line).ToArray();
                    }

                    continue;
                }

                match = _notRegex.Match(line);

                if (match.Success)
                {
                    var parsedValue = ParseValue(match.Groups[1]);

                    if (parsedValue.HasValue)
                    {
                        _values[match.Groups[2].ToString()] = (ushort)(~parsedValue.Value);
                        lines = lines.Where(l => l != line).ToArray();
                    }

                    continue;
                }

                match = _twoOperandRegex.Match(line);

                if (match.Success)
                {
                    var parsedValue1 = ParseValue(match.Groups[1]);
                    var parsedValue2 = ParseValue(match.Groups[3]);

                    if (parsedValue1.HasValue && parsedValue2.HasValue)
                    {
                        ushort result = 0;

                        switch (match.Groups[2].ToString())
                        {
                            case "AND":
                                result = (ushort)(parsedValue1.Value & parsedValue2.Value);
                                break;
                            case "LSHIFT":
                                result = (ushort)(parsedValue1.Value << parsedValue2.Value);
                                break;
                            case "OR":
                                result = (ushort)(parsedValue1.Value | parsedValue2.Value);
                                break;
                            case "RSHIFT":
                                result = (ushort)(parsedValue1.Value >> parsedValue2.Value);
                                break;
                            default:
                                throw new Exception("Invalid argument");
                        }
                        
                        _values[match.Groups[4].ToString()] = result;

                        lines = lines.Where(l => l != line).ToArray();
                    }

                    continue;
                }

                if (!match.Success)
                {
                    throw new Exception($"No matching instruction for line: {line}");
                }
            }

            foreach (var kvp in _values.OrderBy(kvp => kvp.Key))
            {
                Console.WriteLine($"{kvp.Key}: {kvp.Value}");
            }
        }

        private static ushort? ParseValue(Group group)
        {
            var operand = group.ToString();

            if (ushort.TryParse(operand, out ushort result))
            {
                return result;
            }

            if (_values.ContainsKey(operand))
            {
                return _values[operand];
            }

            return null;
        }
    }
}
