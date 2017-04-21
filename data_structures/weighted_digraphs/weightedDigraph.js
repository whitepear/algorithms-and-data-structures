// Implementation of a weighted, directed graph.
var factoryLinkedList = require('../linkedList.js');
var factoryWeightedEdge = require('./weightedDirectedEdge.js');

var protoGraph = {
	addEdge: function(edge) {
		// add edge to adjacency list
		var v = edge.from();
		this.adj[v].add(edge);		
		this.edges++;
	}
};

function factoryGraph(V) {
	var graph = Object.create(protoGraph);
	graph.V = V;
	graph.edges = 0; // counter of edges within the graph
	graph.adj = new Array(V);
	for (var v = 0; v < V; v++) {
		graph.adj[v] = factoryLinkedList();
	}

	return graph;
}


// Tests
var test = factoryGraph(8);
// console.log('Test after initialization: ', test);
test.addEdge(factoryWeightedEdge(0,1,5));
test.addEdge(factoryWeightedEdge(0,4,9));
test.addEdge(factoryWeightedEdge(0,7,8));
test.addEdge(factoryWeightedEdge(1,2,12));
test.addEdge(factoryWeightedEdge(1,3,15));
test.addEdge(factoryWeightedEdge(1,7,4));
test.addEdge(factoryWeightedEdge(2,3,3));
test.addEdge(factoryWeightedEdge(2,6,11));
test.addEdge(factoryWeightedEdge(3,6,9));
test.addEdge(factoryWeightedEdge(4,5,4));
test.addEdge(factoryWeightedEdge(4,6,20));
test.addEdge(factoryWeightedEdge(4,7,5));
test.addEdge(factoryWeightedEdge(5,2,1));
test.addEdge(factoryWeightedEdge(5,6,13));
test.addEdge(factoryWeightedEdge(7,5,6));
test.addEdge(factoryWeightedEdge(7,2,7));
// console.log('Test after insertions: ', test);
// console.log('Edges at vertex 0: ', JSON.stringify(test.adj[0].head, null, 2));
module.exports = test;