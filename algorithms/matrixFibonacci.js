// Algorithm that utilises matrix exponentiation to find the nth
// fibonacci number in O(log n) operations.

function matrixFib(n) {
  if (n < 2) return n

  n = n - 1
  var result = 1
  var base = [1, 1, 0]

  while (n > 0) {
    if (n & 1 === 1) {
      result = multiply(result, base)
    }

    n = n / 2
    base = multiply(base, base)
  }

  return result[0] // return f(k + 1) where k = n - 1


  function multiply(factorOne, factorTwo) {
    if (factorOne === 1) return factorTwo

    var a = factorOne[0]
    var b = factorOne[1]
    var c = factorOne[2]

    var d = factorTwo[0]
    var e = factorTwo[1]
    var f = factorTwo[2]

    return [a*d + b*e, a*e + b*f, b*e + c*f]
  }
}

for (var i = 0; i < 15; i++) {
  console.log(matrixFib(i))
}
