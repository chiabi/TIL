const loggerMiddleware = store => next => action => {
  /* 미들웨어 내용 */
  // 현재 스토어 상태값 기록
  console.log('현재 상태', store.getState())

  // 액션 기록
  console.log('액션', action)

  // 액션을 다음 미들웨어 혹은 리듀서로 넘김
  const result = next(action);

  console.log('다음 상태', store.getState());
  console.log('\n');

  return result;
}

export default loggerMiddleware;