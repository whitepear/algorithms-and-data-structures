// Implementation of a weighted, undirected graph.
var factoryLinkedList = require('../linkedList.js');
var factoryWeightedEdge = require('./weightedEdge.js');

var protoGraph = {
	addEdge: function(edge) {
		// add edge to both adjacency lists
		var v = edge.either();
		var w = edge.other(v);
		this.adj[v].add(edge);
		this.adj[w].add(edge);
		this.edges = this.edges + 2;
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
test.addEdge(factoryWeightedEdge(0,2,26));
test.addEdge(factoryWeightedEdge(0,4,38));
test.addEdge(factoryWeightedEdge(0,7,16));
test.addEdge(factoryWeightedEdge(1,2,36));
test.addEdge(factoryWeightedEdge(1,3,29));
test.addEdge(factoryWeightedEdge(1,5,32));
test.addEdge(factoryWeightedEdge(1,7,19));
test.addEdge(factoryWeightedEdge(2,3,17));
test.addEdge(factoryWeightedEdge(2,7,34));
test.addEdge(factoryWeightedEdge(3,6,52));
test.addEdge(factoryWeightedEdge(4,5,35));
test.addEdge(factoryWeightedEdge(4,7,37));
test.addEdge(factoryWeightedEdge(5,7,28));
test.addEdge(factoryWeightedEdge(6,0,58));
test.addEdge(factoryWeightedEdge(6,2,40));
test.addEdge(factoryWeightedEdge(6,4,93));
// console.log('Test after insertions: ', test);
// console.log('Edges at vertex 0: ', JSON.stringify(test.adj[0].head, null, 2));
module.exports = test;