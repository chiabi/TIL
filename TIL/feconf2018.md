# FECONF 2018

## 키노트


## TC39 스펙에 대한 주관적 참견 시점

서재원

- ECMA 재단 'TC(Technical Committe)39'
- Proposal(제안) - 누구나 제안할 수 있다. 

### TC39 Process

- stage 0, 
- stage 1, 
- stage 2, 
- stage 3,  - 명세 작성자들의 승인을 받는다
- stage 4,  - ECMA의 테스트를 제출한다. 테스트를 통과하는 2개 이상의 구현체(브라우저)가 존재해야 한다.

### Contirbute

- TC39 github(github.com/tc39)
- tc39/ecma262: 최신 자바스크립트 표준 문서가 보관되어 있는 저장소
- tc39/Proposal: tc39에 제출된 모든 Proposal들이 보관되어 있는 저장소, 모든 Proposal들의 진행 사항을 한 눈에 볼 수 있다.

proposal-(기능명)
- tc39에 제출된 proposal의 전용 저장소
- 문제점, 추가 기능 등이 주 된 이슈

#### 어떤 proposal에서 나온 이슈와 어떻게 다뤘는지

proposal-decorator
- 이 함수는 이 기능에 덧붙이기 위해서만 사용될 것이다라는 걸 알려줌
- 다음의 proposal 들에 기반하여 제작되었다. 
  - class fields(클래스의 필드를 정의하는 문법 추가)
  - private methods
  -

classfieldDefinitionEvalution
- 클래스 필드 선언을 평가하는 런타임 시멘틱
- 평가된 클래스 필드의 정보들을 모아 둔 객체를 반환한다.

classElementEvaluation
- 클래스의 엘리먼트 선언을 평가하는 런타임 시멘틱
- classfieldDefinitionEvalution 을 호출하고 그 결과를 가공해서 반환하고 있다.

element descriptor

## Redux Saga 사이드 이펙트

이민규

리덕스와 UI의 사이클에서 비동기 적인 것이 들어갈 수 있는 부분???
- 미들웨어: 리덕스 안에 dispacth, base dispacth

리덕스 thunk의 한계, 액션 크리에이터가 액션 객체를 반환하지 않는다. 
->  리덕스 사가 - 제네레이터와 사가를 기본으로 한 개념을 소개한다.
- 테스트가 가능하고
- 관리하기 쉽고
- 적당한 패턴으로 서비스 로직을 쉽게 만들 수 있다.

비동기 적인 것을 리덕스 사가를 이용해 고립시켜라
- 동기적, 퓨터 api
- 비동기적인 것은 어떻게?
- 리덕스 미들웨어(redux thunk)
- 리덕스 사가

리덕스 사가의 컨셉
- 사이드 이펙트: 비동기 적인 것, 브라우저 캐시, 데이터 패칭, 로컬스토리징 같은 것들
  - 부수효과: 코드가 외부 세계에 영향을 주는 것
  - 부작용은 nagative side effect
  - 리액트(뷰레이어), 리덕스(상태 레이어), 리덕스 사가(사이드 이펙트 레이어)
- generator: 제너레이터를 적극적으로 사용하고 있다. 
  - 제너레이터 함수(callee)를 만들면, 러너라는 콜러(caller)가 있다.
  - 제너레이터 컨셉 찾아보자, 어떻게 관리 되는지
- 사가: 장기 트랜잭션을 어떻게 관리할 것인가? 실패처리는 어떻게 효율적으로 할 것인가? 라는 논문이 있는데 사가는 좀 더 좁은 의미로 사이드 이펙트에 대한 관리를 다룬다.
  - 제너레이터와 거의 같은 flow로 동작한다고 보면 된다.(saga(callee), saga middleware(caller))
  - 사이트 이펙트 처리요청, 처리, 결과를 전달하는 역할을 한다.
  - 비동기 액션을 받아서(watch) 딜레이 시키고(delay(100) - 사이드 이펙트 처리) 또다른 액션을 디스패치한다. 이 액션은 실질적으로 리듀서로 상태를 업데이트 한다.
  - yield delay(100)
- 이팩트: 리덕스의 액션과 비슷한 개념, 프로미스를 기다려라 등의 명령이 포함된다.
  - 미들웨어에 의해 수행되는 명령을 담고 있는 평범한 자바스크립트 객체
  - 굉장히 많은 이팩트 크리에이터가 있음(api 확인)
  - 이팩트를 yield 하면 미들웨어에서 처리가 끝날 때까지 기다려야 하나? - Blocking effect, NON-Blocking effect로 나뉜다.
    - 블로킹: await를 사용하듯이 기다렸다가 순차적으로 처리: yield call(api.fetchA), yield tack(ACTION)..
    - 논블로킹: 기다리지 않고 다음 코드를 실행함: yield run(api.fetchA), yield put(action), yield cancel(task)...
- 채널: 외부 이벤트와 saga는 어떻게 연결하나요?
  - 이벤트 같은 경우 on이라는 이름의 함수를 가지고 리스너에 등록하고 이벤트가 언제 발생할 지는 모르나 발생하면 뭘 한다는 약속이 있음
  <!-- - 사가는 올때까지 기다린다. 웹 소켓 이벤트는 push, 사가는 pull -->
  - push: 리스너 혹은 핸들러를 만들어 이를 등록시킨다. 
  - pull: 등록된 이벤트를 끌어와서 사용
  - push -> pull(+defferd): 당겨올때 데이터가 있는지 없는지 모르기 때문에 defferd 라는 개념이 추가됨. 
    defferd 안의 resolve의 then을 통해 데이터가 있다는 것을 확인할 수 있다. 그러나 then을 이용하면 스코프가 생겨남
  - 사가에서 사용한다면 위 개념이 좀 달라짐, 스코프를 나누지 않고 코드 블로킹을 시키면서 구현한다. 
  - 이를 일반화를 할 수는 없을 까 -> CSP(COMMUNICATION SEUQENTIAL PROCESS)
    - 프로세스
    - 채널
  - 리덕스의 액션도 사가의 내부의 채널을 통해 가져옴
- Orchestration
  - 중복되는 액션을 어떻게 처리할 것인가?: 이벤트를 많이 해서 라우팅이 빠르게 변경되어야 하는 경우, 순서가 보장 될 수 있는가?
    - 리덕스가 업데이트 될 때 어떤게 가장 마지막 상태일지 보장할 수 있는가 => takeLatest 이펙트를 사용하면 여러 요청 중 가장 마지막 요청만 처리한다.녀
  - 외부 이벤트를 어떻게 처리(external event)
    - 파일 업로드라는 동작같은 자체가 사이드 이펙트인 동작
    - 리스너와 사가는 어떻게 통신하는가?(리스너는 push 방식이고, 사가는 pull 방식이므로 채널을 이용한다)
  - 스레드 - 프로미스 all 같은것을 사용할 경우 낭비되는 시간을 줄여준다. 

제너레이터 테스트는 테스트 코드와 구현코드의 커플링이 발생한다 _ redux-saga-test-plan이라는 라이브러리를 통해 해결할 수 있다.

## WebGL

전기환 - 중앙일보 디지털 스페셜

- 웹 브라우저에서 GPU를 사용한다. CPU를 사용하는 건 아니라서 빠르다
- IE11+ 
- 어디에 쓰는가? : 웹 게임, 인터렉티브 페이지

three.js 어떻게 시작하는가
- goo.gl/Zu7Hxt

3d 모델링은 
- DAE, FBX등의 문서로 나옴, 로더 js를 붙여주면 된다.

꿀팁
- 렌더에서 antlialis: true를 쓰면 모델링이 부드러워진다.
- 카메라 이동 tween max 사용

## Polyfill

임형주

- 자체 폴리필 IO라는 서비스를 어떻게 이용하게 되엇는지
- 기본적으로 바벨이 해주는 것은 코드 트랜스폼을 해주고 폴리필 라이브러리를 통해 처리를 해주고 있다.(자체적으로 폴리필인 것은 아님)
- 바벨이 새로운 메소드들을 대응해주지 않으므로 폴리필을 사용하게 된다.
- 바벨의 폴리필 패키지를 통해 인스톨하게 된다.(@babel/polyfill)
- 웹팩에서 바벨의 폴리필을 엔트리 포인트로 잡아서 다른 애플리케이션 위에서 선언되도록 인클루드한다.
- 컴파일된 바벨 코드 앞에서 선언되어야 한다.

사이즈는 괜찮은지? 바벨이 기본적으로 임포트 하고 있는 소스가 많은데?  
기본적으로 폴리필의 사이즈가 굉장히 큰데 괜찮은지? 바벨에서 최적화해주는 옵션이 있다.
- @babel/preset-env 어느 브라우저 타겟까지 컴파일 시킬것인가를 설정과 함께 조정할 수 있다.
- useBiltlns 옵션
  - entry: 엔트리 포인트를 잡아서 필요한 셋만 직접 임포트 해주는 식
  - usage: 파일마다 필요한 셋만 임포트 해주는 식

상당수의 (최신) 브라우저는 이러한 방식이 필요없는데, 

Polyfill.io 유저 에이전트를 체크해 필요한 폴리필만 내려주자는 컨셉으로 제공되는 서비스
- 스크립트 태그에 cdn을 추가해줌 그러면 폴리필 서비스에서 브라우저에서 필요한 폴리필만 번들링해줘서 내려주는 방식이다.
- 내려온 파일을 보면 UA detected: chrome (요청한 에이전트가 주석으로 출력됨)

문제점은 이 서버가 항상 동작한다는 보장이 없다.
- 오픈 소스로 공개되어 있으므로 내려받아 직접 자기만의 폴리필 서버를 운영해 볼 수 있다.
- 기본적으로 express 기반으로 돌아가게 되어 있다. 

서비스로 올릴때 중요한 포인트는
- 캐시
- 노드는 싱글스레드이므로 멀티 프로세스
- 노드가 죽을 수 있으므로 프로젝트 매니저

엄청나게 다양한 유저에이전트(만천개 이상이 유니크한 유저 에이전트 스트링)을 기반으로 캐시하면 비효율적, varnish라는 모듈을 사용, 
<!-- 노멀라이제이션 api를 만들고 -->
- 스파이더 몽키
- estree: 
- AST Expolorer
- node-falfafel


## 은밀하게 신속하게 리액트 포팅 성공기

From jQuery to React

리팩토링 노하우

- AWS elastic file system - 여러 서버간에 동일한 물리
  - 배포하다 프로덕션 서버가 뻗지 않도록...

NextJS
- 풍부한 예제
- HMR 기본 탑재, 코드스플리팅

캐싱이 반드시 필요하다 캐싱 없이 서버 사이드 렌더링을 한다면 속도가 느려진다.