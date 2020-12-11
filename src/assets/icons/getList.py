import os
with open("result.txt", 'w')as f:
    f.write(',\n'.join(["'"+x+"'" for x in os.listdir('./svg')]))
