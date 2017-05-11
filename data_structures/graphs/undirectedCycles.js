// Algorithm for finding cycles in undirected graphs.
// Decoupled from graph and represented as a data structure.
var factoryStack = require('../stacks_queues/arrayStack.js')
var exampleGraph = require('./adjacencyList.js');

var protoCycle = {
	hasCycle: function() {
		return this.cycle !== null;
	}
};

function undirectedCycles(graph) {
	var cycleInfo = Object.create(protoCycle);
	marked = new Array(graph.V);
	edgeTo = new Array(graph.V);
	cycle = null; // will hold a stack if a cycle is present
	
	// if (hasSelfLoop(graph)) return;
	// if (hasParallelEdges(graph)) return;
	for (var v = 0; v < graph.V; v++) {
		if (!marked[v] && cycle === null) {
			dfs(graph, -1, v);
		}
	}
	
	cycleInfo.marked = marked;
	cycleInfo.edgeTo = edgeTo;
	cycleInfo.cycle = cycle;
	return cycleInfo;


	function dfs(graph, prevVertex, currentVertex) {
		marked[currentVertex] = true;
		
		// loop over vertices connected to currentVertex
		var currentLink = graph.adj[currentVertex].head;
		while (currentLink !== null) {
			
			// short circuit if cycle already found
			if (cycle !== null) return;

			var currentNeighbour = currentLink.data;
			if (!marked[currentNeighbour]) {
				edgeTo[currentNeighbour] = currentVertex;
				dfs(graph, currentVertex, currentNeighbour);
			}

			// check for cycle (but disregard edge leading to the prevVertex)
			else if (currentNeighbour !== prevVertex) {
				cycle = factoryStack();
				for (var x = currentVertex; x !== currentNeighbour; x = edgeTo[x]) {
					cycle.push(x);
				}
				cycle.push(currentNeighbour);
				cycle.push(currentVertex);
			}

			currentLink = currentLink.next;
		}
	}
}


// Tests
var test = undirectedCycles(exampleGraph);
console.log('Test on initialization: ', test);
console.log('Test has a cycle: ', test.hasCycle());