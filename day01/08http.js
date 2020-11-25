// 1. 导入http模块
const http = require("http");

// 2. 创建web服务实例
const server = http.createServer();

// 3. 监听request请求
server.on("request", (req, res) => {
    // 输出hello world
    // res.end("hello world");
    if (req.url === "/") {
        res.end("hello world");
    }
    if (req.url === "/html5") {
        res.end("2003");
    }
});

// 4. 启动服务
server.listen(8080, () => {
    // 仅是提示作用，可以不写，但是建议写
    console.log("server is running at http://127.0.0.1:8080");
});
