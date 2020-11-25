// 导入express
const express = require("express");
// 路由模块对象
const router = express.Router();

router.get("/login", (req, res) => {
    res.send("前台登录页面");
});
router.get("/register", (req, res) => {
    res.send("前台注册页面");
});
router.get("/logout", (req, res) => {
    res.send("前台退出操作");
});

// 导出
module.exports = router;
