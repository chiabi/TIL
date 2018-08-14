# 버블 정렬

O(N<sup>2</sup>)

| 데이터 원소 N개 | 버블 정렬 단계 수(비교/교환) | N<sup>2</sup> |
|:------------:|:------------------------:|:-----------:|
| 5  | 20   | 25   |
| 10 | 90   | 100  |
| 20 | 380  | 400  |
| 40 | 1560 | 1600 |
| 80 | 6320 | 6400 |

```js
const bubble_sort = (list) => {
  let bubble = 0;
  let l = list.length;
  while(bubble < l) {
    for(let i = 1; i < l - bubble; i++) {
      if (list[i - 1] > list[i]) {
        const temp = list[i - 1];
        list[i - 1] = list[i]
        list[i] = temp;
      }
    }
    bubble++;
  }
  return list;
}

console.log(bubble_sort([65, 55, 45, 35, 25, 15, 10]))
```

책 참고
```js
const bubble_sort = (list) => {
  let unsorted_until_index = list.length - 1;
  let sorted = false;
  while(!sorted) {
    sorted = true;
    for (let i = 0; i < unsorted_until_index; i++) {
      if (list[i] > list[i + 1]) {
        sorted = false;
        const temp = list[i];
        list[i] = list[i + 1];
        list[i + 1] = temp;
      }
    }
    unsorted_until_index = unsorted_until_index - 1;
  }
  return list
}

console.log(bubble_sort([65, 55, 45, 35, 25, 15, 10]))
```

```python
def bubble_sort(list):
    bubble_num = 0
    list_length = len(list) - 1
    while bubble_num < list_length:
        for i in range(list_length - bubble_num):
            if list[i] > list[i + 1]:
                list[i], list[i + 1] = list[i + 1], list[i]
        bubble_num += 1
        
list = [65, 55, 45, 35, 25, 15]
bubble_sort(list)
print(list)
```

책 참고
```python
def bubble_sort(list):
    unsorted_until_index = len(list) - 1
    sorted = False
    
    while not sorted:
        sorted = True
        for i in range(unsorted_until_index):
            if list[i] > list[i + 1]:
                sorted = False
                list[i], list[i + 1] = list[i + 1], list[i]
        unsorted_until_index = unsorted_until_index - 1
    
        
list = [65, 55, 45, 35, 25, 15]
bubble_sort(list)
print(list)
```