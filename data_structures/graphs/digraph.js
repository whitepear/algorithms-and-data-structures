// Directed adjacency-list graph, each index (vertex) uses
// a linked-list to list adjacent vertices.
var factoryLinkedList = require('../linkedList.js');

var protoDigraph = {
	addEdge: function(v, w) {
		// add edge for vertex v to w
		this.adj[v].add(w);
	}
};

function factoryDigraph(V) {
	var digraph = Object.create(protoDigraph);
	digraph.V = V; // number of vertices
	digraph.adj = new Array(V); // array of linked-lists
	// populate adj with linked-lists
	for (var i = 0; i < V; i++) {
		digraph.adj[i] = factoryLinkedList();
	}
	return digraph;
}

// Exported adjacency list
var foo = factoryDigraph(7);
foo.addEdge(0,5);
foo.addEdge(0,2);
foo.addEdge(0,1);
foo.addEdge(3,6);
foo.addEdge(3,5);
foo.addEdge(3,4);
foo.addEdge(5,2);
foo.addEdge(6,4);
foo.addEdge(6,0);
foo.addEdge(3,2);
foo.addEdge(1,4);
module.exports = foo;

// Tests
// var test = factoryDigraph(50);
// console.log('Empty test: ', test);
// test.addEdge(5, 10);
// test.addEdge(5, 6);
// test.addEdge(5, 12);
// test.addEdge(5, 30);
// console.log('Test post-insert: ', test);
// console.log('adj at index 5: ', JSON.stringify(test.adj[5], null, 2));