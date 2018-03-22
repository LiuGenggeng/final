<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <div class="stuff_area">
    <stuff-inform v-for="item in items" :item="item" :key="item.id" class="stuff_content"></stuff-inform>
  </div>
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
      items: [
        {name: 'liugeng', id: '1'},
        {name: 'liwenjing', id: '2'}
      ]
    }
  },
  methods: {
    addStuff () {
      console.log(1)
    }
  }
}
</script>
<style scoped lang='scss'>
.stuff_area {
  .stuff_content {
    display: inline-block;
  }
}
</style>
