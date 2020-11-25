// 1. 导入
const express = require("express");

// 2. 创建实例
const app = express();
app.use('/vjhlkbvhjkguhlkbvjhkh',express.static("public"));
// 3. 监听请求
// 此处不需要处理路径

// 4. 启动服务
app.listen(8080, () => {
    console.log("server is running at http://127.0.0.1:8080");
});
