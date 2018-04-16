<template>
<div>
  <img v-bind:src="imgSrc" width="200" height="200" style="border-radius: 144px;"/>
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
