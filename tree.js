import Node from "./node.js";

const buildTree = (arr, start = 0, end = arr.length - 1) => {
  if (start > end) {
    return null;
  }
  const mid = parseInt((start + end) / 2);
  const root = Node(arr[mid]);

  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);

  return root;
};

const Tree = (arr) => {
  let uniqueArr;
  if (Array.isArray(arr)) {
    uniqueArr = [...new Set(arr.sort((a, b) => a - b))];
  }
  return {
    root: buildTree(arr),
    levelOrderTransversed: [],
    insert(value, node = this.root) {
      if (node == null) {
        return Node(value);
      }
      if (value < node.data) node.left = this.insert(value, node.left);
      if (value > node.data) node.right = this.insert(value, node.right);
      return node;
    },
    delete(value, node = this.root) {
      if (node == null) return node;
      if (value < node.data) node.left = this.delete(value, node.left);
      else if (value > node.data) node.right = this.delete(value, node.right);
      else {
        if (node.left == null) return node.right;
        if (node.right == null) return node.left;
        node.data = this.minValue(node.right);
        node.right = this.delete(node.data, node.right);
      }
      return node;
    },
    minValue(node) {
      let minv = node.data;
      while (node.left != null) {
        minv = node.left.data;
        node = node.left;
      }
      return minv;
    },
    find(value, root = this.root) {
      if (root === null) return root;
      if (root.data === value) return root;
      if (value < root.data) return this.find(value, root.left);
      if (value > root.data) return this.find(value, root.right);
    },
    levelOrder(callback) {
      if (!this.root) return [];
      const queue = [this.root];
      const results = [];
      while (queue.length) {
        let level = [];
        let size = queue.length;
        for (let i = 0; i < size; i++) {
          const node = queue.shift();
          level.push(node.data);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
          if (callback) callback(node);
        }
        results.push(level);
      }
      if (!callback) return results;
    },
    preorder(callback) {
      if (!this.root) return [];
      const stack = [this.root];
      const results = [];
      while (stack.length) {
        const node = stack.pop();
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
        if (callback) callback(node);
        results.push(node.data);
      }
      if (!callback) return results;
    },
    inorder(node = this.root, callback, result = []) {
      if (!this.root) return [];
      if (node === null) return;
      this.inorder(node.left, callback, result);
      callback ? callback(node) : result.push(node.data);
      this.inorder(node.right, callback, result);
      if (result) return result;
    },
    postorder(callback) {
      if (!this.root) return [];
      const stack = [this.root];
      const results = [];
      while (stack.length) {
        const node = stack.pop();
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
        if (callback) callback(node);
        results.push(node.data);
      }
      if (!callback) return results.reverse();
    },
    height(node = this.root) {
      if (node === null) return -1;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    },
    depth(node, root = this.root, level = 0) {
      if (!node) return null;
      if (root === null) return 0;
      if (root.data === node.data) return level;
      let count = this.depth(node, root.left, level + 1);
      if (count !== 0) return count;
      return this.depth(node, root.right, level + 1);
    },
    isBalanced(node = this.root) {
      if (node === null) return true;
      const heightDiff = Math.abs(
        this.height(node.left) - this.height(node.right)
      );
      return (
        heightDiff <= 1 &&
        this.isBalanced(node.left) &&
        this.isBalanced(node.right)
      );
    },
    rebalance() {
      if (this.root === null) return;
      const sorted = [...new Set(this.inorder().sort((a, b) => a - b))];
      this.root = buildTree(sorted);
    },
  };
};

export default Tree;
