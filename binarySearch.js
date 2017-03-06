function binarySearch(sortedArr, targetValue) {
	var startIndex = 0;
	var stopIndex = sortedArr.length - 1;
	var middleIndex = Math.floor( (stopIndex + startIndex) / 2 );

	while (sortedArr[middleIndex] !== targetValue && startIndex < stopIndex) {
		
		// adjust search area
		if (targetValue < sortedArr[middleIndex]) {
			stopIndex = middleIndex - 1;
		} else if (targetValue > sortedArr[middleIndex]) {
			startIndex = middleIndex + 1;
		}
		
		// calculate new middleIndex based on new search area
		middleIndex = Math.floor( (stopIndex + startIndex) / 2 );
	}

	return sortedArr[middleIndex] === targetValue ? middleIndex : -1;
}