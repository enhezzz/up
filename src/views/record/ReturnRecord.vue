<template>
  <div class="return-box">
    <SearchBox
      placeholder="按名称关键词搜索"
      @search="search"
    />
    <Swiper class="return-list">
      <template v-slot:options>
        <div class="options">
          <!-- <div
            v-for="(type,index) in data.data"
            :key="type.goods_type"
            :class="['option', {actived: currentIndex == index}]"
            :data-index="index"
            @click="toggleType"
          >{{ type["goods_type_name"] }}</div>-->
          <div
            v-for="(typeData, type, index) in data"
            :key="type"
            class="option"
            :class="['option', {actived: currentIndex == index}]"
            :data-index="index"
            @click="toggleType"
          >
            {{ type === "return_list"?"已归还" : "未归还" }}
          </div>
        </div>
      </template>
      <template v-slot:sliderBox>
        <div
          class="slider-box"
          :style="{width: totalTypeNum === 0? '100%':`${totalTypeNum*100}%`,transform: totalTypeNum === 0? 'translateX(0)':`translateX(${-currentIndex*(100/totalTypeNum)}%)`}"
        >
          <template v-if="totalTypeNum === 0">
            <Nothing />
          </template>
          <div
            v-for="(type,typeId) in data"
            :key="typeId"
            class="swiper-item"
            :style="{width: `${100/totalTypeNum}%`}"
          >
            <div class="list">
              <template v-if="type.length === 0">
                <Nothing />
              </template>
              <!-- <div class="nothing" v-if="type.length === 0">
                <div>
                  <div class="icon"></div>
                  <div class="tips">没有相关信息鸭(●ˇ∀ˇ●)</div>
                </div>
              </div>-->
              <template v-for="item in type">
                <ReturnItem
                  :key="item.lent_info_id"
                  :type="typeId"
                  :list-item="item"
                  @returns="_returns"
                />
              </template>
            </div>
          </div>
        </div>
      </template>
    </Swiper>
    <div :class="['mask',{actived: maskActived}]">
      <!-- <div class="filter"/> -->
      <div class="msg-box">
        <div class="title">
          感谢您能及时归还，欢迎下次再借:)
        </div>
        <div class="options">
          <div
            class="option ok"
            @click="ok"
          >
            好的
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchBox from '../../components/SearchBox.vue'
import Swiper from '../../components/swiper/Swiper.vue'
import ReturnItem from '../../components/swiper/ReturnItem.vue'
import { getLentInfo, returnGoods } from '../../utils/request.js'
import Nothing from '../../components/Nothing.vue'
export default {
  name: 'GoodsRecord',
  components: {
    SearchBox,
    Swiper,
    ReturnItem,
    Nothing
  },
  data () {
    return {
      originData: {
        // return_list: [
        //   {
        //     goods_name: 'asda',
        //     goods_id: 1,
        //     img_path: '',
        //     floor_name: '25F',
        //     lent_time: '2015-09-29',
        //     return_time: '2015-09-29',
        //     lent_info_id: 26
        //   },
        //   {
        //     goods_name: '天堂',
        //     goods_id: 2,
        //     img_path: '',
        //     floor_name: '25F',
        //     lent_time: '2015-09-29',
        //     return_time: '2015-09-29',
        //     lent_info_id: 26
        //   },
        //   {
        //     goods_name: '伞',
        //     goods_id: 3,
        //     img_path: '',
        //     floor_name: '25F',
        //     lent_time: '2015-09-29',
        //     return_time: '2015-09-29',
        //     lent_info_id: 26
        //   }
        // ],
        // noreturn_list: [
        //   {
        //     goods_name: '天堂',
        //     goods_id: 2,
        //     img_path: '',
        //     floor_name: '25F',
        //     lent_time: '2015-09-29',
        //     return_time: '2015-09-29',
        //     lent_info_id: 26
        //   },
        //   {
        //     goods_name: '伞',
        //     goods_id: 3,
        //     img_path: '',
        //     floor_name: '25F',
        //     lent_time: '2015-09-29',
        //     return_time: '2015-09-29',
        //     lent_info_id: 26
        //   }
        // ]
      },
      data: {},
      currentIndex: 0,
      maskActived: false,
      currentGoodId: null,
      currentLentInfoId: null
    }
  },
  computed: {
    totalTypeNum () {
      return Object.keys(this.data).length
    }
  },
  async created () {
    this.init()
  },
  methods: {
    async init () {
      this.$loading.start()
      let response = await getLentInfo({
        lent_code: this.$store.state.workCode,
        assets_id: this.$route.query.assets_id,
        is_return: 3
      })
      if (response.data.state === 0) {
        this.originData = response.data.data.data
        this.data = JSON.parse(JSON.stringify(response.data.data.data))
      } else {
        this.$notify({
          message: response.data.msg,
          duration: 100,
          status: 'danger'
        })
      }
      this.$loading.close()
    },
    toggleType (e) {
      let index = e.target.dataset['index']
      this.currentIndex = index
    },
    _returns (borrowInfo) {
      this.maskActived = true
      this.currentGoodId = borrowInfo.goods_id
      this.currentLentInfoId = borrowInfo.lent_info_id
    },
    async ok () {
      this.maskActived = false
      this.$loading.start()
      let response = await returnGoods({
        goods_id: this.currentGoodId,
        lent_info_id: this.currentLentInfoId
      })
      this.$loading.close()
      if (response.data.state === 0) {
        this.$notify({
          message: response.data.msg,
          duration: 100
        })
      } else {
        this.$notify({
          message: response.data.msg,
          dutation: 100,
          status: 'danger'
        })
      }
      this.init()
    },
    search (keyword) {
      let _k = keyword.trim()
      this.currentIndex = 0
      if (_k === '') {
        this.data = JSON.parse(JSON.stringify(this.originData))
        return
      }
      let temp = {}
      Object.keys(this.originData).forEach(key => {
        temp[key] = this.originData[key].filter(item => {
          return item.goods_name.indexOf(_k) !== -1
        })
      })
      Object.keys(temp).forEach(key => {
        if (Array.isArray(temp[key]) && temp[key].length === 0) delete temp[key]
      })
      this.data = temp
    }
  }
}
</script>
<style lang="scss" scoped>
.return-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  padding-top: 20px;
  .return-list {
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
