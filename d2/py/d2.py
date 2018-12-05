results = {"a":0, "b": 0}

with open('../data.txt', 'r') as f:
  contents = f.read().splitlines()
  for item in contents:
    letter_counts = {}
    for letter in list(item):
      if letter in letter_counts:
        letter_counts[letter] +=1
      else:
        letter_counts[letter] = 1
    results["a"] +=1 if 2 in letter_counts.values() else False
    results["b"] +=1 if 3 in letter_counts.values() else False
  print (results["a"] * results["b"])