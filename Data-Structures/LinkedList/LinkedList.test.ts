import { LinkedList } from './LinkedList'

// describe(name, fn): 관련된 test 그룹을 하나의 블록으로 만들어 생성한다. 
// 이 블록은 하나의 'test suite'안에서 테스트 된다.
describe('LinkedList', () => {
  describe('빈 연결리스트', () => {
    it('빈 연결리스트를 생성한다.', () => {
      const linkedList = new LinkedList()
      const expected = {firstNode: null, lastNode: null, listLength: 0}
      expect(linkedList.read(0)).toBeNull()
      expect(linkedList).toEqual(expected)
    })
    it('빈 연결리스트 앞에 노드를 추가한다.', () => {
      const linkedList = new LinkedList()
      const expected = {
        firstNode: {
          value: 'chiabi', 
          next: {
            value: 2, 
            next: {
              value: 8,
              next :null
            }
          }
        }, 
        lastNode: {value: 8, next: null},
        listLength: 3
      }
      expect(linkedList.read(0)).toBeNull()

      linkedList.prepend(2)
      expect(linkedList.read(0)).toBe(2)
      linkedList.append(8)
      linkedList.prepend('chiabi')
      expect(linkedList.read(2)).toBe(8)
      expect(linkedList).toEqual(expected)
    })
    // it('빈 연결리스트 뒤에 노드를 추가한다.', () => {
    //   const linkedList = new LinkedList()
    //   expect(linkedList.read(0)).toBeNull()

    // })
  })
  // it('숫자 4를 첫번째 노드로 가지는 연결리스트를 생성한다.', () => {
  //   const linkedList = new LinkedList()
  //   const expected = {data: 4, next: {}}
  //   expect(linkedList.read(0)).toBeNull()

  //   linkedList.append(4)
  //   expect(linkedList.read(0)).toB(4)
  //   expect(linkedList).toEqual(expected)
  // })
})