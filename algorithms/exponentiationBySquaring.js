// Efficient computation of exponentiation via repeated squaring.
// O(log n) operations

function exponentiation(base, exponent) {
  var result = 1;

  while (exponent > 0) {
    if (exponent & 1 === 1) {
      result = result * base;
    }

    base = base * base;
    exponent = exponent / 2;
  }

  return result;
}


console.log(exponentiation(3, 7))
console.log(Math.pow(3, 7))
