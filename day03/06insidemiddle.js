// 导入
const express = require("express");
const app = express();

// 使用post接收的中间件
app.use(express.urlencoded({ extended: false }));
// 使用json中间件接收json数据
// app.use(express.json());

// 路由
app.post("/post", (req, res) => {
    console.log(req.body);
});

// 启动
app.listen(8080, () => {
    console.log("server is running at http://127.0.0.1:8080");
});
