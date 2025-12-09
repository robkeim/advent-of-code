def part1():
    lines = [[int(num) for num in line.strip().split(",")] for line in open("day09.txt").readlines()]

    result = 0

    for i in range(len(lines)):
        for j in range(i + 1, len(lines)):
            result = max(result, get_area(lines[i], lines[j]))

    print(result)


def get_area(p1, p2):
    x1, y1 = p1
    x2, y2 = p2

    return (abs(x2 - x1) + 1) * (abs(y2 - y1) + 1)


def part2():
    pass


def main():
    part1()
    part2()


if __name__ == "__main__":
    main()
