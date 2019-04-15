<template>
  <div class="umbrella-container">
    <search-box placeholder="搜索雨伞名称" :class="{s: !haveType}" @search="search"/>
    <!-- 无类型 -->
    <Swiper class="umbrella-list" v-if="!haveType">
      <template v-slot:sliderBox>
        <div class="slider-box">
          <div class="swiper-item">
            <div class="list">
              <Nothing v-show="isNothing"/>

              <UmbrellaBorrowItem
                v-for="umbrella in umbrellas"
                :key="umbrella.goods_id"
                :list-item="umbrella"
                @borrow="_borrow"
              />
            </div>
            <!-- <BorrowItem

                :list-item="type.data[0]"
                @mask="mask"
                @borrow="borrow"
            />-->
            <!-- <BorrowItem
                :listItem="type.data[1]"
                @mask="mask"
                @borrow="borrow"
            />-->
          </div>
        </div>
      </template>
    </Swiper>
    <!-- 有类型 -->
    <Swiper class="book-list" v-if="haveType">
      <template v-slot:options>
        <div class="options">
          <div
            v-for="(type,index) in umbrellas.data"
            :key="type.goods_type"
            :class="['option', {actived: currentIndex == index}]"
            :data-index="index"
            @click="toggleType"
          >{{ type["goods_type_name"] }}</div>
        </div>
      </template>
      <template v-slot:sliderBox>
        <div
          class="slider-box"
          :style="{width: umbrellas.total ===0? '100%': `${umbrellas.total*100}%`,transform: umbrellas.total === 0? 'translateX(0)': `translateX(${-currentIndex*(100/umbrellas.total)}%)`}"
        >
          <Nothing v-show="umbrellas.total === 0"/>
          <div
            v-for="(type) in umbrellas.data"
            :key="type.goods_type"
            class="swiper-item"
            :style="{width: `${100/(umbrellas.total)}%`}"
          >
            <div class="list">
              <Nothing v-show="isNothing"/>
              <template v-for="item in type.data">
                <UmbrellaBorrowItem :key="item.goods_id" :list-item="item" @borrow="_borrow"/>
              </template>
            </div>
          </div>
        </div>
      </template>
    </Swiper>
    <div :class="['mask',{actived: maskActived}]">
      <!-- <div class="filter"/> -->
      <div class="msg-box">
        <div class="title">请于{{ returnTime }}天内归还:)</div>
        <div class="options">
          <div class="option cancel" @click="cancel">取消</div>
          <div class="option borrow" @click="borrow">借用</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "components/SearchBox";
import Swiper from "components/swiper/Swiper.vue";
import UmbrellaBorrowItem from "components/swiper/UmbrellaBorrowItem.vue";
import Nothing from "../../components/Nothing.vue";
import { get_goods_list_by_assets, borrow_goods } from "../../utils/request.js";
export default {
  name: "Umbrella",
  components: {
    SearchBox,
    Swiper,
    UmbrellaBorrowItem,
    Nothing
  },
  data() {
    return {
      originUmbrellas: [],
      umbrellas: [],
      maskActived: false,
      currentGoodId: undefined,
      returnTime: 0,
      haveType: false,
      currentIndex: 0,
    };
  },
  computed: {
    isNothing() {
      return this.umbrellas.length === 0;
    }
  },
  created() {
    // this.umbrellas = [...this.originUmbrellas]
    this.init("加载中");
  },
  methods: {
    async init(tip) {
      this.$loading.start(tip);
      let response = await get_goods_list_by_assets({
        assets_id: 1,
        // floor_name: this.$store.state.floorName,
        has_stock: true
        // floor: this.$store.state.floorId
      });
      if (
        response.data.data.total === 1 &&
        response.data.data.data[0].goods_type === -1
      ) {
        this.haveType = false;
        let arr = response.data.data.data[0].data;
        if (response.data.state === 0) {
          this.originUmbrellas = arr;
          this.umbrellas = JSON.parse(JSON.stringify(arr));
        } else {
          this.$notify({
            message: response.data.msg,
            duration: 100,
            status: "danger"
          });
        }

        this.$loading.close();
      } else {
        this.haveType = true;
        this.originUmbrellas = response.data.data;
        this.umbrellas = JSON.parse(JSON.stringify(response.data.data));
        this.$loading.close();
      }
    },
    toggleType(e) {
      let index = e.target.dataset["index"];
      this.currentIndex = index;
    },
    _borrow(borrowInfo) {
      this.maskActived = true;
      this.returnTime = borrowInfo.returnTime;
      this.currentGoodId = borrowInfo.goodId;
    },
    cancel() {
      this.maskActived = false;
    },
    async borrow() {
      this.$loading.start("处理中");
      this.maskActived = false;
      let response = await borrow_goods({
        goods_id: this.currentGoodId,
        lent_name: this.$store.state.username,
        lent_code: this.$store.state.workCode,
        lent_count: 1
      });
      if (response.data.state === 0) {
        this.umbrellas = this.umbrellas
          .map(umbrella => {
            return {
              ...umbrella,
              remaining_stock: umbrella.remaining_stock - 1
            };
          })
          .filter(umbrella => {
            return umbrella.remaining_stock > 0;
          });
        this.$notify({
          message: response.data.msg,
          duration: 100
        });
      } else {
        this.$notify({
          message: response.data.msg,
          duration: 100,
          status: "danger"
        });
      }
      this.$loading.close();
      this.init("数据重新加载中");
    },
    search(keyword) {
      let _k = keyword.trim();
      if (_k === "") {
        this.currentIndex = 0
        this.init("数据重新加载中 ");
        // this.umbrellas = [...this.originUmbrellas];
        return;
      }
      if (!this.haveType) {
        this.umbrellas = this.originUmbrellas.filter(item => {
          return item.goods_name.indexOf(_k) !== -1;
        });
      } else {
        let data = this.originUmbrellas.data
          .filter(type => {
            return (
              type.data.find(item => {
                return item.goods_name.indexOf(_k) !== -1; // 筛选条件
              }) !== undefined
            );
          })
          .map(type => {
            return {
              data: type.data.filter(item => {
                return item.goods_name.indexOf(_k) !== -1;
              }),
              goods_type: type.goods_type,
              goods_type_name: type.goods_type_name
            };
          });
        this.data = {
          data,
          total: data.length
        };
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.umbrella-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  padding-top: 30px;
  .s {
    margin-bottom: 30px;
  }
  .umbrella-list {
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
    filter: blur(6px);
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
          &.borrow {
            color: $assist-deep-blue;
          }
          &.cancel {
            color: rgb(153, 153, 153);
          }
        }
      }
    }
  }
}
</style>
