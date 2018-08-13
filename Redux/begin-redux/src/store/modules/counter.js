import { createAction, handleActions } from 'redux-actions';
// 카운터 관련 상태 로직

// 액션
const INCREMENT = 'counter/INCREMET';
const DECREMENT = 'counter/DECREMET';

// 액션 creator
// export const increment = () => ({ 
//   type: INCREMENT
// });
// export const decrement = () => ({ 
//   type: DECREMENT
// });
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

const initialState = {
  number: 0
};

// 리듀서
// export default function reducer(state = initialState, action) {
//   switch(action.type) {
//     case INCREMENT:
//       return {number: state.number + 1};
//     case DECREMENT: 
//       return {number: state.number - 1};
//     default: 
//       return state;
//   }
// }
export default handleActions({
  [INCREMENT]: ({number}) => ({ number: number + 1 }),
  [DECREMENT]: ({number}) => ({ number: number - 1})
}, initialState);