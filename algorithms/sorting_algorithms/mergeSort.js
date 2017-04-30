var insertionSort = require('./insertionSort.js');

function merge(arr, auxArr, lo, mid, hi) {
	// pre-condition: arr[lo..mid] is sorted
	// pre-condition: arr[mid+1..hi] is sorted

	// copy arr values to auxArr
	for (var k = 0; k < arr.length; k++) {
		auxArr[k] = arr[k];
	}

	// merge
	var i = lo;
	var j = mid + 1;
	for (k = lo; k <= hi; k++) {
		if 			(i > mid) 							arr[k] = auxArr[j++];
		else if (j > hi) 								arr[k] = auxArr[i++];
		else if (auxArr[j] < auxArr[i]) arr[k] = auxArr[j++];
		else 														arr[k] = auxArr[i++];
	}	
}

function mergeSort(arr, auxArr, lo, hi) {
	// when subarray is small, switch to insertion sort
	if (hi <= lo + 8) {
		insertionSort(arr, lo, hi);
		return;
	}
	var mid = lo + Math.floor( (hi - lo) / 2 );
	// sort each half and merge
	mergeSort(arr, auxArr, lo, mid);
	mergeSort(arr, auxArr, mid+1, hi);
	if ( !(arr[mid+1] < arr[mid]) ) return; // don't merge if arrays are already sorted
	merge(arr, auxArr, lo, mid, hi);
}

var nums = [34, 23, 12, 45, 9, 1, 24, 10, 2, 232, 43, 234634, 0, 1];
var numsAux = new Array(nums.length);
mergeSort(nums, numsAux, 0, nums.length-1);
console.log(nums);