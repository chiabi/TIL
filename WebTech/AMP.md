# AMP(Acclerated Mobile Page)

2018.08.22 - GDG Seoul meetup
발표자: 이동휘

앰프??
새로운 포맷
모바일 컨텐츠를 쉽게 만드는 포맷

## AMP Stories

AMP - 모바일환경에서 웹페이지를 빠르게 동작하도록하는 포맷, 플랫폼  
목적은 속도

모바일에서는 속도만 중요한 것이 아니라, 새로운 콘텐츠를 만드는 게 중요. 이러한 점이 쉽지 않음 긴 기사, 긴 글은 모바일에서 보기 힘들다. 1, 2분 안에 읽을 수 있는 정보, 서사가 있는 정보, 시각적효과가 있는 콘텐츠를 제작해야 함

AMP Stories 라는 포맷은 이러한 콘텐츠를 쉽게 제작할 수 있도록 한다.  
웹에서 시각적인 스토리텔링을 할 수 있는 오픈 포맷

영상, 이미지를 포함한 콘텐츠를 웹에서 구현하려면, 과거에는 플래시를 이용해야 했다. 

플래시처럼 애니메이션을 잘 구현하려면, html, css,js로도 가능하다 하지만 폼은 많이 들어가고 그만한 완성도를 얻기는 어렵다. 그러한 점을 쉽게 해결할 수 있도록 해준다.

어떤 플랫폼에도 공유할 수 있고, 애니메이션되고, 영상 제공되고 이러한 것을 지원해 줌.

언론사, 패션잡지 위주로 많이 제작되고 있다.

스마트폰 뿐만 아니라 태블릿 등의 다른 디바이스도 잘 지원하고 있다.

```html
<!doctype html>
<html ⚡>
 <head>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
<amp-story standalone>
<!-- 각페이지는 amp-story-page 태그를 사용 -->
<amp-story-page>
    <!-- System layer -->
    <!-- template: fill - 화면을 가득 채움 -->
    <amp-story-grid-layer tempalate="fill" id="cover">
      <amp-video>
    <!-- 순차적으로 내려옴 -->
    <amp-story-grid-layer tempalate="vertical" id="osaka">
<amp-stroy-bookend>
```

[Bookend JSON](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)

스마트폰 인프라가 잘 갖춰진 우리나라에 적합한 기술이라고 할 수 있음. 스마트폰 점유율이 높고, 네트워크가 좋음.

시각적이고 팬시한 콘텐츠를 만들 수 있음

[튜토리얼](appproject.org/ko/stories)

기능상으로는 다 똑같음, 모바일 콘텐츠의 시각적 효과에 미묘한 차이는 있을 수 있으나 모든 브라우저에 지원하고 있다. 여러 업체에서 참여하고 있기 때문에 계속 발전 중. 안드로이드와 ios의 영상 재생이 조금씩 다른데, 이러한 부분에서도 맞춰 나가는 중

아이프레임으로 넣는 것중에 주로 광고가 있는데, 광고가 가장 무겁다. 그래서 아이프레임을 쓰지 못하게 규제를 했는데, 지금은 추가적인 기능을 넣었다. 별도의 아이프레임을 넣어서 만든다면 AMP와 같은 효과는 넣을 수 있겠으나 본래의 목적인 속도면에서 문제가 생긴다.

앰프는 데스크탑이나 모바일이나 똑같다. 모두 잘 지원되는데 responsive하게 만드는 것은 AMP와 별개로 처리할 수는 있다.

AMP Stories는 별도의 사용자 경험을 위해 만든 것이기 때문에, reponsive하게 만든다는 것은 적합하지 않음

AMP를 쓰게 되면, (제한하기 때문에)전체적인 파일 개수가 줄어든다. 쓰이는 자바스크립트가 제한되므로 기존의 파일들은 웹 브라우저에 캐싱이되므로 콘텐츠만 읽어들일 수 있어서 빠르다.

어느정도 수준까지 지원하는가? 커스텀이 가능한가?? 기본 프레임을 CSS로 바꿀 수 있는가?? 

AMP 바인드는 인터렉션을 바인딩해 할 수 있게 함, 그러나 완전히 커스터마이징해서 복잡한 무언가를 하겠다면 제한이 있을 것

검색결과에 번개모양이 있는 것은 AMP로 만든 거

워드프레스는 자체적으로 플러그인을 개발해서 AMP가 있음. 

이미지는 이미 다 로드해서 hidden상태인 거고 미디어는 한 포스트에 50개까지 현재는 제한하고 있음, 비디오 컨테이너를 만들면 비디오 플레이어가 50개가 만들어지는 거고, 페이지를 넘길때마다 소스를 입히는 식으로 미리 다 로드되지는 않음

AMP에서 중요하게 생각하는 것은 PWA를 지원하는 것.

페이스북, 트위터, 인스타그램같은 것들과 다른 점은 소셜 네트워크에 국한되어 있지 않다. 오픈 소스로 되어 있음 어느 플랫폼에 국한되지 않게 구현됨.

기능적은 면에서는 애니메이션 저작도구를 갖추고 있음
강점은 웹문서라는 것, 오픈 소스라는 것

페이스북, 인스타그램은 자기네 플랫폼안에서는 최적화 시킨 것

AMP 스토리를 동적으로 만들 수 있는지? 서버사이드 렌더링이 아니라. - 이론적으로 AMP 태그는 다 쓸 수 있다. 시각적으로 짜여진 거라 기존의 태그가 AMP와 같이 엮여서 잘 될지는 모름.

AMP 스토리 태그가 따로 있고, AMP 태그가 따로 있음

언론사, 구글에서 웹이 너무 무거우지는 것 때문에 고민이 있었음 처음에는 PCU로 시작되었음 지금은 AMP로 이름이 변경되면서 많이 발전함

많은 사람이 같은 고민과 같은 최적화를 위한 삽질.... 이런 부분을 미리 잘 처리해줄테니 가져다 써라라는 오픈 소스..

텍스트가 너무 없는데 검색엔진에 걸리는 것에 불이익은 없는지? 

사용자들이 많이 보는 선호하는 페이지인 것도 검색엔진에 상위노출되는 방법이다. 사용자들에게 노출을 시킬 수 있는 뭔가 개발중, 텍스트가 적어서 검색엔진에 불이익이 없도록 연구 중

lazy로딩 자바스크립트를 실행할 수 있고 시뮬레이션 할 수 있다면, 구글 검색엔진에서 색인 할 수 있다. 

웹 브라우저는 히든 텍스트가 있는지 visible인지 확인할 수 있다. AMP 스토리는 히든 페이지가 있고, 구글 봇이든 웹 로봇이 들어와 컨테이너를 다 실행해서 색인하도록 되어 있다.

캐시되었을 때 새로운 변경이 있을때 유저에게 변경을 반영하는 방법은? 앰프 캐시가 사용자 트래픽이 오게 되면 주기적으로 업데이트를 한다. 사용자 트래픽이 없는 경우는 맨처음 방문자는 오래된 것을 보게 되므로, 앰프 캐시에 콘텐츠 오너가 직접 업데이트할 수 있도록 하는 기능을 제공하고 있음

