<template>
<div>
  <vue-top :stuff="stuff"></vue-top>
  <div class="apply_area" v-if="banner === false">
    <div><span>申请姓名:</span><input name="name" type="input" class="outer_name" v-model="outerName" placeholder="请输入外来人员姓名" /><button class="confirm" @click="addOuter">确定</button></div>
    <div><span>点击确认生成密码:</span><input name="password" type="input" class="password" v-model="password" placeholder="输入姓名然后点击确定" /></div>
  </div>
  <div class="prompting" v-if="banner === true">
    对不起，您的权限已经被禁用，请联系管理员恢复权限!
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
      stuff: '',
      outerName: '',
      password: '',
      banner: false
    }
  },
  mounted: function () {
    this.stuff = sessionStorage.getItem('stuffName')
    this.banner = Boolean(sessionStorage.getItem('banner'))
  },
  methods: {
    addOuter () {
      const stuffId = sessionStorage.getItem('stuffId')
      const stuffName = sessionStorage.getItem('stuffName')
      let params = {
        name: this.outerName,
        stuffId: stuffId,
        stuffName: stuffName,
        time: (new Date()).getTime(),
        num: Math.random()
      }
      // 获取已有账号密码
      Vue.http.get('/api/login/getKey', {params: params}, {emulateJSON: true})
        .then((response) => {
          // 响应成功回调
          console.log(response.body)
          if (response.body.code === 0) {
            alert('创建失败')
          } else {
            this.password = response.body.password
          }
          // 创建一个账号密码
          // return this.$http.post('/api/login/createAccount', params)
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
.prompting {
  width: 440px;
  display: block;
  margin: 10px auto;
}
</style>
