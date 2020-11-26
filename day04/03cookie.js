const express = require("express");
const cookParser = require("cookie-parser");
const app = express();

app.use(cookParser());

app.get("/", (req, res) => {
    // 新老用户的判断
    if (req.cookies.username) {
        // 老用户
        res.send("欢迎回来：" + req.cookies.username);
    } else {
        // 新用户
        res.cookie("username", "法外狂徒张三", {
            maxAge: 86400 * 1000,
            path: "/123",
        });
        res.send("欢迎成为我们的新用户");
    }
});

app.listen(8080, () => {
    console.log("server is running at http://127.0.0.1:8080");
});
