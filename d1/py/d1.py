from functools import reduce

with open('../input.txt', 'r') as f:
    content = f.readlines()
    results = list(map(int,content))

    final = reduce(lambda x, y: x + y, results)
    print(f"The sum is: {final}")