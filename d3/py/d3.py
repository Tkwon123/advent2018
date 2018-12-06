# answer referenced from https://www.reddit.com/user/jonathan_paulson
from collections import defaultdict

C = defaultdict(int)

for line in open('../data.txt'):
  words = line.split()
  x, y = words[2].split(',')
  x, y = int(x), int(y[:-1])
  w, h = words[3].split('x')
  w, h = int(w), int(h)
  for dx in range(w):
    for dy in range(h):
      C[(dx + x, dy +y)] +=1

for line in open('../data.txt'):
  words = line.split()
  x, y = words[2].split(',')
  x, y = int(x), int(y[:-1])
  w, h = words[3].split('x')
  w, h = int(w), int(h)
  fresh = True
  for dx in range(w): 
    for dy in range(h):
      if C[(dx + x, dy +y)] > 1: 
          fresh = False 
  if fresh:
    print(words[0])

ans = 0
for (r,c),v in C.items():
  if v > 1:
    ans +=1
  

print (ans)