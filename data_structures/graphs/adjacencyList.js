// Adjacency-list graph, each index (vertex) uses
// a linked-list to list adjacent vertices.
var factoryLinkedList = require('../linkedList.js');

var protoAdjacencyList = {
	addEdge: function(v, w) {
		// add edges for vertices v and w
		this.adj[v].add(w);
		this.adj[w].add(v);		
	}
};

function factoryAdjacencyList(V) {
	var adjacencyList = Object.create(protoAdjacencyList);
	adjacencyList.V = V; // number of vertices
	adjacencyList.adj = new Array(V); // array of linked-lists
	// populate adj with linked-lists
	for (var i = 0; i < V; i++) {
		adjacencyList.adj[i] = factoryLinkedList();
	}
	return adjacencyList;
}

// Exported adjacency list
var foo = factoryAdjacencyList(11);
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
// console.log('adj at index 5: ', JSON.stringify(test.adj[5], null, 2));