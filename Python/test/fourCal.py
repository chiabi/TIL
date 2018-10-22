# -*- coding: utf-8 -*-
class FourCal:
    def setdata(self, first, second):
        self.first = first
        self.second = second

    def sum(self):
        result = self.first + self.second
        return result

    def mul(self):
        result = self.first * self.second
        return result

    def sub(self):
        result = self.first - self.second
        return result

    def div(self):
        result = self.first / self.second
        return result


a = FourCal()
print type(a)
b = FourCal()

a.setdata(4, 2)
b.setdata(5, 3)

print a.first  # 4
print a.second  # 2
print b.first  # 5
