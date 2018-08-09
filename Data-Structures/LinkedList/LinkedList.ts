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
        let currentIndex: number = 0
        let currentNode = this.firstNode;
        while(currentNode) {
            if(currentNode.value === value) return currentIndex 
            currentNode = (<INode>currentNode).next;
            currentIndex++
        }
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
        if(this.listLength < index) {
            return null
        } else if(!this.firstNode || this.listLength === index) {
            this.append(value)
            return this
        }
        let currentIndex: number = 0
        let currentNode: INode | null = this.firstNode
        while(currentNode) {
            if(index === currentIndex + 1) {
                const nextNode: INode | null = currentNode.next
                const newNode: INode = new LinkedListNode(value, nextNode)
                currentNode.next = newNode
                this.listLength++
                return this
            }
            currentNode = (<INode>currentNode).next
            currentIndex++
        }
    }

    deleteAtIndex(index: number) {
        if(!this.firstNode || this.listLength <= index) {
            return null
        }
        let currentIndex: number = 0
        let currentNode: INode | null = this.firstNode
        while(currentNode) {
            if(index === 0 || index === currentIndex + 1) {
                const nextNode = currentNode.next
                if(index === 0) this.firstNode = nextNode
                if(index === this.listLength - 1) this.lastNode = currentNode
                currentNode.next = nextNode ? nextNode.next : null
                this.listLength--
                return this
            }
            currentNode = (<INode>currentNode).next
            currentIndex++
        }
    }
}