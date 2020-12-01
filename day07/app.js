// 导包
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// ========================= 中间件部分 =========================
// 使用bodyparser获取数据
app.use(bodyParser.urlencoded({ extended: false }));
// axios默认发json格式数据
app.use(bodyParser.json());
// 记录用户访问日志
app.use(require("./middlewares/log-access-info"));
// ========================= 中间件部分 =========================
// 路由定义
app.use("/api/v1/user", require("./routers/backend/auth"));

// 启动
app.listen(port, "0.0.0.0", () =>
    console.log(`server is running at http://127.0.0.1:${port}!`)
);
