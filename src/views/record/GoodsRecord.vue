<template>
  <div class="good-record-box">
    <SearchBox
      class="s"
      placeholder="按名称关键词搜索"
      @search="search"
    />
    <Swiper class="good-record-list">
      <template v-slot:sliderBox>
        <div class="slider-box">
          <div class="swiper-item">
            <div class="list">
              <template v-if="data.length === 0">
                <Nothing />
              </template>
              <template v-for="item in data">
                <GoodRecordItem
                  :key="item.lent_info_id"
                  :list-item="item"
                />
              </template>
            </div>
          </div>
        </div>
      </template>
    </Swiper>
  </div>
</template>
<script>
import SearchBox from "../../components/SearchBox.vue";
import Swiper from "../../components/swiper/Swiper.vue";
import ReturnItem from "../../components/swiper/ReturnItem.vue";
import GoodRecordItem from "../../components/swiper/GoodRocordItem.vue"
import { get_lent_info } from "../../utils/request.js";
import Nothing from "../../components/Nothing.vue";
export default {
  name: "GoodsRecord",
  components: {
    SearchBox,
    Swiper,
    Nothing,
    GoodRecordItem
  },
  data() {
    return {
      originData: [],
      data: [],
      currentIndex: 0,
      maskActived: false,
      currentGoodId: undefined
    };
  },
  async created() {
    this.$loading.start();
    let response = await get_lent_info({
      lent_code: this.$store.state.workCode,
      assets_id: 5,
      is_return: 2
    });
    if (response.data.state === 0) {
      this.originData = response.data.data.data.noreturn_list;
      this.data = JSON.parse(JSON.stringify(response.data.data.data.noreturn_list));
    } else {
      this.$notify({
        message: response.data.msg,
        duration: 100,
        status: "danger"
      });
    }
    this.$loading.close();
  },

  methods: {
    search(keyword) {
      let _k = keyword.trim();
      this.currentIndex = 0;
      if (_k === "") {
        this.data = JSON.parse(JSON.stringify(this.originData));
        return;
      }
     
      this.data = this.originData.filter(item=> {
        return item.goods_name.indexOf(_k) !== -1
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.good-record-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  padding-top: 20px;
  .s {
    margin-bottom: 30px;
  }
  .good-record-list {
    flex: 1;
  }
  .mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0.6;
    transition: all 0.4s;
    filter: blur(1.9vw);
    &.actived {
      z-index: 1;
      opacity: 1;
      filter: blur(0);
    }
    // .filter {
    //   position: absolute;
    //   width: 100%;
    //   height: 100%;
    //   z-index: 0;
    //   filter: blur(1vw)
    // }
    .msg-box {
      position: absolute;
      z-index: 1;
      background: #fff;
      border-radius: 1vw;
      width: 590px;
      height: 240px;
      display: flex;
      flex-direction: column;
      .title {
        height: 151px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $assist-grey;
        font-size: 30px;
        border-bottom: 1px solid rgb(224, 224, 224);
      }
      .options {
        flex: 1;
        display: flex;
        .option {
          height: 100%;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          &:not(:last-child) {
            border-right: 1px solid rgb(224, 224, 224);
          }
          &.ok {
            color: $assist-deep-blue;
          }
        }
      }
    }
  }
}
</style>
