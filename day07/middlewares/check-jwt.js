const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const jwt_secret = fs.readFileSync(path.resolve(".env"), "utf8");

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

module.exports = checkJWT;
