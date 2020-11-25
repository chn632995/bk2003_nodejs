// 1. 导入
const express = require("express");

// 2. 创建实例
const app = express();

// 3. 监听请求
app.get("/getUserInfo", (req, res) => {
    console.log(req.query);
    res.send(req.query);
});

// 4. 启动服务
app.listen(8080, () => {
    console.log("server is running at http://127.0.0.1:8080");
});
