// utils/createTree.js
module.exports.createTree = (arr, parent_id = "") => {
    const tree = [];

    arr.forEach(item => {
        if (item.parent_id == parent_id) {
            const newItem = item ;  // Clone object để không thay đổi gốc
            const children = module.exports.createTree(arr, item._id);  // Gọi đệ quy chính xác
            newItem.children = children.length > 0 ? children : undefined;  // Gán children nếu có
            tree.push(newItem);
        }
    });

    return tree;
};
