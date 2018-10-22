# -*- coding: utf-8 -*-
class Calculator:
    def __init__(self):
        self.result = 0

    def add(self, num):
        self.result += num
        return self.result

    def sub(self, num):
        self.result -= num
        return self.result


# 계산기 1
cal1 = Calculator()
# 계산기 2
cal2 = Calculator()

print(cal1.add(3))  # 3
print(cal1.add(4))  # 7
print(cal2.add(3))  # 3
print(cal2.add(7))  # 10
print(cal1.sub(1))  # 6
print(cal2.sub(5))  # 5
