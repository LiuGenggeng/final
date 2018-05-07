<template>
<div>
  <vue-top :admin="admin"></vue-top>
  <div class="role_area">
    角色: <input type="text" v-model="roleName" name="roleName" class="roleName"/>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import Top from '../common/top.vue'
Vue.use(VueResource)
export default {
  name: 'addRole',
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
