using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/21
    public static class Day21
    {
        public static string ScrambledLettersHash(string input, string instructions)
        {
            var swapPositionRegex = new Regex(@"swap position (\d) with position (\d)", RegexOptions.Compiled);
            var swapLetterRegex = new Regex(@"swap letter ([a-z]) with letter ([a-z])", RegexOptions.Compiled);
            var rotateRegex = new Regex(@"rotate (left|right) (\d) steps?", RegexOptions.Compiled);
            var rotateLetterPositionRegex = new Regex(@"rotate based on position of letter ([a-z])", RegexOptions.Compiled);
            var reversePositionsRegex = new Regex(@"reverse positions (\d) through (\d)", RegexOptions.Compiled);
            var movePositionRegex = new Regex(@"move position (\d) to position (\d)", RegexOptions.Compiled);

            var result = input;

            foreach (var instruction in instructions.Split("\n".ToCharArray()))
            {
                var swapPositionsMatch = swapPositionRegex.Match(instruction);
                var swapLetterMatch = swapLetterRegex.Match(instruction);
                var rotateMatch = rotateRegex.Match(instruction);
                var rotateLetterPositionMatch = rotateLetterPositionRegex.Match(instruction);
                var reversePositionsMatch = reversePositionsRegex.Match(instruction);
                var movePositionMatch = movePositionRegex.Match(instruction);

                if (swapPositionsMatch.Success)
                {
                    var first = int.Parse(swapPositionsMatch.Groups[1].ToString());
                    var second = int.Parse(swapPositionsMatch.Groups[2].ToString());

                    result = result
                        .ReplaceAt(first, result[second])
                        .ReplaceAt(second, result[first]);
                }
                else if (swapLetterMatch.Success)
                {
                    var first = result.IndexOf(swapLetterMatch.Groups[1].ToString());
                    var second = result.IndexOf(swapLetterMatch.Groups[2].ToString());

                    result = result
                        .ReplaceAt(first, result[second])
                        .ReplaceAt(second, result[first]);
                }
                else if (rotateMatch.Success)
                {
                    var direction = rotateMatch.Groups[1].ToString();
                    var distance = int.Parse(rotateMatch.Groups[2].ToString());

                    if (direction == "left")
                    {
                        result = $"{result.Substring(distance)}{result.Substring(0, distance)}";
                    }
                    else
                    {
                        var length = result.Length;
                        result = $"{result.Substring(length - distance)}{result.Substring(0, length - distance)}";
                    }
                }
                else if (rotateLetterPositionMatch.Success)
                {
                    var length = result.Length;

                    var distance = result.IndexOf(rotateLetterPositionMatch.Groups[1].ToString());
                    distance = distance >= 4 ? distance + 1 : distance;
                    distance = (distance + 1) % length;
                    
                    result = $"{result.Substring(length - distance)}{result.Substring(0, length - distance)}";
                }
                else if (reversePositionsMatch.Success)
                {
                    var start = int.Parse(reversePositionsMatch.Groups[1].ToString());
                    var end = int.Parse(reversePositionsMatch.Groups[2].ToString());

                    var original = result.Substring(start, end - start + 1);
                    var reversed = string.Join(string.Empty, original.Reverse());

                    result = result.Replace(original, reversed);
                }
                else if (movePositionMatch.Success)
                {
                    var start = int.Parse(movePositionMatch.Groups[1].ToString());
                    var destination = int.Parse(movePositionMatch.Groups[2].ToString());
                    var value = result[start].ToString();

                    result = result.Remove(start, 1).Insert(destination, value);
                }
                else
                {
                    throw new InvalidOperationException($"Unable to parse instruction: {instruction}");
                }
            }
            
            return result;
        }

        private static string ReplaceAt(this string input, int index, char replacement)
        {
            return input.Remove(index, 1).Insert(index, replacement.ToString());
        }
    }
}
