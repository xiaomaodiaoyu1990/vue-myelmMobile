<template>
	<div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <i class="brand"></i>
          <span class="name" v-text="seller.name"></span>
        </div>
        <div class="descriptions">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i>></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon">></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name" v-text="seller.name"></h1>
          <star :size="48" :score="seller.score"></star>
        </div>
      </div>
      <div class="detail-close">×</div>
    </div>
  </div>
</template>
<script>
  import star from '../star/star.vue'
  export default {
    data () {
      return {
        detailShow: false
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    }
  }
</script>
<style>
  .detail-main .name {
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
    text-align: center;
  }
  .header {
    position: relative;
    color: #fff;
    background: rgba(7, 17, 27, 0.3);
    overflow: hidden;
  }
  .detail .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    font-size: 32px;
    margin: -64px auto 0 auto;
    clear: both;
  }
  .detail .detail-wrapper {
    min-height: 99%;
  }
  .detail .detail-wrapper .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;
    font-size: 12px;
  }
  .header .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
  }
  .header .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .header .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding-left: 12px;
    padding-right: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);
  }
  .header .bulletin-wrapper .icon {
    position: absolute;
    font-size: 10px;
    right: 12px;
    top: 0px;
  }
  .header .bulletin-wrapper .bulletin-title {
    display: inline-block;
    vertical-align: top;
    margin-top: 9px;
    width: 22px;
    height: 12px;
    background: url("bulletin@2x.png") no-repeat;
    background-size: 22px 12px;
  }
  .header .bulletin-wrapper .bulletin-text {
    font-size: 10px;
    margin-left: 1px;
    margin-right: 4px;

  }
  .header .content-wrapper {
    position: relative;
  }
  .header .content-wrapper .support-count {
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
  }
  .header .supports {
    font-size: 10px;
    line-height: 12px;
  }
  .header .supports .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
  }
  .header .supports .decrease {
    background: url("discount_1@2x.png") no-repeat;
    background-size: 12px 12px;
  }
  .header .supports .discount {
    background: url("discount_1@2x.png") no-repeat;
    background-size: 12px 12px;
  }
  .header .supports .guarantee {
    background: url("guarantee_1@2x.png") no-repeat;
    background-size: 12px 12px;
  }
  .header .supports .invoice {
    background: url("invoice_1@2x.png") no-repeat;
    background-size: 12px 12px;
  }
  .header .supports .special {
    background: url("special_1@2x.png") no-repeat;
    background-size: 12px 12px;
  }
  .header .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }
  .content-wrapper .avatar {
    display: inline-block;
    vertical-align: top;
  }
  .content-wrapper .avatar img {
    border-radius: 2px;
  }
  .content-wrapper .content {
    display: inline-block;
    font-size: 12px;
    font-family: 'Microsoft YaHei';
    margin-left: 16px;
  }
  .content-wrapper .content .title {
    margin: 2px 0 8px 0;
  }
  .content .title .brand {
    display: inline-block;
    vertical-align: bottom;
    width: 30px;
    height: 18px;
    background: url('brand@2x.png') no-repeat;
    background-size: 30px 18px;
  }
  .content .title .name {
    margin-left: 3px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .descriptions {
    margin-bottom: 10px;
    line-height: 12px;
  }
</style>
