# AMP 

## Paul Bakaus 연사

심플하고, 구글에서 검색했을 때 번개 모양이 있으면 AMP, 통합성이 좋다. 다른 페이지들과 잘 통합됨. 몇가지 고유한 특성이 있는데 이미지 태그가 없고, amp-img 태그가 있는데 이러한 것은 이미지 등을 AMP에서 관리하기 위함

AMP 거의 모든 페이지를 만들 수 있다. 전자상거래 등 다양한 프로젝트 가능

AMP 사용자 친화적이고 빠르다. 

### 왜 AMP를 만들었는가?

웹에는 많은 가능성이 존재한다. 웹이 가지고 있는 단점이기도 하다. 할 수는 있지만 다 하는 것이 좋지는 않다. 웹 페이지가 로딩될 때까지 답답하게 기다리는 상황은 공감할 것이다. 그런데 53%의 모든 페이지들 로딩되는데 3초이상이 걸린다. 3초만 지나면 이용자들이 그 사이트를 빠져나간다.
모바일 평균 웹페이지 로딩이 19초나 걸린다는 것 3G, lte가 아닌 경우라 글로벌 기준.
모든 모바일 커넥션중 60%가 2G이다. 또 하나의 문제는 광고를 더하면서 분석기능을 더하거나, 유저를 더 많이 확보해야 하는 목표와 그 반대로 유저의 경험이 좋아지거나 나빠질 수 있어 이 두가지 목표를 같이 추구해야하는 게 문제가 된다. 
비싼 것과 싼 것의 차이. 웹에서 누릴 수 있는 많은 잠재력이 있지만, 그것을 누리기 위한 노력을 해야한다.

AMP는 구글과 많은 다른 기업이 협력해 만든 것

신속한 아주 빠른 웹페이지를 만드는 것은 가능하지만 그게 목표느 ㄴ아니다. 
모두에게 빠른 웹페이지를 마드는 것이 목표

개발자들 입장에서 AMP는 어떤 혜택을 가져다 주는가?

layout 어트리뷰트는 아주 강력하다 서드파티 비디오처럼 아주 어려운 작업을 가능케 한다.
srcset은 이제 표준화되어 많은 이미지가 들어갈 수 있게 하낟.
amp의 기본적인 아이디어는 한라인의 자바스크립트 때문에 모든 코드가 망가질 수 있는데, 모든 작업을 고민하지 않아도 되겠끔 한다. 

amp를 해야하는 목적 - amp는 단순히 페어링된 사이트를 만드는 것이 아니라, 다양한 기능이 있다. 전자상거래나 애플리케이션과 같은 경험을 제공하거나, reponsive한 사이트를 만들 수 있다. PWA와 결합할 수 있다. AMP 스토리도 추가했다.

개발자들을 더 편하게 하고 사용자 경험을 위함, 사용자 때문에 AMP를 선택해야한다.  

## AMP: A Library for Building - Rich Content Experieces 

Crystal Lambert 연사

AMP에 대한 몇가지 fact

만들어진 동기 자체가 모바일 경험을 위함.
커스텀 자바스크립트를 지원하지 않고, 몇몇 제약들이 있다. 약간의 제약이 CSS에 존재하긴 한다.

AMP Start는 AMP 프로세스를 시작하기 위해 아주 좋은 툴, 템플릿들이 제공되고 있다. 전자상거래, 갤러리 등

AMP HTML 라이브러리가 많은 작업을 허용해준다. 얼마나 빠르고 쉽게 AMP 작업을 시작할 수 있는가.
- 스켈레톤 컴포넌트: 콘텐츠 스페이스를 가리지 않는 네비게이션이나 소셜 공유 버튼등을 제공한다.
- 빌딩 블록: 가장 대표적인 헤드라인 이미지(만약 모든 디바이스에 제공하기 위해 넓이 100%의 반응형 이미지를 사용한다면 퍼포먼스에 문제가 생길 수 있는데, AMP를 적용한다면, 페이지를 먼저 레이아웃한 다음 제공된 유형에 따라 홀딩한다.??? 리소스를 다운로드해 중간해 툭툭 튀는 상황도 벗어날 수 있게 해준다.), 컨테이너 디멘션을 기준으로 `layout="responsive | fixed | fill"`  
- 페이지 안에 임베드하는 것(유튜브 영상이라거나)은 퍼포먼스에 영향을 미치는데 AMP는 강력한 layout 어트리뷰트를 통해 반응형으로 만들 수 있고, 퍼포먼스가 저하되지 않게한다.
- 커스텀 폰트: 로딩시간에 따라 폰트가 적용될 수 있게 할 수 있다. (amp-fit-text는 폰트의 사이즈를 정해진 폭과 높이 안에서 결정되게 함)
- 유저가 몰입하게 하는 다양한 컴포넌트가 있다. - 캐러셀(amp-carousel), 라이트박스 속성 혹은 컴포넌트(amp-lightbox-gallery), 아코디언(amp-accordion)
- 특별한 효과: amp-animation, 단발성 애니메이션이 아니라 특정 시점에서 발생하는 애니메이션은 특별한 api를 필요로 한다. 패럴렉스가 가능해진다. 패럴렉스를 싫어하는 사람은 로딩이 느리기 때문인데 이 문제도 amp가 해결해준다. amp-position-observer(특정 시점에 ), amp-fx-flying-carpet: 기본적으로 백그라운드 이미지가 앱을 만들어 콘텐츠를 그 앞단에 보여주는 것, 

모바일에서 콘텐츠를 소비하는 방식이 바꼈다. 오랜 시간 머물지 않고, 긴 글을 읽지 않는다. 이러한 사용자 경험을 위해 나온 것인 AMP Stories 

빌트인 된 레이아웃과 빌트인 된 애니메이션이 있다. 멀티 디바이스를 지원한다. 

[AMP EXAMPLE](https://ampbyexample.com/)

## Wiliam Chou

개발자들이 amp를 봤을 때 뉴스처럼 정적 컨텐츠에 적합하다고 봤던 것 같다. 좀 더 좋은 빠른 컨텐츠를 뉴스가 제공할 수 있도록 활용할 수 있다는 것도 맞지만, 그 외 많은 것들을 위해 활용될 수 있다. 

특히 성능에 큰 타격을 받는것에 전자 상거래이다. 이커머스를 사용하는 유저들이 가장 인내심이 떨어짐, 퍼포먼스가 떨어지면 떠나간다. 로드 타임이 1초가 늘어날 때마다, 온라인 쇼핑 사이트들을 보면 유저들이 구매까지 이어지는 게 7% 떨어진다. 이커머스야말로 amp가 좋은 경제적 가치를 제안한다고 본다. 구글이나 검색엔진에 연결되는 것 소셜미디어에 공유되는 부분 등 amp의 장점을 이커머스에서 잘 활용할 수 있음.

실제로 알리익스프레스는 컨버전스 비율이 4.3%증가...

이커머스 페이지를 구축한다는 것은 뉴스 아티클이나 블로그보다 훨씬 복잡하다. 배송 옵션이나 색상 옵션, 사이즈 선택에 따른 상세 정보 등등

이커머스 페이지는 제품 디테일 관련 페이지 필터 소팅, 퍼스널라이제이션 amp 페이지에서 조금 더 상세적으로 들어갈 수 있다. amp cache가 캐싱함. 나중에 구매하기 위해 위시리스트에 넣는다든지...

AMP components

유연성을 향상하기 위해 복합적으로 사용할 수 있다.
- amp-selector: 유저로 하여금 특정 옵션을 다양한 옵션 리스트에서 선택할 수 있도록 한다. 
- amp-list & amp-mustache: 관련 상품, 추천 상품
- amp-date-picker: 커스터마이징이 가능하다든가 플랙시블한 컴포넌트
- amp-bind: 프로그래밍 형태의 컴포넌트, 데이터 바인딩

Combine components

amp-bind는 모두 컴포넌트에서 풀로(glue) 활용될 수 있다.
- amp-bind + amp-selector
- amp-form + amp-bind
- amp-access + amp-mustache: 개인화 된 경험
- amp-list + amp-pixel
- mpa-animation + amp position observer

내가 원하는 컴포넌트가 없다면?  
AMP는 HTML에 스페셜 소스를 조금 가미한 것이기 때문에 HTML이나 CSS를 사용할 수 있다. 

다음에는 amp-pan-zoom 

## PWA AMP

- Kristoper

빠르고 인터렉티브한 것을 만드는 것에 얼마나 많은 비용이 드는지.

새로운 애플리케이션을 만든다고 할 때, 다른 서비스로 부터 유저를 빼앗아 오기 힘들다. 

amp는 양쪽에 모두 활용할 수 있다. 

웹쉘이 있고 iframe이 있다. iframe은 느리다. 지속적이고 반복적으로 리퀘스트를 보낸다. 쉐도우 돔을 이용해 이 문제를 해결하려 함(웹 컴포넌트가 프라이빗하게 유지하는 dom)

PWAMP FTW

## AMP in production

- 이동휘 연사(@captain-lee)

Production-ready AMP

생성-최적화-검증-트래픽 측정-배포

- 생성  
보통은 CMS에 플러그인/컨버터를 제공해 AMP를 만든다. 이러한 컨버터나 플러그인을 사용하면 내가 원하는대로 나오지 않을 수 있다.   AMP를 바로 만드는게 훨씬 더 나은 퀄리티를 낼 수 있다.
- 최적화  
사용하지 않는 컴포넌트 제거, 웹사이트 전체 Global CSS보단 로컬로(인라인 50kb를 넘지 않도록 한다.), 이미지 최적화(파일 포맷을 신경써서 사용하자.(png))
- 검증
vaild AMP였던 페이지가 invalid하게 되는 경우가 있다. 
  + 지속적으로 integration 테스트: 바뀌는 것이 있을 때마다 검증하고 커밋(amphtml-validator)
  + 바뀌는 것을 모니터링: amphtml-validator + cron.js
search console, webpage test 툴...
- 사용자 트래픽 측정
  + amp-analytics(mesure + collect + batch)
  + A/B테스팅
- 배포
  + 여러 플랫폼에 AMP 페이지 잘 나오게 해야함 - 메타 데이터가 필요함
  + scheme.org metadata

## What's next in AMP

- Rozier Joey

앞으로 AMP에 무엇을 기대해도 좋은지

비전이자 미션 - user first

- infinite scroll
- tilt-based animation
- pan & zoom
- image compare
- pdf / doc viewr
- input masking - 유저에게 폼의 힌트 제공

media
- video docking - 스크롤링 할 때 영상이 우측 상단에 작게 픽스되는 거
- stiky button amp-audio
- customizable video controls

storytelling - amp stories
- overflow menu
- tap targets in top 80% 
- paywalls: 어떻게 사람들이 돈을 벌 수 있도록 하는 가에 초점을 맞추고 있다.

developer tooling
- AMP in Gutenberg(WordPress)
- Automatic PWA + AMP

better urls
- web packing on the amp cache
- amp for email

[The AMP Project Roadmap](https://www.ampproject.org/roadmap)

## SBS

+ 최적화 성능을 위한 노력 - Google page speed, 이미지 optimizer, page speed insight... AMP
+ AMP적용범위  - 구글 뉴스, Flipboard NEWS, Twitter NEWS 

## Advertising & AMP

광고의 3가지 문제
- 방해하는(블로킹하는) 광고
- 오래 걸리는 광고 로딩
  - 스크립트가 엄청 무거움, 여러 스크립트가 겹치면 자바스크립트는 싱글스레드니까 굉장히 느릴 수 밖에 없음
- 안전하지 않은 광고

지금까지는 누구도 이러한 문제를 완전히 해결하지 못했음

AMP 페이지에서의 광고

- 사이즈를 잡아줌
  - 유저 액션과 다르게 커버하거나 하는 콘텐츠 없음
- 광고를 분리함 
  - `<iframe sandbox>`
- prioritized Content

## QNA

파이어베이스에서 사용하는 건 호스팅 서비스만 이용하고 있음..

접근성 관련해서 aria-label을 사용한다거나 하는 것은 기본적으로 가능함(대부분 가능함) 접근성도 잘 지원하고 있으니 혹 이슈가 있으면 알려달라.

구글에서 얼마나 높은 우선순위를 가지는 프로젝트인지?? - 높은 편

pwa와 amp 팀 모두 사용자 경험을 우선으로 하고 있다. 많이 공유하고 있다?
웹이 생존하기 위해선 모바일에서 훨씬 리치하고 빨라야 한다. pwa가 번창해야 한다. 앱으로 부터 웹으로 이용자를 불러들이는 방법

빠른 로딩을 위해 캐싱을 해야하는데, 프리렌더를 안전하게, 이용자의 프라이버시를 보호하기 위해선 구글 도메인을 사용해야 함  
과거에는 안되었는데 애널리틱스에 개선이 도입되 클라이언트 아이디라는 것을 도입해 도메인에 거쳐서 다른 도메인을 제공하도록 되어 있는데, 다른 벤더에서도 지원하는지는 확실치 않음???
구글 애널리틱스 클라이언트 아이디 amp를 검색하라


<!-- 앵귤러와 시너지를 기대해도 되는지??  -->

컨버터를 자체적으로 제공하지는 않을 것이고 다른 컨버터들이 비 amp 프로젝트를 amp 프로젝트로 만들어준다.  
자바스크립트가 시멘틱하거나 선언적이지 않다. 
컨버전을 하기 위한 지침이 따로 있다. 
컨버전하고 2개의 페이지를 페어링하게 되면 콘텐츠 미스매칭같은 에러가 발생할 수 있다. 전체를 컨버젼할 필요는 없다. 가장 많이 방문하는 페이지부터 실험적으로 컨버젼해보는 것이 좋다.  