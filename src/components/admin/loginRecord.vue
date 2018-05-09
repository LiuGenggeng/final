<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <el-row>
    <el-col :span="6" :offset="9">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>申请wifi登陆密码记录</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <div class="record_area">
    <div class="title">
      <span class="title_name">管理日志记录</span>
      <span>当前连接人数 {{curConnect}}人</span>
      <span class="insertPerson" @click="showInsert" v-bind:class="insert">内部人员</span>
      <span class="outerPerson" @click="showOuter" v-bind:class="outer">外部人员</span>
    </div>
    <v-table
      :width="590"
      :columns="columns"
      :table-data="tableData"
      :show-vertical-border="false"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      v-if="insert === 'current'"
    ></v-table>
    <v-table
      :width="750"
      :columns="outerColumns"
      :table-data="outerData"
      :show-vertical-border="false"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      v-if="outer === 'current'"
    ></v-table>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
Vue.use(VueResource)
export default {
  name: 'addStuff',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      admin: 1,
      curConnect: 1123123,
      insert: 'current',
      outer: '',
      tableData: [
        {'account': '', 'startTime': '', 'overTime': ''}
      ],
      outerData: [
        {'name': '', 'startTime': '', 'overTime': '', 'stuffName': ''}
      ],
      columns: [
        {field: 'account', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center'},
        {field: 'startTime', title: '开始时间', width: 160, titleAlign: 'center', columnAlign: 'center'},
        {field: 'overTime', title: '已经连接时间', width: 330, titleAlign: 'center', columnAlign: 'center'}
      ],
      outerColumns: [
        {field: 'name', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center'},
        {field: 'startTime', title: '开始时间', width: 160, titleAlign: 'center', columnAlign: 'center'},
        {field: 'overTime', title: '已经连接时间', width: 330, titleAlign: 'center', columnAlign: 'center'},
        {field: 'stuffName', title: '申请员工', width: 160, titleAlign: 'center', columnAlign: 'center'}
      ]
    }
  },
  mounted: function () {
    this.getStuffLogin()
  },
  methods: {
    showInsert () {
      this.insert = 'current'
      this.outer = ''
      this.getStuffLogin()
    },
    showOuter () {
      this.insert = ''
      this.outer = 'current'
      this.getOuterLogin()
    },
    getStuffLogin () {
      // 获取内部员工登陆信息
      Vue.http.get('/api/getStuffLogin')
        .then((response) => {
          // 响应成功回调
          console.log(response.body)
          if (response.body.code === 0) {
            alert('获取失败')
          } else {
            if (response.body.data.length === 0) {
              console.log('员工登陆为0')
            } else if (response.body.data.length > 0) {
              const res = response.body.data
              console.log(res)
              const curTime = new Date()
              res.forEach(element => {
                const startTime = new Date(element.startTime)
                const overTime = new Date(curTime - element.startTime)
                element.startTime = startTime.getFullYear() + '-' + startTime.getMonth() + '-' + startTime.getDate() + ' ' + startTime.getHours() + ':' + startTime.getMinutes() + ':' + startTime.getSeconds()
                element.overTime = overTime.getHours() + '时' + overTime.getMinutes() + '分' + overTime.getSeconds() + '秒'
              })
              this.tableData = res
              console.log(res)
            }
          }
          // 创建一个账号密码
          // return this.$http.post('/api/login/createAccount', params)
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    getOuterLogin () {
      Vue.http.get('/api/getOuterLogin')
        .then((response) => {
          // 响应成功回调
          console.log(response.body)
          if (response.body.code === 0) {
            alert('获取失败')
          } else {
            if (response.body.data.length === 0) {
              console.log('员工登陆为0')
            } else if (response.body.data.length > 0) {
              const res = response.body.data
              console.log(res)
              const curTime = new Date()
              res.forEach(element => {
                const startTime = new Date(element.startTime)
                const overTime = new Date(curTime - element.startTime)
                element.startTime = startTime.getFullYear() + '-' + startTime.getMonth() + '-' + startTime.getDate() + ' ' + startTime.getHours() + ':' + startTime.getMinutes() + ':' + startTime.getSeconds()
                element.overTime = overTime.getHours() + '时' + overTime.getMinutes() + '分' + overTime.getSeconds() + '秒'
              })
              this.outerData = res
              console.log(res)
            }
          }
          // 创建一个账号密码
          // return this.$http.post('/api/login/createAccount', params)
        })
        .catch((reject) => {
          console.log(reject)
        })
    }
  }
}
</script>
<style scoped lang='scss'>
.record_area {
  width: 800px;
  margin: 0 auto;
  text-align: left;
  .title {

    .title_name {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      width: 120px;
      background-color: #41b883;
      text-align: center;
      border-radius: 5px;
      color: #ffffff;
      margin-right: 30px;
    }

    .insertPerson, .outerPerson{
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #000000;
      background-color: #ffffff;
      border: 1px solid #8c8c8c;
      border-radius: 5px;
      font-size: 14px;
      display: inline-block;
      cursor: pointer;
      margin-left: 30px;
    }

    .current {
      background-color: #41b883;
      color: #ffffff;
    }
  }
}
</style>
