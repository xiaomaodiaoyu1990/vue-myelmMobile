<template>
  <div id="app" class="app">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
    <div class="header">
      <my-header :seller="seller"></my-header>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <!--<a v-link="{path: '/good'}"></a>-->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/Header/Header.vue'
const err_ok = 0;
export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then((res) => {
      let rdata = res.body;
      if(rdata.errno === err_ok) {
        this.seller = rdata.data;
        console.log(this.seller)
      }
    })
  },
  components: {
    'myHeader': header
  }
}
</script>

<style>
  @media (-webkit-min-device-pixel-ratio: 1.5) and (min-device-pixel-ratio: 1.5) {
    .border-1px::after {
      transform: scaleY(0.7);
      -webkit-transform: scaleY(0.7);
    }
  }
  @media (-webkit-min-device-pixel-ratio: 2) and (min-device-pixel-ratio: 2) {
    .border-1px::after {
      transform: scaleY(0.5);
      -webkit-transform: scaleY(0.5);
    }
  }
  .border-1px {
    position: relative;
  }
  .border-1px:after {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    content: ' ';
    border-top: solid 1px rgba(7, 17, 27, 0.1);
  }
  /*.border-1px::after {*/
    /*transform: scaleY(5);*/
    /*-webkit-transform: scaleY(5);*/
  /*}*/
  .app .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  /*.app .tab {*/
    /*border-bottom: solid 1px rgba(7, 17, 27, 0.1);*/
  /*}*/
  .app .tab .tab-item {
    flex: 1;
    text-align: center;
  }
  .app .tab .tab-item > a {
    display: block;
    font: 400 14px/40px "Microsoft YaHei";
    color: rgb(77, 85, 93);
  }
  .app .tab .tab-item > a.active {
    color: rgb(240, 20, 20);
  }

</style>
