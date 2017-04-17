// API for creating weighted edges in a graph.

var protoEdge = {
	either: function() {
		return this.v;
	},
	other: function(vertex) {
		if (vertex === this.v) return this.w;
		else return v;
	},
	compareTo: function(otherEdge) {
		if 			(this.weight < otherEdge.weight) return -1;
		else if (this.weight > otherEdge.weight) return 1;
		else 																		 return 0;
	}
};

function factoryEdge(v, w, weight) {
	var edgeObj = Object.create(protoEdge);
	edgeObj.v = v; // vertex
	edgeObj.w = w; // other vertex
	edgeObj.weight = weight; // edge weight

	return edgeObj;
}

module.exports = factoryEdge;