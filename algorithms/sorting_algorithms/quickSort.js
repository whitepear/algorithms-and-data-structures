var shuffle = require('./knuthShuffle.js');
var insertionSort = require('./insertionSort.js');

function quickSort(arr) {
	// shuffle needed for performance guarantee
	shuffle(arr);
	sort(arr, 0, arr.length-1);
	
	function sort(arr, lo, hi) {
		// switch to insertion sort for small subarrays
		if (hi <= lo + 9) {
			insertionSort(arr, lo, hi);
			return;
		}
		var j = partition(arr, lo, hi);
		sort(arr, lo, j-1);
		sort(arr, j+1, hi);
	}

	function partition(arr, lo, hi) {
		var i = lo;
		var j = hi+1;
		while (true) {
			// find item on left to swap
			while (arr[++i] < arr[lo]) {
				if (i === hi) break;
			}
			// find item on right to swap
			while(arr[lo] < arr[--j]) {
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

var nums = [34, 23, 12, 45, 9, 1, 24, 10, 2, 232, 43, 234634, 0, 1];
quickSort(nums);
console.log(nums);