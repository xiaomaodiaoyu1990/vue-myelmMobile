<template>
  <div id="app" class="app">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
    <div class="header">
      <my-header></my-header>
    </div>
    <div class="tab">
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

<script>
import header from './components/Header/Header.vue'
export default {
  name: 'app',
  components: {
    'myHeader': header
  }
}
</script>

<style>
  .app .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .app .tab .tab-item {
    flex: 1;
    text-align: center;
  }

</style>
