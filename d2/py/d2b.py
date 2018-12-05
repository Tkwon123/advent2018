from functools import reduce

with open('../data.txt', 'r') as f:
  contents = f.read().splitlines()
  for indi, i in enumerate(contents):
        for j in contents[indi + 1:]: # compare only with the remaining
            diffs = 0
            for idx, ch in enumerate(i):
                if ch != j[idx]:
                    diffs += 1
                    
            if diffs == 1:
                ans = [ch for idx, ch in enumerate(i) if j[idx] == ch]
                print("Part Two:", ''.join(ans))