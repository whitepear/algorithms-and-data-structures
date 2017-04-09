function recursiveBinarySearch(sortedArr, targetValue) {
   return binarySearch(sortedArr, targetValue, 0, sortedArr.length-1);

   function binarySearch(sortedArr, targetValue, lo, hi) {
      if (lo > hi) return -1;
      var mid = Math.floor((lo + hi)/2);
      if (sortedArr[mid] === targetValue) {
         return mid;
      } else if (sortedArr[mid] < targetValue) {
         return binarySearch(sortedArr, targetValue, mid+1, hi);
      } else {
         return binarySearch(sortedArr, targetValue, lo, mid-1);
      }
   }
}

// Test
var test = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
for (var i = 0; i < 20; i++) {
   console.log(recursiveBinarySearch(test, i))
}