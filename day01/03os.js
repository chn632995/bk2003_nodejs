// 引入内置模块：os
const os = require('os')
// 调用其相关的属性和方法
console.log(os.EOL);            // End Of Line（换行符）
console.log(os.cpus());         // cpu的相关信息
console.log(os.freemem());      // 剩余内存的情况
console.log(os.totalmem());     // 总共的内存的情况
console.log(os.hostname());     // 主机名
console.log(os.type());         // 系统类型