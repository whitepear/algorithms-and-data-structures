// Directed adjacency-list graph, each index (vertex) uses
// a linked-list to list adjacent vertices.
var factoryLinkedList = require('../linkedList.js');

var protoDigraph = {
	addEdge: function(v, w) {
		// add edge for vertex v to w
		this.adj[v].add(w);
	},
	reverse: function() {
		// return reverse of digraph
		var reverse = factoryDigraph(this.V);
		for (var v = 0; v < this.V; v++) {
			var currentVertex = this.adj[v].head;
			while (currentVertex !== null) {
				reverse.addEdge(currentVertex.data, v);
				currentVertex = currentVertex.next;
			}
		}
		return reverse;
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

// Exported adjacency lists
// dag
var dag = factoryDigraph(7);
dag.addEdge(0,5);
dag.addEdge(0,2);
dag.addEdge(0,1);
dag.addEdge(3,6);
dag.addEdge(3,5);
dag.addEdge(3,4);
dag.addEdge(5,2);
dag.addEdge(6,4);
dag.addEdge(6,0);
dag.addEdge(3,2);
dag.addEdge(1,4);

// strongly-connected component-containing graph
var stronglyConnected = factoryDigraph(13);
stronglyConnected.addEdge(0,1);
stronglyConnected.addEdge(0,5);
stronglyConnected.addEdge(2,0);
stronglyConnected.addEdge(2,3);
stronglyConnected.addEdge(3,2);
stronglyConnected.addEdge(3,5);
stronglyConnected.addEdge(4,2);
stronglyConnected.addEdge(4,3);
stronglyConnected.addEdge(5,4);
stronglyConnected.addEdge(6,0);
stronglyConnected.addEdge(6,4);
stronglyConnected.addEdge(6,8);
stronglyConnected.addEdge(6,9);
stronglyConnected.addEdge(7,6);
stronglyConnected.addEdge(7,9);
stronglyConnected.addEdge(8,6);
stronglyConnected.addEdge(9,10);
stronglyConnected.addEdge(9,11);
stronglyConnected.addEdge(10,12);
stronglyConnected.addEdge(11,4);
stronglyConnected.addEdge(11,12);
stronglyConnected.addEdge(12,9);

module.exports = {
	dag: dag,
	stronglyConnected: stronglyConnected
};

// Tests
// var test = factoryDigraph(50);
// console.log('Empty test: ', test);
// test.addEdge(5, 10);
// test.addEdge(5, 6);
// test.addEdge(5, 12);
// test.addEdge(5, 30);
// console.log('Test post-insert: ', test);
// console.log('adj at index 5: ', JSON.stringify(test.adj[5], null, 2));