var shuffle = require('./knuthShuffle.js');

function quickSelect(arr, k) {
	shuffle(arr);
	var lo = 0;
	var hi = arr.length - 1;

	while (hi > lo) {
		var j = partition(arr, lo, hi);

		if 			(j < k) lo = j + 1;
		else if (j > k) hi = j - 1;
		else 						return arr[k];
	}

	return arr[k];


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


// Test
var nums = [34, 23, 12, 45, 9, 1, 24, 10, 2, 232, 43, 234634, 0, 1];
console.log(quickSelect(nums, 4));
