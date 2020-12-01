// 导包
const express = require("express");
const md5 = require("md5");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
// 读取.env文件中的jwt加密字符串
const jwt_secret = fs.readFileSync("./.env", "utf8");

// ========================= 数据库操作部分 =========================
mongoose.connect("mongodb://127.0.0.1:27017/maizuo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    headIcon: String,
    gender: Number,
});
const Model = mongoose.model("User", UserSchema, "users");

// ========================= 数据库操作部分 =========================

// ========================= 中间件部分 =========================
// 使用bodyparser获取数据
app.use(bodyParser.urlencoded({ extended: false }));
// axios默认发json格式数据
app.use(bodyParser.json());

// 用于密码加密
const getPasswordCrypted = (req, res, next) => {
    passwd = req.body.password;
    // 加盐加密
    req.body.passwdCrypted = md5(passwd + md5(passwd).substr(0, 16));
    next();
};

// ========================= 中间件部分 =========================
// 路由定义
// 用户登录
app.post("/api/v1/user/login", getPasswordCrypted, (req, res) => {
    // 获取登录信息的元素：手机号，密码
    let { mobile, passwdCrypted } = req.body;
    // let mobile = req.body.mobile;
    // let passwdCrypted = req.body.passwdCrypted;
    // 查询数据表
    Model.findOne({ mobile: mobile, password: passwdCrypted }).then((ret) => {
        if (!ret) {
            // 没数据，帐号或密码不正确
            res.send({
                code: "1000",
                msg: "帐号或密码不正确",
            });
        } else {
            // 有数据，登录成功
            res.send({
                code: "0",
                msg: "登录成功",
                jtw: jwt.sign(
                    {
                        user_id: ret.userId,
                        mobile: ret.mobile,
                    },
                    jwt_secret
                ),
            });
        }
    });
});
// 用户信息获取
app.get("/api/v1/user/info", (req, res) => {});

// 启动
app.listen(port, "0.0.0.0", () =>
    console.log(`server is running at http://127.0.0.1:${port}!`)
);