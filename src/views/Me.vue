<template>
  <div class="about">
    <div class="banner">
      <!-- <img
        src="../assets/me/bg_wd_top@3x.png"
        alt="banner"
      > -->
      <div class="intro">
        <div class="item name">
          {{ username }}
        </div>
        <div class="item department">
          {{ floorName }}·{{ department }}
        </div>
      </div>
    </div>
    <div class="main">
      <div class="item">
        <div class="icon-id goods" />
        <router-link
          class="msg-nav"
          to="/me/record/goods"
          tag="div"
        >
          <div class="nav-container">
            <div class="title">
              物品领取记录
            </div>
            <div class="arrow">
              <img
                src="../assets/me/icon_next@3x.png"
                alt
              >
            </div>
          </div>
        </router-link>
      </div>
      <div class="item">
        <div class="icon-id books" />
        <router-link
          class="msg-nav"
          to="/me/record/borrow?assets_id=2"
          tag="div"
        >
          <div class="nav-container">
            <div class="title">
              图书借取记录
            </div>
            <div class="arrow">
              <img
                src="../assets/me/icon_next@3x.png"
                alt
              >
            </div>
          </div>
        </router-link>
      </div>
      <div class="item">
        <div class="icon-id umbrellas" />
        <router-link
          class="msg-nav"
          to="/me/record/borrow?assets_id=1"
          tag="div"
        >
          <div class="nav-container">
            <div class="title">
              雨伞借取记录
            </div>
            <div class="arrow">
              <img
                src="../assets/me/icon_next@3x.png"
                alt
              >
            </div>
          </div>
        </router-link>
      </div>
      <!-- <div class="item">
        <div class="icon-id">
          <img
            src="../assets/me/icon_money@3x.png"
            alt
          >
        </div>
        <div class="msg-nav">
          <div class="title">
            我的资产
          </div>
          <div class="arrow">
            <img
              src="../assets/me/icon_next@3x.png"
              alt
            >
          </div>
        </div>
      </div> -->
    </div>
    <BottomNav />
  </div>
</template>
<script>
import BottomNav from '../components/BottomNav.vue'
export default {
  name: 'Me',
  components: {
    BottomNav
  },
  computed: {
    username () {
      return this.$store.state.username
    },
    department () {
      return this.$store.state.department
    },
    floorName () {
      return this.$store.state.floorName
    }
  }
}
</script>
<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .banner {
    font-size: 0;
    position: relative;
    height: 180px;
    @include bg-image("../assets/me/bg_wd_top");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    flex-shrink: 0;
    .intro {
      position: absolute;
      top: 4.6vw;
      left: 23.8vw;
      width: 36.1vw;
      height: 14.8vw;
      font-size: 16px;
      text-align: left;
      // padding: 0 3vw;
      padding: 24px 0 24px 24px;
      color: $assist-grey;
      .item {
        &.name {
          // line-height: 11vw;
          line-height: 43px;
          font-size: 36px
          // font-size: 6vw;
        }
        &.department {
          // line-height: 2vw;
          line-height: 43px;
          font-size: 24px
          // font-size: 3vw;
        }
      }
    }
  }
  .main {
    flex: 1;
    padding: 9vh 16vw 7vh 10vw;
    background: #f5f5f5 url("../assets/me/bg_wd@3x.png") center no-repeat;
    background-size: 95% 97%;
    .item {
      display: flex;
      margin-bottom: 32px;
      .icon-id {
        font-size: 0;
        // height: 7.66667vw;
        // width: 7.66667vw;
        height: 40px;
        width: 40px;
        margin-right: 16px;
        &.goods {
          @include bg-image("../assets/me/icon_pencil");
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
        &.books {
          @include bg-image("../assets/me/icon_book");
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
        &.umbrellas {
          @include bg-image("../assets/me/icon_umbrella");
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
      }
      .msg-nav {
        flex: 1;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 32px;
        border-bottom: 2px solid #333333;
        .nav-container {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          .title {
            font-size: 26px;
            line-height: 29px;
            color: rgb(51,51,51);
            font-weight: 600;
          }
          .arrow {
            font-size: 0;
            img {
              height: 4vw;
            }
          }
        }
      }
    }
  }
}
</style>
