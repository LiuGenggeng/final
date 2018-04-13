<template>
<div>
  <div>欢迎你, <span v-if="admin === 1">管理员</span><div v-if="stuff=== 1">{{stuff.name}}</div></div>
  <div><a href="" @click="logout">注销</a></div>
</div>
</template>

<script>
export default {
  name: 'welcomeTitle',
  props: ['admin', 'stuff'],
  methods: {
    logout () {
      sessionStorage.setItem('login', false)
    }
  }
}
</script>
