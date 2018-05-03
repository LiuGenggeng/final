<template>
<div>
  <vue-top :admin="admin" :stuff="stuff"></vue-top>
  <div class="login_area">
    <div class="line"><span class="user_name">用户名:</span><input  typf="text" class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account"></div>
    <div class="line"><span class="user_pass">密码:</span><input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password" @keyup="showLogin($event)"></div>
    <div class="line" v-if="showMsg"><span class="user_msg">验证码:</span><input type="text" v-model="msg"></div>
    <button type="submit" class="btn btn-default login_btn" @click="checkIp">登录</button>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
import utils from 'utility'
Vue.use(VueResource)
export default {
  name: 'login',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      admin: 0,
      stuff: '',
      account: '',
      password: '',
      msg: '',
      showMsg: false,
      tel: ''
    }
  },
  mounted: function () {
    this.testLogin()
  },
  methods: {
    checkIp () {
      if (this.account === 'admin') {
        this.login()
        return
      }
      let params = {
        account: utils.base64encode(this.account, true),
        password: utils.base64encode(this.password, true),
        num: Math.random()
      }
      if (this.showMsg === false) {
        Vue.http.get('/api/login/checkIp', {params: params}, {emulateJSON: true})
          .then((response) => {
            if (response.body.code === 1) {
              this.login()
            } else if (response.body.code === 2) {
              this.showMsg = true
              this.tel = response.body.tel
            }
          })
          .catch((reject) => {
            console.log(reject)
          })
      } else {
        this.checkMsg()
      }
    },
    checkMsg () {
      let params = {
        msg: this.msg,
        tel: this.tel,
        account: utils.base64encode(this.account, true),
        password: utils.base64encode(this.password, true),
        num: Math.random()
      }
      Vue.http.get('/api/login/msgCheck', {params: params}, {emulateJSON: true})
        .then((response) => {
          if (response.body.code === 1) {
            this.login()
          } else if (response.body.code === 2) {
            alert('验证码错误!')
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    login () {
      let params = {
        account: utils.base64encode(this.account, true),
        password: utils.base64encode(this.password, true),
        num: Math.random(),
        currentTime: (new Date()).getTime()
      }
      // 获取已有账号密码
      Vue.http.get('/api/login', {params: params}, {emulateJSON: true})
        .then((response) => {
          // 响应成功回调
          console.log(response.body)
          if (response.body.code === 0) {
            alert('登陆失败')
          } else {
            if (response.body.level === 0) {
              sessionStorage.setItem('level', 0)
              sessionStorage.setItem('login', true)
              this.$router.push({path: '/admin'})
            } else if (response.body.level === 1) {
              sessionStorage.setItem('level', 1)
              sessionStorage.setItem('login', true)
              sessionStorage.setItem('stuffName', response.body.name)
              sessionStorage.setItem('stuffId', response.body.id)
              sessionStorage.setItem('banner', response.body.banner)
              this.$router.push({path: '/stuff'})
            }
          }
          // 创建一个账号密码
          // return this.$http.post('/api/login/createAccount', params)
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    showLogin: function (ev) {
      if (ev.keyCode === 13) {
        this.checkIp()
      }
    },
    testLogin: function () {
      const isLogin = sessionStorage.getItem('login')
      if (isLogin === 'true') {
        const level = Number(sessionStorage.getItem('level'))
        if (level === 0) {
          this.$router.push({path: '/admin'})
        } else if (level === 1) {
          this.$router.push({path: '/stuff'})
        }
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.line {
  margin-top: 30px;
  text-align: left;

  & > input {
    width: 200px;
    height: 30px;
    line-height: 30px;
    border: none;
    border-radius: 5px;
    border: 1px solid #c3c3c3;
  }
}
.login_area {
  width: 400px;
  display: block;
  margin: 10px auto;
}
.user_name, .user_pass, .user_msg {
  display: inline-block;
  width: 100px;
}
.login_btn {
  width: 75px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
  background-color: #41b882;
  cursor: pointer;
  margin-top: 20px;
  color: #ffffff;
  font-size: 14px;
}
</style>
