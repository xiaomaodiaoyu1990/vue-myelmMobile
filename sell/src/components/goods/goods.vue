<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" @click="selectMenu(index, $event)" :class="{'current':currentIndex===index}">
          <span class="text">
            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="sell-count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now-price">¥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old-price">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart.vue'
  const ERR_OK = 0;
  export default {
    data () {
        return {
          goods: [],
          listHeight: [],
          scrollY: 0
        }
    },
    components: {
      shopcart
    },
    props: {
      seller: {
        type: Object
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let preHeight = this.listHeight[i];
          let nexHeight = this.listHeight[i + 1];
          if (!nexHeight || (this.scrollY >= preHeight && this.scrollY < nexHeight)) {
            return i;
          }
        }
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        if(res.errno == ERR_OK) {
          this.goods = res.data;
          this.$nextTick(function() {
            this._initScroll();
            this._calculateHeight();
          })
        }
      })
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodList.length; i++) {
          height = height + foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu (index, event) {
        if(!event._constructed) { // pc端自身的点击事件
          return
        }
        this.scrollY = this.listHeight[index];
        this.foodsScroll.scrollTo(0, -this.scrollY, 300)
      }
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
    overflow: hidden;
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
  .goods .menu-wrapper .menu-item.current {
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background-color: #fff;
    font-weight: 700;
  }
  .goods .menu-wrapper .menu-item.current .text {
    border-bottom: none;
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
  .foods-wrapper .food-item {
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    border-bottom: solid 1px rgba(7, 17, 27, 0.1);
  }
  .foods-wrapper .food-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  .foods-wrapper .food-item .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .foods-wrapper .food-item .content {
    flex: 1;
    padding-top: 2px;
  }
  .foods-wrapper .food-item .content .name {
    font-size: 14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    padding-bottom: 8px;
  }
  .foods-wrapper .food-item .content .desc {
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 12px;
    padding-bottom: 8px;
  }
  .foods-wrapper .food-item .content .extra {
    font-size: 0px;
    color: rgb(147, 153, 159);
    line-height: 10px;
    padding-bottom: 8px;
  }
  .foods-wrapper .food-item .content .extra>* {
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
  }
  .foods-wrapper .food-item .content .extra .sell-count {
    margin-right: 12px;
  }
  .foods-wrapper .food-item .content .price {
    font-size: 0;
  }
  .foods-wrapper .food-item .content .price .now-price {
    display: inline-block;
    font-size: 14px;
    color: rgb(240, 20, 20);
    font-weight: 700;
    line-height: 24px;
    margin-right: 8px;
  }
  .foods-wrapper .food-item .content .price .old-price {
    display: inline-block;
    font-size: 10px;
    color: rgb(147, 153, 159);
    font-weight: 700;
    line-height: 24px;
  }
</style>
