using System;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/8
    public static class Day8
    {
        public static int CountPixels(string input)
        {
            var screen = ComputeScreen(input);

            return screen.GetNumLitPixles();
        }

        public static void DisplayScreen(string input)
        {
            var screen = ComputeScreen(input);
            Console.WriteLine(screen);
        }

        private static Screen ComputeScreen(string input)
        {
            var screen = new Screen();
            var rectRegex = new Regex(@"rect (\d+)x(\d+)", RegexOptions.Compiled);
            var rotateRegex = new Regex(@"rotate (row|column) [xy]=(\d+) by (\d+)");

            foreach (var line in input.Split("\n".ToCharArray()))
            {
                var rectMatch = rectRegex.Match(line);
                var rotateMatch = rotateRegex.Match(line);

                if (rectMatch.Success)
                {
                    var width = int.Parse(rectMatch.Groups[1].ToString());
                    var height = int.Parse(rectMatch.Groups[2].ToString());
                    screen.AddRectange(width, height);
                }
                else if (rotateMatch.Success)
                {
                    var rowOrCol = rotateMatch.Groups[1].ToString();
                    var rowOrColNum = int.Parse(rotateMatch.Groups[2].ToString());
                    var by = int.Parse(rotateMatch.Groups[3].ToString());

                    if (rowOrCol == "row")
                    {
                        screen.RotateRow(rowOrColNum, @by);
                    }
                    else if (rowOrCol == "column")
                    {
                        screen.RotateColumn(rowOrColNum, @by);
                    }
                    else
                    {
                        throw new InvalidOperationException($"Not a valid rotation type: {line}");
                    }
                }
                else
                {
                    throw new InvalidOperationException($"Not a valid move: {line}");
                }
            }
            return screen;
        }
    }
    
    public class Screen
    {
        private readonly int _width;
        private readonly int _height;
        private readonly bool[,] _screen;

        public Screen(int width = 50, int height = 6)
        {
            _width = width;
            _height = height;
            _screen = new bool[height, width];
        }

        public void AddRectange(int width, int height)
        {
            for (int i = 0; i < height; i++)
            {
                for (int j = 0; j < width; j++)
                {
                    _screen[i, j] = true;
                }
            }
        }

        public void RotateRow(int row, int by)
        {
            var curRow = new bool[_width];

            for (int i = 0; i < _width; i++)
            {
                curRow[i] = _screen[row, i];
            }

            for (int i = 0; i < _width; i++)
            {
                _screen[row, (i + by) % _width] = curRow[i];
            }
        }

        public void RotateColumn(int col, int by)
        {
            var curCol = new bool[_height];

            for (int i = 0; i < _height; i++)
            {
                curCol[i] = _screen[i, col];
            }

            for (int i = 0; i < _height; i++)
            {
                _screen[(i + by) % _height, col] = curCol[i];
            }
        }

        public int GetNumLitPixles()
        {
            return _screen
                .Cast<bool>()
                .Count(value => value);
        }

        public override string ToString()
        {
            var result = new StringBuilder();

            for (int i = 0; i < _height; i++)
            {
                for (int j = 0; j < _width; j++)
                {
                    result.Append(_screen[i, j] ? "#" : ".");
                }

                result.Append("\n");
            }

            return result.ToString();
        }
    }
}
