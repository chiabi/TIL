import LinkedList from './LinkedList.js'

// describe(name, fn): 관련된 test 그룹을 하나의 블록으로 만들어 생성한다. 
// 이 블록은 하나의 'test suite'안에서 테스트 된다.
describe('LinkedList', () => {
  it('should create empty linked list', () => {
    const linkedList = new LinkedList()
    expect(linkedList.get(0)).toBe(-1)
  })
})