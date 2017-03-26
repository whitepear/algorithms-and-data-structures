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

function mergeSort(arr) {
	var n = arr.length;
	var auxArr = new Array(n);
	for (var sz = 1; sz < n; sz = sz+sz) {
		for (var lo = 0; lo < n-sz; lo += sz+sz) {
			merge(arr, auxArr, lo, lo+sz-1, Math.min(lo+sz+sz-1, n-1));
		}
	}
}

var nums = [34, 23, 12, 45, 9, 1, 24, 10, 2, 232, 43, 234634, 0, 1];
mergeSort(nums);
console.log(nums);