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