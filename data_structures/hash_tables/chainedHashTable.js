// For simplicity's sake, this implementation does not
// use dynamically-resizing arrays.
var hash = require('../../algorithms/hashingFunction.js');


var protoHashTable = {
	hash: function(key) {
		// get hash-code, make it positive, fit to array range
		return (hash(key) & 0x7fffffff) % this.M;
	},
	get: function(key) {
		// retrieve the value associated with the key
		var i = this.hash(key);
		var x = this.storage[i];
		// traverse the linked list at this.storage[i], in search of the value
		if (x !== undefined) {
			for (x; x !== null; x = x.next) {
				if (key === x.key) return x.val;
			}
		}
		return null;
	},
	put: function(key, val) {
		// insert a value into the hash table
		var i = this.hash(key);
		var x = this.storage[i];
		// traverse the linked list at this.storage[i], in search of the key
		if (x !== undefined) {
			for (x; x !== null; x = x.next) {
				if (key === x.key) {
					// if key already exists, update the value
					x.val = val;
					return;
				}
			}
		}
		// if the key wasn't found, insert a
		// new node at the start of the linked list
		this.storage[i] = factoryNode(key, val, this.storage[i]);
	}
};

function factoryNode(key, val, next) {
	return {
		key: key,
		val: val,
		next: next || null
	};
}

function factoryHashTable() {
	var hashTable = Object.create(protoHashTable);
	hashTable.M = 97; // number of chains
	hashTable.storage = new Array(97); // array of chains
	return hashTable;
}


// Tests
var test = factoryHashTable();
console.log('Empty get check: ', test.get('dog'));
test.put('dog', 5);
console.log('Valid get check: ', test.get('dog'));
test.put('dog', 10);
console.log('Updated get check: ', test.get('dog'));
// insert integers
for (var i = 0; i < 33; i++) {
	test.put(i, i);
}
console.log('Same index get check: ', test.get(25), test.get('dog'));
console.log('Check linked-list at index 25: ', JSON.stringify(test.storage[25], null, 2));
// insert decimal numbers
for (i = 0; i < 33; i++) {
	test.put(i + .5, i+1);
}
console.log('Check linked-list at index 25: ', JSON.stringify(test.storage[25], null, 2));
// insert booleans
test.put(true, 'I\'m true!');
test.put(false, 'I\'m false!');
console.log('Get with keys of true and false: ', test.get(true), test.get(false));
// insert multiple strings
var strings = ['foo', 'bar', 'magic', 'smoke', 'chimney', 'snakes', 'dell', 'pencil', 'cups', 'attack', 'jungle', 'sunset'];
strings.forEach(function(val, index) {
	test.put(val, index);
});
// retrieve entries using multiple strings
strings.forEach(function(val) {
	console.log('Get based on string "'+val+'": ', test.get(val));
});
// index 8 is loaded with 4 different values
console.log('Check linked-list at index 8: ', JSON.stringify(test.storage[8], null, 2));
console.log('Get values at index 8: ', test.get(8.5), test.get(8), test.get('chimney'), test.get('bar'));