<template>
<div>
  <vue-logo></vue-logo>
  <compony-name></compony-name>
</div>
</template>

<script>
import logo from './logo.vue'
import componyName from './componyName.vue'
export default {
  name: 'top',
  components: {
    'vue-logo': logo,
    'compony-name': componyName
  }
}
</script>
