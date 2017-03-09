// NOTES: union operation is too expensive

function quickFind(n) {
	// create object to be returned
	var quickFindObj = {
		ids = []
	};
	
	// fill id array with values equal to indices
	for (var i = 0; i < n; i++) {
		quickFindObj.ids[i] = i;
	}

	// connected method to check if ids are equal (i.e. connected, part of same component)
	quickFindObj.connected = function(nodeOne, nodeTwo) {
		return this.ids[nodeOne] === this.ids[nodeTwo];
	}

	// union method to join nodes
	quickFindObj.union = function(nodeOne, nodeTwo) {
		// storing in variables is important to avoid potential insidious bug!
		var nodeOneId = this.ids[nodeOne];
		var nodeTwoId = this.ids[nodeTwo];
		
		// set all nodes with id of first node to id of second node
		this.ids.forEach(function(val, index) {
			if (val === nodeOneId) {
				this.ids[index] = nodeTwoId;
			}
		});
	}

	return quickFindObj;
}