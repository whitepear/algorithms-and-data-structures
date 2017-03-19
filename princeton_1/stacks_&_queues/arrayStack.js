// Array-based implementation of a stack.
// Time complexity for all operations is O(1).
// Space complexity is O(n).

var protoStack = {
	isEmpty: function() {
		return this._length === 0;
	},
	push: function(item) {
		this[this._length] = item;
		this._length++;
	},
	pop: function() {		
		if (this._length > 0) {

			this._length--;
			var removedItem = this[this._length];
			this[this._length] = null;			
			return removedItem;

		}
	},
	peek: function() {
		return this[this._length - 1];
	}
};

function factoryStack() {
	var stack = [];
	stack._length = 0;
	Object.setPrototypeOf(stack, protoStack);
	return stack;
}


var test = factoryStack();
test.push(1);
test.push(2);
test.push(3);
console.log(test);
console.log(test.pop());
console.log(test);
console.log(test.peek());
console.log(test.pop());
console.log(test);
console.log(test.isEmpty());
test.pop();
console.log(test.isEmpty());
console.log(test.pop());
console.log(test);