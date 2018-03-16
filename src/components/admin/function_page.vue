<template>
<div>
  <vue-top></vue-top>
  <div class="login_area">
    <div class="line"><span class="user_name">用户名:</span><input class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account"></div>
    <div class="line"><span class="user_pass">密码:</span><input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password"></div>
    <button type="submit" class="btn btn-default login_btn" @click="login">登录</button>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
Vue.use(VueResource)
export default {
  name: 'function_list',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      // 获取已有账号密码
      Vue.http.get('/api/login/getAccount')
        .then((response) => {
          // 响应成功回调l
          console.log(response)
          let params = {
            account: this.account,
            password: this.password
          }
          // 创建一个账号密码
          return this.$http.post('/api/login/createAccount', params)
        })
        .then((response) => {
          console.log(response)
        })
        .catch((reject) => {
          console.log(reject)
        })
    }
  }
}
</script>
<style scoped lang='scss'>
.line {
  text-align: left;
}
.login_area {
  width: 240px;
  display: block;
  margin: 10px auto;
}
.user_name, .user_pass {
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
}
</style>
