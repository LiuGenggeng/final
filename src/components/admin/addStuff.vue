<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <div class="function_area">
    <div class="add_title">添加员工</div>
    <div class="line"><span class="user_name">用户名:</span><input type="text" class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account"></div>
    <div class="line"><span class="user_pass">密码:</span><input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password"></div>
    <div class="line"><span class="user_tel">电话:</span><input type="text" v-model="tel"></div>
    <button type="submit" class="btn btn-default login_btn" @click="addStuff">确认添加</button>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
Vue.use(VueResource)
export default {
  name: 'addStuff',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      admin: 1,
      account: '',
      password: '',
      tel: ''
    }
  },
  methods: {
    addStuff () {
      let params = {
        account: this.account,
        password: this.password,
        num: Math.random()
      }
      // 获取已有账号密码
      Vue.http.post('/api/login/createStuff', params)
        .then((response) => {
          // 响应成功回调l
          console.log(response.body)
          if (response.body.code === 0) {
            alert('创建失败')
          } else {
            alert('创建成功')
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
.function_area {
  width: 240px;
  display: block;
  margin: 10px auto;

  & > div {
    text-align: left;

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
  }
  .add_title {
    width: 125px;
    height: 40px;
    line-height: 40px;
    border: none;
    background-color: #41b882;
    border-radius: 5px;
    text-align: center;
    color: #ffffff;
  }
  .user_name, .user_pass, .user_tel {
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
  }
}
</style>
