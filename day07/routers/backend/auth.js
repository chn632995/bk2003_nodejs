const express = require("express");
const router = express.Router();

// ========================= 中间件部分 =========================
// 用于密码加密
const getPasswordCrypted = require("../../middlewares/passwd-crypted");
// 定义用于验证jwt的中间件
const checkJWT = require("../../middlewares/check-jwt");
// ========================= 中间件部分 =========================

// =========================控制器部分 =========================
const UserController = require("../../app/controllers/UserController");
// ========================= 控制器部分 =========================

// 用户登录
router.post("/login", getPasswordCrypted, UserController.UserLoginAction);
// 用户信息获取
router.get("/info", checkJWT, UserController.getUserInfo);

module.exports = router;
