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
    lines = [line.strip() for line in open("day10.txt").readlines()]
    print(sum([process_line_p2(line) for line in lines]))


def process_line_p2(line):
    line = line.split()

    target = tuple([True if char == "#" else False for char in line[0][1:-1]])
    switches = [[int(value) for value in switch[1:-1].split(",")] for switch in line[1:-1]]
    jolts = [int(value) for value in line[-1][1:-1].split(",")]
    print(line, jolts)

    to_process = deque([(tuple([False] * len(target)), tuple([0] * len(target)), 0)])
    seen = set() # Do we need this?

    while to_process:
        current_configuration, current_jolts, num_steps = to_process.popleft()
        print(current_configuration, current_jolts, num_steps)

        if current_configuration == target and current_jolts == jolts:
            return num_steps

        for i in range(len(current_jolts)):
            if current_jolts[i] > jolts[i]:
                continue

        for switch in switches:
            new_configuration, new_jolts = apply_switch_p2(current_configuration, jolts, switch)
            to_process.append((new_configuration, new_jolts, num_steps + 1))

    assert False, "No solution found"


def apply_switch_p2(configuration, jolts, switch):
    configuration = list(configuration)
    jolts = list(jolts)

    for index in switch:
        configuration[index] = not configuration[index]
        jolts[index] += 1

    return tuple(configuration), jolts


def main():
    part1()
    part2()


if __name__ == "__main__":
    main()
