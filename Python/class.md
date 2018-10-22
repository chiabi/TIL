# 클래스

> 점프 투 파이썬 - [클래스](https://wikidocs.net/28)

같은 기능을 가지지만 독립적으로 값(데이터)를 가지는 계산기를 다음과 같이 만들 수 있다.

```py
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
```

더하기와 빼기 기능을 동일하게 가진 독립적인 계산기를 cal3, cal4...로 계속 만들 수 있다.

## 클래스와 객체

붕어빵을 만들려 할 때 붕어빵틀이 필요하다.

- 붕어빵 틀 - 클래스(class)
- 틀에서 찍어낸 붕어빵 - 객체(object), 인스턴스

클래스는 똑같은 무언가를 계속해서 만들어낼 수 있는 설계 도면(블루프린트)같은 것이다. 객체(인스턴스)는 클래스에 의해 만들어진 것이다.

클래스에 의해 생성된 객체들은 서로에게 영향을 주지 않는다.

> 클래스에 의해 만들어진 객체를 인스턴스라고 한다. 특정 객체가 어떤 클래스의 객체인지를 관계 위주로 설명할 때 사용된다.

## 클래스 만들기

클래스에 의해 만들어진 객체를 중심으로 어떤 식으로 동작하게 할 것인지 미리 구상한다.

### 클래스 구조 만들기

```py
class FourCal:
    pass
# pass는 아무것도 수행하지 않는 문법
# 임시로 코드를 작성할 때 주로 사용한다.

a = FourCal()
print(type(a)) # <type 'instance'>
```

FourCal 클래스에 의해 생성된 객체인 a 는 인스턴스라고 출력된다.

> `type(object)`: object 의 타입을 리턴한다.

```py
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
```
