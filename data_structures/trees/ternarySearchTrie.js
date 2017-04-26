var factoryQueue = require('../stacks_queues/arrayQueue.js');

var protoTrie = {
	factoryNode: function() {
		return {
			left: null,
			mid: null,
			right: null
		};
	},
	put: function(key, val) {
		this.root = put(this.root, key, val, 0);

		function put(currentNode, key, val, d) {
			var char = key[d];
			if (currentNode === null || currentNode === undefined) {
				currentNode = protoTrie.factoryNode();
				currentNode.char = char;
			}

			if (char < currentNode.char) {
				currentNode.left = put(currentNode.left, key, val, d);
			} else if (char > currentNode.char) {
				currentNode.right = put(currentNode.right, key, val, d);
			} else if (d < key.length-1) {
				// if equal and not at key's end, go down middle link
				currentNode.mid = put(currentNode.mid, key, val, d+1);
			} else {
				// if equal and at key's end, set value
				currentNode.val = val;
			}

			return currentNode;
		}
	},
	contains: function(key) {
		return this.get(key) !== null;
	},
	get: function(key) {
		var x = get(this.root, key, 0);
		if (x === null || x.val === undefined) return null;
		return x.val;

		function get(currentNode, key, d) {
			if (currentNode === null || currentNode === undefined) return null;

			var char = key[d];
			if (char < currentNode.char) {
				return get(currentNode.left, key, d);
			} else if (char > currentNode.char) {
				return get(currentNode.right, key, d);
			} else if (d < key.length-1) {
				// if equal and not at key's end, go mid
				return get(currentNode.mid, key, d+1);
			} else {
				// if equal and at key's end, return node
				return currentNode;
			}
		}
	},
	keys: function() {
		// returns all keys in symbol table
		if (this.root) {
			var queue = factoryQueue();
			collect(this.root, '', queue);
			return queue;
		}

		// all keys in subtrie rooted at x with given prefix
		function collect(currentNode, prefix, queue) {
			if (currentNode === null) return;

			collect(currentNode.left, prefix, queue);
			if (currentNode.val !== undefined) {
				queue.enqueue(prefix + currentNode.char);
			}
			prefix = prefix + currentNode.char;
			collect(currentNode.mid, prefix, queue);
			prefix = prefix.slice(0, -1);
			collect(currentNode.right, prefix, queue);
		}
	},
	keysWithPrefix: function(prefix) {
		// collect keys in subtrie rooted at prefix
		var queue = factoryQueue();
		var rootNode = get(this.root, prefix, 0);
		if (rootNode === null) return queue;
		if (rootNode.val !== undefined) queue.enqueue(prefix);

		collect(rootNode.mid, prefix, queue);
		return queue;


		function get(currentNode, key, d) {
			if (currentNode === null || currentNode === undefined) return null;

			var char = key[d];
			if (char < currentNode.char) {
				return get(currentNode.left, key, d);
			} else if (char > currentNode.char) {
				return get(currentNode.right, key, d);
			} else if (d < key.length-1) {
				// if equal and not at key's end, go mid
				return get(currentNode.mid, key, d+1);
			} else {
				// if equal and at key's end, return node
				return currentNode;
			}
		}

		// all keys in subtrie rooted at x with given prefix
		function collect(currentNode, prefix, queue) {
			if (currentNode === null) return;

			collect(currentNode.left, prefix, queue);
			if (currentNode.val !== undefined) {
				queue.enqueue(prefix + currentNode.char);
			}
			prefix = prefix + currentNode.char;
			collect(currentNode.mid, prefix, queue);
			prefix = prefix.slice(0, -1);
			collect(currentNode.right, prefix, queue);
		}		
	},
	longestPrefixOf: function(query) {
		// search for query string, keeping track of longest
		// key encountered
		var length = 0;
		var currentNode = this.root;
		var i = 0;
		while (currentNode !== null && i < query.length) {
			var char = query[i];
			if (char < currentNode.char) {
				currentNode = currentNode.left;
			} else if (char > currentNode.char) {
				currentNode = currentNode.right;
			} else {
				i++;
				if (currentNode.val !== undefined) length = i;
				currentNode = currentNode.mid;
			}
		}

		return query.slice(0, length);
	}
}

function factoryTrie() {
	return Object.create(protoTrie);	
}


// Tests
var test = factoryTrie();
console.log('Test on initialization: ', test);
console.log('Contains miss: ', test.contains('foo'));
console.log('Get miss: ', test.get('foo'));
console.log('Empty .keys() check: ', test.keys());
test.put('foo', 1);
console.log('Test post-insert: ', JSON.stringify(test, null, 2));
console.log('Contains hit: ', test.contains('foo'));
console.log('Get hit: ', test.get('foo'));
test.put('far', 2);
console.log('Test post-insert: ', JSON.stringify(test, null, 2));
console.log('Contains hit: ', test.contains('far'));
console.log('Get hit: ', test.get('far'));
test.put('zebra', 3);
test.put('blood', 4);
test.put('satellite', 5);
test.put('brooklyn', 6);
console.log('.keys() check: ', JSON.stringify(test.keys(), null, 2));
test.put('open', 7);
test.put('opal', 8);
test.put('opus', 9);
test.put('oprah', 10);
test.put('opry', 11);
test.put('opine', 12);
console.log('.keysWithPrefix(\'op\') check: ', JSON.stringify(test.keysWithPrefix('op'), null, 2));
console.log('.longestPrefixOf(\'farthest\') check: ', test.longestPrefixOf('farthest'));