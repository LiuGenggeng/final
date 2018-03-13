<template>
<div>
  <img v-bind:src="imgSrc" />
</div>
</template>

<script>
export default {
  name: 'logo',
  data () {
    return {
      imgSrc: '/static/i/logo.png'
    }
  }
}
</script>
