const BaseModel = require("./BaseModel");
const { model } = require("../../config/mongo");
const UserSchema = require("../../database/migrations/create_user_table");

class UserModel extends BaseModel {
    // 构造
    constructor() {
        super(model("User", UserSchema, "users"));
    }

    // 自定义findOne方法
    getOne = (where) => {
        // findOne方法为mongoose提供的方法
        return this.conn.findOne(where);
    }

    // 删除

    // 修改
}

module.exports = new UserModel();
