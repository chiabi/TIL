# 2019 KAKAO BLIND RECRUITMENT

## 1.

```js
function solution(record) {
    let answer = [];
    let uid = {};
    for (const item of record) {
        const re = item.split(' ');
        if (re[0] === 'Enter' || re[0] === 'Change') {
            uid[re[1]] = re[2];
        } 
        if (re[0] !== 'Change') {
            answer.push([re[1], re[0] === 'Enter' ? 1 : 0]);
        }
    }
    
    return answer.map(item => `${uid[item[0]]}님이 ${item[1] ? '들어왔습니다.' : '나갔습니다'}`);
}

solution(['Enter uid1234 Muzi', 'Enter uid4567 Prodo','Leave uid1234','Enter uid1234 Prodo','Change uid4567 Ryan'])

// [ 'Prodo님이 들어왔습니다.',
//   'Ryan님이 들어왔습니다.',
//   'Prodo님이 나갔습니다',
//   'Prodo님이 들어왔습니다.' ]
```

## 2. 

```js
function solution(N, stages) {
    let answer = new Array(N).fill(0).map((item, index) => ({item: index + 1, index}));
    let f = new Array(N).fill(0);
    let a = new Array(N).fill(0);
    for (const stage of stages) {
        f[stage - 1] = !f[stage - 1] ? 1 : f[stage - 1] + 1;
        for (let i = 1; i < stage; i++) {
            a[i - 1] = !a[i - 1] ? 1 : a[i - 1] + 1;
        }
    }
    answer.sort((A, B) => {
        const bRate = f[B.index]/a[B.index];
        const aRate = f[A.index]/a[A.index];
        const compare = bRate > aRate ? 
              1 : bRate < aRate ? 
              -1 : 0;
        return compare === 0 ? A.index - B.index : compare;
    });
    return answer.map(a => a.item)
}
solution(5, [2, 1, 2, 6, 2, 4, 3, 3]	)
// [3, 4, 2, 1, 5]
```

## 3. 미결

```js
function solution(relation) {
    let answer = 0;
    let unique = [];
    let rLength = relation.length;
    const recUnique = n => {
        console.log('n', n);
        let sLength = relation[0].length;
        for (let i = !n.length ? 0 : n.slice(-1)[0] + 1; i < sLength; i++) {
            const getKey = item => [...n, i].reduce((acc, it) => acc + item[it], '');
            console.log('realation', relation.map(getKey))
            if([...new Set(relation.map(getKey))].length === rLength) {
                unique.push([...n, i].join(','));
            } else {
                if(unique.indexOf([...n, i].join(',')) !== -1) {
                  continue;
                } else {
                  recUnique([...n, i])
                }
            } 
        }
        console.log('unique', unique)
    }
    recUnique([]);
    for (let j = unique.length - 1; j > 0; j--) {
      const u = unique[j].split(',');
      const uLength = u.length;
      const reg = new RegExp(u.reduce((acc, item) => acc + `(${item}+?)`, ''), 'g');
      let uCheck = 0;
      for (let k = 0; k < j; k++) {
        const result = unique[k].match(reg);
        if(result && result.length === uLength) unique.splice(k, 1);
        j--;
        k--;    // console.log(unique[k].match(reg))
      }
    }
  console.log(unique);
  return unique.length;
}

const relation = [
  [100,'ryan','music', 2, 121, 1111, 'nu'],
  [200,'apeach','math',2, 131, 1111, 'nu1'],
  [300,'tube','computer',3, 120, 1111, 'nu2'],
  [400,'con','computer',4, 11, 1101, 'nu3'],
  [500,'muzi','music',3, 121, 191, 'nu4'],
  [600,'apeach','music',2, 141, 1111, 'nu5']
]	

solution(relation);
```