// 상태변화가 있을 법한 상황들을 미리 정의
// player가 수를 두는 행위
export const ADD_SYMBOL = "ADD_SYMBOL";
// history로 이동하는 행위
export const JUMP_TO_HISTORY = 'JUMP_TO_HISTORY';

// type은 필수
// 실제 logic을 담고 있는 리듀서에 Action 명을 구분할 때 사용
export const addSymbol = index => ({
  type: ADD_SYMBOL,
  index
});

export const jumpToHistory = index => ({
  type: JUMP_TO_HISTORY,
  index
});
