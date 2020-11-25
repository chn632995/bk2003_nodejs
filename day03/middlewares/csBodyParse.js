// 导入
const querystring = require("querystring");

// 定义中间件（本质就是一个函数）
const csBodyParse = (req, res, next) => {
    let arr = [];
    // 分批次接收buffer
    req.on("data", (buffer) => {
        arr.push(buffer);
    });
    // 合并
    req.on("end", () => {
        let buffer = Buffer.concat(arr);
        let post = querystring.parse(buffer.toString());
        // 将数据挂载大req.body上
        req.body = post;
        // 继续
        next();
    });
};

// 导出
module.exports = csBodyParse;
