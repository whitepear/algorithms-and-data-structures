// Implementation of Kruskal's algorithm for computing
// the minimum-spanning tree of a weighted graph.
var factoryQueue = require('../stacks_queues/arrayQueue.js');
var factoryUnionFind = require('../dynamic_connectivity/quickUnionPathCompression.js');
var shuffle = require('../../algorithms/sorting_algorithms/knuthShuffle.js');
var exampleGraph = require('./weightedGraph.js');

function factoryKruskal(weightedGraph) {
	// queue representation of mst
	var mst = factoryQueue();
	
	// insert all edges into edgeArr
	var edgeArr = new Array(weightedGraph.edges);
	var insertionCount = 0;
	// iterate over all vertices
	for (var v = 0; v < weightedGraph.V; v++) {
		// iterate over each vertex's adjacent edges
		var currentVertex = weightedGraph.adj[v].head;
		while (currentVertex !== null) {
			// insert edge into edgeArr
			edgeArr[insertionCount] = currentVertex.data;
			insertionCount++;
			currentVertex = currentVertex.next;
		}
	}
	
	// sort edgeArr based on weight
	objQuickSort(edgeArr);
	
	// construct MST
	var unionFind = factoryUnionFind(weightedGraph.V);
	var i = 0; // iteration var
	// iterate over edges
	while (i < edgeArr.length && mst.length < weightedGraph.V - 1) {
		var currentEdge = edgeArr[i]; // smallest unchecked edge
		var v = currentEdge.either(); // get vertex from currentEdge
		var w = currentEdge.other(v); // get other vertex from currentEdge
		
		// if currentEdge's vertices are not part of the same component 
		// within MST, adding currentEdge to MST will not create a cycle
		if (!unionFind.connected(v, w)) {
			unionFind.union(v, w); // merge sets
			mst.enqueue(currentEdge); // add edge to the MST
		}

		i++;
	}

	return mst;
}

// Tests
var test = factoryKruskal(exampleGraph);
console.log('Test after initialization: ', test);


// modified quicksort for sorting objects based on weight property
function objQuickSort(arr) {
	// shuffle needed for performance guarantee
	shuffle(arr);
	sort(arr, 0, arr.length-1);
	
	function sort(arr, lo, hi) {
		if (hi <= lo) return;
		var j = partition(arr, lo, hi);
		sort(arr, lo, j-1);
		sort(arr, j+1, hi);
	}

	function partition(arr, lo, hi) {
		var i = lo;
		var j = hi+1;
		while (true) {
			// find item on left to swap
			while (arr[++i].weight < arr[lo].weight) {
				if (i === hi) break;
			}
			// find item on right to swap
			while(arr[lo].weight < arr[--j].weight) {
				if (j === lo) break;
			}
			// check if pointers cross
			if (i >= j) break;
			// swap
			var swap = arr[i];
			arr[i] = arr[j];
			arr[j] = swap;
		}

		// swap with partitioning item
		swap = arr[lo];
		arr[lo] = arr[j];
		arr[j] = swap;

		// return index of item now known to be in place
		return j;
	}
}

// var quickSortTest = [
// 	{	weight: 5 },
// 	{	weight: 4	},
// 	{	weight: 9	},
// 	{	weight: 1	},
// 	{	weight: 3	},
// 	{	weight: 0	},
// 	{	weight: 11},
// 	{	weight: 2	}
// ];
// objQuickSort(quickSortTest);
// console.log('objQuickSortTest: ', quickSortTest);