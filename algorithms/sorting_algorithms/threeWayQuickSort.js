var shuffle = require('./knuthShuffle.js');

function threeWayQuickSort(arr, lo, hi) {
	if (hi <= lo) return;

	var lt = lo;
	var gt = hi;
	var i = lo;
	var v = arr[lo];
	var swap;
	
	while (i <= gt) {
		if (arr[i] < v) {
			swap = arr[lt];
			arr[lt] = arr[i];
			arr[i] = swap;
			lt++;
			i++;
		} else if (arr[i] > v) {
			swap = arr[gt];
			arr[gt] = arr[i];
			arr[i] = swap;
			gt--;
		} else {
			i++;
		}
	}

	threeWayQuickSort(arr, lo, lt - 1);
	threeWayQuickSort(arr, gt + 1, hi);
}

var nums = [34, 23, 12, 45, 9, 1, 24, 10, 2, 232, 43, 234634, 0, 1];
shuffle(nums);
threeWayQuickSort(nums, 0, nums.length - 1);
console.log('Quick sorted array: ', nums);