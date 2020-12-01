const jwt = require("jsonwebtoken");
const fs = require("fs");
// 读取.env文件中的jwt加密字符串
const jwt_secret = fs.readFileSync("./.env", "utf8");

// ========================= 数据库操作部分 =========================
const Model = require("../models/Usermodel");
// ========================= 数据库操作部分 =========================

const UserLoginAction = (req, res) => {
    // 获取登录信息的元素：手机号，密码
    let { mobile, passwdCrypted } = req.body;
    // let mobile = req.body.mobile;
    // let passwdCrypted = req.body.passwdCrypted;
    // 查询数据表
    Model.getOne({ mobile: mobile, password: passwdCrypted }).then((ret) => {
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
};

const getUserInfo = (req, res) => {
    // 根据user_id获取用户的信息
    let { user_id } = req.body;
    Model.getOne({ userId: user_id }).then((ret) => {
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
};

module.exports = {
    UserLoginAction,
    getUserInfo,
};
