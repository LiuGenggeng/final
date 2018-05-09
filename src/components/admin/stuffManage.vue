<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <el-row>
    <el-col :span="6" :offset="9">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <div class="stuff_area">
    <stuff-inform v-for="item in items" :item="item" :key="item.id" class="stuff_content"></stuff-inform>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
import stuffInform from './stuffInform.vue'
Vue.use(VueResource)
export default {
  name: 'addStuff',
  components: {
    'vue-top': Top,
    'stuff-inform': stuffInform
  },
  data () {
    return {
      admin: 1,
      items: [
        {account: 'liugeng', id: '1', banner: false}
      ]
    }
  },
  mounted () {
    this.getStuff()
  },
  methods: {
    getStuff () {
      // 获取已有账号密码
      Vue.http.get('/api/login/getStuffAccount')
        .then((response) => {
          // 响应成功回调l
          console.log(response.body)
          if (response.body.code === 0) {
            alert('无stuff')
          } else {
            this.items = response.body.data
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
.stuff_area {
  width: 800px;
  margin: 0 auto;
  text-align: left;

  .stuff_content {
    display: inline-block;
    text-align: center;
  }
}
</style>
