<template>
  <div>
    <h1 class="title">{{ text }}</h1>
    <div>try harder</div>
    <img src="@/public/imgs/person4.png"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      text: 'm/index页面'
    }
  }
}
</script>

<style scoped>
@import '~@/public/css/reset.css';
@width: 10px;
@height: @width + 10px;
.title {
  color: red;
  height: @height;
}
.test {
  color: pink;
}
</style>
