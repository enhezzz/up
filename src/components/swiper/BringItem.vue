<template>
  <div class="list-item">
    <div
      class="material-icon"
      :style="{backgroundImage: `url(${listItem.img_path})`}"
    />
    <div class="material-info">
      <div class="item name">
        <span>{{ listItem.goods_name }}</span>
      </div>
      <div class="item stats">
        <div class="num">
          剩余：{{ listItem.remaining_stock }}
        </div>
        <!-- <div class="location">
            ({{ listItem.floorLocation }}F)
          </div> -->
      </div>
    </div>
    <div class="material-options">
      <div
        v-show="isShow"
        class="item sub"
        @click="sub"
      />
      <div
        v-show="isShow"
        class="num"
      >
        <span>{{ sum }}</span>
      </div>
      <div
        class="item add"
        @click="add"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'BorrowItem',
  props: {
    listItem: {
      type: Object,
      required: true
    }
  },
  computed: {
    sum () {
      return this.$store.state.cart.c[this.listItem.goods_id]
        ? this.$store.state.cart.c[this.listItem.goods_id]['num']
        : 0
    },
    isShow () {
      return this.$store.state.cart.c[this.listItem.goods_id] !== undefined
    },
    isExceed () {
      if (!this.$store.state.cart.c[this.listItem.goods_id]) return false
      return this.$store.state.cart.c[this.listItem.goods_id]['num'] >= this.listItem.remaining_stock
    }
  },
  methods: {
    add (e) {
      // this.$emit("add", {
      //     goods_id: listItem.goods_id,
      //     goods_name: listItem.goods_name
      // })
      if (this.isExceed) return
      let target = e.target
      let cart = document.querySelector('.cart-icon')
      let left = target.getBoundingClientRect().left
      let top = target.getBoundingClientRect().top
      let cartLeft = cart.getBoundingClientRect().left
      let cartTop = cart.getBoundingClientRect().top
      let ballParent = document.createElement('div')
      function transitionendListener () {
        ballParent.removeEventListener('transitionend', transitionendListener)
        ballParent.parentNode.removeChild(ballParent)
      }
      ballParent.addEventListener('transitionend', transitionendListener)
      ballParent.classList.add('ballParent')
      let ball = document.createElement('div')
      ball.classList.add('ball')
      ballParent.appendChild(ball)
      target.appendChild(ballParent)
      let parentHorizontal = left - cartLeft
      let ballVertical = cartTop - top
      ballParent.style.zIndex = 111
      setTimeout(() => {
        ballParent.style.transform = `translateX(${-parentHorizontal}px)`
        ball.style.transform = `translateY(${ballVertical}px) scale(.4)`
      }, 100)
      this.$store.commit('cart/add', {
        goods_id: this.listItem.goods_id,
        goods_name: this.listItem.goods_name
      })
    },
    sub () {
      if (!this.$store.state.cart.c[this.listItem.goods_id]) return
      this.$store.commit('cart/sub', {
        goods_id: this.listItem.goods_id,
        goods_name: this.listItem.goods_name
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  height: 100%;
  .list-item {
    text-align: left;
    display: flex;
    align-items: center;
    width: 100%;
    background: $assist-deep-blue;
    border-radius: 1vw;
    border: 0.4vw solid rgb(51, 51, 51);
    padding: 24px;
    margin-bottom: 1.5vh;
    .material-icon {
      display: inline-block;
      height: 160px;
      width: 160px;
      vertical-align: middle;
      margin-right: 15px;
      background: #fff;
      background-size: cover;
      border-radius: 6px;
      border: 1px solid rgb(51, 51, 51);
      @include bg-image("../../assets/defaultImg");
      background-repeat: no-repeat;
    }
    .material-info {
      flex: 1;
      display: inline-flex;
      height: 160px;
      vertical-align: middle;
      flex-direction: column;
      justify-content: space-around;
      color: rgb(245, 245, 245);
      font-size: 30px;
      line-height: 36px;
      .item {
        // height: 40%;
        display: flex;
        align-items: center;
      }
    }
    .material-options {
      height: 160px;
      //   display: inline-flex;
      //   flex-direction: column;
      //   justify-content: space-around;
      //   vertical-align: middle;
      &:before {
        content: "";
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      .item {
        // height: 40%;
        width: 42px;
        height: 42px;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        border-radius: 50%;
        vertical-align: middle;
        &.sub {
          @include bg-image("../../assets/good/icon_js");
          margin-right: 23px;
        }
        &.add {
          @include bg-image("../../assets/good/icon_tj");
          margin-left: 23px;
          position: relative;
          &/deep/ .ballParent {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: -1;
            transform: translateX(0);
            transition: all ease-out 0.4s;
            .ball {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: $master-deep-orange;
              position: absolute;
              transform: translateY(0) scale(1);
              transition: all ease-in 0.4s;
            }
          }
        }
      }
      .num {
        display: inline-block;
        vertical-align: middle;
        font-size: 30px;
        line-height: 30px;
        color: #fff;
      }
    }
  }
}
</style>
