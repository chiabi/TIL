# 1. Two Sum

Array, Hash Table

[leetcode](https://leetcode.com/problems/two-sum/description/)

> Given an array of integers, return indices of the two numbers such that they add up to a specific target.
>
> You may assume that each input would have exactly one solution, and you may not use the same element twice.

> **Example**
> ```
> Given nums = [2, 7, 11, 15], target = 9,
> 
> Because nums[0] + nums[1] = 2 + 7 = 9,
> return [0, 1].
> ```


124ms
```js
const twoSum = (nums, target) => {
    const l = nums.length;
    for (let i = 0; i < l; i++) {
        for ( let j = i + 1; j < l; j++) {
            if(nums[i] + nums[j] === target) return [i, j]
        }
    }
}
```

176ms
```js
const twoSum = (nums, target) => {
    for (let i = 0; i < nums.length; i++) {
        const index = nums.indexOf(target - nums[i]);
        if(index !== - 1 && index !== i) return [i, index]
    }
}
```

<!-- 1. Brute Force

각 x 요 -->