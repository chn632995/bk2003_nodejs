const moment = require("moment");
const fs = require("fs");
const path = require("path");

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
        "../",
        "logs",
        moment().format("YYYYMMDD") + ".log"
    );
    fs.appendFileSync(filename, str);
    next();
};

module.exports = logAccessInfo;
