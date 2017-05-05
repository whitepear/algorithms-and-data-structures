// Suffix trie - no compression, constructed for educational
// purposes only. In practical scenarios, use a compressed suffix
// tree (or suffix array). Ukkonen's algorithm will construct such  
// a tree in linear time.

var protoSuffix = {
	factoryNode: function() {
		return {
			next: new Array(this.R)
		}
	}
};

function factorySuffix(str) {
	var suffixTrie = Object.create(protoSuffix);
	suffixTrie.R = 256; // extended ASCII
	str = str + '$'; // add terminator symbol
	suffixTrie.root = suffixTrie.factoryNode();
	
	// generate all suffixes of str
	for (var i = 0; i < str.length; i++) {
		var currentSuffix = str.slice(i);
		var currentNode = suffixTrie.root;	

		// iterate through each character in i'th suffix
		for (var c = 0; c < currentSuffix.length; c++) {
			var currentChar = currentSuffix.charCodeAt(c);
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