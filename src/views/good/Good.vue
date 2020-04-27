<template>
  <div class="book">
    <SearchBox
      placeholder="搜索物品名称"
      :class="{s: !haveType}"
      @search="search"
    />
    <!-- 无类型 -->
    <Swiper
      v-if="!haveType"
      class="book-list"
    >
      <!-- <template v-slot:options>
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
      </template>-->
      <template v-slot:sliderBox>
        <div class="slider-box">
          <div class="swiper-item">
            <div class="list">
              <div class="list-inner">
                <Nothing v-show="isNothing" />
                <template v-for="item in data">
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
        </div>
      </template>
    </Swiper>
    <!-- 有类型 -->
    <Swiper
      v-if="haveType"
      class="book-list"
    >
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
          :style="{width: data.total ===0? '100%': `${data.total*100}%`,transform: data.total === 0? 'translateX(0)': `translateX(${-currentIndex*(100/data.total)}%)`}"
        >
          <Nothing v-show="data.total === 0" />
          <div
            v-for="(type) in data.data"
            :key="type.goods_type"
            class="swiper-item"
            :style="{width: `${100/(data.total)}%`}"
          >
            <div class="list">
              <div class="list-inner">
                <Nothing v-show="isNothing" />
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
import Nothing from '../../components/Nothing.vue'
import {
  receiveGoods,
  getGoodsListByAssets
} from '../../utils/request.js'
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
      originData: [],
      data: [],
      currentIndex: 0,
      maskActived: false,
      haveType: true
    }
  },
  computed: {
    isNothing () {
      return this.data.length === 0
    }
  },
  created () {
    // this.data = JSON.parse(JSON.stringify(this.originData))
    this.init('加载中')
  },
  methods: {
    async init (tip) {
      this.$loading.start(tip)
      let response = await getGoodsListByAssets({
        assets_id: 5,
        // floor_name: this.$store.state.floorName,
        has_stock: true
      })
      if (
        response.data.data.total === 1 &&
        response.data.data.data[0].goods_type === -1
      ) {
        this.haveType = false
        let arr = response.data.data.data[0].data
        if (response.data.state === 0) {
          this.originData = arr
          this.data = JSON.parse(JSON.stringify(arr))
        } else {
          this.$notify({
            message: response.data.msg,
            duration: 100,
            status: 'danger'
          })
        }
        this.$loading.close()
      } else {
        this.haveType = true
        this.originData = response.data.data
        this.originData.data = [...this.originData.data].reverse()
        this.data = JSON.parse(JSON.stringify(this.originData))
        this.$loading.close()
      }
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
      if (_k === '') {
        this.currentIndex = 0
        this.init('数据重新加载中 ')
        // this.data = [...this.originData];
        return
      }
      if (!this.haveType) {
        this.data = this.originData.filter(item => {
          return item.goods_name.indexOf(_k) !== -1
        })
      } else {
        let data = this.originData.data
          .filter(type => {
            return (
              type.data.find(item => {
                return item.goods_name.indexOf(_k) !== -1 // 筛选条件
              }) !== undefined
            )
          })
          .map(type => {
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
      }
    },
    _isExceed (goodInfo) {
      if (!this.haveType) {
        let temp = this.data.find(item => {
          return `${item.goods_id}` === goodInfo.goods_id
        })

        return (
          this.$store.state.cart.c[goodInfo.goods_id]['num'] >=
          temp.remaining_stock
        )
      } else {
        let temp = this.data.data
          .find(type => {
            return (
              type.data.find(item => {
                return `${item.goods_id}` === goodInfo.goods_id
              }) !== undefined
            )
          })
          .data.find(item => {
            return `${item.goods_id}` === goodInfo.goods_id
          })

        return (
          this.$store.state.cart.c[goodInfo.goods_id]['num'] >=
          temp.remaining_stock
        )
      }
    },
    add (goodInfo) {
      if (this._isExceed(goodInfo)) return
      this.$store.commit('cart/add', goodInfo)
    },
    async ok () {
      this.maskActived = false
      let goodsId = Object.keys(this.$store.state.cart.c).join(',')
      let lentCount = Object.keys(this.$store.state.cart.c)
        .map(code => {
          return this.$store.state.cart.c[code]['num']
        })
        .join(',')
      if (goodsId === '' || lentCount === '') {
        this.$notify({
          message: '你还没有选呢U•ェ•*U',
          duration: 100,
          status: 'danger'
        })
        return
      }
      this.$loading.start('处理中')
      let response = await receiveGoods({
        goods_id: goodsId,
        lent_count: lentCount,
        lent_name: this.$store.state.username,
        lent_code: this.$store.state.workCode
      })
      if (response.data.state === 0) {
        this.$notify({
          message: response.data.msg,
          duration: 100
        })
        this.$router.push('/me/record/goods')
      } else {
        this.$notify({
          message: response.data.msg,
          duration: 100,
          status: 'danger'
        })
      }
      this.$loading.close()
      // this.originData.data.find(item=> {
      //   item.data.find()
      // })
      this.$store.commit('cart/clear')
      this.init('数据重新加载中')
    }
  }
}
</script>
<style lang="less" scoped>
.book {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  padding-top: 20px;
  .book-list {
    flex: 1;
    .list {
      padding-bottom: 118px;
    }
  }
  .s {
    margin-bottom: 30px;
  }
  .c {
    position: fixed;
    bottom: 0;
    z-index: 66;
  }
  .mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba( 0,0,0 , 0.6);
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
  }
}
</style>
