class Queue {
	constructor() {
		this.arr = [];
	}

	enqueue(node) {
		try {
			this.arr.push(node);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	dequeue() {
		return this.arr.shift();
	}

	size() {
		return this.arr.length;
	}

	isEmpty() {
		return this.arr.length === 0;
	}
}

export default Queue;
