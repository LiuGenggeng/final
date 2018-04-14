<template>
<div>
  <vue-logo></vue-logo>
  <compony-name></compony-name>
  <welcome-title :admin="admin" :stuff="stuff"></welcome-title>
</div>
</template>

<script>
import logo from './logo.vue'
import componyName from './componyName.vue'
import welcomeTitle from './welcomeTitle.vue'
export default {
  name: 'top',
  components: {
    'vue-logo': logo,
    'compony-name': componyName,
    'welcome-title': welcomeTitle
  },
  props: ['admin', 'stuff']
}
</script>
