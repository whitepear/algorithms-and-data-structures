// API for creating weighted directed edges in a digraph.

var protoEdge = {
	from: function() {
		return this.v;
	},
	to: function() {
		return this.w;
	}
};

function factoryEdge(v, w, weight) {
	var edgeObj = Object.create(protoEdge);
	edgeObj.v = v;
	edgeObj.w = w;
	edgeObj.weight = weight;

	return edgeObj;
}

module.exports = factoryEdge;