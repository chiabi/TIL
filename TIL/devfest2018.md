# devfest

## Chrome Dev Tool

한재엽

성능이란? UX다. 사용자의 경험을 고려해서 최적화한다.  
현재 애플리케이션의 성능을 측정할 수 없다면 개선할 수 없다.

### 측정
얼마나 빨라야 좋은지 

- RAIL: 구글이 내놓은 성능 측정 기준 모델

현실적으로 RAIL을 따르기 어려움 
- 귀찮고, 이슈파악하기 어렵고... 다시 측정하고 문제 해결해야하고

그래서 내놓은 측정 자동화 툴(시뮬레이팅 도구)  
**Audits**: Light house

웹앱이 돌아갈 환경(디바이스), 검색 최적화 등을 측정할 것인지 선택 가능, CPU성능 등을 선택 가능  
시뮬레이팅을 돌려 측정 결과를 도식화해서 보여준다. 
RAIL 모델에 기반한 지표를 보여준다. 접근성 면에서도 측정해준다. 
자바스크립트 패턴 중 안티패턴도 잡아준다.(best prectice..)

### 개선 

- 로딩과정
  - TTFB(Time To First Bytes)
- 3R
  - Request 개수 줄이기(With webpack, Lazy loading)
  - Resource사이즈 줄이기(with webpack(DCE, obfuscation, tree-shaking, code-splitting), 이미지 최적화)
    - lodash는 그냥 사용하면 트리 쉐이킹이 안되고 전체가 번들링 파일이 된다. (lodash.esm을 사용하자)
  - Rendering 시간 단축(CRP최적화(Script tag with async/defer keyword), reflow최소화, 부드러운 애니메이션)
- 최적화

#### Lazy loading

react-lazyload의 코드는 구멍이 많은;;;
- getBoundingClientRect() 는 리플로우를 일으킨다. 이것이 계속 호출되게 만드는 코드다. 
- 이부분에 throttle을 넣을 수 있는 옵션이 있지만...

intersectionOberserver로 해결하자
- ie와 사파리에서는 지원하지 않지만 폴리필을 제공하고 있다.
- image lazy loading - custom image element
- lazy initialize example

data url scheme을 통해 불러옴 - 이 이미지는 네크워크로 불러온 것과 달리 캐싱이 되지 않음
- 캐싱할 필요없는 데이터, 작은 용량의 이미지 파일에 적용하자

srcset attribute: 디바이스의 pixel ratio크기에 맞는 이미지를 사용
- ie는 지원하지 않고, 폴리필도 없음

metadata: 이미지에는 많은 metadata가 있고 이를 제거해주면 이미지 용량을 줄일 수 있다. 

#### 부드러운 애니메이션

- 하드웨어 가속: GPU 가속 (크롬의 Layer탭)
  - 하드웨어 가속이 적용한 엘리먼트 위에 또 다른 하드웨어 가속이 적용되지 않은 엘리먼트가 있다면 컴포짓시켜서 적용된다
- 스크롤은 가벼워야한다. 스크롤에 laz loading을 거는 것은 안티패턴
   - 스크롤에 따라 발생해야하는 애니메이션에 throttling을 적용하면 안될 때도 있기 때문에
      - requestAnimationFrame api를 사용한다. 

이벤트마다 passive 기본값이 다르다. 

각 상황에 따라 맞는 성능 튜닝을 해야하기 때문에, 개발이 어느정도 완료된 후 진행하길 바람(오버 엔지니어링이 될 수 있다. 사용자 경험을 고려해 성능하자)
- 국소적으로 성능을 측정할 수 있는 도구가 있다. 

## 실전 SPA상태관리 톺아보기

김동우

## 

PWA, 코드 스플리팅, SSR, 성능

- 사용자에게 가장 큰 영향을 미치는 것은 페이지 로딩 속도이다(심플함, 이쁜지 보다 훨씬 더)

웹을 배포할 때 통상적으로 이 시간 안에는 통과해야한다는(tti - 5s, subsequent loads - 2s) 기준이 있음  
(이 이상이 넘어가면 사용자가 느리다고 느낀다.)

- SPA는 초기 구동 속도가 상당히 느리다. 

