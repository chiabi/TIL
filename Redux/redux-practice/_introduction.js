/*
 * 스토어(store): 앱의 상태(state)를 전부 관리하는 하나의 객체 트리
 * 액션(action): 무엇이 일어날지를 서술하는 객체
 * 리듀서(reducers): 액션이 상태 트리를 어떻게 변경할 지 명시 
 */

import { createStore } from 'redux';

// 리듀서: (state, action) => state 형태의 순수함수
// 상태의 모양은 다양하나, 상태 객체를 변경해서는 안되며,
// 상태가 바뀐다면 새로운 객체를 반환해야 한다.
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREAMENT': 
      return state - 1;
    default: 
      return state;
  }
}

// 리덕스 store
// API: { subscribe, dispatch, getState }
let store = createStore(counter)

// subscribe: 업데이트를 직접 구독, 뷰 레이어 바인딩
// 보통은 뷰 바인딩 라이브러리를 사용(react redux)
// 현재 상태를 localStorage에 영속적으로 저장할 때도 편리함
store.subsribe(() => console.log(store.getState()))

// dispatch: 액션을 내보낸다. 
// 내부 상태를 변경하는 방법
// 액션은 직렬화, 로깅할 수도, 저장할 수도, 나중에 재실행 할 수도 있다.
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })


// 상태를 바로 변경하지 않는다. 
// 액션이라는 평범한 객체를 통해 일어날 변경을 명시한다.
// 각각의 액션이 전체 애플리케이션의 상태를 어떻게 변경할지 결정하는 함수(리듀서)를 작성한다.

// 앱이 커지면 스토어를 쪼개는 것이 아니라 루트 리듀서를 쪼개 상태 트리의 각기 다른 부분을 독립적으로 다루는 리듀서를 만든다.
// 크고 복잡한 앱으로 확장하기 좋다. 
// 액션이 일으키는 모든 변경을 추적할 수 있다.
// 액션을 재생하는 것만으로 사용자 세션을 기록하고 재생산할 수 있다.

// 낙관적 업데이트, 서버렌더링, 라우트
// mutation, asyncronicity... 변화와 비동기는 사람이 추론하기 어려운 개념이다.
// React 같은 라이브러리는 이 문제를 해결하기 위해 뷰 레이어에서 비동기와 DOM조작을 없애버렸다.???
// React는 데이터를 관리하는 일에 관여하지 않는다.ㄴ

// 3가지 리덕스 원칙
// + 애플리케이션의 모든 상태는 하나의 스토어 안에 하나의 객체 트리 구조로 저장
//   - 범용적 애플리케이션(universal application)을 가능케한다. 
//   - 하나의 코드 베이스로 다양한 환경에서 실행 가능한 코드
//   - 서버로부터 가져온 상태 시리얼라이즈(serialized, 직렬화), 수화???(hydrated)
//   - 디버깅에 용이
//   - 기능 실행취소/다시 실행(undo/redo)을 손쉽게 구현
// + 상태는 읽기 전용이다. 상태를 변화시키는 유일한 방법은 무슨 일이 일어나는 지를 묘사하는 액션 객체를 전달하는 방법 뿐
//   - 뷰나 네트워크 콜백에서 결코 상태르르 직접 바꾸지 못한다.
//   - 액션은 평범한 객체라 기록을 남길수 있고, 시리얼라이즈할 수 있고, 저장할 수 있다.
//   - 이후에 테스트나 디버깅을 위해 재현도 가능
// + 액션에 의해 상태 트리가 어떻게 변화하는 지를 지정하기 위해 순수 리듀서를 작성(순수 함수)
