// hashing function that produces hash code integers based on input.
// hashing process differs based on input type.
// strings, numbers and booleans are supported.

module.exports = function(val) {
	// determine type of value passed
	if (typeof val === "number") {
		// return 32-bit integer
		return val | 0;	

	} else if (typeof val === "boolean") {
		if (val) return 1231;
		else 		 return 1237;

	} else if (typeof val === "string") {
		// compute hash using Horner's method
		var hash = 0;
		for (var i = 0; i < val.length; i++) {
			hash = val.charCodeAt(i) + (31 * hash);
		}
		return hash | 0;

	}
}