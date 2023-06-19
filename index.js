import Tree from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = Tree([30, 20, 10, 5, 100, 1203, 1201, 150, 200, 300]);
tree.insert(500);
prettyPrint(tree.root);

tree.delete(300);

prettyPrint(tree.root);

console.log(tree.find(300));
console.log(tree.find(100));
console.log(
  tree.levelOrder(function (node) {
    console.log(node.data);
  })
);

console.log(tree.height());
console.log(tree.height(tree.find(100)));
console.log(tree.depth(tree.find(1203)));
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
