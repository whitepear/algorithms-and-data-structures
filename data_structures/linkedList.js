// This code uses a factory pattern. Create objects using the factory functions.

// The protoSinglyList object is used as a holder of methods to which
// factory-created list objects can delegate. 
// Delegation is facilitated by the fact that a factory-created list object is linked
// on creation to protoSinglyList.

var protoSinglyList = {
	add: function(value) {
		var node = factoryNode(value);
		currentNode = this.head;

		// 1st use-case: empty list
		if (!currentNode) {
			this.head = node;
			this._length++;

			return node;
		}

		// 2nd use-case: non-empty list
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
		var count = 0;

		// 1st use-case: invalid position
		if (length === 0 || position < 0 || position > length - 1) {
			throw new Error('Failure: non-existent node in this list.');
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
		var count = 0;
		var beforeNodeToDelete = null;

		// 1st use-case: invalid position
		if (length === 0 || position < 0 || position > length - 1) {
			throw new Error('Failure: non-existent node in this list.');
		}

		// 2nd use-case: the first node is removed
		if (position === 0) {
			this.head = this.head.next;

		// 3rd use-case: any other node is removed
		} else {
			// iterate to find position
			while (count < position) {
				beforeNodeToDelete = currentNode;
				currentNode = currentNode.next;
				count++;
			}

			beforeNodeToDelete.next = currentNode.next;
		}		
		
		this._length--;
		return currentNode.data;
	}
};

function factoryNode(data) {
	// initialise object
	return {
		data: data,
		next: null
	};
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
console.log(test.remove(4));
console.log(test.remove(2));
console.log(test.remove(0));
console.log(test._length, JSON.stringify(test));