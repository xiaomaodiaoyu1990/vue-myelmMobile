<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text">
            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>¥{{food.price}}</span>
                  <span v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const ERR_OK = 0;
  export default {
    data () {
        return {
          goods: []
        }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        if(res.errno == ERR_OK) {
          this.goods = res.data;
          console.log(this.goods)
        }
      })
    }
  }
</script>
<style>
  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
  }
  .goods .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
  }
  .goods .menu-wrapper .menu-item {
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    font-weight: 200;
    padding: 0 12px;
  }
  .goods .menu-wrapper .menu-item .text {
    font-size: 12px;
    vertical-align: middle;
    display: table-cell;
    width: 56px;
    border-bottom: solid 1px rgba(7, 17, 27, 0.1);
  }
  .goods .menu-wrapper .menu-item .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
  }
  .goods .menu-wrapper .menu-item .decrease {
    background: url("decrease_1@2x.png") no-repeat;
    background-size: 12px 12px;
  }
  .goods .menu-wrapper .menu-item .discount {
    background: url("discount_1@2x.png") no-repeat;
    background-size: 12px 12px;
  }
  .goods .menu-wrapper .menu-item .guarantee {
    background: url("guarantee_1@2x.png") no-repeat;
    background-size: 12px 12px;
  }
  .goods .menu-wrapper .menu-item .invoice {
    background: url("invoice_1@2x.png") no-repeat;
    background-size: 12px 12px;
  }
  .goods .menu-wrapper .menu-item .special {
    background: url("special_1@2x.png") no-repeat;
    background-size: 12px 12px;
  }
  .goods .foods-wrapper {
    flex: 1;
  }
  .foods-wrapper .title {
    height: 26px;
    font-size: 12px;
    line-height: 26px;
    color: rgb(147, 153, 159);
    background-color: #f3f5f7;
    border-left: solid 2px #d9dde1;
    padding-left: 13px;
  }
</style>
