// Dynamically resizing circular-array.

var protoRingBuffer = {
	shift: function() {
		if (this.n > 0) {

			var shiftedItem = this.storage[this.front];
			this.storage[this.front] = null;
			this.front++;
			// if front index is out of bounds, reset to zero
			if (this.front === this.capacity) {
				this.front = 0;
			}
			this.n--;

			// if storage is at 25% capacity, halve its size
			if (this.capacity / this.n === 4) {
				this.resize('halve');
			}

			return shiftedItem;

		} 
	},
	unshift: function(value) {
		// if queue is full, double its capacity
		if (this.n === this.capacity) {			
			this.resize('double');
		}

		this.front--;
		// if front index is out of bounds, reset 
		// to last index of array
		if (this.front < 0) {
			this.front = this.capacity - 1;
		}

		this.storage[this.front] = value;
		this.n++; 

		return this.n;
	},
	push: function(value) {
		// if queue is full, double its capacity
		if (this.n === this.capacity) {			
			this.resize('double');
		}

		this.storage[this.rear] = value;
		this.rear++;
		// if rear index is out of bounds, reset to 0
		if (this.rear === this.capacity) {
			this.rear = 0;
		}

		this.n++;
		return this.n;
	},
	pop: function() {
		if (this.n > 0) {

			this.rear--;
			// if rear index is out of bounds,
			// reset to last index of array
			if (this.rear < 0) {
				this.rear = this.capacity - 1;
			}

			var poppedItem = this.storage[this.rear];
			this.storage[this.rear] = null;
			this.n--;

			// if storage is at 25% capacity, halve its size
			if (this.capacity / this.n === 4) {
				this.resize('halve');
			}

			return poppedItem;

		}
	},
	isEmpty: function() {
		return this.n === 0;
	},
	peekFront: function() {
		return this.storage[this.front];
	},
	peekRear: function() {
		return this.storage[this.rear - 1];
	},
	resize: function(resizeAction) {
		// store capacity for use within for loop below
		var prevCapacity = this.capacity;

		// adjust capacity based on string passed as argument
		if (resizeAction === 'double') {
			this.capacity = this.capacity * 2;
		} else {
			this.capacity = this.capacity / 2;
		}

		// create new storage array
		var newStorage = new Array(this.capacity);
		// copy values from current storage to new storage
		for (var i = 0; i < this.n; i++) {
			newStorage[i] = this.storage[(this.front + i) % prevCapacity];
		}
		// set storage to new storage, set front and rear
		this.storage = newStorage;
		this.front = 0;
		this.rear = this.n; 
	}
};

function factoryRingBuffer() {
	var ringBuffer = Object.create(protoRingBuffer);
	ringBuffer.storage = [];
	ringBuffer.n = 0; // number of user-items within storage array
	ringBuffer.capacity = 4; // max number of items that can be stored in storage array
	ringBuffer.front = 0; // index of item at start of storage array
	ringBuffer.rear = 0; // index of next available space at rear of storage array
	return ringBuffer;
}


// Tests
var test = factoryRingBuffer();
console.log('Empty test: ', JSON.stringify(test, null, 2));
console.log('isEmpty check: ', test.isEmpty());
console.log('Empty pop check: ', test.pop());
console.log('Empty shift check: ', test.shift());
for (var i = 0; i < 4; i++) {
	console.log('Unshift: ', test.unshift(i));
}
console.log('To capacity unshifting: ', JSON.stringify(test, null, 2));
for (i; i < 8; i++) {
	test.unshift(i);
}
console.log('Post-resize unshifting: ', JSON.stringify(test, null, 2));
console.log('Shift check: ', test.shift());
console.log('Pop check: ', test.pop());
console.log('Post shift/pop check: ', JSON.stringify(test, null, 2));
for (i = 0; i < 4; i++) {
	i % 2 === 0 ? test.shift() : test.pop();
}
console.log('Post downsize: ', JSON.stringify(test, null, 2));
test.shift();
test.pop();
console.log('Emptied test: ', JSON.stringify(test, null, 2));
console.log('isEmpty check: ', test.isEmpty());
for (i = 0; i < 4; i++) {
	console.log('Push: ', test.push(i));
}
console.log('To capacity pushing: ', JSON.stringify(test, null, 2));
for (i; i < 8; i++) {
	test.push(i);
}
console.log('Post-resize pushing: ', JSON.stringify(test, null, 2));
console.log('Shift check: ', test.shift());
console.log('Pop check: ', test.pop());
console.log('Post shift/pop check: ', JSON.stringify(test, null, 2));
for (i = 0; i < 4; i++) {
	i % 2 === 0 ? test.shift() : test.pop();
}
console.log('Post downsize: ', JSON.stringify(test, null, 2));
test.shift();
test.pop();
console.log('Emptied test: ', JSON.stringify(test, null, 2));
console.log('isEmpty check: ', test.isEmpty());
for (i = 0; i < 4; i++) {
	i % 2 === 0 ? test.unshift(i) : test.push(i);
}
console.log('Mixed unshift/push to capacity: ', JSON.stringify(test, null, 2));
for (i = 4; i < 9; i++) {
	i % 2 === 0 ? test.unshift(i) : test.push(i);
}
console.log('Mixed unshift/push to two post-resize events: ', JSON.stringify(test, null, 2));
console.log('peekFront: ', test.peekFront());
console.log('peekRear: ', test.peekRear());