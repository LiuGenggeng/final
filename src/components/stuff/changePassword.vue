<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <div class="function_area">
    <div class="line"><span class="user_name">原始密码:</span><input class="form-control" type="password" id="inputEmail3" placeholder="请输入原始密码" v-model="oldPassword"></div>
    <div class="line"><span class="user_pass">新密码:</span><input type="password" class="form-control" id="inputPassword3" placeholder="请输入新密码" v-model="newPassword"></div>
    <div class="line"><span class="user_pass">确认密码:</span><input type="password" class="form-control" id="inputPassword3" placeholder="请确认新密码" v-model="confirmPassword"></div>
    <button type="submit" class="btn btn-default login_btn" @click="addStuff">确认修改</button>
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
      admin: 0,
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    addStuff () {
      console.log(1)
    }
  }
}
</script>
<style scoped lang='scss'>
.function_area {
  width: 440px;
  display: block;
  margin: 10px auto;

  & > div {
    text-align: left;
    margin-top: 30px;

    & > input {
      width: 200px;
      height: 30px;
      padding: 5px;
      border: 1px solid #c3c3c3;
    }
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
    background-color: #259c6a;
    cursor: pointer;
    margin-top: 20px;
    color: #ffffff;
  }
}
</style>
