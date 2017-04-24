var protoTrie = {
	factoryNode: function() {
		return {
			next: new Array(this.R)
		}
	},
	put: function(key, val) {
		this.root = put.call(this, this.root, key, val, 0);

		function put(currentNode, key, val, d) {
			if (currentNode === undefined) {
				currentNode = this.factoryNode();
			}
			if (d === key.length) {
				currentNode.val = val;
				return currentNode;
			}
			var c = key[d].charCodeAt();
			currentNode.next[c] = put.call(this, currentNode.next[c], key, val, d+1);
			return currentNode;
		}
	},
	contains: function(key) {
		return this.get(key) !== null;
	},
	get: function(key) {
		var x = get(this.root, key, 0);
		if (x === null) return null;
		return x.val;

		function get(currentNode, key, d) {
			if (currentNode === undefined) return null;
			if (d === key.length) return currentNode;
			var c = key[d].charCodeAt();
			return get(currentNode.next[c], key, d+1);
		}
	}
};

function factoryTrie() {
	var trie = Object.create(protoTrie);
	trie.R = 256; // extended ASCII
	trie.root = trie.factoryNode();
	return trie;
}


// Tests
var test = factoryTrie();
console.log('Test on initialization: ', JSON.stringify(test, null, 2));
console.log('Contains miss check: ', test.contains('foo'));
console.log('Get miss check: ', test.get('foo'));
test.put('foo', 1);
console.log('Test post-insertion: ', JSON.stringify(test, null, 2));
console.log('Contains hit check: ', test.contains('foo'));
console.log('Get hit check: ', test.get('foo'));