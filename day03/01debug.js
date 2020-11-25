// 1. 导入
const express = require("express");

// 2. 创建实例
const app = express();

// 3. 监听具体地址/路由
app.get("/get", (req, res) => {
    res.send("get请求");
});

app.post("/post", (req, res) => {
    res.send("post请求");
});

app.put("/put", (req, res) => {
    res.send("put请求");
});

app.delete("/delete", (req, res) => {
    res.send("delete请求");
});

// 4. 启动服务
app.listen(8080, () => {
    console.log("server is running at http://127.0.0.1:8080");
});
