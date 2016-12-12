using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    public static class Day12
    {
        // https://adventofcode.com/2016/day/12
        public static int ComputeAssembunny(string input)
        {
            var copyJumpRegex = new Regex(@"(cpy|jnz) ([a-z]|-?\d+) ([a-z]|-?\d+)", RegexOptions.Compiled);
            var incDecRegex = new Regex(@"(inc|dec) ([a-z])", RegexOptions.Compiled);
            var registers = new Dictionary<string, int>
            {
                ["a"] = 0,
                ["b"] = 0,
                ["c"] = 0,
                ["d"] = 0
            };
            
            var instructions = input.Split("\n".ToCharArray());
            var curInstruction = 0;

            while (curInstruction < instructions.Length)
            {
                var copyJumpResult = copyJumpRegex.Match(instructions[curInstruction]);
                var incDecResult = incDecRegex.Match(instructions[curInstruction]);

                if (copyJumpResult.Success)
                {
                    var value1 = copyJumpResult.Groups[2].ToString();
                    var value2 = copyJumpResult.Groups[3].ToString();

                    if (copyJumpResult.Groups[1].ToString() == "cpy")
                    {
                        curInstruction++;

                        int intVal;
                        if (int.TryParse(value1, out intVal))
                        {
                            registers[value2] = intVal;
                        }
                        else
                        {
                            registers[value2] = registers[value1];
                        }
                    }
                    else
                    {
                        int intVal = 0;
                        if (!int.TryParse(value1, out intVal))
                        {
                            intVal = registers[value1];
                        }

                        if (intVal == 0)
                        {
                            curInstruction++;
                        }
                        else
                        {
                            curInstruction += int.Parse(value2);
                        }
                    }
                }
                else if (incDecResult.Success)
                {
                    var register = incDecResult.Groups[2].ToString();
                    curInstruction++;

                    if (incDecResult.Groups[1].ToString() == "inc")
                    {
                        registers[register]++;
                    }
                    else
                    {
                        registers[register]--;
                    }
                }
                else
                {
                    throw new InvalidOperationException($"Invalid line: {instructions[curInstruction]}");
                }
            }

            return registers["a"];
        }
    }
}
