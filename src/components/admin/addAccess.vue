<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <el-row>
    <el-col :span="6" :offset="9">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path: '/admin'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/accessManage'}">权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加权限</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <el-row style="line-height: 40px">
    <el-col :span="2" :offset="9">
      权限名称:
    </el-col>
    <el-col :span="3">
      <el-input v-model="accessName" placeholder="请输入权限名称" class="roleName"></el-input>
    </el-col>
  </el-row>
  <br/>
  <el-row style="line-height: 40px">
    <el-col :span="2" :offset="9">
      对应可访问url:
    </el-col>
    <el-col :span="3">
      <el-input v-model="accessUrl" placeholder="请输入权限url路由" class="roleName"></el-input>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="13">
      <el-button type="primary" size="small" class="addBtn" @click="addAccess">确定</el-button>
    </el-col>
  </el-row>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
Vue.use(VueResource)
export default {
  name: 'addAccess',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      admin: 1,
      accessName: '',
      accessUrl: ''
    }
  },
  methods: {
    addAccess () {
      let params = {
        accessName: this.accessName,
        accessUrl: this.accessUrl
      }
      Vue.http.post('/api/addAccess', params)
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            alert('添加失败')
          } else if (response.body.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$router.push({path: '/AccessManage'})
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
.roleName {
    width: 200px;
    margin-left: 20px;
}
.addBtn {
    margin-top: 1rem;
    float: right;
}
</style>
