from collections import defaultdict

def part1():
    lines = [line.strip() for line in open("day06.txt").readlines()]
    numbers = [[int(num) for num in line.split()] for line in lines[:-1]]
    operations = lines[-1].split()

    num_r = len(numbers)
    num_c = len(numbers[0])

    total = 0

    for c in range(num_c):
        operation = operations[c]

        result = 1 if operation == "*" else 0

        for r in range(num_r):
            if operation == "+":
                result += numbers[r][c]
            else:
                result *= numbers[r][c]

        total += result

    print(total)


def part2():
    lines = [line for line in open("day06.txt").readlines()]
    lines_dict = defaultdict(str)

    num_r = len(lines)
    num_c = 0
    for r, row in enumerate(lines):
        for c, char in enumerate(row):
            if char != " " and char != "\n":
                lines_dict[(r, c)] = char
                num_c = max(num_c, c)

    result = 0
    items = []
    for c in range(num_c, -1, -1):
        num = ""

        for r in range(num_r):
            value = lines_dict[(r, c)]

            if value == "":
                continue

            if "0" <= value <= "9":
                num += value
            elif value in "+*":
                if len(items) == 0:
                    continue

                items.append(num)

                tmp = process_line(items, value)
                items = []
                num = ""
                result += tmp

        if len(num) > 0:
            items.append(num)

    print(result)

    return

    max_width = max([len(line) for line in lines])

    num_r = len(lines)
    num_c = max_width

    for r in range(num_r):
        while len(lines[r]) < max_width:
            lines[r] = lines[r] + " "

    lines = [line[::-1] for line in lines]

    for line in lines:
        print(line, len(line))

    total = 0

    cur_nums = []
    for c in range(num_c):
        cur = ""
        for r in range(num_r):
            print("r", r, "c", c)
            if len(lines[r]) <= c:
                continue

            if "0" <= lines[r][c] <= "9":
                cur += lines[r][c]
                continue

            if lines[r][c] in "*+":
                cur_nums.append(int(cur))

                print('reducing', cur_nums, r, c, lines[r][c])
                result = 0 if lines[r][c] == "+" else 1

                for num in cur_nums:
                    if lines[r][c] == "+":
                        result += num
                    else:
                        result *= num

                total += result
                cur_nums = []

        print("cur", cur)
        if cur:
            cur_nums.append(int(cur))

    print(total)


def process_line(items, operator):
    result = 0 if operator == "+" else 1

    for item in items:
        item = int(item)

        if operator == "+":
            result += item
        else:
            result *= item

    return result


def main():
    part1()
    part2()


if __name__ == "__main__":
    main()
