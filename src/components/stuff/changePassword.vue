<template>
<div>
  <vue-top :stuff="stuff"></vue-top>
  <el-row>
    <el-col :span="6" :offset="9">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/stuff' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <div class="function_area">
    <div class="line"><span class="user_name">原始密码:</span><input class="form-control" type="password" id="inputEmail3" placeholder="请输入原始密码" v-model="oldPassword"></div>
    <div class="line"><span class="user_pass">新密码:</span><input type="password" class="form-control" id="inputPassword3" placeholder="请输入新密码" v-model="newPassword"></div>
    <div class="line"><span class="user_pass">确认密码:</span><input type="password" class="form-control" id="inputPassword" placeholder="请确认新密码" v-model="confirmPassword"></div>
    <button type="submit" class="btn btn-default login_btn" @click="changePassword">确认修改</button>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
Vue.use(VueResource)
export default {
  name: 'changeStuffPassword',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      stuff: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      allowUrls: []
    }
  },
  mounted: function () {
    this.stuff = sessionStorage.getItem('stuffName')
    this.getAllowUrls()
  },
  methods: {
    changePassword () {
      let params = {
        id: '5abf4a4a7876ea52550ca268',
        oldPass: this.oldPassword,
        newPass: this.newPassword
      }
      // 获取已有账号密码
      Vue.http.post('/api/login/changeStuffPassword', params)
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            alert('修改失败')
          } else {
            alert('修改成功')
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    getAllowUrls () {
      const allowUrls = sessionStorage.getItem('allowUrl')
      this.allowUrls = allowUrls.split(',')
    }
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (this.allowUrls.indexOf(to.path) === -1) {
      this.$message.error('您无访问该页面权限')
      next(false)
    } else {
      next()
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
