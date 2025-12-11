from collections import defaultdict
from functools import lru_cache


def part1():
    lines = [line.strip() for line in open("day11.txt").readlines()]
    edges = defaultdict(set)

    for line in lines:
        start, dest = line.split(": ")

        for dest in dest.split():
            edges[start].add(dest)


    def count_paths(node):
        if node == "out":
            return 1

        return sum([count_paths(node) for node in edges[node]])

    print(count_paths("you"))


def part2():
    lines = [line.strip() for line in open("day11.txt").readlines()]
    edges = defaultdict(set)

    for line in lines:
        start, dest = line.split(": ")

        for dest in dest.split():
            edges[start].add(dest)

    @lru_cache(maxsize=None)
    def count_paths(node, seen_dac, seen_fft):
        if node == "out":
            if seen_dac and seen_fft:
                return 1

            return 0

        result = 0

        for node in edges[node]:
            next_dac = seen_dac
            next_fft = seen_fft

            if node == "dac":
                next_dac = True

            if node == "fft":
                next_fft = True

            result += count_paths(node, next_dac, next_fft)

        return result

    print(count_paths("svr", False, False))


def main():
    part1()
    part2()


if __name__ == "__main__":
    main()
