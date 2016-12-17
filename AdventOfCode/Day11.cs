using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AdventOfCode
{
    // https://adventofcode.com/2016/day/11
    public static class Day11
    {
        public static int NumSteps()
        {
            var elementsToProcess = new Queue<State>();
            var visited = new HashSet<string>();

            // Sample input
            //elementsToProcess.Enqueue(State.MakeState(0 /* <puzzle input: download from adventofcode.com> */));

            AddQueueItem(elementsToProcess, visited, State.MakeState(0 /* <puzzle input: download from adventofcode.com> */));
            
            while (elementsToProcess.Count != 0)
            {
                var curElem = elementsToProcess.Dequeue();
                
                var elevatorFloor = curElem.ElevatorFloor;
                var numSteps = curElem.NumSteps;
                var pairs = curElem.Pairs;
                
                if (curElem.IsFinalState())
                {
                    return numSteps;
                }
                
                var elevatorDirections = new List<int>();

                if (elevatorFloor > 1)
                {
                    elevatorDirections.Add(-1);
                }

                if (elevatorFloor < 4)
                {
                    elevatorDirections.Add(1);
                }

                foreach (var elevatorDirection in elevatorDirections)
                {
                    foreach (var pair in pairs)
                    {
                        if (pair.Generator == elevatorFloor)
                        {
                            AddQueueItem(elementsToProcess, visited, State.MakeState(
                                numSteps + 1,
                                elevatorFloor + elevatorDirection,
                                Replace(pairs, pair, Pair.MoveGenerator(pair, elevatorDirection))));
                        }

                        if (pair.Microchip == elevatorFloor)
                        {
                            AddQueueItem(elementsToProcess, visited, State.MakeState(
                                numSteps + 1,
                                elevatorFloor + elevatorDirection,
                                Replace(pairs, pair, Pair.MoveMicrochip(pair, elevatorDirection))));
                        }
                    }

                    for (int i = 0; i < pairs.Length; i++)
                    {
                        if (pairs[i].Generator == elevatorFloor)
                        {
                            if (pairs[i].Microchip == elevatorFloor)
                            {
                                AddQueueItem(elementsToProcess, visited, State.MakeState(
                                numSteps + 1,
                                elevatorFloor + elevatorDirection,
                                Replace(pairs, pairs[i], Pair.MoveBoth(pairs[i], elevatorDirection))));
                            }

                            for (int j = i + 1; j < pairs.Length; j++)
                            {
                                if (pairs[j].Generator == elevatorFloor)
                                {
                                    var replacement = Replace(pairs, pairs[i], Pair.MoveGenerator(pairs[i], elevatorDirection));
                                    replacement = Replace(replacement, pairs[j], Pair.MoveGenerator(pairs[j], elevatorDirection));

                                    AddQueueItem(elementsToProcess, visited, State.MakeState(
                                        numSteps + 1,
                                        elevatorFloor + elevatorDirection,
                                        replacement));
                                }

                                if (pairs[j].Microchip == elevatorFloor)
                                {
                                    var replacement = Replace(pairs, pairs[i], Pair.MoveGenerator(pairs[i], elevatorDirection));
                                    replacement = Replace(replacement, pairs[j], Pair.MoveMicrochip(pairs[j], elevatorDirection));

                                    AddQueueItem(elementsToProcess, visited, State.MakeState(
                                        numSteps + 1,
                                        elevatorFloor + elevatorDirection,
                                        replacement));
                                }
                            }
                        }

                        if (pairs[i].Microchip == elevatorFloor)
                        {
                            for (int j = i + 1; j < pairs.Length; j++)
                            {
                                if (pairs[j].Generator == elevatorFloor)
                                {
                                    var replacement = Replace(pairs, pairs[i], Pair.MoveMicrochip(pairs[i], elevatorDirection));
                                    replacement = Replace(replacement, pairs[j], Pair.MoveGenerator(pairs[j], elevatorDirection));

                                    AddQueueItem(elementsToProcess, visited, State.MakeState(
                                        numSteps + 1,
                                        elevatorFloor + elevatorDirection,
                                        replacement));
                                }

                                if (pairs[j].Microchip == elevatorFloor)
                                {
                                    var replacement = Replace(pairs, pairs[i], Pair.MoveMicrochip(pairs[i], elevatorDirection));
                                    replacement = Replace(replacement, pairs[j], Pair.MoveMicrochip(pairs[j], elevatorDirection));

                                    AddQueueItem(elementsToProcess, visited, State.MakeState(
                                        numSteps + 1,
                                        elevatorFloor + elevatorDirection,
                                        replacement));
                                }
                            }
                        }
                    }
                }
            }

            return -1;
        }

        private static void AddQueueItem(Queue<State> queue, HashSet<string> visited, State state)
        {
            if (!visited.Add(state.GetHashValue()) || !state.IsValidState())
            {
                return;
            }

            queue.Enqueue(state);
        }

        private static IEnumerable<T> Replace<T>(IEnumerable<T> input, T itemToReplace, T replacement)
        {
            return input.Except(MakeArray(itemToReplace)).Concat(MakeArray(replacement));
        }

        private static T[] MakeArray<T>(T elem)
        {
            return new[] { elem };
        }

        private class State
        {
            public int NumSteps { get; }
            public int ElevatorFloor { get; }
            public Pair[] Pairs { get; }

            public State(int numSteps, int elevatorFloor, params Pair[] pairs)
            {
                NumSteps = numSteps;
                ElevatorFloor = elevatorFloor;
                Pairs = pairs;
            }
            
            public static State MakeState(int numSteps, int elevatorFloor, params Pair[] pairs)
            {
                return new State(numSteps, elevatorFloor, pairs);
            }

            public static State MakeState(int numSteps, int elevatorFloor, IEnumerable<Pair> pairs)
            {
                return new State(numSteps, elevatorFloor, pairs.ToArray());
            }

            public bool IsFinalState()
            {
                return Pairs.All(p => p.Generator == 4 && p.Microchip == 4);
            }

            public bool IsValidState()
            {
                return Pairs.All(p => p.Generator == p.Microchip || Pairs.All(p2 => p2.Generator != p.Microchip));
            }

            public override bool Equals(object obj)
            {
                if (!(obj is State))
                {
                    return false;
                }

                var state = (State)obj;

                return ElevatorFloor == state.ElevatorFloor
                       && Pairs.Length == state.Pairs.Length
                       && Pairs.All(p => state.Pairs.Contains(p));
            }

            public string GetHashValue()
            {
                var sortedPairs = string.Join("_", Pairs.Select(p => p.ToString()).OrderBy(p => p));

                return $"{ElevatorFloor}-{sortedPairs}";
            }

            public override string ToString()
            {
                var result = new StringBuilder();

                for (int i = 4; i >= 1; i--)
                {
                    var elevatorString = ElevatorFloor == i ? "E " : string.Empty;
                    var line = $"F{i} {elevatorString}";

                    for (int j = 0; j < Pairs.Length; j++)
                    {
                        if (Pairs[j].Generator == i)
                        {
                            line += $"G{j} ";
                        }

                        if (Pairs[j].Microchip == i)
                        {
                            line += $"M{j} ";
                        }
                    }

                    result.AppendLine(line);
                }

                return result.ToString();
            }
        }

        private class Pair
        {
            private int InnerState { get; set; }

            public int Generator => InnerState >> shiftAmount;
            public int Microchip => InnerState & 0x7;

            private const int shiftAmount = 3;

            public static Pair MakePair(int generator, int microchip)
            {
                return new Pair
                {
                    InnerState = generator << shiftAmount | microchip
                };
            }

            public static Pair MoveGenerator(Pair pair, int direction)
            {
                direction = direction > 0
                    ? direction << shiftAmount
                    : ((-1 * direction) << shiftAmount) * -1;

                return new Pair
                {
                    InnerState = pair.InnerState + direction
                };
            }

            public static Pair MoveMicrochip(Pair pair, int direction)
            {
                return new Pair
                {
                    InnerState = pair.InnerState + direction
                };
            }

            public static Pair MoveBoth(Pair pair, int direction)
            {
                var genDirection = direction > 0
                    ? direction << shiftAmount
                    : ((-1 * direction) << shiftAmount) * -1;

                return new Pair
                {
                    InnerState = pair.InnerState + genDirection + direction
                };
            }

            public override bool Equals(object obj)
            {
                return InnerState == (obj as Pair)?.InnerState;
            }

            public override string ToString()
            {
                return $"G{Generator}M{Microchip}";
            }
        }
    }
}
