// api
"use strict";
const models = require('./db');
const express = require('express');
const randPass = require('./method');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
// models.Outer.remove().exec();
models.Outer.find({}, (err, data) => {
    console.log(data);
})
// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.Stuff({
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

// 登陆接口
router.get('/api/login', (req, res) => {
    // 通过模型去查找数据库
    const account = req.query.account;
    const password = req.query.password;
    const startTime = req.query.currentTime;
    console.log(account, password);
    console.log(req.query);
    if (account === 'admin') {
        models.Admin.find({}, (err, data) => {
            console.log(data);
        })
        models.Admin.find({account: account, password: password}, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                console.log(data);
                let sendData = {
                    code: 1,
                    login: true,
                    level: 0,
                    name: ''
                }
                if (data.length  === 0) {
                    sendData.code = 0;
                    sendData.login = false;
                } else {
                    sendData.name = data[0].account;
                }
                res.send(sendData);
            }
        });
    } else {
        models.Stuff.find({account: account, password: password}, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                let sendData = {
                    code: 1,
                    login: true,
                    level: 1,
                    name: '',
                    id: '',
                    banner: false
                }
                if (data.length  === 0) {
                    sendData.code = 0;
                    sendData.login = false;
                } else {
                    data[0].onLine = true;
                    data[0].startTime = startTime;
                    data[0].save();
                    sendData.name = data[0].account;
                    sendData.id = data[0]._id;
                    sendData.banner = data[0].banner;
                }
                res.send(sendData);
            }
        });
    }
});

//注销登陆接口
router.post('/api/login/logout', (req, res) => {
    const stuffId = req.body.id;
    console.log(stuffId);
    models.Stuff.find({_id: stuffId}, (err, data) => {
        if(err) {
            res.send(err);
        } else {
            console.log(data);
            data[0].onLine = false;
            data[0].save();
            const sendData = {
                code: 1
            }
            res.send(sendData);
        }
    })
});

//管理员添加员工接口
router.post('/api/login/createStuff', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newStuffAccount = new models.Stuff({
        account : req.body.account,
        password : req.body.password,
        banner: false,
        onLine: false,
        level: 1,
        startTime: 0
    });
    console.log(req.body.account)
    console.log(req.body.password)
    // 保存数据newAccount数据进mongoDB
    newStuffAccount.save((err,data) => {
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

// 获取已有公司员工账号接口
router.get('/api/login/getStuffAccount', (req, res) => {
    // 通过模型去查找数据库
    models.Stuff.find({}, (err, data) => {
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
                sendData.data = [];
            }
            res.send(sendData);
        }
    });
});

// 修改员工权限
router.post('/api/login/setStuffBanner', (req, res) => {
    // 通过模型去查找数据库
    const id = req.body.id;
    const newBanner = req.body.banner;
    console.log(id, newBanner);
    models.Stuff.update({_id: id}, {banner: newBanner}, (err, data) => {
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
            }
            res.send(sendData);
        }
    });
});

// 员工给外来人员申请密码
router.get('/api/login/getKey', (req, res) => {
    // 通过模型去查找数据库
    const name = req.query.name;
    const EncryptedName = String(req.query.name) + '1';
    const password = randPass();
    const stuffId = req.query.stuffId;
    const stuffName = req.query.stuffName;
    const startTime = req.query.time;
    console.log(name, startTime);
    let outerKey = new models.Outer({
        name : name,
        EncryptedName : EncryptedName,
        password : password,
        stuffId : stuffId,
        startTime : startTime,
        stuffName : stuffName,
        level: 2
    });

    outerKey.save((err,data) => {
        if (err) {
            res.send(err);
        } else {
            let sendData = {
                code: 1,
                login: true,
                password: password
            }
            if (data.length  === 0) {
                sendData.code = 0;
                sendData.login = false;
            }
            res.send(sendData);
        }
    });
});

// 员工修改密码
router.post('/api/login/changeStuffPassword', (req, res) => {
    // 通过模型去查找数据库
    const id = req.body.id;
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    console.log(id, oldPass, newPass);
    models.Stuff.find({_id: id}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let sendData = {
                code: 1,
                login: true,
                data: data
            }
            console.log(data[0].password);
            if (data.length  === 0 || data[0].password !== oldPass) {
                sendData.code = 0;
            } else if(data[0].password === oldPass) {
                data[0].password = newPass;
                data[0].save(function (err, data) {
                    sendData.data = data;
                })
            }
            res.send(sendData);
        }
    });
});

// 外来员工登陆
router.post('/api/outer/outerLogin', (req, res) => {
    // 通过模型去查找数据库
    const wifiKey = req.body.wifiKey;
    models.Outer.find({password: wifiKey}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let sendData = {
                code: 1,
                login: true,
                data: data
            }
            console.log(data[0].password);
            if (data.length  === 0) {
                sendData.code = 0;
            }
            res.send(sendData);
        }
    });
});

// 获取已经登陆的员工
router.get('/api/getStuffLogin', (req, res) => {
    // 通过模型去查找数据库
    models.Stuff.find({onLine: true}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let sendData = {
                code: 1,
                data: data
            }
            if (data.length  === 0) {
                sendData.code = 0;
                sendData.data = [];
            }
            res.send(sendData);
        }
    });
});

// 获取已经得到密码的外来人员
router.get('/api/getOuterLogin', (req, res) => {
    // 通过模型去查找数据库
    models.Outer.find({}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let sendData = {
                code: 1,
                data: data
            }
            if (data.length  === 0) {
                sendData.code = 0;
                sendData.data = [];
            }
            res.send(sendData);
        }
    });
});

module.exports = router;