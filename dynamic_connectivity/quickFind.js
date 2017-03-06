// NOTES: union operation is too expensive

function quickFind(n) {
	// create object to be returned
	var quickFindObj = {
		idArr = []
	};
	
	// fill id array with values equal to indices
	for (var i = 0; i <= n; i++) {
		quickFindObj.idArr[i] = i;
	}

	// connected method to check if ids are equal (i.e. connected, part of same component)
	quickFindObj.connected = function(nodeOne, nodeTwo) {
		return this.idArr[nodeOne] === this.idArr[nodeTwo];
	}

	// union method to join nodes
	quickFindObj.union = function(nodeOne, nodeTwo) {
		// storing in variables is important to avoid potential insidious bug!
		var nodeOneId = this.idArr[nodeOne];
		var nodeTwoId = this.idArr[nodeTwo];
		
		// set all nodes with id of first node to id of second node
		this.idArr.forEach(function(val, index) {
			if (val === nodeOneId) {
				this.idArr[index] = nodeTwoId;
			}
		});
	}

	return quickFindObj;
}