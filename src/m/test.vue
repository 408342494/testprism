<template>
  <div>
  <h1 class="title" @click="handleClick">{{text}}</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      text: '咸鱼'
    }
  },
  methods: {
    handleClick () {
      console.log(88)
    }
  }
}
</script>
<style scoped>
  .title {
    color: yellow;
  }
</style>
