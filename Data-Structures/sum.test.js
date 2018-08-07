import sum from './sum'

// test(name, fn, timeout)
// it(name, fn, timeout)
// 테스트를 실행하는 메서드
// 첫번째 인수: 테스트 이름
// 두번째 인수: 테스트 결과에 대한 기대값이 포함된 함수
test('add 1 + 2 to equal 3', () => {
  // expect(value): 값을 테스트 할 때 사용
  // "matcher" 함수와 함께 사용해야 한다.
  // https://jestjs.io/docs/en/using-matchers#common-matchers

  // toBe는 Object.is를 사용해 정확하게 동일한 지 테스트한다.
  // 객체의 값을 확인하려면 toEqual을 사용해야한다.
  expect(sum(1, 2)).toBe(3)
})