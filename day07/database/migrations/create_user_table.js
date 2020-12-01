// const mongoose = require("../../config/mongo");
const { Schema } = require("../../config/mongo");

const UserSchema = new Schema({
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

module.exports = UserSchema;
