// 1. 导入
const express = require("express");
const bodyParser = require("body-parser");

// 2. 创建web实例
const app = express();

// 5. 使用bodyParser中间件去解析
app.use(bodyParser.urlencoded({ extended: false }));

// 3. 定义路径
app.post("/post", (req, res) => {
    res.send(req.body);
});

// 4. 启动服务
app.listen(8080, "0.0.0.0", () => {
    console.log("server is running at http://127.0.0.1:8080");
});