// Least-recently used cache, implemented using doubly-linked list
// and hash-map (ES6 Map object).
// The linked list tracks recency of item-usage, where head
// is the most recent, and tail is the least recent.
// Gets and sets in constant time. Requires linear space.

let protoCache = {
	get(key) {
		// this method returns a value from cache based on key provided
		if (this.map.get(key)) {
			let node = this.map.get(key);
			
			// remove node from cache and re-insert into cache,
			// in order to update recency within linked list			
			this.remove(key);
			this.cacheInsertion(node);

			return node.value;
		} else {
			console.log('Cannot get non-existent key "' + key + '".');
		}
	},	
	set(key, value) {
		// this method sets a value and key in cache (insert or update)
		if (this.map.get(key)) {
			// if the key already exists within the cache,
			// remove it in order to prepare for a
			// re-insertion with the new value
			this.remove(key);
		} else {
			// if cache is at capacity, delete least-recently
			// used item in order to make space for new item insertion
			if (this.size >= this.limit) {
				this.remove(this.tail.key);
			}
		}
		
		// create a new node based on arguments,
		// and insert it into the cache
		let node = protoCache.createNode(key, value);
		this.cacheInsertion(node);
	},	
	remove(key) {
		// this method removes an item from the cache by deleting 
		// it from both the hash-map and the doubly-linked list
		let node = this.map.get(key);
		
		// remove item from doubly-linked list
		if (node.prev !== null) {
			node.prev.next = node.next;
		} else {
			this.head = node.next;
		}

		if (node.next !== null) {
			node.next.prev = node.prev;
		} else {
			this.tail = node.prev;
		}
		
		// remove item from hash-map
		this.map.delete(key);
		this.size--;
	},
	createNode(key, value) {
		return {
			key: key,
			value: value,
			next: null,
			prev: null
		};
	},
	cacheInsertion(node) {
		// this method inserts the argument node into the cache,
		// by inserting it into both the hash-map and the linked list

		// insert argument node at head of linked list
		node.next = this.head;
		node.prev = null;

		if (this.head !== null) {
			this.head.prev = node;
		}
		this.head = node;
		if (this.tail === null) {
			this.tail = node;
		}

		// insert node into hash-map
		this.size++;
		this.map.set(node.key, node);
	}
};

function factoryCache(limit) {
	let cache = Object.create(protoCache);
	cache.limit = limit || 10;
	cache.size = 0;
	cache.map = new Map();
	cache.head = null;
	cache.tail = null;

	return cache;
}


// Tests
var foo = factoryCache(4);
console.log('Cache directly after creation: ', JSON.stringify(foo, null, 2));
console.log('Invalid get test: ', foo.get('no'));
foo.set('yes', 1);
console.log('Cache directly after first insert: ', foo);
console.log('Cache valid get test: ', foo.get('yes'));
foo.set('no', 0);
console.log('Cache directly after second insert: ', foo);
foo.get('yes');
console.log('Cache after get check on first item: ', foo);
foo.remove('no');
console.log('Cache directly after removal of "no": ', foo);
foo.set('yes', 5);
console.log('Cache after update to "yes": ', foo);
foo.remove('yes');
console.log('Cache after removing only remaining item: ', foo);
foo.set('yes', 1);
foo.set('no', 0);
foo.set('maybe', 2);
foo.set('yes', 5);
console.log('Cache after inserting three items, updating first item: ', foo);
foo.set('oui', 6);
console.log('Cache at capacity: ', foo);
foo.set('no', 5);
console.log('Cache at capacity after tail update: ', foo);
foo.remove('maybe');
console.log('Cache after removal of "maybe": ', foo);
foo.set('maybe', 8);
foo.set('non', 12);
console.log('Cache after insertion at capacity: ', foo);
foo.get('oui');
console.log('Cache after get check at capacity: ', foo);