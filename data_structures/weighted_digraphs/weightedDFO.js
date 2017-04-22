// Graph-processing algorithm that can be used
// to implement a topological sort on directed acyclic graphs.
// Modified to work with the weightedDirectedEdge data structure.
var factoryStack = require('../stacks_queues/arrayStack.js');
var exampleDigraph = require('./weightedDigraph.js');

function factoryDFO(digraph) {
	var dfo = {
		marked: new Array(digraph.V), // array of visited vertices
		reversePost: factoryStack() // stack to hold completed vertices
	};

	// iterate over vertex array, if unvisited, dfs it
	for (var v = 0; v < digraph.V; v++) {
		if (!dfo.marked[v]) {
			dfs(digraph, v);
		} 
	}

	return dfo;

	
	// modified depth-first search, places completed vertices
	// on stack to establish reverse post-order
	function dfs(digraph, vertex) {
		dfo.marked[vertex] = true;
		
		// loop over vertex's edges, if any
		var currentEdge = digraph.adj[vertex].head;
		while (currentEdge !== null) {
			// if an adj connected vertex is unmarked, call dfs on it
			if (!dfo.marked[currentEdge.data.to()]) {
				dfs(digraph, currentEdge.data.to());
			}
			// increment to next edge in chain
			currentEdge = currentEdge.next;		
		}
		// when work on vertex is complete, push to stack
		dfo.reversePost.push(vertex);		
	}
}

module.exports = factoryDFO;


// Tests
var test = factoryDFO(exampleDigraph);
// console.log('Test on initialization: ', JSON.stringify(test, null, 2));
// console.log('Test\'s reversePost stack: ', test.reversePost);
// console.log('Test\'s marked array: ', test.marked);