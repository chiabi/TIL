# 웹팩

**http 요청이 비효율적**이기 때문에 파일을 하나로 합친다.

웹페이지는 많은 리소스들로(html, js, css, 웹폰트, 이미지, json 데이터 등등) 구성되어 있다.

- http/2는 하나의 커넥션에 동시에 여러 파일을 요청할 수 있다. 하지만 아직 보편화되지는 않음
- http/1.1은 커넥션 하나를 열어 하나씩 요청한다. 요청이 끝나야 다음 요청이 가능하기 때문에 요청이 많을수록 비효율적이다.

gulp, grunt 같은 태스크 러너를 이용해 js파일이나 css파일을 minify(압축)하고 하나로 합쳐주는 작업들을 할 수 있다.    
웹팩은 하나로 합쳐주면서 크로스 브라우징 대응도 하고 압축도 해주고 다양한 기능이 있는 번들러이다.

모듈시스템: `import`, `require`등을 쓰는 의존관계에 있는 JS들을 하나로 합쳐준다.

## 웹팩 설치

`webpack`, `webpack-cli`를 `-g`플래그로 전역에 먼저 설치해주고 프로젝트 폴더를 만들어서 `--save-dev(-D)` 플래그 통해 개발 및 테스트에서만 쓰이는 `devDependencies`로 설치해주자.

※ 패키지를 전역으로 설치하는 이유는 (바이너리 파일들이 PATH 환경변수 안에 포함되게 하여) 커맨드라인에서 사용하기 위해서이다.

웹팩4부터는 `webpack-cli`를 설치해야 커맨드라인에 `webpack`이라는 명령어를 사용할 수 있다고 한다.
```sh
# 글로벌 설치
npm i -g webpack webapck-cli

# 프로젝트 파일
mkdir project && cd project

# package.json 생성
npm init -y

# devDependencies로 설치
npm i -D webpack webpack-cli
```

package.json 파일에 다음과 같이 설치된다.
```json
{
  "devDependencies": {
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0"
  }
}
```

webpack은 gulp(`gulp.config.js`)처럼 설정 파일 하나로 모든 작업을 설정한다. 
프로젝트 폴더에(`package.json`과 같은 위치에) `webpack.config.js`파일을 만들자

※ 설정파일 명을 다르게 하고 싶다면, 다음과 같이 명령 실행시에 `--config` 플래그를 사용해 경로를 알려주면 된다.
```sh
webpack --config <변경한설정파일이름>.js
# 설정파일 이름을 prod.config.js로 했다면
webpack --config prod.config.js
```
package.json에 script로 추가한다면 다음과 같이 써주면 된다.
```json
// package.json
"scripts": {
  "build": "webpack --config prod.config.js"
}
```

`webpack.config.js`에 다음과 같이 작성하자.  
- [Simple Configuration](https://webpack.js.org/concepts/configuration/#simple-configuration)
```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: '',
  },
  output: {
    path: ,
    filename: '',
    publicPath: '',
  },
  module: {

  },
  plugins: [],
  optimization: {},
  resolve: {
    modules: ['node_modules'],
    extension: ['.js', '.json', '.jsx', 'css'],
  }
};
```

### [mode(+Wepack4)](https://webpack.js.org/concepts/mode/#src/components/Sidebar/Sidebar.jsx)

내장된 최적화를 사용할 지 여부
- devlopment: 개발용
- production(default): 배포용
- none: 기본 최적화 옵션을 사용하지 않음

### [entry](https://webpack.js.org/concepts/entry-points/#src/components/Sidebar/Sidebar.jsx)

웹팩이 파일을 읽어들이기 시작하는 부분

- 단일(단축) 표기법: 이 구문은 확장성이 없음
  > `entry: string|Array<string>`
  ```js
  module.exports = {
    entry: './path/to/my/entry/file.js'
  }
  ```
  ```js
  // 위는 이것의 단축 표기법이다.
  module.exports = {
    entry: {
      main: './path/to/my/entry/file.js'
    }
  }
  ```
- 객체 표기법
  > `entry: {[entryChunkName: string]: string|Array<string>}`
  ```js
  module.exports = {
    entry: {
      app: './src/app.js'.
      vendors: './src/vendors.js'
    }
  }
  ```
  독립된 `app.js`와 `vendors.js` 만든다. 보통 멀티페이지 사이트에서 이런식으로 entry를 여러 개 넣어준다. `entry`에 여러 파일을 넣고 싶을 때는 배열로 표기해주면 된다. `@babel/polyfill`같이 js파일 대신 npm 모듈을 넣어도 된다.
  ```js
  module.exposrts = {
    entyr: {
      app: ['@babel/polyfill', './client.js'],
      vendors: ['@babel/polyfill', 'react', 'react-dom']
    }
  }
  ```

--- 

전역설치 개념 참고
- [How to Install Global Packages](https://docs.npmjs.com/getting-started/installing-npm-packages-globally)
- [[node basic] npm: 글로벌 vs 로컬 설치](Global vs Local installation)

출처: http://blog.doortts.com/226 [여름으로 가는 문]](http://blog.doortts.com/226)

웹팩 설치/설정 참고
- [웹팩4(Webpack) 설정하기](https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d)