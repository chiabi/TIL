export class LinkedListNode {
    data: number
    nextNode: object | null
    constructor(data: number) {
        this.data = data
        this.nextNode = null
    }
}

export class LinkedList {
    firstNode: object | null
    constructor(firstNode: object | null) {
        this.firstNode = firstNode
    }
}