// api
"use strict";
const models = require('./db');
const express = require('express');
const randPass = require('./method');
const utils = require('utility');
const router = express.Router();
const AV = require('leancloud-storage');
// 初始化leancloud
const appId = 'dvYpsDwHsifOposQx6eM5DHV-gzGzoHsz';
const appKey = '2vg4fgRcPjR9s54TgtKu2yGr';
AV.init({ appId, appKey })

// models.Stuff.remove({}).exec();

// 登陆接口
router.get('/api/login', (req, res) => {
    const account = utils.base64decode(req.query.account);
    const password = utils.base64decode(req.query.password);
    const startTime = req.query.currentTime;
    if (account === 'admin') {
        models.Admin.find({account: account, password: password}, (err, data) => {
            if (err) {
                res.send(err);
            } else {
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

// 检查是否是员工常用的ip
router.get('/api/login/checkIp', (req, res) => {
    const Ip = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
    const account = utils.base64decode(req.query.account);
    const password = utils.base64decode(req.query.password);
    models.Stuff.find({account: account, password: password}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let sendData = {
                code: 1,
                tel: ''
            }
            if (data.length  === 0) {
                sendData.code = 0;
            } else {
                if (data[0].Ips.indexOf(Ip) === -1) {
                    sendData.code = 2,
                    sendData.tel = data[0].tel;
                    console.log('执行发送验证码行为');
                    AV.Cloud.requestSmsCode({
                        mobilePhoneNumber: data[0].tel,
                        name: '多级身份管理系统',
                        op: '用于登陆',
                        ttl: 10                     // 验证码有效时间为 10 分钟
                    })
                    .then((res) => {
                        console.log('验证码发送成功')
                    })
                    .catch((err) => {
                        console.log(err)
                    });
                }
            }
            res.send(sendData);
        }
    });
});

// 检查验证码
router.get('/api/login/msgCheck', (req, res) => {
    const msg = req.query.msg;
    const tel = req.query.tel;
    const account = utils.base64decode(req.query.account);
    const password = utils.base64decode(req.query.password);
    const Ip = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
    let sendData = {
        code: 1
    }
    AV.Cloud.verifySmsCode(msg, tel)
    .then((response) => {
        console.log(response);
        res.send(sendData);
        models.Stuff.find({account: account, password: password}, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                data[0].Ips.push(Ip);
                data[0].save();
            }
        });
    }, (err) => {
        console.log(err);
    });
});

//注销登陆接口
router.post('/api/login/logout', (req, res) => {
    const stuffId = req.body.id;
    models.Stuff.find({_id: stuffId}, (err, data) => {
        if(err) {
            res.send(err);
        } else {
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
        tel: req.body.tel,
        banner: false,
        onLine: false,
        level: 1,
        startTime: 0,
        Ips: []
    });
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
    models.Stuff.find({_id: id}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let sendData = {
                code: 1,
                login: true,
                data: data
            }
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