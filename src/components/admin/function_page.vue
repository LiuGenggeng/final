<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <div class="function_area">
    <div><button>添加公司人员</button></div>
    <div><button>人员管理</button></div>
    <div><button>申请wifi登陆密码记录</button></div>
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

    & > button {
      width: 240px;
      text-align: center;
      margin-top: 15px;
      padding: 5px;
      cursor: pointer;
    }
  }
}
</style>
