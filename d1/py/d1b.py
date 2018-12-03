from functools import reduce
history = set()
matched = False
counter = 0
accumulated = 0

with open('../input.txt', 'r') as f:
    content = f.readlines()
    results = list(map(int,content))
    
    while (not matched):
      cv = results[counter%len(results)]
      accumulated = accumulated + cv
      if (accumulated in history):
        matched = True
        print(f"Matched found in {accumulated} after {counter} runs")
      else: 
        history.add(accumulated)
        counter += 1
