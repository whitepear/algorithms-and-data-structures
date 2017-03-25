// Uses Knuth's 3x+1 increment sequence.

function shellSort(arr) {
	var n = arr.length;

	// generate increment sequence
	var h = 1;	
	while (h < n/3) {
		h = 3*h + 1; 
	}
	
	// h-sort the array
	while (h >= 1) {
		for (var i = h; i < n; i++) {
			for (var j = i; ( j >= h && arr[j] < arr[j-h] ); j -= h) {
				var swap = arr[j];
				arr[j] = arr[j-h];
				arr[j-h] = swap;
			}
		}

		h = Math.round(h/3); // move to next increment
	}
}

var nums = [34, 23, 12, 45, 9, 1, 24];
shellSort(nums);
console.log(nums);