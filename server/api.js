// api
// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.Login({
        account : req.body.account,
        password : req.body.password
    });
    // 保存数据newAccount数据进mongoDB
    newAccount.save((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('createAccount successed');
        }
    });
});
// 获取已有账号接口
router.get('/api/login/getAccount', (req, res) => {
    // 通过模型去查找数据库
    const account = req.query.account;
    const password = req.query.password;
    console.log(account, password);
    console.log(req.query);
    models.Login.find({account: account, password: password}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let sendData = {
                code: 1,
                login: true,
                data: data
            }
            if (data.length  === 0) {
                sendData.code = 0;
                sendData.login = false;
            }
            res.send(sendData);
        }
    });
});

module.exports = router;