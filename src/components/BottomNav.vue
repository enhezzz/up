<template>
  <div class="bottom-nav">
    <router-link
      class="nav-item"
      to="/"
      tag="div"
    >
      <span :class="['home']">首页</span>
    </router-link>
    <!-- <router-link
      class="nav-item"
      to="/me"
      tag="div"
    >
      <span :class="['me']">我的</span>
    </router-link> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      currActive: 'home'
    }
  }
}
</script>
<style lang="less" scoped>
.bottom-nav {
  position: relative;
  z-index: 1;
  height: 118px;
  border-top: 2px solid rgb(51, 51, 51);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgb(245, 245, 245);
  flex-shrink: 0;
  .nav-item {
    position: relative;
    width: 300px;
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(252, 184, 20);
    border: 1px solid rgb(51, 51, 51);
    border-radius: 6px;
    color: #fff;
    font-size: 30px;
    // text-shadow:#333 2px 0 0,#333 0 2px 0,#333 -2px 0 0,#333 0 -2px 0;
    -webkit-text-stroke: 1px #333;
    font-weight: 900;
    &.router-link-exact-active {
      .home {
        color: rgb(118, 209, 230);

          &::before {
            // @include bg-image('../assets/common/icon_home_sel');
background-image: url('../assets/common/icon_home_sel@2x.png');
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    background-image: url('../assets/common/icon_home_sel@3x.png');
  }
          }

      }
      .me {
        color: rgb(118, 209, 230);

          &::before {
            // @include bg-image('../assets/common/icon_wd_sel');
            background-image: url('../assets/common/icon_wd_sel@2x.png');
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    background-image: url('../assets/common/icon_wd_sel@3x.png');
  }
          }
        }

    }
    span {
      letter-spacing: 3px;
      &::before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        margin-right: 16px;
        width: 34px;
        height: 34px;
        background-size: contain;
        background-repeat: no-repeat;
      }
      &.home {
        &::before {
          // @include bg-image('../assets/common/icon_home');
          background-image: url("../assets/common/icon_home@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    background-image: url("../assets/common/icon_home@3x.png");
  }
        }
        &.active {
          color: rgb(0, 135 , 204);
          &::before {
            // @include bg-image('../assets/common/icon_home_sel');
            background-image: url("../assets/common/icon_home_sel@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    background-image: url("../assets/common/icon_home_sel@3x.png");
  }
          }
        }
      }
      &.me {
        &::before {
          // @include bg-image('../assets/common/icon_wd');
          background-image: url("../assets/common/icon_wd@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    background-image: url("../assets/common/icon_wd@3x.png");
  }
        }
        &.active {
          color: rgb(0, 135 , 204);
          &::before {
            // @include bg-image('../assets/common/icon_wd_sel');
            background-image: url("../assets/common/icon_wd_sel@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    background-image: url("../assets/common/icon_wd_sel@3x.png");
  }
          }
        }
      }
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      z-index: -1;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: rgb(0, 135, 204);
      border: 1px solid rgb(51, 51, 51);
      border-radius: 10px;
    }
  }
  &.router-link-active {

  }
}
</style>
