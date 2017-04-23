// Implementation of the Bellman-Ford algorithm, for finding 
// shortest paths within an edge-weighted digraph that contains
// negatively-weighted edges. Will not work if graph contains
// negative cycles.
var exampleDigraph = require('./weightedDigraph.js');
var factoryQueue = require('../stacks_queues/arrayQueue.js');

function factoryBellmanFord(weightedDigraph, sourceVertex) {
	var onQueue = new Array(weightedDigraph.V);
	var edgeTo = new Array(weightedDigraph.V);
	var distTo = new Array(weightedDigraph.V);
	for (var v = 0; v < weightedDigraph.V; v++) {
		distTo[v] = Infinity;
	}
	distTo[sourceVertex] = 0;
	
	// Bellman-Ford algorithm
	var queue = factoryQueue();
	queue.enqueue(sourceVertex);
	onQueue[sourceVertex] = true;
	while (!queue.isEmpty()) {
		var v = queue.dequeue();
		onQueue[v] = false;
		relax(weightedDigraph, v);
	}

	return {
		distTo: distTo,
		edgeTo: edgeTo
	};
	
	
	// relax vertex and put other endpoints on queue if changed
	function relax(weightedDigraph, currentVertex) {
		// iterate over currentVertex's edges
		var currentLink = weightedDigraph.adj[currentVertex].head;
		while (currentLink !== null) {
			var currentEdge = currentLink.data; // extract edge data from link
			var otherVertex = currentEdge.to();
			if (distTo[otherVertex] > distTo[currentVertex] + currentEdge.weight) {
				distTo[otherVertex] = distTo[currentVertex] + currentEdge.weight;
				edgeTo[otherVertex] = currentVertex;
				if (!onQueue[otherVertex]) {
					queue.enqueue(otherVertex);
					onQueue[otherVertex] = true;
				}
			}

			currentLink = currentLink.next; // iterate to next link in list
		}
	}
}


// Tests
var test = factoryBellmanFord(exampleDigraph, 0);
console.log('Test on initialization: ', test);