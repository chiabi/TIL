# Sass

> Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.

**Current Releases(2018.07.26 기준)**
- Dart Sass 1.10.1  
- LibSass 3.5.4  
- Ruby Sass 3.5.6 (2019년 쯤에는... [Ruby Sass is Deprecated](http://sass.logdown.com/posts/7081811))

## 참고 링크

- [Sass](https://sass-lang.com)
- [Less vs Sass vs Stylus](https://stackshare.io/stackups/less-vs-sass-vs-stylus)
- [Sass Guideline](https://sass-guidelin.es/#top)
- [PostCSS 소개(Medium - HyeonSeok Yang)](https://medium.com/@FourwingsY/postcss-%EC%86%8C%EA%B0%9C-727310aa6505)
- [Sass compatibility](http://sass-compatibility.github.io/)

## Sass는

CSS로 변환되는 스타일 시트 언어이다. 원래 Ruby로 구현되었다. 나중에 C++로 구현된 LibSass가 나왔는데, 루비 Sass보다 빠르고, 다른 언어로 설치하고 임베드하는 것이 매우 쉽다. 특히 Node.js 바인딩은 JavaScript 세계에서 Sass를 사용하는 매우 보편적인 방법이다.  
두 구현체는 각각 장점과 단점을 가지고 있는데, Ruby Sass는 느리고, Ruby 사용자가 아니라면 설치하기가 어렵다. 반면에, LibSass는 빠르고 이식성이 뛰어나지만, LibSass의 low-level 언어는 새로운 기능을 추가하는 것이 어렵다.  
LibSass의 개발 속도를 계속해서 Ruby Sass와 맞출 수 있을지 확신이 없고, Ruby Sass는 너무 느리다. CSS를 빠르게 생성하고 새로운 기능을 신속하게 추가할 수 있는 새로운 구현이 필요해졌고, Sass팀은 Dart를 선택했다.

자세한 내용은 [1년전 포스팅 된 Sass Blog의 글: Announcing Dart Sass](http://sass.logdown.com/posts/1022316-announcing-dart-sass)를 참고하자, Dart로 바꾼데에 여러 장점이 있지만, 일단 Dart VM은 JavaScript VM보다 훨씬 빠르고 한다.

## Sass 사용하기

CLI를 통한 설치와 명령어 사용이 고통스럽다면, VSCode 사용자는 익스텐션으로 [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)를 설치하자.  
VSCode 하단에 생기는 Watch Sass 버튼을 누르는 것만으로 실시간으로 브라우저 리로드하면서 Sass/SCSS 파일을 CSS 파일로 컴파일해준다. 또 다른 익스텐션인 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)와 같이 사용하기 좋고, Sass를 가볍게 써보기에 좋다.

### Sass install

Sass가 Dart로 전환되면서 이식성이 향상되어 Sass 설치가 매우 쉬워졌다.(gem 안녕...)  
다음의 방법 중 선택하여 설치할 수 있다고 한다. 
- pure-JavaScript version from npm 
  - `npm install -g sass.`
- Chocolatey users on Windows 
  - `choco install sass` 
  - or `choco upgrade sass` if you already have it.
- Homebrew users on Mac OS X 
  - `brew install sass/sass/sass` 
  - or `brew upgrade sass` if you already have it.
- Dart users
  - `pub global activate sass`


이 방법 외에 node-sass를 설치해보자
```sh
$ npm install node-sass
$ node-sass -v
node-sass       4.5.0   (Wrapper)       [JavaScript]
libsass         3.5.0.beta.2    (Sass Compiler) [C/C++]
```

### 설치 오류

다음과 같은 설치 에러가...  

["Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (57)" #134](https://github.com/Microsoft/PartsUnlimited/issues/134)
```
throw new Error(errors.unsupportedEnvironment());
      ^

Error: Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (57)
For more information on which environments are supported please see:
https://github.com/sass/node-sass/releases/tag/v4.5.0
```

나의 환경은 
```
node v8.11.1
npm v5.6.0
node-sass ^4.9.2
```
nvm을 통해 node 사용 버전을 6.10.0으로 다운하고 다시 node-sass를 설치했더니 작동된다. node 8버전과는 아직 호환되지 않나보다...;;

참고로 nvm으로 버전 이동은
```sh
$ nvm ls

  * 8.11.1 (Currently using 64-bit executable)
    6.10.0
$ nvm user 6.10.0
Now using node v6.10.0 (64-bit)
```

### Sass 명령어