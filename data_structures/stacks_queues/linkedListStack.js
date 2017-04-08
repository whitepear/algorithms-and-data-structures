// Linked-list based implementation of a stack.
// Time complexity for all operations is O(1).
// Space complexity is O(n).

var protoStack = {		
	push: function(value) {
		var node = factoryNode(value);
		var oldHead = this.head;
		this.head = node;
		node.next = oldHead;
		this._length++;
	},
	pop: function() {
		if (this._length > 0) {
			var oldHead = this.head;
			this.head = oldHead.next;
			this._length--;
			return oldHead.data;
		}
	},
	isEmpty: function() {
		return this._length === 0;
	}
};

function factoryNode(data) {
	// initialise object
	return {
		data: data,
		next: null
	};
}

function factoryStack() {
	// link and initialise object
	var stack = Object.create(protoStack);
	stack._length = 0;
	stack.head = null;
	return stack;
}

var test = factoryStack();
console.log(test);
test.push(1);
test.push(2);
test.push(3);
test.push(4);
test.push(5);
console.log(JSON.stringify(test, null, 2));
console.log(test.pop());
console.log(test.isEmpty());
test.pop();
test.pop();
test.pop();
test.pop();
console.log(test.isEmpty());
console.log(test.pop());
console.log(test);