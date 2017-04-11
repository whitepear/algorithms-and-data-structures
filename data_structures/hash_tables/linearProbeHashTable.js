// For simplicity's sake, this implementation does not use
// dynamically-resizing arrays.
var hash = require('../../algorithms/hashingFunction.js');


var protoHashTable = {
	hash: function(key) {
		// get hash-code, make it positive, fit to array range
		return (hash(key) & 0x7fffffff) % this.M;
	},
	put: function(key, val) {
		// loop through array in search of empty/pre-existing key slot. 
		// third for clause handles looping of search if it goes out-of-bounds.
		for (var i = this.hash(key); this.keys[i] !== undefined; i = (i+1) % this.M) {
			if (this.keys[i] === key) {
				break;
			}
		}
		// update both arrays with the index returned by the search above.
		this.keys[i] = key;
		this.vals[i] = val;
	},
	get: function(key) {
		// loop through array in search of key. 
		// third for clause handles looping of search if it goes out-of-bounds.
		for (var i = this.hash(key); this.keys[i] !== undefined; i = (i+1) % this.M) {
			if (this.keys[i] === key) {
				// use key to return val in parallel array
				return this.vals[i];
			}
		}
		return null;
	}
};

function factoryHashTable() {
	var hashTable = Object.create(protoHashTable);
	hashTable.M = 30001; // vals/keys array size
	hashTable.vals = new Array(30001);
	hashTable.keys = new Array(30001);
	return hashTable;
}


// Tests
var test = factoryHashTable();
console.log('Empty get check: ', test.get(32));
// integer insertion loop
for (var i = 0; i < 102; i++) {
	test.put(i, i);
}
// integer retrieval loop
for (i = 0; i < 102; i++) {
	console.log('Get check for "' + i + '": ', test.get(i));
}
test.put('a', 'I\'m a value referenced by a hashed string!');
console.log('Get check for string "a": ', test.get('a'));
console.log('String "a" hashes to position 97, but is placed at index: ', test.keys.indexOf('a'));
console.log('Invalid get check: ', test.get('b'));