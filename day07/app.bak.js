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
        get: (val) => val.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
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

// 定义用于验证jwt的中间件
const checkJWT = (req, res, next) => {
    // 获取jwt（是存在header头中的）
    let arr = req.headers.authorization.split(" ");
    let _token = arr[arr.length - 1];
    // 校验token
    if (!_token) {
        // 没有token则不校验
        res.send({
            code: "2000",
            msg: "身份验证失败",
        });
        return false;
    } else {
        // 有token就开始验证
        try {
            let result = jwt.verify(_token, jwt_secret);
            // 如果需要做jwt时间有效性验证，可以在此拿当前时间戳与result.iat进行比较
            // 保存下user_id
            req.body.user_id = result.user_id;
            next();
        } catch (error) {
            res.send({
                code: "3000",
                msg: "非法签名",
            });
        }
    }
};

// 记录用户访问日志
const logAccessInfo = (req, res, next) => {
    // 客户端IP、访问时间、请求路径、请求类型、客户端信息
    let ip = req.ip;
    let time = moment().format("YYYY-MM-DD HH:mm:ss");
    let reqpath = req.url;
    let method = req.method;
    let userAgent = req.headers["user-agent"];
    let str = `${ip} - ${time} - ${reqpath} - ${method} - ${userAgent}\n`;
    let filename = path.join(
        __dirname,
        "logs",
        moment().format("YYYYMMDD") + ".log"
    );
    fs.appendFileSync(filename, str);
    next();
};
app.use(logAccessInfo);

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
                jtw:
                    "admin " +
                    jwt.sign(
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
app.get("/api/v1/user/info", checkJWT, (req, res) => {
    // 根据user_id获取用户的信息
    let { user_id } = req.body;
    Model.findOne({ userId: user_id }).then((ret) => {
        res.send({
            code: "0",
            msg: "成功",
            userinfo: {
                userId: ret.userId,
                mobile: ret.mobile,
                headIcon: ret.headIcon,
                gender: ret.gender,
            },
        });
    });
});

// 启动
app.listen(port, "0.0.0.0", () =>
    console.log(`server is running at http://127.0.0.1:${port}!`)
);
