<template>
<div>
  <vue-top :outer="outer"></vue-top>
  <div class="apply_area">
    <div>test</div>
    <div><span>密码:</span><input name="name" type="input" class="outer_name" v-model="password" placeholder="请输入接入密码" /><button class="confirm" @click="sendWifiKey">确定</button></div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
Vue.use(VueResource)
export default {
  name: 'applyPassword',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      outer: 1,
      password: ''
    }
  },
  methods: {
    sendWifiKey () {
      let params = {
        wifiKey: this.password
      }
      // 禁用或者解用公司员工的功能
      Vue.http.post('/api/outer/outerLogin', params)
        .then((response) => {
          // 响应成功回调
          console.log(response.body)
          if (response.body.code === 0) {
            alert('登陆密码错误请重试')
          } else {
            alert('登陆成功，你现在可以使用公司wifi啦')
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    }
  }
}
</script>
<style scoped lang='scss'>
.apply_area {
  width: 440px;
  display: block;
  margin: 10px auto;

  & > div {
    text-align: left;
    margin-bottom: 30px;

    & > a {
      color: #2c3e50;
      text-decoration: none;
      width: 240px;
      text-align: center;
      margin-top: 15px;
      padding: 5px;
      cursor: pointer;
      border: 1px solid #757575;
      border-radius: 2px;
    }

    & > button.confirm {
      width: 60px;
      height: 30px;
      line-height: 30px;
      margin-left: 40px;
      background-color: #259c6a;
      color: #ffffff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  span {
    width: 100px;
    display: inline-block;
  }

  input {
    width: 200px;
    height: 30px;
    padding: 5px;
    border: 1px solid #c3c3c3;
  }
}
</style>
