from functools import lru_cache


def part1():
    grid = [line.strip() for line in open("day07.txt").readlines()]
    num_r = len(grid)
    num_c = len(grid[0])

    splitters = set()

    for r in range(num_r):
        for c in range(num_c):
            if grid[r][c] == "S":
                start = (r, c)
            elif grid[r][c] == "^":
                splitters.add((r, c))

    assert start is not None, "Start not found"

    splits = set()
    seen = set()

    to_process = [start]

    while len(to_process) > 0:
        r, c = to_process.pop()

        if (r, c) in seen or r < 0 or r >= num_r or c < 0 or c >= num_c:
            continue

        seen.add((r, c))

        if (r, c) in splitters:
            splits.add((r, c))

            for dc in [-1, 1]:
                to_process.append((r, c + dc))
        else:
            to_process.append((r + 1, c))

    print(len(splits))


def part2():
    grid = tuple([tuple(line.strip()) for line in open("day07.txt").readlines()])
    num_r = len(grid)
    num_c = len(grid[0])

    splitters = set()

    for r in range(num_r):
        for c in range(num_c):
            if grid[r][c] == "S":
                start = (r, c)
            elif grid[r][c] == "^":
                splitters.add((r, c))

    assert start is not None, "Start not found"

    print(num_paths(grid, start[0], start[1]))


@lru_cache(maxsize=None)
def num_paths(grid, r, c):
     num_r = len(grid)
     num_c = len(grid[0])

     if c < 0 or c >= num_c:
         return 0

     if r == num_r - 1:
         return 1

     if grid[r][c] == "^":
         return num_paths(grid, r, c - 1) + num_paths(grid, r, c + 1)
     else:
         return num_paths(grid, r + 1, c)


def main():
    part1()
    part2()


if __name__ == "__main__":
    main()
