# Flexible Box Layout Module 

## 1. 서론

CSS 2.1은 네가지 레이아웃 모드를 정의한다. - 형제, 조상 박스와의 관계를 기반으로 박스 크기와 위치를 결정하는 알고리즘.

+ block layout: 문서 배치 용으로 설계 
+ inline layout: 텍스트 배치 용으로 설계 
+ table layout: 2D 데이터를 표 형식으로 배치하기 위해 설계
+ positioned layout: 문서에서 다른 요소를 고려하지 않고, 매우 명시적인 위치를 지정하기 위해 설계

**Flexible Box Layout Module**은 flex layout이라는 새로운 레이아웃 모드를 도입한 모듈이다. 더욱 복잡한 애플리케이션과 웹페이지 배치를 위해 설계되었다.  

### 1.1. 개요

+ 플렉스 레이아웃은 블럭 레이아웃과 표면적으로 유사하다.  
+ `float`과 `columns`같이 블록 레이아웃에서 사용할 수 있는 더 복잡한 텍스트 또는 문서 중심 속성은 많이 없다.  
+ 대신 공간을 나누고 웹앱과 복잡한 웹 페이지에 종종 필요한 방식으로 컨텐츠를 정렬하기 위한 간단하고 강력한 도구이다.  

#### flex container

+ **flow diection**: 어떤 흐름의 방향으로도 배치 할 수 있다.(상하좌우)
+ **reversed, rearranged**: 스타일 레이어에서 보이는 순서를 반전시키거나 재배열 할 수 있다. (즉, 시각적 순서는 소스 와 음성 순서와는 독립적일 수 있다.)
+ **linear layout, multiple line**: 단일 (주)축을 따라 선형적으로 배치되거나 보조(교차)축을 따라 여러 줄로 감쌀 수 있다.
+ **flexibility**: 가용 영역에 대응하여 크기를 '가변(flex)'할 수 있다.
+ **alignment**: 컨테이너 또는 교차축에서 다른 요소에 대해 서로 정렬할 수 있다.
+ **collapsed items**: 컨테이너의 교차 크기를 유지하면서 주축을 따라 동적으로 접거나 접은 것을 해제 할 수 있다.

> #### EXAMPLE 1
> 
> 다음은 각 아이템에 타이틀, 사진, 설명 그리고 구입 버튼이 있는 카탈로그 예이다. 
> 디자이너의 의도는 각 아이템의 전체 크기가 같고 사진이 텍스트 위에 있고,  구매버튼이 항목 설명 길이와 상관 없이 아래쪽에 정렬되는 것이다.  
> Flex 레이아웃은 이 디자인의 여러 측면을 쉽게 만든다.
> 
> + 카탈로그는 플렉스 레이아웃을 사용해 항목 행을 가로로 배열하고 행 안에 있는 항목이 모두 동일한 높이에 있도록 한다. 그다음 각 항목은 그 자체가 컬럼 플렉스 컨테이너이며 내용을 세로로 배치한다.
> + 각 항목내에서 원본 문서 논리적으로 제목이 먼저 나오고 그 뒤로 설명, 사진이 따른다. 이는 음성 렌더링과 비 CSS 브라우저에서 합리적인 순서를 제공한다.  그러나 좀 더 눈길을 끄는 시각적 표현을 위해, 글 뒤에서 상단으로 이미지를 위로 이미지를 당기는데` order`를 사용하고 수평으로 가운데 정렬하는데 `align-self`가 사용된다.
> + 구매 버튼 위의 자동(`auto`) 여백(`margin`)은 구매버튼을 해당 항목 설명의 높이와 상관없이 각 입력 상자 하단으로 강제로 밀어낸다.
> ```css
> #deals {
>   display: flex;        /* Flex layout 아이템이 동일한 높이를 갖게 한다  */
>   flex-flow: row wrap;  /* 아이템들이 여러 줄로 감싸이게 한다. */
> }
> .sale-item {
>   display: flex;        /* flex layout을 사용하는 각 항목을 배치한다. */
>   flex-flow: column;    /* 아이템 내용을 수직으로 배치한다  */
> }
> .sale-item > img {
>   order: -1;            /* 시각적 순서상 이미지가 다른 콘텐츠보다 먼저 오도록 이동시킨다. */
>   align-self: center;   /* 이미지를 가로 방향에서 가운데 정렬되게 한다.         */
> }
> .sale-item > button {
>   margin-top: auto;     /* 버튼을 아래쪽으로 밀어내는 위의 여백을 자동으로 설정한다. */
> }
> ```
> ```html
> <section id="deals">
>   <section class="sale-item">
>     <h1>Computer Starter Kit</h1>
>     <p>This is the best computer money can buy, if you don’t have much money.
>     <ul>
>       <li>Computer
>       <li>Monitor
>       <li>Keyboard
>       <li>Mouse
>     </ul>
>     <img src="images/computer.jpg"
>          alt="You get: a white computer with matching peripherals.">
>     <button>BUY NOW</button>
>   </section>
>   <section class="sale-item">
>     …
>   </section>
>   …
> </section>
> ```


### 1.2. 모듈 상호운용성

이 모듈은 [CSS21]의 `display` 속성의 정의를 확장하여 새로운 블록 레벨과 새로운 인라인 레벨 디스플레이 유형을 추가하고, 레이아웃을 제어하기 위한 속성과 함께 새로운 지정 컨텍스트 유형을 정의한다.

이 모듈에 정의 된 속성 중 어떤 것도 `::first-line` 또는 `::first-letter` 가상 셀렉터에 적용되지 않는다.

CSS Box Alignment Module은 여기에 소개된 정렬 속성(`justify-content`, `align-items`, `align-self`, `align-content`)의 정의를 확장하고 대신한다.

## 2. 플렉스 레이아웃 박스 모델과 기술

플렉스 컨테이너는 계산 된 `display` 또는 `flex` 또는 `inline-flex`가 있는 요소에 의해 생성된 박스이다.

레이아웃 계산이 블록과 인라인 흐름 방향으로 치우치는 블록, 인라인 레이아웃과 달리 플렉스 레이아웃은 플렉스 방향으로 치우친다.

