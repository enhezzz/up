<template>
  <div class="cart">
    <div class="main">
      <div
        class="cart-icon"
        @click="popupItems"
      />
      <div class="tip">
        已选{{ sum }}件
      </div>
      <div
        class="ensure"
        @click="ok"
      >
        <span>确认领用</span>
      </div>
    </div>

    <div
      :class="['detail-box', {popuped}]"
    >
      <div class="header">
        <div class="title">
          <div class="line" />
          <span>已选</span>
        </div>
        <div
          class="clear"
          @click="clear"
        >
          <div class="clear-icon" />
          <span>清空</span>
        </div>
      </div>
      <div class="content">
        <div
          v-for="(good,goodKey) in goods"
          :key="goodKey"
          class="item"
        >
          <div class="name">
            <span>{{ good["goods_name"] }}</span>
          </div>
          <div class="mani-plane">
            <div
              class="p sub"
              @click="sub({
                goods_id: goodKey,
                goods_name: good.goods_name
              })"
            />
            <div class="num">
              <span>{{ good["num"] }}</span>
            </div>
            <div
              class="p add"
              @click="add({
                goods_id: goodKey,
                goods_name: good.goods_name
              })"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    popuped: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    sum () {
      return Object.keys(this.$store.state.cart.c).reduce((a, b) => {
        if (this._type(a) === 'number') {
          return a + this.$store.state.cart.c[b]['num']
        }
        return (
          this.$store.state.cart.c[a]['num'] +
          this.$store.state.cart.c[b]['num']
        )
      }, 0)
    },
    goods () {
      return this.$store.state.cart.c
    }
  },
  methods: {
    _type (obj) {
      return Reflect.apply(Object.prototype.toString, obj, [])
        .replace(/^\[object\s(\w+)\]$/, '$1')
        .toLowerCase()
    },
    add (goodInfo) {
      // if (this.isExceed) return
      this.$emit('add', goodInfo)
      // this.$store.commit('cart/add', goodInfo)
    },
    sub (goodInfo) {
      this.$store.commit('cart/sub', goodInfo)
    },
    popupItems () {
      this.$emit('popupItems')
    },
    clear () {
      this.$emit('clear')
      this.$store.commit('cart/clear')
    },
    ok () {
      this.$emit('ok')
    }
  }
}
</script>
<style lang="scss" scoped>
.cart {
  width: 100%;
  .main {
    width: 100%;
    height: 118px;
    display: flex;
    z-index: 66;
    align-items: center;
    border-top: 1px solid $assist-grey;
    color: $assist-grey;
    background: #fff;
    .cart-icon {
      width: 70px;
      height: 70px;
      @include bg-image("../assets/good/icon_gwc");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      margin: 0 30px;
      border-radius: 1vw;
      border: 0.4vw solid rgb(51, 51, 51);
    }
    .tip {
      flex: 1;
      text-align: left;
      font-size: 30px;
      line-height: 43px;
    }
    .ensure {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 180px;
      height: 70px;
      background: $master-light-orange;
      border-radius: 1vw;
      border: 0.4vw solid rgb(51, 51, 51);
      margin-right: 30px;
      font-size: 30px;
      line-height: 43px;
    }
  }
  .detail-box {
    width: 100%;
    position: absolute;
    top: 0;
    z-index: -1;
    transition: transform 0.4s;
    &.popuped {
      transform: translateY(-100%);
    }
    .header {
      display: flex;
      padding: 18px 30px;
      justify-content: space-between;
      align-items: center;
      font-size: 26px;
      line-height: 43px;
      background: rgb(245, 245, 245);
      .title {
        display: flex;
        align-items: center;
        .line {
          margin-right: 10px;
          border-radius: 2px;
          width: 4px;
          height: 20px;
          background: $assist-grey;
        }
      }
      .clear {
        display: flex;
        align-items: center;
        color: rgb(153, 153, 153);
        .clear-icon {
          width: 30px;
          height: 30px;
          @include bg-image("../assets/good/icon_qk");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          margin-right: 10px;
        }
      }
    }
    .content {
      padding: 0 30px 0 34px;
      background: #fff;
      max-height: 60.8vw;
      overflow-y: auto;
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 36px 0;
        .name {
          font-size: 32px;
          line-height: 31px;
        }
        .mani-plane {
          min-height: 100%;
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
          .p {
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
              @include bg-image("../assets/good/icon_js");
              margin-right: 23px;
            }
            &.add {
              @include bg-image("../assets/good/icon_tj");
              margin-left: 23px;
            }
          }
          .num {
            display: inline-block;
            vertical-align: middle;
            font-size: 30px;
            line-height: 30px;
            color: $assist-grey;
          }
        }
      }
    }
  }
}
</style>
