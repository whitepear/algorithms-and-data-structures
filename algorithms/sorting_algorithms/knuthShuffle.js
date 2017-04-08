function knuthShuffle(arr) {
	var n = arr.length;
	for (var i = 0; i < n; i++) {
		var random = Math.floor(Math.random() * (i + 1));
		var swap = arr[i];
		arr[i] = arr[random];
		arr[random] = swap;
	}
}

module.exports = knuthShuffle;

// Test
var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
knuthShuffle(nums);
console.log('Shuffled array: ', nums);