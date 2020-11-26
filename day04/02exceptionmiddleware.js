// 1. 导入
const express = require("express");
const fs = require("fs");

// 2. 创建web实例
const app = express();

// 3. 定义路径
app.get("/", (req, res) => {
    // 给定路径并且读取其中的内容返回给用户
    try {
        // 尝试去做的事情的代码
        let url = "jvhghjknbvgchgh.txt";
        let data = fs.readFileSync(url);
    } catch (error) {
        // 尝试去做的事情失败了就走这里（捕获错误）
        throw new Error("也不知道啥原因反正你没读到文件内容");
    }
});

// 5. 异常处理中间件
app.use((err, req, res, next) => {
    res.send("读取文件错误：" + err.message);
    // 不要写next
});

// 6. 404 中间件
app.use((req, res, next) => {
    res.status(404);
    res.send("<h1>Not Found: 404</h1>");
});

// 4. 启动服务
app.listen(8080, "0.0.0.0", () => {
    console.log("server is running at http://127.0.0.1:8080");
});
