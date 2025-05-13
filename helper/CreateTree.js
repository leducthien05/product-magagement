let cnt = 0;

function createTree(arr, parent_id = "") {
    const tree = [];
    arr.forEach(item => {
        if(item.parent_id == parent_id){
            cnt++;
            const newItem = item;
            newItem.index = cnt;
            const children = createTree(arr, item._id);
            if(children.length > 0){
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
}

// Xuất hàm createTree để có thể sử dụng ở những nơi khác trong ứng dụng
module.exports = createTree;
