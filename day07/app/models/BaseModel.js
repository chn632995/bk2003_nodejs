class BaseModel {
    // 构造，获取当前需要操作的表
    constructor(table) {
        this.conn = table;  //this.coon = Model
    }

    // 公共查询操作
    findAll() {
        return this.conn.find();
    }

    // 带条件查询
    find(where) {
        return this.conn.find(where);
    }

    // 删除

    // 修改

    // 获取单个
}

module.exports = BaseModel;
