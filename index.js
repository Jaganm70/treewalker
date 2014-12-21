;( function() {

		function start(parent, childkey, cb) {

			var node = parent;
			var child = childkey;

			for (var i = 0; i < node[child].length; i++) {
				cb(node);
				traverse(node[child][i]);
			}

			function traverse(childnode) {

				if (childnode[child].length == 0) {
					cb(childnode);
					return;
				}

				for (var j = 0; j < childnode[child].length; j++) {
					cb(childnode);
					traverse(childnode[child][j]);
				}

			}

		}

		function resolveTree(parent, childkey, cb) {
			var node = parent;
			var child = childkey; out:
			for (var i = 0; i < node[child].length; i++) {
				if (cb(node)) {
					break out;
				}
				walkCompare(node[child][i]);
			}

			function walkCompare(childnode) {

				if (cb(childnode)) {
					return;
				}

				if (childnode[child].length == 0) {
					cb(childnode)
					return;
				} Loop:
				for (var j = 0; j < childnode[child].length; j++) {
					if (cb(childnode[child][j])) {
						break Loop;
					}
					walkCompare(childnode[child][j]);
				}

			}

		}

		if (exports && module && module.exports) {
			exports = module.exports = {};
			exports.walkTree = start;
			exports.resolveTree = resolveTree;
		} else {
			this.walkTree = start;
			this.resolveTree = resolveTree;
		}

	}.call(this));
