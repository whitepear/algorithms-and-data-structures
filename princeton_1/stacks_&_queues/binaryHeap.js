// Zero-index within storage array is always left empty,
// in order to simplify arithmetic required to navigate the heap.
// Heap-indexing starts at 1.

var protoBinaryHeap = {
	isEmpty: function() {
		return this.n === 0;
	},
	insert: function(value) {
		// if storage is at max capacity,
		// call resize to double its capacity
		if (this.storage.length - 1 === this.n) {
			this.resize('double');
		}

		// increment length
		// add new key and associated value to heap
		// swim value up heap if applicable
		this.n++;
		this.storage[this.n] = value;
		this.swim(this.n);
	},
	swim: function(k) {
		// k is an index within storage array
		var storage = this.storage;

		// while we're not at the root and k's parent's value
		// is smaller than k's value:
		// swap their values and have k point to the parent index
		while (k > 1 && storage[Math.floor(k/2)] < storage[k]) {
			this.exchange(k, Math.floor(k/2));
			k = Math.floor(k/2);
		}
	},
	sink: function(k) {
		// k is an index within storage array
		var storage = this.storage;

		// while there are children to check
		while (2*k <= this.n) {
			// get child node
			var j = 2*k;
			// check if the other child node exists and
			// if it's bigger, have j point to it by incrementing j
			if (j < this.n && storage[j] < storage[j+1]) j++;
			// if k's value is not less than the biggest child value, then break
			if ( !(storage[k] < storage[j]) ) break;
			// swap k's value with j
			this.exchange(k, j);
			// have k point to the child index j
			k = j;
		}
	},
	delMax: function() {
		if (this.n > 0) {

			// store the root, which is max value
			var max = this.storage[1];
			// swap root with bottom value, sink it
			this.exchange(1, this.n);
			this.n--;
			this.sink(1);
			// prevent loitering of 'removed' value
			this.storage[this.n + 1] = null;

			// if storage array is now at 25% capacity,
			// call resize to halve its capacity.
			if (this.storage.length / this.n === 4) {
				this.resize('halve');
			}

			return max;

		}
	},
	exchange: function(i, j) {
		// swap the position of two values within the storage array
		var storage = this.storage;
		var swap = storage[i];
		storage[i] = storage[j];
		storage[j] = swap;
	},
	resize: function(resizeAction) {
		// create new storage array based on string passed as argument
		if (resizeAction === 'double') {
			var newStorage = new Array(this.storage.length * 2);
		} else {
			newStorage = new Array(this.storage.length / 2);
		}

		// copy values from current storage to new storage
		for (var i = 1; i < (newStorage.length / 2) + 1; i++) {
			newStorage[i] = this.storage[i];
		}

		// set storage to new storage
		this.storage = newStorage;		
	}
};

function factoryBinaryHeap() {
	var binaryHeap = Object.create(protoBinaryHeap); // link a new object to proto
	binaryHeap.storage = new Array(4); // array for storing user values
	binaryHeap.n = 0; // number of user-items currently within array
	return binaryHeap;
}


// Tests
var test = factoryBinaryHeap();
console.log('Just created: ', JSON.stringify(test, null, 2));
console.log('isEmpty check: ', test.isEmpty());
console.log('Empty delMax check: ', test.delMax());
test.insert(5);
console.log('Post first insert: ', JSON.stringify(test, null, 2));
console.log('delMax check: ', test.delMax());
console.log('Post delMax: ', JSON.stringify(test, null, 2));
// insert 4 values to force a doubling event
for (var i = 1; i < 5; i++) {
	test.insert(i);
}
console.log('Post insertion of 4 values: ', JSON.stringify(test, null, 2));
console.log('delMax check: ', test.delMax());
console.log('delMax check: ', test.delMax());
console.log('Post two delMaxes, downsize event: ', JSON.stringify(test, null, 2));
console.log('delMax check: ', test.delMax());
console.log('Post one delMax, downsize event: ', JSON.stringify(test, null, 2));
test.insert(5);
console.log('Post single insertion, double event: ', JSON.stringify(test, null, 2));
// insert 16 values to force multiple doubling events
for (i = 0; i < 16; i++) {
	test.insert(i);
}
console.log('Post insertion of 16 values: ', JSON.stringify(test, null, 2));