import { handleActions } from 'redux-actions'

import axios from 'axios'

function getPostAPI(postId) {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';


// 비동기 액션 생산자
export const getPost = (postId) => dispatch => {
  // 요청이 시작되었음을 알린다.
  dispatch({type: GET_POST_PENDING});

  // 요청을 시작한다.
  // promise를 return 해줘야 나중에 컴포넌트에서 호출할 때 getPost().then(..)을 할 수 있다.
  return getPostAPI(postId).then(
    response => {
      // 요청이 성공했을 경우, 서버 응답내용을 payload로 설정해 
      // GET_POST_SUCCESS 
      dispatch({
        type: GET_POST_SUCCESS,
        payload: response
      })
    }
  ).catch(error => {
    dispatch({
      type: GET_POST_FAILURE,
      payloae: error
    });
  })
}

const initialState = {
  pending: false,
  error: false,
  data: {
    title: '',
    body: ''
  }
}

// 리듀서
export default handleActions({
  [GET_POST_PENDING]: (state, action) => {
    return {
      ...state,
      pending: true,
      error: false
    }
  },
  [GET_POST_SUCCESS]: (state, action) => {
    const { title, body } = action.payload.data;
    return {
      ...state,
      pending: false,
      data: {
        title, body
      }
    }
  },
  [GET_POST_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    }
  }
}, initialState)
