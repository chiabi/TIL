```js
{
  "compilerOptions": {
    /*
     * baseUrl: string
     * (TS 2.0)상대 경로에 위치한 모듈을 가져오기 위해 설정
     */
    "baseUrl": ".",

    /*
     * module: string(target이 ES6면 ES6 || CommonJS)
     * 모듈 형식 지정(ES6, ES2015, CommonJS)
     */
    "module": "commonjs",

    /*
     * target: string(ES3)
     * 컴파일 후 변환될 ECMA 스크립트 버전
     */
    "target": "es5",

    /*
     * lib: string[]
     * 컴파일할 때 포함할 라이브러리 파일 목록
     */
    "lib": ["es6", "dom", "esnext.asynciterable"],

    /*
     * sourceMap: boolean(false)
     * 컴파일 후 맵(map) 파일의 생성 여부를 결정
     */
    "sourceMap": true,

    /*
     * allowJS: boolean(false)
     * 자바스크립트 파일이 타입스크립트 파일과 함께 컴파일 될 수 있도록 한다.
     */
    "allowJs": true,

    /*
     * moduleResolution: string(module이 "AMD", "System", "ES6"일 경우 Classic || Node)
     * 모듈 해결 전략을 지정하는데 사용된다.
     */
    "moduleResolution": "node",

    /*
     * rootDi: string(공통루트 디렉토리는 입력 파일 목록의 디렉터리를 기준으로 설정)
     * 입력 파일의 루트 디렉토리를 지정한다.
     * outDir을 사용해 출력 디렉토리를 제어하는 경우에만 사용
     */
    "rootDir": "src",

    /*
     * forceConsistentCasingInFileNames: boolean(false)
     * 같은 파일에서 일치하지 않은 참조를 허용하지 않도록 설정
     */
    "forceConsistentCasingInFileNames": true,

    /*
     * noImplicitReturns: boolean(false)
     * 함수 내부의 모든 코드 경로에 반환값이 없다면 에러를 출력
     */
    "noImplicitReturns": true,

    /*
     * noImplicitThis: boolean(false)
     * (TS2.0)명시적으로 타입이 선언되지 않은 함수를 검사할 때 사용
     */
    "noImplicitThis": true,

    /* noImplicitAny:
     * any 타입으로 암묵적 형변환 여부를 결정한다. (default: false)
     * false일 경우 타입 선언이 없는 변수는 any 타입으로 암묵적 형변환 된다.
     */
    "noImplicitAny": false,

    /*
     * strictNullChecks: boolean(false)
     * (TS2.0)strict null검사 모드를 수행할 지 여부
     */
    "strictNullChecks": true,

    /*
     * suppressImplicitAnyIndexErrors: boolean(false)
     * 객체 리터럴의 초과 속성 검사를 억제할지 설정
     */
    "suppressImplicitAnyIndexErrors": true,

    /*
     * noUnusedLocals: boolean(false)
     * (TS2.0)사용하지 않는 지역 오류에 대한 보고 여부 설정
     */
    "noUnusedLocals": true,

    /*
     * esModuleInterop: boolean(false)
     * ECMA 스크립트 모듈과 상호 운용성을 가능하게 하는 속성
     * true일 경우 CommonJS모듈을 디폴트 모듈처럼 사용할 수 있다.
     * Babel과 호환성을 유지하기 위해 필요
     */
    "esModuleInterop": true,

    /*
     * skipLibCheck: boolean(false)
     * (TS2.0)모든 선언 파일에 대한 타입 검사를 생략할지 설정
     */
    "skipLibCheck": true,

    /*
     * experimentalDecorators: boolean(false)
     * ES데코레이터를 실험적으로 활성화할지
     */
    "experimentalDecorators": true,

    /*
     * emitDecoratorMetadata: boolean(false)
     * 소스에서 데코레이팅 된 선언에 대한 디자인 타입 메타데이터를 내보낼지 설정
     */
    "emitDecoratorMetadata": true

  },
  // exclude: 컴파일 시 제외될 디렉토리를 지정한다.
  "exclude": [
    "node_modules",
    "build",
    "scripts",
    "acceptance-tests",
    "webpack",
    "jest",
    "src/setupTests.ts"
  ]
}
```
