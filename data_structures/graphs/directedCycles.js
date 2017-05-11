// Algorithm for finding cycles in directed graphs.
// Decoupled from graph and represented as a data structure.
var factoryStack = require('../stacks_queues/arrayStack.js');
var exampleGraph = require('./digraph.js');

var protoCycle = {
	hasCycle: function() {
		return this.cycle !== null;
	}
};

function directedCycles(digraph) {
	var marked = new Array(digraph.V);
	var edgeTo = new Array(digraph.V);
	var onStack = new Array(digraph.V); // track vertices on call-stack
	var cycle = null; // if cycle is present, cycle is a stack

	for (var v = 0; v < digraph.V; v++) {
		if (!marked[v] && cycle === null) {
			dfs(digraph, v);
		}
	}

	var cycleInfo = Object.create(protoCycle);

	cycleInfo.marked = marked;
	cycleInfo.edgeTo = edgeTo;
	cycleInfo.onStack = onStack;
	cycleInfo.cycle = cycle;
	return cycleInfo;


	function dfs(digraph, currentVertex) {
		onStack[currentVertex] = true;
		marked[currentVertex] = true;

		// iterate over connected neighbouring vertices
		var currentLink = digraph.adj[currentVertex].head;
		while (currentLink !== null) {
			var currentNeighbour = currentLink.data;

			// short circuit if directed cycle found
			if (cycle !== null) return;

			// found new vertex, so recur
			else if (!marked[currentNeighbour]) {
				edgeTo[currentNeighbour] = currentVertex;
				dfs(digraph, currentNeighbour);
			}

			// trace back directed cycle
			else if (onStack[currentNeighbour]) {
				cycle = factoryStack();
				for (var x = currentVertex; x !== currentNeighbour; x = edgeTo[x]) {
					cycle.push(x);
				}
				cycle.push(currentNeighbour);
				cycle.push(currentVertex);
			}

			currentLink = currentLink.next;
		}
		onStack[currentVertex] = false;
	}
}


// Tests
var test = directedCycles(exampleGraph.dag);
console.log('Test DAG on initialization: ', test);
console.log('Test DAG has cycle: ', test.hasCycle());

test = directedCycles(exampleGraph.stronglyConnected);
console.log('Test non-DAG on initialization: ', test);
console.log('Test non-DAG has cycle: ', test.hasCycle());