<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <el-row>
    <el-col :span="6" :offset="9">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12" :offset="11">
      <router-link :to="{name:'addAccess'}" class="addAccess">添加权限</router-link>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12" :offset="6">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="角色"
            width="280">
          </el-table-column>
          <el-table-column
            prop="url"
            label="Urls"
            width="280">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-col>
  </el-row>
  <el-dialog
  title="警告"
  :visible.sync="dialogVisible"
  width="30%"
  :show-close="false">
  <span>您确定要删除这个权限么？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteAccess()">确 定</el-button>
  </span>
</el-dialog>
<el-dialog title="修改权限" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="权限名称" :label-width="formLabelWidth">
      <el-input v-model="editForm.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="对应Url" :label-width="formLabelWidth">
      <el-input v-model="editForm.url" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleAccessEdit">确 定</el-button>
  </div>
</el-dialog>
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
      tableData: [],
      dialogVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      editForm: {
        name: '',
        url: ''
      },
      deleteIndex: 0,
      fixIndex: 0
    }
  },
  mounted () {
    this.getAccessList()
  },
  methods: {
    getAccessList () {
      Vue.http.get('/api/getAccessList')
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            console.log('无权限')
          } else if (response.body.code === 1) {
            this.tableData = response.body.data
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    handleEdit (index, row) {
      this.editForm.name = row.name
      this.editForm.url = row.url
      this.dialogFormVisible = true
      this.fixIndex = index
    },
    handleAccessEdit () {
      this.dialogFormVisible = false
      let params = {
        id: this.tableData[this.fixIndex]._id,
        accessName: this.editForm.name,
        accessUrl: this.editForm.url
      }
      Vue.http.get('/api/fixAccess', {params: params}, {emulateJSON: true})
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            alert('修改失败')
          } else if (response.body.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    handleDelete (index, row) {
      this.deleteIndex = index
      this.dialogVisible = true
    },
    deleteAccess () {
      let params = {
        id: this.tableData[this.deleteIndex]._id
      }
      Vue.http.get('/api/deleteAccess', {params: params}, {emulateJSON: true})
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            alert('删除失败')
          } else if (response.body.code === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.dialogVisible = false
            this.tableData.splice(this.deletIndex, 1)
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
.addAccess {
  text-decoration: none;
  color: #409EFF;
}
</style>
