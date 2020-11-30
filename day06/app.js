const express = require("express");
const app = express();
const port = 3000;

// 注册art-template
// 1. 告诉express我们需要使用html模版引擎，其名：express-art-template
app.engine("html", require("express-art-template"));
// 2. 告诉express视图文件存储的位置
app.set("views", "./views");
// 3. 设置可以被忽略的后缀（可选）
app.set("view engine", "html");

app.get("/", (req, res) => {
    // 展示index.html（render：渲染）
    // res.render("backend/index.html");
    let str = "这是从mongo中去得的数据";
    res.render("jydq.html", {
        // 参数传递，将这里面的参数传递给视图
        str,
        age: 18,
        arr: ["zhangsan", "lisi", "wangwu"],
    });
});

app.get("/jdjj", (req, res) => {
    res.render("jdjj.html");
});

app.get("/jydq", (req, res) => {
    res.render("jydq.html");
});

app.listen(port, () =>
    console.log(`server is running at http://127.0.0.1:${port}!`)
);