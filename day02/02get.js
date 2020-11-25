// 1. 导入模块
const http = require("http");
const url = require("url");

// 2. 创建web实例
const server = http.createServer();

// 3. 监听request请求
server.on("request", (req, res) => {
    // 5. 获取解析后的url对象
    let { query } = url.parse(req.url, true);
    console.log(query);
});

// 4. 启动服务
server.listen(8080, () => {
    console.log("server is running at http://127.0.0.1:8080");
});
