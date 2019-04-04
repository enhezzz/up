<template>
  <div class="home">
    <div class="main">
      <div class="notification">
        <!-- <span v-html="notification"></span> -->
        <Notification :notifications="notifications" />
      </div>
      <div class="entry">
        <router-link
          class="item material"
          to="/good"
          tag="div"
        >
          <span>物品领取</span>
        </router-link>
        <router-link
          class="item book"
          to="/book"
          tag="div"
        >
          <span>共享图书</span>
        </router-link>
        <router-link
          class="item umbrella"
          to="/umbrella"
          tag="div"
        >
          <span>共享雨伞</span>
        </router-link>
      </div>
    </div>
    <BottomNav />
  </div>
</template>

<script>
// @ is an alias to /src
import BottomNav from '../components/BottomNav.vue'
import Notification from "../components/Notification.vue"
import {get_publish_announce} from "../utils/request.js"
export default {
  name: 'Home',
  components: {
    BottomNav,
    Notification
  },
  data() {
    return {
      notifications: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      // this.$loading.start()
      let response =  await get_publish_announce()
      this.notifications = response.data.data.data
      // this.$loading.close()
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .main {
    &::before {
      content: "";
      display: table;
      padding-top: 0.01px;
    }
    text-align: left;
    flex: 1;
    @include bg-image("../assets/index/bg_home");
    // background: #f5f5f5 url("../assets/index/bg_home@3x.png") center no-repeat;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 92% 95.4%;
    .notification {
      position: relative;
      padding: 0 3vw;
      line-height: 4vh;
      margin: 5.5vh 12vw 2vh 19vw;
      height: 9vh;
      line-height: 48px;
      font-size: 30px;
      overflow: hidden;
    }
  }
  .entry {
    position: relative;
    z-index: 1;
    margin: 0 11vw 0 7vw;
    height: 69vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 9vh 0;
    .item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      // width: 80%;
      margin: 0 8vw 0 10vw;
      // margin: 0 auto;
      // width: 520px;
      height: 98px;
      background: rgb(118, 209, 230);
      border: 4px solid rgb(51, 51, 51);
      border-radius: 6px;
      span {
        -webkit-text-stroke: 1px #333;
        // text-shadow:#333 2px 0 0,#333 0 2px 0,#333 -2px 0 0,#333 0 -2px 0;
        color: rgb(255, 201, 31);
        font-size: 48px;
        line-height: 86px;
        font-weight: 700;
        letter-spacing: 5px;
      }
      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0.7vh;
        left: -2.2vw;
        z-index: -1;
        background: rgb(0, 135, 204);
        border: 4px solid rgb(51, 51, 51);
        border-radius: 6px;
      }
      &::before {
        content: '';
        top: -39px;
        left: -30px;
        position: absolute;
        background-size: contain;
        background-repeat: no-repeat;
        width: 80px;
        height: 80px;
      }
      &.material {
        &::before {
          @include bg-image('../assets/index/pen');
        }
      }
      &.book {
        &::before {
          @include bg-image('../assets/index/book');
        }
      }
      &.umbrella {
        &::before {
          @include bg-image('../assets/index/umbrella');
        }
        margin-bottom: .7vh
      }
    }
  }
}
</style>
