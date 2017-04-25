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
test.put('foo', 1);
console.log('Test post-insert: ', JSON.stringify(test, null, 2));
console.log('Contains hit: ', test.contains('foo'));
console.log('Get hit: ', test.get('foo'));
test.put('far', 2);
console.log('Test post-insert: ', JSON.stringify(test, null, 2));
console.log('Contains hit: ', test.contains('far'));
console.log('Get hit: ', test.get('far'));