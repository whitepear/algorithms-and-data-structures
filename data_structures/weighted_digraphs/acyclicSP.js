// Algorithm for finding the shortest paths within an edge-weighted DAG.
var exampleGraph = require('./weightedDigraph.js');
var factoryDFO = require('./weightedDFO.js');

function factoryAcyclicShortestPath(weightedDigraph, sourceVertex) {
	var edgeTo = new Array(weightedDigraph.V);
	var distTo = new Array(weightedDigraph.V);

	for (var v = 0; v < weightedDigraph.V; v++) {
		distTo[v] = Infinity;
	}
	distTo[sourceVertex] = 0;
	
	// topologically sort the graph to get the reverse post-order stack
	var reversePostOrder = factoryDFO(weightedDigraph).reversePost;
	
	// visit vertex in order specified by stack
	while (!reversePostOrder.isEmpty()) {
		var currentVertex = reversePostOrder.pop();
		var currentAdjLink = weightedDigraph.adj[currentVertex].head;
		
		// relax the vertex's edges
		while (currentAdjLink !== null) {
			var currentEdge = currentAdjLink.data; // extract edge data from link
			relax(currentEdge);

			currentAdjLink = currentAdjLink.next; // iterate to next link in list
		}
	}

	return {
		edgeTo: edgeTo,
		distTo: distTo
	};


	function relax(edge) {
		var v = edge.from();
		var w = edge.to();
		
		if (distTo[w] > distTo[v] + edge.weight) {
			distTo[w] = distTo[v] + edge.weight;
			edgeTo[w] = v;
		}
	}
}


// Tests
var test = factoryAcyclicShortestPath(exampleGraph, 0);
console.log(test);