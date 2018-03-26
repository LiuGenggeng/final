<template>
<div>
  <vue-top :admin="admin"></vue-top>
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
        {'name': '赵伟', 'tel': '156*****1987', 'hobby': '钢琴、书法、唱歌', 'address': '上海市黄浦区金陵东路569号17楼'},
        {'name': '李伟', 'tel': '182*****1538', 'hobby': '钢琴、书法、唱歌', 'address': '上海市奉贤区南桥镇立新路12号2楼'},
        {'name': '孙伟', 'tel': '161*****0097', 'hobby': '钢琴、书法、唱歌', 'address': '上海市崇明县城桥镇八一路739号'},
        {'name': '周伟', 'tel': '197*****1123', 'hobby': '钢琴、书法、唱歌', 'address': '上海市青浦区青浦镇章浜路24号'},
        {'name': '吴伟', 'tel': '183*****6678', 'hobby': '钢琴、书法、唱歌', 'address': '上海市松江区乐都西路867-871号'}
      ],
      outerData: [
        {'name': '赵伟', 'tel': '156*****1987', 'hobby': '钢琴、书法、唱歌', 'stuffName': '赵伟'},
        {'name': '李伟', 'tel': '182*****1538', 'hobby': '钢琴、书法、唱歌', 'stuffName': '赵伟'},
        {'name': '孙伟', 'tel': '161*****0097', 'hobby': '钢琴、书法、唱歌', 'stuffName': '赵伟'},
        {'name': '周伟', 'tel': '197*****1123', 'hobby': '钢琴、书法、唱歌', 'stuffName': '赵伟'},
        {'name': '吴伟', 'tel': '183*****6678', 'hobby': '钢琴、书法、唱歌', 'stuffName': '赵伟'}
      ],
      columns: [
        {field: 'name', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center'},
        {field: 'tel', title: '开始时间', width: 160, titleAlign: 'center', columnAlign: 'center'},
        {field: 'hobby', title: '已经连接时间', width: 330, titleAlign: 'center', columnAlign: 'center'}
      ],
      outerColumns: [
        {field: 'name', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center'},
        {field: 'tel', title: '开始时间', width: 160, titleAlign: 'center', columnAlign: 'center'},
        {field: 'hobby', title: '已经连接时间', width: 330, titleAlign: 'center', columnAlign: 'center'},
        {field: 'stuffName', title: '申请员工', width: 160, titleAlign: 'center', columnAlign: 'center'}
      ]
    }
  },
  methods: {
    showInsert () {
      this.insert = 'current'
      this.outer = ''
    },
    showOuter () {
      this.insert = ''
      this.outer = 'current'
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
