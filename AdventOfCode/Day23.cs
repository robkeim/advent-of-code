using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/23
    public static class Day23
    {
        public static int GetValueForSafe(string input)
        {
            var instructions = input
                .Split("\n".ToCharArray())
                .Select(l => new Instruction(l))
                .ToArray();

            var registers = new Dictionary<string, int>
            {
                ["a"] = 7, // 12 for Part II which runs *really* slowly :)
                ["b"] = 0,
                ["c"] = 0,
                ["d"] = 0
            };
            
            var curInstructionIndex = 0;
            
            while (curInstructionIndex < instructions.Length)
            {
                var curInstruction = instructions[curInstructionIndex];

                switch (curInstruction.Type)
                {
                    case Instruction.InstructionType.Increment:
                        curInstructionIndex++;
                        registers[curInstruction.Arg1Register]++;
                        break;
                    case Instruction.InstructionType.Decrement:
                        curInstructionIndex++;
                        registers[curInstruction.Arg1Register]--;
                        break;
                    case Instruction.InstructionType.Toggle:
                        var offset = curInstruction.Arg1Value ?? registers[curInstruction.Arg1Register];
                        var index = curInstructionIndex + offset;

                        if (index < instructions.Length)
                        {
                            instructions[curInstructionIndex + offset].Toggle();
                        }

                        curInstructionIndex++;
                        break;
                    case Instruction.InstructionType.Copy:
                        curInstructionIndex++;
                        if (curInstruction.Arg1Value.HasValue)
                        {
                            registers[curInstruction.Arg2Register] = curInstruction.Arg1Value.Value;
                        }
                        else
                        {
                            registers[curInstruction.Arg2Register] = registers[curInstruction.Arg1Register];
                        }
                        break;
                    case Instruction.InstructionType.Jump:
                        var val = curInstruction.Arg1Value ?? registers[curInstruction.Arg1Register];
                        
                        if (val == 0)
                        {
                            curInstructionIndex++;
                        }
                        else
                        {
                            curInstructionIndex += curInstruction.Arg2Value ?? registers[curInstruction.Arg2Register];
                        }
                        break;
                    default:
                        throw new Exception("Unreachable code");
                }
            }

            return registers["a"];
        }

        private class Instruction
        {
            public InstructionType Type { get; private set; }
            public int? Arg1Value { get; }
            public string Arg1Register { get; }
            public int? Arg2Value { get; }
            public string Arg2Register { get; }

            public Instruction(string line)
            {
                var match = _oneArgumentRegex.Match(line);

                if (match.Success)
                {
                    switch (match.Groups[1].ToString())
                    {
                        case "inc":
                            Type = InstructionType.Increment;
                            break;
                        case "dec":
                            Type = InstructionType.Decrement;
                            break;
                        case "tgl":
                            Type = InstructionType.Toggle;
                            break;
                        default:
                            throw new Exception("Unreachable code");
                    }

                    var arg = match.Groups[2].ToString();
                    int val;

                    if (int.TryParse(arg, out val))
                    {
                        Arg1Value = val;
                    }
                    else
                    {
                        Arg1Register = arg;
                    }

                    return;
                }

                match = _twoArgumentRegex.Match(line);

                if (match.Success)
                {
                    switch (match.Groups[1].ToString())
                    {
                        case "cpy":
                            Type = InstructionType.Copy;
                            break;
                        case "jnz":
                            Type = InstructionType.Jump;
                            break;
                        default:
                            throw new Exception("Unreachable code");
                    }

                    var arg = match.Groups[2].ToString();
                    int val;

                    if (int.TryParse(arg, out val))
                    {
                        Arg1Value = val;
                    }
                    else
                    {
                        Arg1Register = arg;
                    }

                    arg = match.Groups[3].ToString();

                    if (int.TryParse(arg, out val))
                    {
                        Arg2Value = val;
                    }
                    else
                    {
                        Arg2Register = arg;
                    }

                    return;
                }

                throw new InvalidOperationException($"Cannot parse instruction: {line}");
            }

            public void Toggle()
            {
                switch (Type)
                {
                    case InstructionType.Increment:
                        Type = InstructionType.Decrement;
                        break;
                    case InstructionType.Decrement:
                    case InstructionType.Toggle:
                        Type = InstructionType.Increment;
                        break;
                    case InstructionType.Jump:
                        Type = InstructionType.Copy;
                        break;
                    case InstructionType.Copy:
                        Type = InstructionType.Jump;
                        break;
                    default:
                        throw new Exception("Unreachable code");
                }
            }

            public enum InstructionType
            {
                // One argument instructions
                Increment,
                Decrement,
                Toggle,

                // Two argument instructions
                Copy,
                Jump
            }

            private static readonly Regex _oneArgumentRegex = new Regex(@"(inc|dec|tgl) ([a-z])", RegexOptions.Compiled);
            private static readonly Regex _twoArgumentRegex = new Regex(@"(cpy|jnz) ([a-z]|-?\d+) ([a-z]|-?\d+)", RegexOptions.Compiled);
        }
    }
}
