<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <div class="role_area">
    
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
Vue.use(VueResource)
export default {
  name: 'addAccess',
  components: {
    'vue-top': Top
  },
  data () {
    return {
      admin: 1
    }
  },
  methods: {
    
  }
}
</script>
<style scoped lang='scss'>
.role_area {
  width: 800px;
  margin: 0 auto;
  text-align: left;
}
</style>
