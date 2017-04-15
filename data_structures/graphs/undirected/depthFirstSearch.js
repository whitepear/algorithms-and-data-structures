// Data-structure that decouples depth-first search
// algorithm from the graph representation data structure.
var exampleGraph = require('./adjacencyList.js');
var factoryStack = require('../stacks_queues/arrayStack.js');

var protoDepthFirstSearch = {
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

function factoryDepthFirstSearch(graph, sourceVertex) {
	var dfsObj = Object.create(protoDepthFirstSearch);
	dfsObj.marked = new Array(graph.V); // visited vertices
	dfsObj.edgeTo = new Array(graph.V); // edgeTo[v] - previous vertex on path from s to v
	dfsObj.s = sourceVertex; // sourceVertex index
	
	// perform DFS on graph from sourceVertex, 
	// populating the marked and edgeTo arrays
	depthFirstSearch(graph, sourceVertex);
	return dfsObj;


	function depthFirstSearch(graph, sourceVertex) {
		dfsObj.marked[sourceVertex] = true;
		
		var currentVertex = graph.adj[sourceVertex].head;
		// if the linked-list isn't empty, loop through it
		while (currentVertex !== null) {
			// if the currentVertex is unmarked, recursively DFS it
			// and set the edge to it as sourceVertex
			if (!dfsObj.marked[currentVertex.data]) {
				depthFirstSearch(graph, currentVertex.data);
				dfsObj.edgeTo[currentVertex.data] = sourceVertex;
			}
			// iterate through the linked list
			currentVertex = currentVertex.next;
		}		
	}
}

var test = factoryDepthFirstSearch(exampleGraph, 1);
console.log('Test on initialization: ', test);
console.log('Valid hasPathTo test: ', test.hasPathTo(2));
console.log('Missed hasPathTo test: ', test.hasPathTo(9));
console.log('Valid pathTo test: ', test.pathTo(10));
console.log('Missed pathTo test: ', test.pathTo(0));

var test2 = factoryDepthFirstSearch(exampleGraph, 0);
console.log('Test2 on initialization: ', test2);
console.log('Test2 hasPathTo check: ', test2.hasPathTo(9));
console.log('Test2 pathTo check: ', test2.pathTo(10));