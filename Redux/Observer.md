# 옵저버 패턴(observer pattern)

리덕스는 다른 라이브러리에 비하면 굉장히 코드가 짧은 작은 라이브러리입니다.  
그리고 의존하는 패키지도 단 2개입니다.

```json
  "dependencies": {
    "loose-envify": "^1.4.0",
    "symbol-observable": "^1.2.0"
  },
```

이 글에서는 이 중에 `symbol-observable`의 쓰임과 옵저버 패턴에 대해 다루려합니다.

관찰자 또는 감시자 패턴이라고도 불리는 옵저버 패턴에 대해 먼저 알아봅시다.

[위키피디아](https://en.wikipedia.org/wiki/Observer_pattern)에서 다음과 같이 정의합니다.

> **Subject** 라고 불리는 객체가 **Observer**라 불리는 종속 개체(dependents)들의 목록(list)을 관리하고, 해당 메서드 중 하나를 호출하여 상태 변경을 자동으로 알리는 소프트웨어 디자인 패턴입니다.
>
> 주로 '이벤트 드리븐(event driven)' 소프트웨어에서 분산 이벤트 처리(핸들링) 시스템을 구현하는 데 사용됩니다. C#같은 대부분의 모던 랭귀지에는 관찰자 패턴 구성요소를 구현하는 'event'구문은 내장하고 있습니다.
>
> 옵저버 패턴은 친숙한 MVC(Model-View-Controller) 아키텍처 패턴에서 핵심적인 부분입니다. 옵저버 패턴은 거의 모든 GUI 툴킷을 포함하여 수 많은 프로그래밍 라이브러리 및 시스템에서 구현됩니다.
>
> Subject(주체가 되는 객체)와 Observer객체들을 정의합니다.  
> 이 Subject가 상태를 변경하면 그 Subject에 등록된 모든 Observer들은 알림을 받고 자동으로 업데이트됩니다.
>
> - Subject의 유일한 책임은 Observer 리스트를 관리하고 update() 작업을 호출하여 상태 변화를 알리는 것입니다.
> - Observer의 책임은 Subject에 자신을 등록(register)(등록 취소(unregister))하고 자신의 상태를 업데이트(Subject의 상태와 상태 동기화)하는 것입니다.
> - 이는 Subject와 Observer를 느슨하게 결합시킵니다. Subject와 Observer는 서로에 대한 명확하게 아는 바가 없습니다. Observer는 런타임에 독립적으로 추가되고 제거할 수 있습니다.
