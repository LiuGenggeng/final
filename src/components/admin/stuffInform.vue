<template>
<div>
  <div class="stuff">
    姓名: {{item.name}}<br/>
    ID: {{item.id}}
    <button v-bind:class="{active: isActive}">禁用</button>
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
      isActive: false
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
  margin-left: 30px;

  & > button {
    margin: 10px auto;
    display: block;
    width: 60px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color: #cacaca;
    border-radius: 10px;
  }
}
</style>
