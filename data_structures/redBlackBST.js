// Left-leaning red-black binary search tree.
'use strict';

var protoRedBlack = {
	isRed: function(node) {
		if (node === null) return false;
		return node.colour === 'RED';
	},
	rotateLeft: function(node) {
		var newThreeNodeRoot = node.right;
		node.right = newThreeNodeRoot.left;
		newThreeNodeRoot.left = node;
		newThreeNodeRoot.colour = node.colour;
		node.colour = 'RED';
		return newThreeNodeRoot;
	},
	rotateRight: function(node) {
		var newThreeNodeRoot = node.left;
		node.left = newThreeNodeRoot.right;
		newThreeNodeRoot.right = node;
		newThreeNodeRoot.colour = node.colour;
		node.colour = 'RED';
		return newThreeNodeRoot;
	},
	flipColours: function(node) {
		node.colour = 'RED';
		node.left.colour = 'BLACK';
		node.right.colour = 'BLACK';
	},
	insert: function(val) {
		// insert val into tree
		this.root = insert.call(this, this.root, val);

		function insert(currentNode, val) {
			// if empty tree, return a new red-coloured node
			if (currentNode === null) return factoryNode(val, 'RED');
			
			if (val < currentNode.val) {
				currentNode.left = insert.call(this, currentNode.left, val);
			} else if (val > currentNode.val) {
				currentNode.right = insert.call(this, currentNode.right, val);
			} else {
				currentNode.val = val;
			}

			// if red link is leaning right, rotate it left
			if (this.isRed(currentNode.right) && !this.isRed(currentNode.left)) 	 currentNode = this.rotateLeft(currentNode);
			// balance 4-node
			if (this.isRed(currentNode.left) && this.isRed(currentNode.left.left)) currentNode = this.rotateRight(currentNode);
			// split 4-node
			if (this.isRed(currentNode.left) && this.isRed(currentNode.right)) 		 this.flipColours(currentNode);

			return currentNode;
		}
	}
};

function factoryNode(val, colour) {
	return {
		val: val,		
		colour: colour,
		left: null,
		right: null
	};
}

function factoryRedBlack() {
	var redBlack = Object.create(protoRedBlack);
	redBlack.root = null;
	return redBlack;
}


// Tests
var test = factoryRedBlack();
console.log('Test on initialization: ', test);
for (var i = 0; i < 9; i++) {
	test.insert(i);
}
console.log('Test after multiple insertions: ', JSON.stringify(test, null, 2));