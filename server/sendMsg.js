const AV = require('leancloud-storage');
// 初始化leancloud
const appId = 'dvYpsDwHsifOposQx6eM5DHV-gzGzoHsz';
const appKey = '2vg4fgRcPjR9s54TgtKu2yGr';
AV.init({ appId, appKey })

const leancloud = {
    sendMsg: sendMsg,
    checkMsg: checkMsg
}
sendMsg = function (tel) {
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber: tel,
        name: '多级身份管理系统',
        op: '用于登陆',
        ttl: 10                     // 验证码有效时间为 10 分钟
    }).then(function(){
        //调用成功
        console.log('调用成功');
    }, function(err){
        //调用失败
        console.log('调用失败');
    });
}
checkMsg = function (msg, tel) {
    AV.Cloud.verifySmsCode(msg, tel).then(function(){
        //验证成功
        console.log('验证成功')
       }, function(err){
        //验证失败
        console.log('验证失败')
       });
}

module.exports = leancloud;