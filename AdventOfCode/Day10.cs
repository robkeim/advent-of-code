using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/10
    public static class Day10
    {
        private static readonly Dictionary<int, Bot> _bots = new Dictionary<int, Bot>();
        private static bool _solutionFound;
        private static int _solutionId = -1;
        private static int _lowValue;
        private static int _highValue;

        public static int BalanceBots(string input, int lowValue, int highValue)
        {
            _lowValue = lowValue;
            _highValue = highValue;
            
            var instructionRegex = new Regex(@"bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)", RegexOptions.Compiled);

            foreach (var line in input.Split("\n".ToCharArray()))
            {
                var match = instructionRegex.Match(line);

                if (match.Success)
                {
                    var id = int.Parse(match.Groups[1].ToString());
                    var lowDestination = match.Groups[2].ToString() == "bot" ? (int?)int.Parse(match.Groups[3].ToString()) : null;
                    var highDestination = match.Groups[4].ToString() == "bot" ? (int?)int.Parse(match.Groups[5].ToString()) : null;

                    Bot bot;

                    if (!_bots.TryGetValue(id, out bot))
                    {
                        bot = new Bot(id);
                        _bots[id] = bot;
                    }
                    
                    bot.SetInstructions(lowDestination, highDestination);
                }
            }
            
            var valueRegex = new Regex(@"value (\d+) goes to bot (\d+)", RegexOptions.Compiled);

            foreach (var line in input.Split("\n".ToCharArray()))
            {
                if (_solutionFound)
                {
                    break;
                }

                var match = valueRegex.Match(line);

                if (match.Success)
                {
                    var chipId = int.Parse(match.Groups[1].ToString());
                    var id = int.Parse(match.Groups[2].ToString());

                    _bots[id].GiveChip(chipId);
                }
            }
            
            return _solutionId;
        }
        
        private class Bot
        {
            private readonly int _id;
            private int? _chip;
            private int? _lowDestination;
            private int? _highDestination;

            public Bot(int id)
            {
                _id = id;
            }

            public void SetInstructions(int? lowDestination = null, int? highDestination = null)
            {
                _lowDestination = lowDestination;
                _highDestination = highDestination;
            }
            
            public void GiveChip(int chip)
            {
                if (!_chip.HasValue)
                {
                    _chip = chip;
                }
                else
                {
                    var low = Math.Min(_chip.Value, chip);
                    var high = Math.Max(_chip.Value, chip);

                    _chip = null;

                    if (low == _lowValue && high == _highValue)
                    {
                        _solutionFound = true;
                        _solutionId = _id;
                    }

                    if (_lowDestination.HasValue)
                    {
                        _bots[_lowDestination.Value].GiveChip(low);
                    }

                    if (_highDestination.HasValue)
                    {
                        _bots[_highDestination.Value].GiveChip(high);
                    }
                }
            }

            public override string ToString()
            {
                return $"Id = {_id}, Chip = {_chip}, LowDestination = {_lowDestination}, HighDestination = {_highDestination}";
            }
        }
    }
}
