// NOTES: Find becomes too expensive as trees become tall

function quickUnion(n) {
	// create object to be returned
	var quickUnionObj = {
		ids = []
	};
	
	// fill id array with values equal to indices
	for (var i = 0; i < n; i++) {
		quickUnionObj.ids[i] = i;
	}

	// method for finding the root node of a component tree
	quickUnionObj.root = function(i) {
		// chase parent pointers until root is reached
		while (i !== this.ids[i]) {
			i = this.ids[i];
		}
		return i;
	}

	// method to check if nodes are connected
	quickUnionObj.connected = function(nodeOne, nodeTwo) {
		return this.root(nodeOne) === this.root(nodeTwo);
	}

	// method to connect nodes
	quickUnionObj.union = function(nodeOne, nodeTwo) {
		var rootOne = this.root(nodeOne);
		var rootTwo = this.root(nodeTwo);
		this.ids[rootOne] = rootTwo;
	}

	return quickUnionObj;
}