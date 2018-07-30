// 비동기 API 호출할 때
// 1. 호출 시작
// 2. 응답(또는 타임아웃)
// 위 두가지는 애플리케이션에서 상태 변화를 요구함

// API 요청에 따라 리듀서에게 보내는 액션
// 1. 요청이 시작되었음을 알리는 액션
// 2. 요청이 성공적으로 완료되었음을 알리는 액션
// 3. 요청이 실패했음을 알리는 액션

// 사용자의 상호작용에 의해 통제되는 액션들 (1, 2)
// 1. 사용자는 표시할 reddit을 선택할 수 있다.
export const SELECT_REDDIT = 'SELECT_REDDIT'

export const selectReddit = reddit => ({
   type: SELECT_REDDIT,
   reddit
})

// 2. 사용자들은 '새로고침' 버튼을 눌러 업데이트 할 수 있다.
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit
})

// 네트워크 요청에 의해 통제되는 액션
// 3. reddit에서 포스트를 받아와야 할 때
export const REQUEST_POSTS = 'REQUEST_POSTS'

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
})

// 4. 네트워크 요청이 도달했을 때 
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receivePosts = (reddit, json) ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Data.now()
})