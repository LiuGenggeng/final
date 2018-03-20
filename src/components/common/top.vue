<template>
<div>
  <vue-logo></vue-logo>
  <compony-name v-if="admin !== 1"></compony-name>
  <welcome-title v-if="admin === 1" :admin="admin"></welcome-title>
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
  props: ['admin']
}
</script>
