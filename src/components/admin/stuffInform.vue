<template>
<div>
  <div class="stuff">
    <p class="stuff_name">姓名: {{item.account}}</p>
    <p class="stuf_id">ID: {{item._id}}</p>
    <button v-bind:class="{active: isActive}" @click="isActive = !isActive">{{activeBtn}}</button>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
Vue.use(VueResource)
export default {
  name: 'stuffInform',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      isActive: false,
      activeBtn: '禁用'
    }
  },
  watch: {
    isActive (curVal, oldVal) {
      if (curVal) {
        this.activeBtn = '启用'
      } else {
        this.activeBtn = '禁用'
      }
    }
  },
  props: ['item']
}
</script>
<style scoped lang='scss'>
.stuff {
  display: inline-block;
  width: 200px;
  height: 190px;
  background-color: #ffffff;
  border: 1px solid rgba(187, 187, 187, 1);
  margin: 30px 30px;

  & > button {
    margin: 10px auto;
    display: block;
    width: 60px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color: #cacaca;
    border-radius: 10px;
    cursor: pointer;
  }
  & > button.active {
    background-color: #41b883;
  }
}
</style>
