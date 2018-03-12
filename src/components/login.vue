<template>
<div>
  <input class="form-control" id="inputEmail3" placeholder="请输入账号2" v-model="account">
  <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码2" v-model="password">
  <button type="submit" class="btn btn-default" @click="login">登录2</button>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
export default {
  name: 'login',
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
          // 响应成功回调
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
