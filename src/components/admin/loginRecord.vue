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
      :width="1000"
      :columns="columns"
      :table-data="tableData"
      :show-vertical-border="false"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      @on-custom-comp="customCompFunc"
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
      columns: [
        {field: 'name', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center'},
        {field: 'tel', title: '开始时间', width: 160, titleAlign: 'center', columnAlign: 'center'},
        {field: 'hobby', title: '已经连接时间', width: 330, titleAlign: 'center', columnAlign: 'center'},
        {field: 'address', title: '操作', titleAlign: 'center', columnAlign: 'left'},
        {field: 'custome-adv', title: '操作', width: 200, titleAlign: 'center', columnAlign: 'center', componentName: 'table-operation', isResize: true}
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
    },
    customCompFunc (params) {
      console.log(params)
      if (params.type === 'delete') { // do delete operation
        this.$delete(this.tableData, params.index)
      } else if (params.type === 'edit') { // do edit operation
        alert(`行号：${params.index} 姓名：${params.rowData['name']}`)
      }
    }
  }
}
// 自定义列组件
Vue.component('table-operation', {
  template: `<span>
    <a href="" @click.stop.prevent="update(rowData,index)">编辑</a>&nbsp;
    <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>&nbsp
    </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    update () {
      // 参数根据业务场景随意构造
      let params = {type: 'edit', index: this.index, rowData: this.rowData}
      this.$emit('on-custom-comp', params)
    },
    deleteRow () {
      // 参数根据业务场景随意构造
      let params = {type: 'delete', index: this.index}
      this.$emit('on-custom-comp', params)
    }
  }
})
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
