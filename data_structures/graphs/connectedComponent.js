// Modification of DFS in order to identify
// connected components within a graph.
var exampleGraph = require('./adjacencyList.js');

var protoConnectedComponent = {
	id: function(vertex) {
		return this.id[vertex];
	}
};

function factoryConnectedComponent(graph) {
	var connectedComponent = Object.create(protoConnectedComponent);
	connectedComponent.marked = new Array(graph.V); // visited vertices
	connectedComponent.id = new Array(graph.V); // identify which vertex is within which component
	connectedComponent.count = 0; // number of components
	
	// go through every vertex in the graph
	for (var v = 0; v < graph.V; v++) {
		// if vertex is not marked, dfs it to discover its component
		if (!connectedComponent.marked[v]) {
			depthFirstSearch(graph, v);
			connectedComponent.count++;
		}
	}

	return connectedComponent;
	
	// modified DFS to identify components
	function depthFirstSearch(graph, sourceVertex) {
		// mark sourceVertex, set its connectedComponent ID
		connectedComponent.marked[sourceVertex] = true;
		connectedComponent.id[sourceVertex] = connectedComponent.count;
		// loop through adjacent vertices, dfs them if not marked
		var currentVertex = graph.adj[sourceVertex].head;
		while (currentVertex !== null) {
			if (!connectedComponent.marked[currentVertex.data]) {
				depthFirstSearch(graph, currentVertex.data);
			}
			// increment to next node in linked list
			currentVertex = currentVertex.next;
		}
	}
}

// Tests
var test = factoryConnectedComponent(exampleGraph);
console.log('Test on initialization: ', test);
console.log('No. of components within test: ', test.count);
for (var i = 0; i < test.id.length; i++) {
	console.log('ID for index ' + i + ': ', test.id[i]);
}