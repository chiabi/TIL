import fetch from 'cross-fetch'

// 비동기 API 호출할 때
// 1. 호출 시작
// 2. 응답(또는 타임아웃)
// 위 두가지는 애플리케이션에서 상태 변화를 요구함

// API 요청에 따라 리듀서에게 보내는 액션
// 1. 요청이 시작되었음을 알리는 액션 - 스피너 표시
// 2. 요청이 성공적으로 완료되었음을 알리는 액션 - 스피너 숨기고 데이터 표시
// 3. 요청이 실패했음을 알리는 액션 - 에러메시지 표시

// 사용자의 상호작용에 의해 통제되는 액션들 (1, 2)
// 1. 사용자는 표시할 subreddit을 선택할 수 있다.
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const selectReddit = subreddit => ({
   type: SELECT_SUBREDDIT,
   subreddit
})

// 2. 사용자들은 '새로고침' 버튼을 눌러 업데이트 할 수 있다.

export const invalidateReddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit
})

// 네트워크 요청에 의해 통제되는 액션
// 3. reddit에서 포스트를 받아와야 할 때

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})

// 4. 네트워크 요청이 도달했을 때 

export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Data.now()
})

// 비동기 액션 생산자, thunk 액션 생산자.
// store.dispatch(fetchPosts('reactjs'))
export function fetchPosts(subreddit) {
  // thunk 미들웨어는 디스패치 메서드를 함수에 인수로 보내
  // 함수가 직접 액션을 보낼 수 있도록 한다.
  return function(dispatch) {

    // 첫번째 디스패치: 앱 상태를 갱신
    // API 호출이 시작됨을 알림
    dispatch(requestPosts(subreddit))

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      ).then(json => dispatch(receivePosts(subreddit, json)))
  }
}
