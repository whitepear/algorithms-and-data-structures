// Implementation of the Kosaraju-Sharir algorithm
// for detecting strongly-connected components in a digraph.
var exampleDigraph = require('./digraph.js').stronglyConnected;
var factoryDFO = require('./depthFirstOrder.js');


var protoSCC = {
	checkId: function(vertex) {
		return this.id[vertex];
	},
	stronglyConnected: function(vertexOne, vertexTwo) {
		return this.id[vertexOne] === this.id[vertexTwo];
	}
};

function factorySCC(digraph) {
	var connectedComponent = Object.create(protoSCC);
	connectedComponent.marked = new Array(digraph.V); // visited vertices
	connectedComponent.id = new Array(digraph.V); // identify which vertex is within which component
	connectedComponent.count = 0; // number of components

	// get reverse post-order array of reversed graph
	var reversedDFO = factoryDFO(digraph.reverse());
	reversedDFO = reversedDFO.reversePost.storage.reverse();

	
	// go through every vertex in the digraph, following the order
	// generated by reversedDFO
	for (var v = 0; v < reversedDFO.length; v++) {
		// ignore the undefined values that may be present at start
		// of the reversedDFO following reversal of reversedDFO
		var currentVertex = reversedDFO[v];
		if (currentVertex !== undefined) {			
			// if vertex is not marked, dfs it to discover its component
			if (!connectedComponent.marked[currentVertex]) {
				depthFirstSearch(digraph, currentVertex);
				connectedComponent.count++;
			}
		}
	}

	return connectedComponent;
	
	
	// modified DFS to identify components
	function depthFirstSearch(digraph, sourceVertex) {
		// mark sourceVertex, set its connectedComponent ID
		connectedComponent.marked[sourceVertex] = true;
		connectedComponent.id[sourceVertex] = connectedComponent.count;
		// loop through adjacent vertices, dfs them if not marked
		var currentVertex = digraph.adj[sourceVertex].head;
		while (currentVertex !== null) {
			if (!connectedComponent.marked[currentVertex.data]) {
				depthFirstSearch(digraph, currentVertex.data);
			}
			// increment to next node in linked list
			currentVertex = currentVertex.next;
		}
	}
}


// Tests
var test = factorySCC(exampleDigraph);
console.log('Test on initialization: ', test);
console.log('Valid stronglyConnected test: ', test.stronglyConnected(0,2));
console.log('Invalid stronglyConnected test: ', test.stronglyConnected(0,1));
for (var i = 0; i < test.id.length; i++) {
	console.log('Valid checkID check for ' + i + ': ', test.checkId(i));
}
console.log('Invalid checkID check: ', test.checkId(500));