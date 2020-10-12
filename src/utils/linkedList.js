import Node from './node';

class LinkedList {
	constructor() {
		this.head = null;
	}

	addNodeToList(id, weight = 0) {
		if (!this.checkIfNodeAlreadyExists(this.head, id)) {
			const newNode = new Node(id, weight);
			newNode.next = this.head;
			this.head = newNode;
		} else {
			throw new Error('Node already exists in the neighbour list.');
		}
	}

	checkIfNodeAlreadyExists(head, id) {
		let temp = head;
		while (temp !== null) {
			if (temp.id === id) {
				return true;
			}
			temp = temp.next;
		}
		return false;
	}
}

export default LinkedList;
