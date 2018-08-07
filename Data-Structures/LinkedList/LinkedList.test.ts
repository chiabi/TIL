import { LinkedListNode, LinkedList } from './LinkedList'

// describe(name, fn): 관련된 test 그룹을 하나의 블록으로 만들어 생성한다. 
// 이 블록은 하나의 'test suite'안에서 테스트 된다.
describe('LinkedList', () => {
  it('빈 연결리스트를 생성한다.', () => {
    const linkedList = new LinkedList()
    expect(linkedList.get()).toBe(-1)
  })
  it('연결리스트에 노드를 추가한다.', () => {
    const linkedList = new LinkedList()
    const expected = {data: 4, next: {}}
    expect(linkedList.get(0)).toBe(-1)

    linkedList.addAtTail(4)
    expect(linkedList.get(0)).toBe(4)
    expect(linkedList).toEqual(expected)
  })
})