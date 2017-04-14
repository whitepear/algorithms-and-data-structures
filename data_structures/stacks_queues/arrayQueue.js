// Dynamically resizing circular-array-based implementation of a queue.

var protoQueue = {
	enqueue: function(value) {
		// if queue is full, double its capacity
		if (this.length === this.maxLength) {			
			this.resize('double');
		}

		this.storage[this.rear] = value;
		this.rear++;
		// if rear index is out of bounds, reset to 0
		if (this.rear === this.maxLength) {
			this.rear = 0;
		}

		this.length++;
	},
	dequeue: function() {
		if (this.length > 0) {

			var removedItem = this.storage[this.front];
			this.storage[this.front] = null;
			this.front++;
			// check if front is out of bounds, if
			// so, reset to zero
			if (this.front === this.maxLength) {
				this.front = 0;
			}
			this.length--;

			// if storage is at 25% capacity, halve its size
			if (this.maxLength / this.length === 4) {
				this.resize('halve');
			}

			return removedItem;

		}		
	},
	resize: function(resizeAction) {
		// store maxLength for use within for loop below
		var prevMaxLength = this.maxLength;

		// adjust maxLength based on string passed as argument
		if (resizeAction === 'double') {
			this.maxLength = this.maxLength * 2;
		} else {
			this.maxLength = this.maxLength / 2;
		}

		// create new storage array
		var newStorage = new Array(this.maxLength);
		// copy values from current storage to new storage
		for (var i = 0; i < this.length; i++) {
			newStorage[i] = this.storage[(this.front + i) % prevMaxLength];
		}
		// set storage to new storage, set front and rear
		this.storage = newStorage;
		this.front = 0;
		this.rear = this.length;		
	},
	peek: function() {
		return this.storage[this.front];
	},
	isEmpty: function() {
		return this.length === 0;
	}
};

function factoryQueue() {
	// initialise and link object
	var queue = Object.create(protoQueue);
	queue.storage = new Array(4); // array for storing user values
	queue.length = 0; // number of storage slots filled
	queue.maxLength = 4; // storage capacity
	queue.rear = 0; // index of next space at rear of queue
	queue.front = 0; // index of item at front of queue
	return queue;
}

module.exports = factoryQueue;


// Tests
// var test = factoryQueue();
// console.log('Test on creation: ', JSON.stringify(test, null, 2));
// console.log('Is empty check: ', test.isEmpty());
// console.log('Empty dequeue check: ', test.dequeue());
// for (var i = 0; i < 4; i++) {
// 	test.enqueue(i);
// }
// console.log('Test at capacity: ', JSON.stringify(test, null, 2));
// console.log('First dequeue: ', test.dequeue());
// console.log('Peek: ', test.peek());
// console.log('Second dequeue: ', test.dequeue());
// test.enqueue(i++);
// test.enqueue(i++);
// console.log('Enqueue two more values: ', JSON.stringify(test, null, 2));
// test.enqueue(i++);
// console.log('Post-resize enqueue: ', JSON.stringify(test, null, 2));
// console.log('Post-resize dequeue: ', test.dequeue());
// for (i; i < 11; i++) {
// 	test.enqueue(i);
// }
// console.log('Test at capacity: ', JSON.stringify(test, null, 2));
// test.enqueue(i++);
// console.log('Post-second resize enqueue: ', JSON.stringify(test, null, 2));
// for (i = 0; i < 8; i++) {
// 	test.dequeue();
// }
// console.log('Post-downsize: ', JSON.stringify(test, null, 2));
// for (i = 0; i < 6; i++) {
// 	test.enqueue(i);
// }
// console.log('Post-resize: ', JSON.stringify(test, null, 2));