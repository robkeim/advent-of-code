from collections import defaultdict


def part1():
    items, operations, destinations = get_input(False)
    inspected = defaultdict(int)

    for cur_round in range(20):
        for i in range(len(items)):
            for item in items[i]:
                inspected[i] += 1
                new_value = operations[i](item)
                items[destinations[i](new_value)].append(new_value)

            items[i] = []

    values = sorted(inspected.values())
    print(values[-1] * values[-2])


def get_input(example):
    raise NotImplementedError('<puzzle input: download from adventofcode.com>')


def part2():
    pass


def main():
    part1()
    part2()


if __name__ == "__main__":
    main()
