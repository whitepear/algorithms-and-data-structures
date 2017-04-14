// Data-structure that decouples breadth-first search
// algorithm from the graph representation data structure.
var exampleGraph = require('./adjacencyList.js');
var factoryQueue = require('../stacks_queues/arrayQueue.js');
var factoryStack = require('../stacks_queues/arrayStack.js');

var protoBreadthFirstSearch = {
	hasPathTo: function(vertex) {
		return !!this.marked[vertex];
	},
	pathTo: function(vertex) {
		// if the vertices are not connected return null
		if (!this.hasPathTo(vertex)) return null;
		// generate a path by retracing from vertex to s via edgeTo
		var path = factoryStack();
		for (var x = vertex; x != this.s; x = this.edgeTo[x]) {
			path.push(x);
		}
		path.push(this.s);
		return path;
	}
};

function factoryBreadthFirstSearch(graph, sourceVertex) {
	var bfsObj = Object.create(protoBreadthFirstSearch);
	bfsObj.marked = new Array(graph.V); // array tracking visited vertices
	bfsObj.edgeTo = new Array(graph.V); // edgeTo[v] - previous vertex on path from s to v
	bfsObj.s = sourceVertex;
	
	// execute breadth-first search starting from sourceVertex,
	// populating the marked and edgeTo arrays as a result
	breadthFirstSearch(graph, sourceVertex);
	return bfsObj;


	function breadthFirstSearch(graph, sourceVertex) {
		// create queue, place sourceVertex on queue,
		// mark sourceVertex as visited
		var q = factoryQueue();
		q.enqueue(sourceVertex);
		bfsObj.marked[sourceVertex] = true;
		
		// iteratively visit each queued vertex's adjacent vertices,
		// marking them as you go (more vertices will likely be enqueued
		// in the iteration)
		while (!q.isEmpty()) {
			var currentVertex = q.dequeue();
			
			// iterate through currentVertex's linked-list of
			// adjacent vertices, provided that it's not empty
			var adjVertex = graph.adjEdges[currentVertex].head;
			
			while (adjVertex !== null) {
				// if the adjacentVertex has not been visited
				if (!bfsObj.marked[adjVertex.data]) {
					// put it on the queue, mark it as visited, set its edgeTo
					q.enqueue(adjVertex.data);
					bfsObj.marked[adjVertex.data] = true;
					bfsObj.edgeTo[adjVertex.data] = currentVertex;						
				}
				// increment to next neighbour in chain
				adjVertex = adjVertex.next;
			}			
		}
	}
}

// Tests
var test = factoryBreadthFirstSearch(exampleGraph, 1);
console.log('Test on initialization: ', test);
console.log('Valid hasPathTo test: ', test.hasPathTo(2));
console.log('Missed hasPathTo test: ', test.hasPathTo(9));
console.log('Valid pathTo test: ', test.pathTo(10));
console.log('Missed pathTo test: ', test.pathTo(0));

var test2 = factoryBreadthFirstSearch(exampleGraph, 0);
console.log('Test2 on initialization: ', test2);
console.log('Test2 hasPathTo check: ', test2.hasPathTo(9));
console.log('Test2 pathTo check: ', test2.pathTo(10));