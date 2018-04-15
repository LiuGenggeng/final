<template>
<div>
  <div>欢迎你, <span v-if="admin === 1">管理员</span><span v-if="stuff !== ''">{{stuff}}</span></div>
  <div><a href="javascript:void(0)" @click="logout">注销</a></div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
export default {
  name: 'welcomeTitle',
  props: ['admin', 'stuff'],
  methods: {
    logout () {
      sessionStorage.setItem('login', false)
      const level = Number(sessionStorage.getItem('level'))
      if (level === 0) {
        this.$router.push({path: '/login'})
        return
      }
      if (level === 1) {
        this.sendOfflineData()
      }
    },
    sendOfflineData () {
      const stuffId = sessionStorage.getItem('stuffId')
      let params = {
        id: stuffId
      }
      // 获取已有账号密码
      Vue.http.post('/api/login/logout', params)
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            alert('修改失败')
          } else {
            this.$router.push({path: '/login'})
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    }
  }
}
</script>
