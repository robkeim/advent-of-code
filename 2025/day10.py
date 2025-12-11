from collections import deque


def part1():
    lines = [line.strip() for line in open("day10.txt").readlines()]
    print(sum([process_line(line) for line in lines]))


def process_line(line):
    line = line.split()

    target = tuple([True if char == "#" else False for char in line[0][1:-1]])
    switches = [[int(value) for value in switch[1:-1].split(",")] for switch in line[1:-1]]

    to_process = deque([(tuple([False] * len(target)), 0)])
    seen = set()

    while to_process:
        current, num_steps = to_process.popleft()

        if current == target:
            return num_steps

        if current in seen:
            continue

        seen.add(current)

        for switch in switches:
            to_process.append((apply_switch(current, switch), num_steps + 1))

    assert False, "No solution found"

def apply_switch(configuration, switch):
    configuration = list(configuration)

    for index in switch:
        configuration[index] = not configuration[index]

    return tuple(configuration)


def part2():
    pass


def main():
    part1()
    part2()


if __name__ == "__main__":
    main()
