// Array-based implementation of a stack.

var protoStack = {
	isEmpty: function() {
		return this.length === 0;
	},
	push: function(item) {
		// if storage is at max capacity, create a new 
		// storage of double the length
		if (this.length === this.maxLength) {
			// create a new doubled array
			this.maxLength = this.maxLength * 2;
			var doubledStorage = new Array(this.maxLength);
			// copy storage values over to new array
			this.storage.forEach(function(value, index) {
				doubledStorage[index] = value;
			});
			this.storage = doubledStorage;
		}

		this.storage[this.length] = item;
		this.length++;
	},
	pop: function() {		
		if (this.length > 0) {
			// decrement length, store popped item, write null to popped index
			this.length--;
			var removedItem = this.storage[this.length];
			this.storage[this.length] = null;

			// if storage is at 25% capacity, downsize it by 50%
			if (this.maxLength/this.length === 4) {
				// create a new downsized array
				this.maxLength = this.maxLength/2;
				var downsizedStorage = new Array(this.maxLength);
				// copy storage values over to new array
				for (var i = 0; i < this.maxLength/2; i++) {
					downsizedStorage[i] = this.storage[i];
				}
				this.storage = downsizedStorage;
			}

			return removedItem;
		}
	},
	peek: function() {
		return this.storage[this.length - 1];
	}
};

function factoryStack() {
	// initialise and link object
	var stack = Object.create(protoStack);
	stack.storage = []; // array for storing values
	stack.length = 0; // current highest index within storage that holds a user value
	stack.maxLength = 4; // capacity of storage array
	return stack;
}


var test = factoryStack();
for (var i = 0; i < 5; i++) {
	test.push(i);
}
console.log(JSON.stringify(test, null, 2));
for (i; i < 10; i++) {
	test.push(i);
}
console.log(JSON.stringify(test, null, 2));
for (i; i < 15; i++) {
	test.push(i);
}
console.log(JSON.stringify(test, null, 2));
for (i; i < 30; i++) {
	test.push(i);
}
console.log(JSON.stringify(test, null, 2));
console.log(test.pop());
console.log(JSON.stringify(test, null, 2));
console.log(test.peek());
for (i = 0; i < 22; i++) {
	test.pop();
}
console.log(JSON.stringify(test, null, 2));
console.log(test.isEmpty());
for (i = 0; i < 18; i++) {
	test.pop();
}
console.log(test.isEmpty());
console.log(test.pop());
console.log(JSON.stringify(test, null, 2));