// 1. 导入
const express = require("express");

// 2. 创建实例
const app = express();

// 3. 监听请求
// 必须路由参数
app.get("/user/:id/:name", (req, res) => {
    res.send(req.params);
});
app.get("/news/:id?/:name", (req, res) => {
    res.send(req.params);
});


// 4. 启动服务
app.listen(8080, () => {
    console.log("server is running at http://127.0.0.1:8080");
});
