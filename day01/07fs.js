// 导入模块
const fs = require('fs')
// 1. 写入文件，fs.writeFile()
fs.writeFile('./test.txt','hello kitty',err => {
    console.log(err);
})

// 2. 读取文件，fs.readFile()
fs.readFile('./test.txt','utf8',(err,data) => {
    if(err){
        console.log('出错了');
    }else{
        console.log(data);
    }
})

// 3. 判断是否存在对应的文件，fs.existssync()
console.log(fs.existsSync('./test.txt'));

// 4. 获取文件信息，fs.stat()
fs.stat('./test.txt',(err,stats) => {
    console.log(stats);
})

// 5. 删除文件，fs.unlink()
fs.unlink('./test.txt',err => {
    console.log(err);
})