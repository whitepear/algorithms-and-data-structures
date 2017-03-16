// This code uses a factory pattern. Create objects using the factory functions.

// The protoNode and protoSinglyList objects are used as holders of methods to which
// the factory-created objects can delegate. 
// Delegation is facilitated by the fact that a factory-created object is linked
// on creation to either protoNode or protoSinglyList.

var protoNode = {

};

var protoSinglyList = {
	add: function(value) {
		var node = factoryNode(value);
		currentNode = this.head;

		// 1st-use case: empty list
		if (!currentNode) {
			this.head = node;
			this._length++;

			return node;
		}

		// 2nd-use case: non-empty list
		while (currentNode.next) {
			currentNode = currentNode.next;
		}

		currentNode.next = node;
		this._length++;

		return node;
	},
	searchNodeAt: function(position) {
		var currentNode = this.head;
		var length = this._length;
		var count = 1;
		var message = {	failure: 'Failure: non-existent node in this list.'	};

		// 1st use-case: invalid position
		if (length === 0 || position < 1 || position > length) {
			throw new Error(message.failure);
		}

		// 2nd use-case: a valid position
		while (count < position) {
			currentNode = currentNode.next;
			count++;
		}

		return currentNode;
	},
	remove: function(position) {
		var currentNode = this.head;
		var length = this._length;
		var count = 1;
		var message = { failure: 'Failure: non-existent node in this list.' };
		var beforeNodeToDelete = null;
		var nodeToDelete = null;
		var deletedNode = null;

	// 1st use-case: invalid position
	if (position < 0 || position > length) {
		throw new Error(message.failure);
	}

	// 2nd use-case: the first node is removed
	if (position === 1) {
		this.head = currentNode.next;
		deletedNode = currentNode;
		currentNode = null;
		this._length--;

		return deletedNode;
	}
	
	// 3rd use-case: any other node is removed
	count = 1;
	while (count < position) {
		beforeNodeToDelete = currentNode;
		nodeToDelete = currentNode.next;
		currentNode = currentNode.next;
		count++;
	}

	beforeNodeToDelete.next = nodeToDelete.next;
	deletedNode = nodeToDelete;
	nodeToDelete = null;
	this._length--;

	return deletedNode;
	}
};

function factoryNode(data) {
	// link and initialise object
	var node = Object.create(protoNode);
	node.data = data;
	node.next = null;
	return node;
}

function factorySinglyList() {
	// link and initialise object
	var singlyList = Object.create(protoSinglyList);
	singlyList._length = 0;
	singlyList.head = null;
	return singlyList;
}

var test = factorySinglyList();
test.add(1);
test.add(2);
test.add(3);
test.add(4);
test.add(5);
console.log(test._length, JSON.stringify(test));
test.remove(2);
console.log(test._length, JSON.stringify(test));