<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <span class="logo-img"></span>
          </div>
          <div class="num" v-show="totalCount">{{totalCount}}</div>
        </div>
        <div class="price">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group name="drop">
        <div v-for="ball in balls" :key="ball" v-show="ball.show" class="ball">
          <div class="inner"></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import $ from 'jquery'
  export default {
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
//            {
//              price: 10,
//              count: 2
//            }
          ];
        }
      },
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        })
        return total
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差¥${this.minPrice - this.totalPrice}起送`
        } else if(this.totalPrice >= this.minPrice) {
            return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'no-enough'
        } else {
          return 'enough'
        }
      }
    },
    methods: {
      drop (el) {
        console.log(el)
        console.log($(el))
        for (let i=0; i<this.balls.length; i++) {
          let ball = this.balls[i];
          if(!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      }
    }
  }
</script>
<style>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
  }
  .ball-container {

  }
  .ball-container .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
  }
  .ball-container .ball .inner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(0, 160, 220);
  }
  .ball-container .drop-enter-active {
    transition: all 0.4s;
  }
  .ball-container .drop-enter-active .inner {
    transition: all 0.4s;
  }

  .shopcart .content {
    display: flex;
    background-color: #141d27;
    /*height: 100%;*/
  }
  .shopcart .content .content-left {
    flex: 1;
  }
  .shopcart .content-left {
    font-size: 0;
  }
  .shopcart .content-left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background-color: #141d27;
  }
  .shopcart .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
    line-height: 44px;
  }
  .shopcart .logo-wrapper .logo.highlight {
    background-color: #00a0dc;
  }
  .shopcart .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    height: 16px;
    width: 24px;
    line-height: 16px;
    background-color: #f01414;
    font-weight: 700;
    color: #fff;
    text-align: center;
    font-size: 10px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);

  }
  .shopcart .logo-wrapper .logo .logo-img {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background: url("./shopcart_logo_03.png") center no-repeat;
    background-size: 20px 20px;
  }
  .shopcart .logo-wrapper .logo.highlight .logo-img {
    background: url("./shopcart_logo_height_03.png") center no-repeat;
    background-size: 20px 20px;
  }
  .shopcart .content-left .price {
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    line-height: 24px;
    margin: 12px 0;
    font-weight: 700;
    padding-right: 12px;
    border-right: solid 1px rgba(255, 255, 255, 0.1);
  }
  .shopcart .content-left .desc {
    display: inline-block;
    padding-left: 12px;
    color: rgba(255, 255, 255, 0.4);
    line-height: 48px;
    font-size: 10px;
    font-weight: 400;
  }
  .shopcart .content .content-right {
    flex: 0 0 105px;
    width: 105px;
    background: #2b343c;
    font-size: 12px;
    line-height: 48px;
    text-align: center;
  }
  .shopcart .content .content-right .pay {
    padding: 0 8px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
  }
  .shopcart .content .content-right .pay.no-enough {
    background: #2b343c;
    color: rgba(255, 255, 255, 0.4);
  }
  .shopcart .content .content-right .pay.enough {
    background: #00b43c;
    color: #fff;
  }
</style>
