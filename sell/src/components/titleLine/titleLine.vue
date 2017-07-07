<template>
  <div class="title-line">
    <div class="title">
      <div class="line"></div>
      <div class="text">{{text}}</div>
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    props: ['text']
  }
</script>
<style>
  .title-line .title {
    display: flex;
    margin: 28px auto 24px auto;
  }
  .title .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: solid 1px rgba(255, 255, 255, 0.2);
  }
  .title .text {
    padding: 0 12px;
    font-weight: 700;
    font-size: 14px;
  }
</style>
