const storage = [];

exports.add = function (storeItem) {

    storage.push(storeItem);
    console.log(`Added to store: status=${storeItem.status} length=${storeItem.size} time=${storeItem.elapsedTime}`);
    console.log(`store size=${storage.length}`);
}
  