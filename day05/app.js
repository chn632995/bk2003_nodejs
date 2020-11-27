// 1. 导入
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// =============================== 操作mongoose的部分 ========================
// a. 连接mongodb数据库
mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// b. 定义schema
const userSchema = new mongoose.Schema({
    // 对表结构的约束
    username: {
        type: String,
        required: true,
        minlength: 2,
    },
    password: {
        type: String,
    },
    gender: {
        type: Number,
        default: 1, // 1=男，2=女
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
});
// c. 定义model
const Model = mongoose.model("User", userSchema, "users");

// =============================== 操作mongoose的部分 ========================

// 2. 创建web实例
const app = express();

// 注册需要使用的中间件
app.use(bodyParser.urlencoded({ extended: false }));

// 3. 路由
// 增加
app.post("/add", (req, res) => {
    // 获取表单提交的值
    let post = req.body;
    // 写入数据表
    Model.insertMany(post).then((ret) => {
        try {
            if (ret.length) {
                res.send({ err_code: 0, message: "添加成功！", data: ret[0] });
            } else {
                res.send({ err_code: 100, message: "添加失败！", data: [] });
            }
        } catch (error) {}
    });
});

// 删除
app.delete("/del/:id", (req, res) => {
    // 获取id号
    let id = req.params.id;
    // 删除操作（真删除）
    Model.deleteOne({ _id: id }).then((ret) => {
        try {
            if (ret.ok) {
                res.send({ err_code: 0, message: "删除成功！" });
            } else {
                res.send({ err_code: 500, message: "删除失败！" });
            }
        } catch (error) {}
    });
});

// 修改
app.put("/mod/:id", (req, res) => {
    // 获取条件
    let id = req.params.id;
    // 获取表单数据
    let data = req.body;
    // 修改操作
    Model.updateOne({ _id: id }, { $set: data }).then((ret) => {
        try {
            if (ret.ok) {
                res.send({ err_code: 0, message: "修改成功！" });
            } else {
                res.send({ err_code: 500, message: "修改失败！" });
            }
        } catch (error) {}
    });
});
// 列表
app.get("/list", (req, res) => {
    // 获取全部的数据
    Model.find().then((ret) => {
        res.send({ err_code: 0, message: "查询成功！", data: ret });
    });
});
// 详情
app.get("/detail/:id", (req, res) => {
    // 获取id
    let id = req.params.id;
    // 根据id去查询
    Model.findOne({ _id: id }).then((ret) => {
        try {
            if(ret._id){
                res.send({ err_code: 0, message: "查询成功！", data: ret });
            }else{
                res.send({ err_code: 100, message: "查询失败！", data: null });
            }
        } catch (error) {
            
        }
    });
});

// 4. 启动服务
app.listen(8080, () => {
    console.log("server is running at http://127.0.0.1:8080");
});
