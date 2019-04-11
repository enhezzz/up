<template>
  <div class="book">
    <SearchBox
      placeholder="搜索物品名称"
      @search="search"
    />
    <Swiper class="book-list">
      <template v-slot:options>
        <div class="options">
          <div
            v-for="(type,index) in data.data"
            :key="type.goods_type"
            :class="['option', {actived: currentIndex == index}]"
            :data-index="index"
            @click="toggleType"
          >
            {{ type["goods_type_name"] }}
          </div>
        </div>
      </template>
      <template v-slot:sliderBox>
        <div
          class="slider-box"
          :style="{width: data.total === 0? '100%': `${data.total*100}%`,transform: data.total === 0?'translateX(0)': `translateX(${-currentIndex*(100/data.total)}%)`}"
        >
          <Nothing v-show="data.total === 0" />
        
          <div
            v-for="(type) in data.data"
            :key="type.goods_type"
            class="swiper-item"
            :style="{width: `${100/(data.total)}%`}"
          >
            <div class="list">
              <template v-for="item in type.data">
                <BringItem
                  :key="item.goods_id"
                  :list-item="item"
                  @mask="mask"
                  @borrow="borrow"
                />
              </template>
            </div>
          </div>
        </div>
      </template>
    </Swiper>
    <Cart
      class="c"
      :popuped="maskActived"
      @popupItems="popupItems"
      @clear="clearMask"
      @add="add"
      @ok="ok"
    />
    <div
      :class="['mask',{actived: maskActived}]"
      @click="clearMask"
    />
  </div>
</template>
<script>
import SearchBox from '../../components/SearchBox.vue'
import Swiper from '../../components/swiper/Swiper.vue'
// import BorrowItem from '../../components/swiper/BorrowItem.vue'
import BringItem from '../../components/swiper/BringItem.vue'
import Cart from '../../components/Cart.vue'
import Nothing from "../../components/Nothing.vue"
import { receive_goods,get_goods_list_by_assets } from '../../utils/request.js'
export default {
  name: 'Book',
  components: {
    Swiper,
    SearchBox,
    BringItem,
    Cart,
    Nothing
  },
  data () {
    return {
      originData: {
        data: [
          {
            data: [
              {
                type_id: 2,
                goods_id: 81,
                floor_id: 1,
                remaining_stock: 2,
                floor_name: '25F',
                goods_name: '美术入门',
                goods_code: 'MS002',
                return_time: 5,
                img_path: null,
                goods_type: 3,
                goods_type_name: '美术'
              }
            ],
            goods_type: 3,
            goods_type_name: '美术'
          },
          {
            data: [
              {
                type_id: 2,
                goods_id: 2,
                floor_id: 2,
                remaining_stock: 9,
                floor_name: '2F',
                goods_name: '水浒传',
                goods_code: 'TS_ZH_001',
                return_time: 5,
                img_path: '',
                goods_type: 4,
                goods_type_name: '综合类'
              },
              {
                type_id: 2,
                goods_id: 16,
                floor_id: 2,
                remaining_stock: 9,
                floor_name: '2F',
                goods_name: '西游记',
                goods_code: 'TS_ZH_003',
                return_time: 5,
                img_path: null,
                goods_type: 4,
                goods_type_name: '综合类'
              },
              {
                type_id: 2,
                goods_id: 111,
                floor_id: 2,
                remaining_stock: 9,
                floor_name: '2F',
                goods_name: '记',
                goods_code: 'TS_ZH_003',
                return_time: 5,
                img_path: null,
                goods_type: 4,
                goods_type_name: '综合类'
              },
              {
                type_id: 2,
                goods_id: 12,
                floor_id: 2,
                remaining_stock: 9,
                floor_name: '2F',
                goods_name: '西=',
                goods_code: 'TS_ZH_003',
                return_time: 5,
                img_path: null,
                goods_type: 4,
                goods_type_name: '综合类'
              },
              {
                type_id: 2,
                goods_id: 1211,
                floor_id: 2,
                remaining_stock: 9,
                floor_name: '2F',
                goods_name: '西的撒=',
                goods_code: 'TS_ZH_003',
                return_time: 5,
                img_path: null,
                goods_type: 4,
                goods_type_name: '综合类'
              }
            ],
            goods_type: 4,
            goods_type_name: '综合类'
          }
        ],
        total: 2
      },
      data: {},
      currentIndex: 0,
      maskActived: false
    }
  },
  created () {
    // this.data = JSON.parse(JSON.stringify(this.originData))
    this.init("初始化中")
  },
  methods: {
    async init(tip) {
        this.$loading.start(tip)
    let response = await get_goods_list_by_assets({
      assets_id: 5,
      // floor_name: this.$store.state.floorName,
      has_stock: true,
      // floor: this.$store.state.floorId
    })
    this.originData = response.data.data
    this.data = JSON.parse(JSON.stringify(response.data.data))
    this.$loading.close()
    },
    toggleType (e) {
      let index = e.target.dataset['index']
      this.currentIndex = index
    },
    mask () {
      this.maskActived = true
    },
    borrow (borrowInfo) {
      this.currentGoodId = borrowInfo.goodId
    },
    clearMask () {
      this.maskActived = false
    },
    popupItems () {
      this.maskActived = true
    },
    search (keyword) {
      let _k = keyword.trim()
      this.currentIndex = 0
      if (_k === '') {
        this.data = JSON.parse(JSON.stringify(this.originData))
        return
      }
      let data = this.originData.data.filter(type => {
        return type.data.find(item => {
          return item.goods_name.indexOf(_k) !== -1 // 筛选条件
        }) !== undefined
      }).map(type => {
        return {
          data: type.data.filter(item => {
            return item.goods_name.indexOf(_k) !== -1
          }),
          goods_type: type.goods_type,
          goods_type_name: type.goods_type_name

        }
      })
      this.data = {
        data,
        total: data.length
      }
    },
    _isExceed(goodInfo) {
      let temp = this.data.data.find(type=> {
        return type.data.find(item=> {
          return `${item.goods_id}` === goodInfo.goods_id
        }) !== undefined
      }).data.find(item=> {
        return `${item.goods_id}` === goodInfo.goods_id
      })

      return this.$store.state.cart.c[goodInfo.goods_id]['num'] >= temp.remaining_stock
    },
    add(goodInfo) {
      if(this._isExceed(goodInfo)) return;
      this.$store.commit('cart/add', goodInfo)
    },
    async ok() {
      this.maskActived = false
      let goods_id = Object.keys(this.$store.state.cart.c).join(",")
      let lent_count = Object.keys(this.$store.state.cart.c).map(code=> {
        return this.$store.state.cart.c[code]["num"]
      }).join(",")
      if(goods_id === "" || lent_count === "") {
        this.$notify({
          message: "你还没有选呢U•ェ•*U",
          duration: 100,
          status: "danger"
        })
        return
      }
      this.$loading.start("处理中")
      let response = await receive_goods({
        goods_id,
        lent_count,
        lent_name: this.$store.state.username,
        lent_code: this.$store.state.workCode
      })
      if(response.data.state === 0) {
        this.$notify({
          message: response.data.msg,
          duration: 100
        })
      }else {
        this.$notify({
          message: response.data.msg,
          duration: 100,
          status: "danger"
        })
      }
      this.$loading.close()
      // this.originData.data.find(item=> {
      //   item.data.find()
      // })
      this.$store.commit('cart/clear')
      this.init("数据重新加载中")
    }
  }
}
</script>
<style lang="scss" scoped>
.book {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  padding-top: 20px;
  .book-list {
    flex: 1;
    .list {
      padding-bottom: 118px
    }
  }
  .c {
    position: fixed;
    bottom: 0;
    z-index: 66
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
      filter: blur(0)
    }
  }
}
</style>
