// 1. 导入模块
const express = require("express");

// 2. 创建web实例
const app = express();

// 3. 监听请求
// 用户访问根“/”输出hello world
app.get("/", (req, res) => {
    // res.end('xxx')
    res.send("hello world");
});
// 用户访问/html5输出2003
app.get("/html5", (req, res) => {
    res.send("2003");
});
// 用于通过post方式访问/post则输出post。
app.post("/post", (req, res) => {
    res.send("post方式");
});

// 4. 启动服务
app.listen(8080, () => {
    console.log("server is running at http://127.0.0.1:8080");
});
