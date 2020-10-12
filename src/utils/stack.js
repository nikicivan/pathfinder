class Stack {
	constructor() {
		this.arr = [];
	}

	push(data) {
		try {
			this.arr.push(data);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	pop() {
		if (this.arr.length > 0) {
			const data = this.arr.pop();
			return data;
		}
		throw new Error('Stack is empty.');
	}

	isEmpty() {
		return this.arr.length === 0;
	}

	size() {
		return this.arr.length;
	}
}

export default Stack;
