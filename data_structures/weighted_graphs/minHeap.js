// Min-oriented binary heap, ordered by edge weight. 
// Dynamically-resizing array implementation.

// Zero-index within storage array is always left empty,
// in order to simplify arithmetic required to navigate the heap.
// Heap-indexing starts at 1.

var protoMinHeap = {
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

		// while we're not at the root and k's parent's weight
		// is bigger than k's weight:
		// swap their values and have k point to the parent index
		while (k > 1 && storage[Math.floor(k/2)].weight > storage[k].weight) {
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
			// if it's smaller, have j point to it by incrementing j
			if (j < this.n && storage[j].weight > storage[j+1].weight) j++;
			// if k's weight is not greater than the smallest child weight, then break
			if ( !(storage[k].weight > storage[j].weight) ) break;
			// swap k's value with j
			this.exchange(k, j);
			// have k point to the child index j
			k = j;
		}
	},
	delMin: function() {
		if (this.n > 0) {

			// store the root, which is min value
			var min = this.storage[1];
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

			return min;
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

function factoryMinHeap() {
	var minHeap = Object.create(protoMinHeap); // link a new object to proto
	minHeap.storage = new Array(4); // array for storing user values
	minHeap.n = 0; // number of user-items currently within array
	return minHeap;
}

module.exports = factoryMinHeap;