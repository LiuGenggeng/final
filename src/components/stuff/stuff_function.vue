<template>
<div>
  <vue-top :stuff="stuff"></vue-top>
  <div class="function_area">
    <div><router-link :to="{name:'applyPassword'}">申请wifi登陆密码</router-link></div>
    <div><router-link :to="{name:'changePassword'}">修改密码</router-link></div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
Vue.use(VueResource)
export default {
  name: 'stuffFunction',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      stuff: '',
      allowUrls: []
    }
  },
  mounted: function () {
    this.stuff = sessionStorage.getItem('stuffName')
    this.getUrl()
  },
  methods: {
    getUrl () {
      const stuffId = sessionStorage.getItem('stuffId')
      let params = {
        id: stuffId
      }
      // 获取id对应的权限url列表
      Vue.http.get('/api/getAccessUrlList', {params: params}, {emulateJSON: true})
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            console.log('无权限')
          } else if (response.body.code === 1) {
            sessionStorage.setItem('allowUrl', response.data.urls)
            this.allowUrls = response.data.urls
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
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
  width: 240px;
  display: block;
  margin: 10px auto;

  & > div {
    text-align: left;
    height: 50px;

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
}
</style>
