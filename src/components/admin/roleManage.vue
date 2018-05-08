<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <el-row>
    <el-col :span="12" :offset="11">
      <router-link :to="{name:'addRole'}" class="addRole">添加角色</router-link>
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
                @click="handleAccess(scope.$index, scope.row)">关联权限</el-button>
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
<el-dialog title="关联权限" :visible.sync="accessDialogFormVisible">
  <template>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedAccesses" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="access in accesses" :label="access" :key="access">{{access.name}}</el-checkbox>
    </el-checkbox-group>
  </template>
  <div slot="footer" class="dialog-footer">
    <el-button @click="accessDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleRoleAccess">确 定</el-button>
  </div>
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
      fixIndex: 0,
      accessDialogFormVisible: false,
      checkAll: false,
      checkedAccesses: [],
      accesses: [],
      isIndeterminate: true,
      accessRoleId: '',
      checkedRoleAccesses: []
    }
  },
  mounted () {
    this.getRoleList()
    this.getAccessList()
  },
  methods: {
    handleEdit (index, row) {
      this.fixRoleName(index, row)
    },
    handleDelete (index, row) {
      this.dialogVisible = true
      this.deleteIndex = index
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
    getAccessList () {
      Vue.http.get('/api/getAccessList')
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            console.log('无权限')
          } else if (response.body.code === 1) {
            this.accesses = response.body.data
          }
        })
        .catch((reject) => {
          console.log(reject)
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
            this.$message({
              message: '删除成功',
              type: 'success'
            })
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
    },
    handleAccess (index, row) {
      this.accessDialogFormVisible = true
      this.accessRoleId = row._id
    },
    handleCheckAllChange (val) {
      this.checkedRoleAccesses = []
      this.checkedAccesses = val ? this.accesses : []
      this.checkedAccesses.forEach((item, index) => {
        this.checkedRoleAccesses.push(item._id)
      })
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      this.checkedRoleAccesses = []
      let checkedCount = value.length
      this.checkAll = checkedCount === this.accesses.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.accesses.length
      value.forEach((item, index) => {
        this.checkedRoleAccesses.push(item._id)
      })
      console.log(this.checkedRoleAccesses)
    },
    handleRoleAccess () {
      let params = {
        roleId: this.accessRoleId,
        accessId: this.checkedRoleAccesses
      }
      Vue.http.post('/api/addRoleAccess', params)
        .then((response) => {
          // 响应成功回调
          if (response.body.code === 0) {
            alert('添加失败')
          } else if (response.body.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.accessDialogFormVisible = false
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
