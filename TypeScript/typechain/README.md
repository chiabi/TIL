# Typechain

Learning Typescript by making a Blockchain with it.

```js
{
  // node.js를 평범하게 사용하고, 다양한 걸 import하거나 export 할 수 있게 만드는 것
  "compilerOptions": {
    "module": "commonjs",
    // 어떤 버전의 javascript로 컴파일 되게 하고 싶은지
    "target": "ES2015",
    "sourcemap": "true",
  },
  // 어떤 파일들이 컴파일 과정에 포함되는 지 Typescript에 알려줌
  "include": ["index.ts"],
  // 컴파일 과정에 제외되는
  "exclude": ["node_modules"],
}
```

`tsc`: typescript 명령어
