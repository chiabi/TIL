 export default class LinkedList {
  constructor() {
    this.length = 0
    this.node = {}
  }
  /**
   * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
   * @param {number} index
   * @return {number}
   */
  get(index) {
    if (index < this.length && this.length > 0) {
        let nextNode = this.node
        while(index--) {
            nextNode = nextNode.next
            // console.log(nextNode)
        }
        return nextNode.data
    } else {
        return -1
    }
  }

  /**
  * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
  * @param {number} val
  * @return {void}
  */
  addAtHead(val) {
    this.node = {
        data: val,
        next: this.node
    }
    this.length++
  }

  /**
  * Append a node of value val to the last element of the linked list. 
  * @param {number} val
  * @return {void}
  */
  addAtTail(val) {
    let nextNode = this.node
    let length = this.length - 1
    while(length--) {
        nextNode = nextNode.next
    }
    nextNode.next = {
        data: val,
        next: {}
    }
    this.length++
  }

  /**
  * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
  * @param {number} index 
  * @param {number} val
  * @return {void}
  */
  addAtIndex(index, val) {
    let nextNode = this.node
    if(index < this.length && index > 0) {
        while(index--) {
            if(index === 0) {
                nextNode.next = {
                    data: val,
                    next: nextNode.next
                }
                this.length++
                return false
            }
            nextNode = nextNode.next
        }
    } else if (index === 0) {
        this.addAtHead(val)
    } else if (index === this.length) {
        this.addAtTail(val)
    }
  }

  /**
  * Delete the index-th node in the linked list, if the index is valid. 
  * @param {number} index
  * @return {void}
  */
  deleteAtIndex(index) {
    let nextNode = this.node
    if (index < this.length && index > 0) {
        while(index--) {
            if(index === 0) {
                nextNode.next = {
                    data: nextNode.next.next.data,
                    next: nextNode.next.next.next
                    
                }
                this.length--
                return false
            }
            nextNode = nextNode.next
        }
    } else if (index === 0) {
        this.node = this.node.next
        this.length--
    }
  }
}
