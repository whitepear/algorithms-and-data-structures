// For simplicity's sake, this implementation does not use
// dynamically-resizing arrays.
var hash = require('../../algorithms/hashingFunction.js');


var protoHashTable = {
	hash: function(key) {
		// get hash-code, make it positive, fit to array range
		return (hash(key) & 0x7fffffff) % this.M;
	},
	put: function(key) {
		// loop through array in search of empty/pre-existing key slot. 
		// third for clause handles looping of search if it goes out-of-bounds.
		for (var i = this.hash(key); this.keys[i] !== undefined; i = (i+1) % this.M) {
			if (this.keys[i] === key) {
				return;
			}
		}
		// update array with the index returned by the search above.
		this.keys[i] = key;
	},
	has: function(key) {
		// loop through array in search of key. 
		// third for clause handles looping of search if it goes out-of-bounds.
		for (var i = this.hash(key); this.keys[i] !== undefined; i = (i+1) % this.M) {
			if (this.keys[i] === key) {
				// if key found, return true
				return true;
			}
		}
		return null;
	}
};

function factoryHashSet() {
	var hashTable = Object.create(protoHashTable);
	hashTable.M = 30001; // keys array size
	hashTable.keys = new Array(30001);
	return hashTable;
}


// Tests
var test = factoryHashSet();
console.log('Empty has check: ', test.has(32));
// integer insertion loop
for (var i = 0; i < 102; i++) {
	test.put(i);
}
// integer retrieval loop
for (i = 0; i < 102; i++) {
	console.log('Has check for "' + i + '": ', test.has(i));
}
test.put('foo');
test.put('bar');
console.log('Has check for string "foo": ', test.has('foo'));
console.log('Has check for string "bar": ', test.has('bar'));
console.log('Invalid has check for number 500: ', test.has(500));
console.log('Invalid has check for string "baz": ', test.has('baz'));