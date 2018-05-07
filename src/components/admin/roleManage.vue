<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <el-row>
    <el-col :span="12" :offset="11">
      <router-link :to="{name:'addRole'}" class="addRole">添加角色</router-link>
    </el-col>
  </el-row>
  <!-- <el-row>
    <el-col :span="12" :offset="6" class="xian"></el-col>
  </el-row> -->
  <el-row>
    <el-col :span="12" :offset="6">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="角色"
            width="180">
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
  <span>您确定要删除这个角色么？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteRole()">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
Vue.use(VueResource)
export default {
  name: 'roleManage',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      admin: 1,
      dialogVisible: false,
      tableData: [],
      deleteIndex: 0,
      fixIndex: 0
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    handleEdit (index, row) {
      this.fixRoleName(index, row)
    },
    handleDelete (index, row) {
      this.dialogVisible = true
      this.deleteIndex = index
      // this.tableData.splice(index, 1)
    },
    fixRoleName (index, row) {
      this.$prompt('请输入角色名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        this.fixIndex = index
        this.fixRole(value)
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteRole () {
      let params = {
        id: this.tableData[this.deleteIndex]._id
      }
      this.dialogVisible = false
      Vue.http.get('/api/deleteRole', {params: params}, {emulateJSON: true})
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            alert('删除失败')
          } else if (response.body.code === 1) {
            this.tableData.splice(this.deletIndex, 1)
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    fixRole (value) {
      let params = {
        id: this.tableData[this.fixIndex]._id,
        name: value
      }
      Vue.http.get('/api/fixRoleName', {params: params}, {emulateJSON: true})
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            alert('修改失败')
          } else if (response.body.code === 1) {
            this.tableData[this.fixIndex].name = value
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    getRoleList () {
      Vue.http.get('/api/getRoleList')
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            console.log('无角色')
          } else if (response.body.code === 1) {
            this.tableData = response.body.data
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
.addRole {
  text-decoration: none;
  color: #409EFF;
}
</style>
