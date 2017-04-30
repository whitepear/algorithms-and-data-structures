function insertionSort(arr) {	
	for (var i = 0; i < arr.length; i++) {
		for (var j = i; j > 0; j--) {
			if (arr[j] < arr[j-1]) {
				var swap = arr[j-1];
				arr[j-1] = arr[j];
				arr[j] = swap;
			} else {
				break;
			}
		}
	}
}

module.exports = insertionSort;

// var nums = [34, 23, 12, 45, 9, 1, 24];
// insertionSort(nums);
// console.log(nums);