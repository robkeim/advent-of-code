using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/10
    public static class Day10
    {
        private static readonly Dictionary<int, Bot> _bots = new Dictionary<int, Bot>();
        private static readonly Dictionary<int, int> _outputValues = new Dictionary<int, int>();
        private static int _solutionId;
        private static int _lowValue;
        private static int _highValue;
        
        public static int BalanceBots(string input, int lowValue, int highValue)
        {
            _lowValue = lowValue;
            _highValue = highValue;
            
            BalanceBotsSetup(input);
            
            return _solutionId;
        }

        public static int BalanceBots(string input)
        {
            BalanceBotsSetup(input);

            return _outputValues[0] * _outputValues[1] * _outputValues[2];
        }

        private static void BalanceBotsSetup(string input)
        {
            var instructionRegex = new Regex(@"bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)", RegexOptions.Compiled);

            foreach (var line in input.Split("\n".ToCharArray()))
            {
                var match = instructionRegex.Match(line);

                if (match.Success)
                {
                    var id = int.Parse(match.Groups[1].ToString());
                    var lowTarget = match.Groups[2].ToString() == "bot" ? Target.Bot : Target.Output;
                    var lowTargetValue = int.Parse(match.Groups[3].ToString());
                    var highTarget = match.Groups[4].ToString() == "bot" ? Target.Bot : Target.Output;
                    var highTargetValue = int.Parse(match.Groups[5].ToString());

                    Bot bot;

                    if (!_bots.TryGetValue(id, out bot))
                    {
                        bot = new Bot(id);
                        _bots[id] = bot;
                    }

                    bot.SetInstructions(lowTarget, lowTargetValue, highTarget, highTargetValue);
                }
            }

            var valueRegex = new Regex(@"value (\d+) goes to bot (\d+)", RegexOptions.Compiled);

            foreach (var line in input.Split("\n".ToCharArray()))
            {
                var match = valueRegex.Match(line);

                if (match.Success)
                {
                    var chipId = int.Parse(match.Groups[1].ToString());
                    var id = int.Parse(match.Groups[2].ToString());

                    _bots[id].GiveChip(chipId);
                }
            }
        }

        private class Bot
        {
            private readonly int _id;
            private int? _chip;
            private Target _lowTarget;
            private int _lowValue;
            private Target _highTarget;
            private int _highValue;

            public Bot(int id)
            {
                _id = id;
            }

            public void SetInstructions(Target lowTarget, int lowValue, Target highTarget, int highValue)
            {
                _lowTarget = lowTarget;
                _lowValue = lowValue;
                _highTarget = highTarget;
                _highValue = highValue;
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

                    if (low == Day10._lowValue && high == Day10._highValue)
                    {
                        _solutionId = _id;
                    }

                    if (_lowTarget == Target.Bot)
                    {
                        _bots[_lowValue].GiveChip(low);
                    }
                    else
                    {
                        _outputValues[_lowValue] = low;
                    }

                    if (_highTarget == Target.Bot)
                    {
                        _bots[_highValue].GiveChip(high);
                    }
                    else
                    {
                        _outputValues[_highValue] = high;
                    }
                }
            }

            public override string ToString()
            {
                return $"Id = {_id}, Chip = {_chip}, LowDestination = {_lowValue}, HighDestination = {_highValue}";
            }
        }

        public enum Target
        {
            Bot,
            Output
        }
    }
}
