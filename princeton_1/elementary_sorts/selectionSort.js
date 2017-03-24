function selectionSort(arr) {
	for (var i = 0; i < arr.length; i++) {		
		var min = i;
		for (var j = i+1; j < arr.length; j++) {
			if (arr[j] < arr[min]) {
				min = j;
			}			
		}
		var swap = arr[i];
		arr[i] = arr[min];
		arr[min] = swap;
	}
}

var nums = [34, 23, 12, 45, 9, 1, 24];
selectionSort(nums);
console.log(nums);