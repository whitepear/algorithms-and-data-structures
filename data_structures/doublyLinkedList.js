// This code uses a factory pattern. Create objects using the factory functions.

// The protoDoublyList object is used as a holder of methods to which
// factory-created list objects can delegate. 
// Delegation is facilitated by the fact that a factory-created list object is linked
// on creation to protoDoublyList.

var protoDoublyList = {
	add: function(value) {
		var node = factoryNode(value);

		if (this._length) {
			this.tail.next = node;
			node.previous = this.tail;
			this.tail = node;
		} else {
			this.head = node;
			this.tail = node;
		}

		this._length++;
		return node;
	},
	searchNodeAt: function(position) {
		var currentNode = this.head;
		var length = this._length;
		var count = 0;

		// 1st use-case: an invalid position
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
		var length = this._length;
		var currentNode = this.head;
		var count = 0;

		// 1st use-case: an invalid position
		if (length === 0 || position < 0 || position > length - 1) {
			throw new Error('Failure: non-existent node in this list.');
		}

		// 2nd use-case: the first node is removed
		if (position === 0) {
			this.head = this.head.next;

			// 2nd use-case sub-condition: there is a second node
			if (this.head) {
				this.head.previous = null;
			// 2nd use-case sub-condition: there is no second node	
			} else {
				this.tail = null;
			}

		// 3rd use-case: the last node (i.e. tail) is removed
		} else if (position === length - 1) {
			currentNode = this.tail;
			this.tail = this.tail.previous;
			this.tail.next = null;
		
		// 4th use-case: a middle node is removed
		} else {
			// find the right location
      while (count < position) {
        currentNode = currentNode.next;
        count++;
      }
  
      // skip over the item to remove
      currentNode.previous.next = currentNode.next;
      currentNode.next.previous = currentNode.previous;
		}

		this._length--;
		return currentNode.data;
	}
};

function factoryNode(data) {
	// initialise object
	return {
		data: data,
		next: null,
		previous: null
	};
}

function factoryDoublyList() {
	// link and initialise object
	var doublyList = Object.create(protoDoublyList);
	doublyList._length = 0;
	doublyList.head = null;
	doublyList.tail = null;

	return doublyList;
}


var test = factoryDoublyList();

test.add(1);
test.add(2);
test.add(3);
test.add(4);
test.add(5);

console.log(test.remove(4));
console.log(test.remove(0));
console.log(test.remove(2));
console.log(test);