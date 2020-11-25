// 导入path模块
const path = require('path')
// 调用其内置的方法
// 获取路径中的最后一部分，一般是用于获取文件名称
console.log(path.basename(__filename));       
// 获取文件路径中的文件夹部分（文件的所在文件夹的路径）
console.log(path.dirname(__filename));
// extension name：扩展名，获取文件路径中的扩展名部分
console.log(path.extname(__filename));
// join：拼接路径
console.log(path.join("a","b","c"));    // a/b/c
console.log(path.join("a","../b","c"));    // b/c
// resolve：模拟cd（切换目录）操作同时拼接路径
console.log(path.resolve("a", "b", "c"));
console.log(path.resolve("a", "../b", "c"));
console.log(path.resolve("/a", "b", "c"));