<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <div class="function_area">
    <div><router-link :to="{name:'addStuff'}">添加公司人员</router-link></div>
    <div><router-link :to="{name:'stuffManage'}">人员管理</router-link></div>
    <div><router-link :to="{name:'loginRecode'}">申请wifi登陆密码记录</router-link></div>
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
      admin: 1
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
