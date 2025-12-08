import math
from collections import defaultdict, deque


def part1():
    lines = [tuple([int(value) for value in line.strip().split(",")]) for line in open("day08.txt").readlines()]

    distances = []

    for i in range(len(lines)):
        for j in range(i + 1, len(lines)):
            distances.append((calculate_distance(lines[i], lines[j]), lines[i], lines[j]))

    distances = sorted(distances)

    edges = defaultdict(set)

    num_connections = 0

    for _, start, end in distances:
        if not are_connected(edges, start, end):
            edges[start].add(end)
            edges[end].add(start)

        num_connections += 1

        if num_connections == 1000:
            break

    seen = set()
    components = []

    for node in edges:
        if node in seen:
            continue

        component = []
        to_process = deque([node])

        while to_process:
            cur = to_process.popleft()

            if cur in seen:
                continue

            seen.add(cur)
            component.append(cur)

            for edge in edges[cur]:
                to_process.append(edge)

        components.append((len(component), component))

    components = sorted(components, key=lambda x: x[0], reverse=True)

    result = 1

    for size, _ in components[:3]:
        result *= size

    print(result)


def are_connected(edges1, start1, end1):
    to_process1 = deque([start1])
    seen1 = set()

    while to_process1:
        cur = to_process1.popleft()

        if cur in seen1:
            continue

        seen1.add(cur)

        if cur == end1:
            return True

        for edge in edges1[cur]:
            to_process1.append(edge)

    return False


def calculate_distance(p1, p2):
    x1, y1, z1 = p1
    x2, y2, z2 = p2

    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)


def part2():
    pass


def main():
    part1()
    part2()


if __name__ == "__main__":
    main()
