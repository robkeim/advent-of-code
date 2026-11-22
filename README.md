# Advent of Code

My solutions to [Advent of Code](https://adventofcode.com), 2015 to 2025.

Advent of Code is an annual set of programming puzzles, one new puzzle a day from December 1 to 25 (12 days in 2025). Every puzzle has two parts, and part 2 usually changes the problem in a way that breaks the obvious solution. Each person gets their own puzzle input.

## About this repo

- **All of this is my own work.** I wrote every solution myself, without AI assistance.
- I do these because I love algorithm puzzles and writing code.
- The goal is to solve the puzzle, often as fast as I can, not to show maintainable code. Expect terse, repetitive code with little structure and few tests.

## Stars and leaderboard

449 of 524 possible stars across 11 years (25 days and 50 stars a year, 12 days and 24 stars in 2025).

| Year | Stars |
| --- | --- |
| 2015 | 50 |
| 2016 | 50 |
| 2017 | 50 |
| 2018 | 38 |
| 2019 | 43 |
| 2020 | 50 |
| 2021 | 31 |
| 2022 | 29 |
| 2023 | 42 |
| 2024 | 46 |
| 2025 | 20 of 24 |

I rarely solved puzzles when they unlocked, but a few finishes landed in the global top 1000: 2018 day 1 (part 2: 267th, part 1: 528th) and 15 top-1000 finishes in 2016, best 528th on day 17 part 2.

## Highlights

- **2019 day 25 and the Intcode computer:** a small virtual machine that grows across the year and finally drives a text adventure game.
- **2018 day 22:** shortest path through a cave with a changing tool, using Dijkstra with `heapq` and memoized erosion levels.
- **2023 day 17:** shortest path with movement constraints, searching over position, direction and run length.

## Languages by year

| Year | Language |
| --- | --- |
| 2015 | JavaScript (a few in Python and C#) |
| 2016 | C# |
| 2017 | JavaScript |
| 2018 | C# (a few in Python) |
| 2019 to 2025 | Python |

## Running

This applies to the Python years only (2019 to 2025), which are scripts with the same shape. Each `dayNN.py` has `part1()`, `part2()` and `main()`, and reads `dayNN.txt` from the current directory:

```
cd 2024
python day01.py
```

From the repo root, `python perf.py 2024` times every day of a Python year. `python init.py [day] [year]` creates a new day from `skeleton.py` and downloads the input (it needs an `AOC_SESSION_COOKIE` environment variable and the `requests` package).

2015 to 2018 predate that setup and the commands above don't apply: the JavaScript files run with Node, and the C# years are Visual Studio solutions. I didn't solve every day of every year.

## Puzzle text and inputs

Advent of Code asks people not to publish puzzle text or personal inputs, so I removed them from the whole history of this repo. Where an input was embedded in the code it is replaced with `<puzzle input: download from adventofcode.com>`, and expected answers for my own inputs are removed too. Download your own input to run a day. Most 2015 to 2017 files start with a link to their puzzle.
