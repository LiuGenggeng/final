<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <el-row>
    <el-col :span="6" :offset="9">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path: '/admin'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/roleManage'}">角色管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加角色</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <el-row>
      <el-col :span="24">
          角色: <el-input v-model="roleName" placeholder="请输入角色名称" class="roleName"></el-input>
      </el-col>
  </el-row>
  <el-row>
      <el-col :span="13">
          <el-button type="primary" size="small" class="addBtn" @click="addRole">确定</el-button>
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
  name: 'addRole',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      admin: 1,
      roleName: ''
    }
  },
  methods: {
    addRole () {
      let params = {
        roleName: this.roleName
      }
      Vue.http.post('/api/addRole', params)
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            alert('添加失败')
          } else if (response.body.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$router.push({path: '/roleManage'})
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
