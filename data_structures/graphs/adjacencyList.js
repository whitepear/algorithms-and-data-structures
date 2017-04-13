// Adjacency-list graph, each index (vertex) uses
// a linked-list to list adjacent vertices.

var protoAdjacencyList = {
	addEdge: function(v, w) {
		// add edges for vertices v and w
		addEdge.call(this, v, w);
		addEdge.call(this, w, v);

		function addEdge(vertex, vertexToBeAdded) {
			// check if a linked-list exists at vertex-index
			if (this.storage[vertex] !== undefined) {
				// a list exists, insert at start
				this.storage[vertex] = factoryNode(vertexToBeAdded, this.storage[vertex]);
			} else {
				// no list exists, insert a node
				this.storage[vertex] = factoryNode(vertexToBeAdded);
			}
		}
	},

};

function factoryNode(vertex, next) {
	return {
		vertex: vertex,
		next: next || null
	};
}

function factoryAdjacencyList(V) {
	var adjacencyList = Object.create(protoAdjacencyList);
	adjacencyList.V = V; // number of vertices
	adjacencyList.storage = new Array(V);	// array of linked-lists
	return adjacencyList;
}


// Tests
var test = factoryAdjacencyList(50);
console.log('Empty test: ', test);
test.addEdge(5, 10);
test.addEdge(5, 6);
test.addEdge(5, 12);
test.addEdge(5, 30);
console.log('Test post-insert: ', test);
console.log('Storage at index 5: ', JSON.stringify(test.storage[5], null, 2));