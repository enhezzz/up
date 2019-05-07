<template>
  <div class="book-detail">
    <div class="banner">
      <!-- <img src="../../assets/book/detail/bg_tsxq@3x.png" alt="banner"> -->
      <div class="content-box">
        <div
          class="book-img"
          :style="{backgroundImage: `url(${goods_info.img_path})`}"
        />
        <div class="book-info">
          <div class="name">
            {{ goods_info.goods_code }}-{{ goods_info.goods_name }}
          </div>
          <div class="location">
            所属楼层：{{ goods_info.floor_name }}
          </div>
        </div>
      </div>
    </div>
    <div class="record-list">
      <div class="title">
        <span class="pointer" />
        <span>借阅记录</span>
      </div>
      <div class="content">
        <template v-if="goods_lent_info.length === 0">
          <Nothing />
        </template>
        <div
          v-for="item in goods_lent_info"
          :key="item.lent_info_id"
          class="record"
        >
          <div class="name">
            <span>{{ item.lent_name }}</span>
          </div>
          <div class="date borrow-date">
            <div class="icon-tag">
              借
            </div>

            <span class="date-str">{{ item.lent_time?item.lent_time.slice(0,10): "" }}</span>
          </div>
          <div class="date bring-date">
            <div class="icon-tag">
              还
            </div>

            <span class="date-str">{{ item.return_time?item.return_time.slice(0,10): "" }}</span>
          </div>
        </div>
      </div>
    </div>
    <BottomNav />
  </div>
</template>
<script>
import BottomNav from '../../components/BottomNav.vue'
import Nothing from '../../components/Nothing.vue'
import { getBookDetailInfo } from '../../utils/request.js'
export default {
  components: {
    BottomNav,
    Nothing
  },
  data () {
    return {
      goods_info: {},
      goods_lent_info: []
    }
  },
  async created () {
    this.$loading.start()
    let goodsId = this.$route.query.goods_id
    let response = await getBookDetailInfo(goodsId)
    this.goods_info = response[0].data.data.data
    this.goods_lent_info = response[1].data.data.data
    this.$loading.close()
  }
}
</script>
<style lang="scss" scoped>
.book-detail {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .banner {
    position: relative;
    font-size: 0;
    margin-bottom: 30px;
    @include bg-image("../../assets/book/detail/bg_tsxq");
    // background: url("../../assets/book/detail/bg_tsxq@3x.png") no-repeat;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 190px;
    // img {
    //   width: 100%;
    // }
    .content-box {
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      padding: 3vw 3vw 4vw 3vw;
      .book-img {
        width: 140px;
        background: #fff url("../../assets/book/book.jpg") no-repeat;
        background-size: cover;
        border-radius: 1vw;
        border: 0.3vw solid rgb(51, 51, 51);
        margin-right: 20px;
      }
      .book-info {
        flex: 1;
        font-size: 30px;
        color: $assist-grey;
        font-weight: 600;
        padding-left: 20px;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: $assist-grey;
      }
    }
  }
  .record-list {
    flex: 1;
    text-align: left;
    padding: 0 4vw;
    display: flex;
    flex-direction: column;
    .title {
      display: flex;
      align-items: center;
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 30px;
      .pointer {
        width: 4vw;
        height: 4vw;
        background: url("../../assets/book/detail/icon_jyjl@3x.png") center
          no-repeat;
        background-size: contain;
        margin-right: 10px;
      }
    }
    .content {
      flex: 1;
      overflow-y: auto;
      .record {
      display: flex;
      align-items: center;
      padding: 4vw 30px 4vw 0;
      background: $assist-light-blue;
      font-size: 4.6vw;
      border-radius: 1vw;
        border: 0.3vw solid rgb(51, 51, 51);
        margin-bottom: 24px;
      .name {
        width: 180px;
        font-size: 28px;
        text-align: center;
        color: $assist-grey;
        font-weight: 600;
      }
      .date {
        display: flex;
        align-items: center;
        &.borrow-date {
          margin-right: 44px;
        }
        .icon-tag {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            font-size: 23px;
          width: 42px;
          height: 42px;
          border-radius: 1vw;
          border: 0.3vw solid rgb(51, 51, 51);
          background: $master-deep-orange;
          margin-right: 20px;
        }
        .date-str {
            font-size: 28px;
        }
      }
    }
    }

  }
}
</style>
