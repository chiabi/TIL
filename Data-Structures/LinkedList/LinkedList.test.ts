import { LinkedList } from './LinkedList'

// describe(name, fn): 관련된 test 그룹을 하나의 블록으로 만들어 생성한다. 
// 이 블록은 하나의 'test suite'안에서 테스트 된다.
describe('LinkedList', () => {
  it('빈 연결리스트를 생성한다.', () => {
    const linkedList = new LinkedList()
    const expected = {firstNode: null, lastNode: null, listLength: 0}
    expect(linkedList.read(0)).toBeNull()
    expect(linkedList).toEqual(expected)
  })

  it('연결리스트에 노드를 추가한다', () => {
    const linkedList = new LinkedList()
    const expected = {
      firstNode: {value: 4, next: null},
      lastNode: {value: 4, next: null},
      listLength: 1,
    }
    linkedList.append(4)
    expect(linkedList.read(0)).toBe(4)
    expect(linkedList).toEqual(expected);
  })

  it('연결리스트에 노드를 여러번 추가한다.', () => {
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

  it('연결리스트 중간에 값을 삽입한다.', () => {
    const linkedList = new LinkedList()
    const expected = {
      firstNode: {
        value: 'chiabi',
        next: {
          value: 88,
          next: {
            value: 'dev',
            next: {
              value: 'blog',
              next: null
            }
          }
        }
      },
      lastNode: {
        value: 'blog',
        next: null
      },
      listLength: 4
    }
    expect(linkedList.read(0)).toBeNull()

    expect(linkedList.insertAtIndex(2, 'chiabi')).toBe(null)
    
    linkedList.insertAtIndex(0, 'chiabi')
    linkedList.append('dev')
    linkedList.append('blog')
    expect(linkedList.insertAtIndex(1, 88)).toEqual(expected)
  })

  it('연결리스트에서 해당 값을 가진 노드의 인덱스를 구한다', () => {
    const linkedList = new LinkedList()
    expect(linkedList.read(0)).toBeNull()

    linkedList.prepend('chiabi')
    linkedList.append(88)
    linkedList.append('dev')
    linkedList.append('blog')
    expect(linkedList.read(3)).toBe('blog')
    expect(linkedList.indexOf('dev')).toBe(2)
  })

  it('연결리스트에서 인덱스의 노드를 삭제한다', () => {
    const linkedList = new LinkedList()
    const expected = {
      firstNode: {
        value: 'chiabi',
        next: {
          value: 88,
          next: {
            value: 'blog',
            next: null
          }
        }
      },
      lastNode: {
        value: 'blog',
        next: null
      },
      listLength: 3
    }
    expect(linkedList.read(0)).toBeNull()
    
    linkedList.append('chiabi')
    linkedList.append(88)
    linkedList.append('dev')
    linkedList.append('blog')
    expect(linkedList.deleteAtIndex(2)).toEqual(expected)
    linkedList.prepend(1)
    expect(linkedList.deleteAtIndex(0)).toEqual(expected)
  })
})