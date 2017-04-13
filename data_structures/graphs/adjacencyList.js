// Adjacency-list graph, each index (vertex) uses
// a linked-list to list adjacent vertices.

var protoAdjacencyList = {
	addEdge: function(v, w) {
		// add edges for vertices v and w
		addEdge.call(this, v, w);
		addEdge.call(this, w, v);

		function addEdge(vertex, vertexToBeAdded) {
			// check if a linked-list exists at vertex-index
			if (this.adjEdges[vertex] !== undefined) {
				// a list exists, insert at start
				this.adjEdges[vertex] = factoryNode(vertexToBeAdded, this.adjEdges[vertex]);
			} else {
				// no list exists, insert a node
				this.adjEdges[vertex] = factoryNode(vertexToBeAdded);
			}
		}
	}
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
	adjacencyList.adjEdges = new Array(V);	// array of linked-lists
	return adjacencyList;
}

// Exported adjacency list
var foo = factoryAdjacencyList(10);
foo.addEdge(1, 2);
foo.addEdge(1, 3);
foo.addEdge(1, 5);
foo.addEdge(1, 8);
foo.addEdge(2, 6);
foo.addEdge(2, 10);
foo.addEdge(3, 6);
foo.addEdge(4, 7);
module.exports = foo;

// Tests
// var test = factoryAdjacencyList(50);
// console.log('Empty test: ', test);
// test.addEdge(5, 10);
// test.addEdge(5, 6);
// test.addEdge(5, 12);
// test.addEdge(5, 30);
// console.log('Test post-insert: ', test);
// console.log('adjEdges at index 5: ', JSON.stringify(test.adjEdges[5], null, 2));