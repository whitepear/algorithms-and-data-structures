// Linked-list based implementation of a queue.

var protoQueue = {
	isEmpty: function() {
		return this._length === 0;
	},
	dequeue: function() {
		if (this._length > 0) {
			this._length--;
			var oldFirst = this.first;
			this.first = oldFirst.next;		
			if (this._length === 0) {
				this.last = null;
			}			
			return oldFirst.data;
		}
	},
	enqueue: function(value) {
		var node = factoryNode(value);
		if (this._length === 0) {
			this.first = node;
		} else {
			this.last.next = node;
		}
		this._length++;
		this.last = node;
	}
};

function factoryNode(data) {
	return {
		data: data,
		next: null
	};
}

function factoryQueue() {
	var queue = Object.create(protoQueue);
	queue._length = 0;
	queue.first = null;
	queue.last = null;
	return queue;
}

var test = factoryQueue();
test.enqueue(1);
test.enqueue(2);
test.enqueue(3);
test.enqueue(4);
test.enqueue(5);
console.log(JSON.stringify(test, null, 2));
console.log(test.dequeue());
console.log(JSON.stringify(test, null, 2));
test.dequeue();
test.dequeue();
console.log(test.isEmpty());
test.dequeue();
test.dequeue();
console.log(test.dequeue());
console.log(test.isEmpty());
console.log(test);
