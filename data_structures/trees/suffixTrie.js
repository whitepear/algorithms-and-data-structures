// Suffix trie - no compression, constructed for educational
// purposes only. In practical scenarios, use a compressed suffix
// tree (or suffix array). Ukkonen's algorithm will construct such  
// a tree in linear time.

var protoSuffix = {
	factoryNode: function() {
		return {
			next: {}
		}
	},
	followPath: function(str) {
		// Follow path given by characters of str.
		// Return node at end of path, or null if we fall off.

		var currentNode = this.root;
		for (var i = 0; i < str.length; i++) {
			var currentChar = str[i];
			if (currentNode.next[currentChar] === undefined) {
				return null;
			}
			currentNode = currentNode.next[currentChar];
		}

		return currentNode;
	},
	hasSubstring: function(str) {
		// Return true iff str appears as a substring.
		return this.followPath(str) !== null;
	},
	hasSuffix: function(str) {
		// Return true iff str is a suffix.
		var resultNode = this.followPath(str);
		return (resultNode !== null && resultNode.next.$ !== undefined);
	}
};

function factorySuffix(str) {
	var suffixTrie = Object.create(protoSuffix);
	str = str + '$'; // add terminal symbol
	suffixTrie.root = suffixTrie.factoryNode();
	
	// generate all suffixes of str
	for (var i = 0; i < str.length; i++) {
		var currentSuffix = str.slice(i);
		var currentNode = suffixTrie.root;	

		// iterate through each character in i'th suffix
		for (var c = 0; c < currentSuffix.length; c++) {
			var currentChar = currentSuffix[c];
			if (currentNode.next[currentChar] === undefined) {
				currentNode.next[currentChar] = suffixTrie.factoryNode();
			}
			currentNode = currentNode.next[currentChar];
		}	
	}

	return suffixTrie;
}


// Tests
var test = factorySuffix('abaaba');
console.log('Valid followPath check (returns a node coerced to bool): ', test.followPath('aba') !== null);
console.log('Invalid followPath check: ', test.followPath('abaabc'));
console.log('Valid hasSubstring check: ', test.hasSubstring('aba'));
console.log('Valid hasSuffix check: ', test.hasSuffix('aba'));
console.log('Invalid hasSubstring check: ', test.hasSubstring('abac'));
console.log('Invalid hasSuffix check: ', test.hasSuffix('abaa'));