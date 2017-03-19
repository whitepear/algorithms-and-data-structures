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
		var oldHead = this.head;
		this.head = oldHead.next;
		this._length--;
		return oldHead;
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