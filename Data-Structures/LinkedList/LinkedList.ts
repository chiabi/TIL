interface INode {
    value: string | number;
    next: INode | null
}
class LinkedListNode implements INode {
    constructor(
        public value: string | number, 
        public next: INode | null = null) {}
}

export class LinkedList {
    firstNode: INode | null
    lastNode: INode | null
    listLength: number
    constructor(firstNode: INode | null = null) {
        this.firstNode = firstNode
        this.lastNode = firstNode
        this.listLength = !firstNode ? 0 : 1
    }

    read(index: number) {
        let currentIndex: number = 0
        let currentNode = this.firstNode;
        if(index >= this.listLength) {
            return null
        }
        while(currentIndex < index) {
            currentNode = (<INode>currentNode).next;
            currentIndex++;
        }
        return (<INode>currentNode).value
    }

    indexOf(value: string | number) {
        // return 
    }

    prepend(value: string | number) {
        const newNode: INode = new LinkedListNode(value, this.firstNode)
        this.firstNode = newNode

        if (!this.lastNode) {
            this.lastNode = newNode
        } 
        this.listLength++
        return this
    }

    append(value: string | number) {
        const newNode: INode = new LinkedListNode(value)
        if(!this.firstNode) {
            this.firstNode = newNode
            this.lastNode = newNode
            this.listLength++
            return this
        } 
        (<INode>this.lastNode).next = newNode
        this.lastNode = newNode
        this.listLength++
        return this
    }

    insertAtIndex(index: number, value: string | number) {

    }

    deleteAtIndex(index: number) {

    }
}