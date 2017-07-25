<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">-</div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart">+</div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart () {
        if(!this.food.count) {
          Vue.set(this.food, 'count', 1);
          this.food.count = 1;
        } else {
          this.food.count = this.food.count + 1;
        }
        this.$emit('cartadd', event.target);
      },
      decreaseCart () {
        if(this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>
<style>
  .cartcontrol {
    font-size: 0;
  }
  .cartcontrol .cart-decrease {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: solid 2px rgb(0, 160, 220);
    color: rgb(0, 160, 220);
    font-size: 24px;
    line-height: 12px;
    border-radius: 50%;
    text-align: center;
    vertical-align: top;
    /*transition: all 0.3s linear;*/
  }
  .cartcontrol .move-enter-active,
  .cartcontrol .move-leave-active{
    opacity: 1;
    transition: all 0.4s linear;
    /*transform: translate3D(0, 0, 0);*/
  }
  .cartcontrol  .move-enter,
  .cartcontrol  .move-leave {
    opacity: 0;
    transform: translate3D(44px, 0, 0);
  }
  .cartcontrol .cart-count {
    display: inline-block;
    width: 24px;
    font-size: 14px;
    line-height: 20px;
    color: rgb(147, 153, 159);
    text-align: center;
    vertical-align: top;
  }
  .cartcontrol .cart-add {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: rgb(0, 160, 220);
    color: #fff;
    font-size: 22px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    font-weight: 600;
    vertical-align: top;
  }
</style>
