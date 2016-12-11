using System;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/2
    public static class Day02
    {
        public static string FindBathroomCode(string rawInput)
        {
            var xPos = 1;
            var yPos = 1;
            var result = string.Empty;

            foreach (var line in rawInput.Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries))
            {
                foreach (var dir in line.ToCharArray())
                {
                    switch (dir)
                    {
                        case 'U':
                            yPos = Math.Max(0, yPos - 1);
                            break;
                        case 'R':
                            xPos = Math.Min(2, xPos + 1);
                            break;
                        case 'D':
                            yPos = Math.Min(2, yPos + 1);
                            break;
                        case 'L':
                            xPos = Math.Max(0, xPos - 1);
                            break;
                    }
                }

                switch ($"{xPos}_{yPos}")
                {
                    case "0_0":
                        result += "1";
                        break;
                    case "0_1":
                        result += "4";
                        break;
                    case "0_2":
                        result += "7";
                        break;
                    case "1_0":
                        result += "2";
                        break;
                    case "1_1":
                        result += "5";
                        break;
                    case "1_2":
                        result += "8";
                        break;
                    case "2_0":
                        result += "3";
                        break;
                    case "2_1":
                        result += "6";
                        break;
                    case "2_2":
                        result += "9";
                        break;
                }
            }

            return result;
        }

        public static string FindBathroomCodeWithAdvancedKeypad(string rawInput)
        {
            var curPos = '5';
            var result = string.Empty;

            foreach (var line in rawInput.Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries))
            {
                foreach (var dir in line.ToCharArray())
                {
                    switch (curPos)
                    {
                        case '1':
                            curPos = GetNewPos(dir, '1', '1', '3', '1');
                            break;
                        case '2':
                            curPos = GetNewPos(dir, '2', '3', '6', '2');
                            break;
                        case '3':
                            curPos = GetNewPos(dir, '1', '4', '7', '2');
                            break;
                        case '4':
                            curPos = GetNewPos(dir, '4', '4', '8', '3');
                            switch (dir)
                            {
                                case 'U':
                                    curPos = '4';
                                    break;
                                case 'R':
                                    curPos = '4';
                                    break;
                                case 'D':
                                    curPos = '8';
                                    break;
                                case 'L':
                                    curPos = '3';
                                    break;
                            }
                            break;
                        case '5':
                            curPos = GetNewPos(dir, '5', '6', '5', '5');
                            break;
                        case '6':
                            curPos = GetNewPos(dir, '2', '7', 'A', '5');
                            break;
                        case '7':
                            curPos = GetNewPos(dir, '3', '8', 'B', '6');
                            break;
                        case '8':
                            curPos = GetNewPos(dir, '4', '9', 'C', '7');
                            break;
                        case '9':
                            curPos = GetNewPos(dir, '9', '9', '9', '8');
                            break;
                        case 'A':
                            curPos = GetNewPos(dir, '6', 'B', 'A', 'A');
                            break;
                        case 'B':
                            curPos = GetNewPos(dir, '7', 'C', 'D', 'A');
                            break;
                        case 'C':
                            curPos = GetNewPos(dir, '8', 'C', 'C', 'B');
                            break;
                        case 'D':
                            curPos = GetNewPos(dir, 'B', 'D', 'D', 'D');
                            break;
                    }
                }

                result += curPos;
            }

            return result;
        }

        private static char GetNewPos(char dir, char up, char right, char down, char left)
        {
            switch (dir)
            {
                case 'U':
                    return up;
                case 'R':
                    return right;
                case 'D':
                    return down;
                case 'L':
                    return left;
            }
            
            throw new InvalidOperationException("This case shouldn't happen");
        }
    }
}