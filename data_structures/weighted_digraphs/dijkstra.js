// Implementation of Dijkstra's algorithm using a binary heap.
// Binary heap does not have decrease-key functionality.
// See the paper below for further detail on this design decision.

// "Overall, our results show that using a standard priority queue
// without the decrease-key operation results in better performance
// than using one with the decrease-key operation in most cases."
// http://www3.cs.stonybrook.edu/~rezaul/papers/TR-07-54.pdf

var exampleGraph = require('./weightedDigraph');
var factoryMinHeap = require('./minHeap.js');

function factoryDijkstra(weightedDigraph, sourceVertex) {
	var pq = factoryMinHeap(); // priority queue ordered by distance from sourceVertex
	var dist = new Array(weightedDigraph.V); // dist[v] gives distance from sourceVertex to v
		
	// set default distance from sourceVertex to all other vertices as Infinity
	for (var v = 0; v < weightedDigraph.V; v++) {
		dist[v] = Infinity;
	}
	
	// place sourceVertex on queue, distance to itself is 0
	pq.insert({
		vertex: sourceVertex,
		distance: 0
	});

	while (!pq.isEmpty()) {
		var minVertexObj = pq.delMin(); // take the vertex with the shortest distance off pq		
		var currentVertex = minVertexObj.vertex; // get vertex number
		var distance = minVertexObj.distance; // get distance of vertex from source
		
		// if the vertex has never been removed from the heap before,
		// its distance property-value will be less than its entry in dist[] (Infinity)
		if (distance < dist[currentVertex]) {
			dist[currentVertex] = distance; // set dist for the vertex
			
			// iterate over its adjacent edges, which are stored as a   
			// linked-list within the graph's vertex-indexed array 
			var currentEdgeLink = weightedDigraph.adj[currentVertex].head;
			while (currentEdgeLink !== null) {
				var currentEdge = currentEdgeLink.data; // extract edge data from the link entry
				var otherVertex = currentEdge.to(); // get the vertex that currentVertex is connected to via currentEdge
				
				// check if the path composed of (source to currentVertex + the currentEdge)
				// is shorter than the currently-recorded path to otherVertex
				if ( (dist[currentVertex] + currentEdge.weight) < dist[otherVertex] ) {
					// if so, insert this vertex onto to the pq for later processing,
					// with the updated shortest known path-distance we've just discovered
					pq.insert({
						vertex: otherVertex,
						distance: (dist[currentVertex] + currentEdge.weight)
					});										
					
				}

				currentEdgeLink = currentEdgeLink.next; // increment to the next link in the list
			}
		}
	}

	return {
		dist: dist
	};
}

var test = factoryDijkstra(exampleGraph, 0);
console.log(test);