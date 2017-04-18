// Lazy implementation of Prim's algorithm for
// computing the minimum-spanning tree of a weighted graph.
var exampleGraph = require('./weightedGraph.js');
var factoryQueue = require('../stacks_queues/arrayQueue.js');
var factoryMinHeap = require('./minHeap.js');

function factoryPrim(weightedGraph) {
	var mst = factoryQueue(); // minimum-spanning tree
	var marked = new Array(weightedGraph.V); // visited vertices
	var pq = factoryMinHeap(); // primary-queue of edges

	visit(weightedGraph, 0);

	while (!pq.isEmpty()) {
		var currentEdge = pq.delMin(); // get minimum edge
		var v = currentEdge.either(); // get constituent vertices
		var w = currentEdge.other(v);

		if (marked[v] && marked[w]) continue; // ignore, already on MST
		mst.enqueue(currentEdge); // add edge to MST
		// whichever vertex in currentEdge was not on tree,
		// visit and put on the tree
		if (!marked[v]) visit(weightedGraph, v);
		if (!marked[w]) visit(weightedGraph, w);
	}

	return mst;

	
	// visit puts the vertex on the tree and
	// places its viable edges onto the priority queue
	function visit(weightedGraph, vertex) {
		marked[vertex] = true; // add vertex to tree

		// for each adjacent-edge of vertex, add it
		// to the priority queue if the other vertex
		// in the edge is not already on the tree
		var adjEdge = weightedGraph.adj[vertex].head;
		while (adjEdge !== null) {
			if (!marked[adjEdge.data.other(vertex)]) {
				pq.insert(adjEdge.data);
			}

			adjEdge = adjEdge.next;
		}
	}
}


// Tests
var test = factoryPrim(exampleGraph);
console.log('Test on initialization: ', test);