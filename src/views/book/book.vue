<template>
  <div class="book">
    <SearchBox
      placeholder="搜索书本名称"
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
                <BorrowItem
                  v-for="item in type.data"
                  :key="item.goods_id"
                  :list-item="item"
                  @borrow="_borrow"
                />
              </div>
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
    <div :class="['mask',{actived: maskActived}]">
      <!-- <div class="filter"/> -->
      <div class="msg-box">
        <div class="title">
          请于{{ returnTime }}天内归还:)
        </div>
        <div class="options">
          <div
            class="option cancel"
            @click="cancel"
          >
            取消
          </div>
          <div
            class="option borrow"
            @click="borrow"
          >
            借用
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchBox from '../../components/SearchBox.vue'
import Swiper from '../../components/swiper/Swiper.vue'
import BorrowItem from '../../components/swiper/BorrowItem.vue'
import Nothing from '../../components/Nothing.vue'
import { borrowGoods, getGoodsListByAssets } from '../../utils/request.js'
export default {
  name: 'Book',
  components: {
    Swiper,
    SearchBox,
    BorrowItem,
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
      maskActived: false,
      currentGoodId: undefined,
      returnTime: 0,
      from: '',
      name: ''
    }
  },
  beforeRouteLeave (to, from, next) {
    localStorage.bookData = JSON.stringify(this.data)
    localStorage.bookOriginData = JSON.stringify(this.originData)
    if (to.path === '/') { localStorage.removeItem('searchKeyword') }
    next()
  },
  created () {
    // this.data = JSON.parse(JSON.stringify(this.originData))
    let from = localStorage.from
    if (from === '/') { this.init('加载中') } else {
      this.data = JSON.parse(localStorage.bookData)
      this.originData = JSON.parse(localStorage.bookOriginData)
    }
  },
  methods: {
    async init (tip) {
      this.$loading.start(tip)
      let response = await getGoodsListByAssets({
        assets_id: 2
        // floor_name: this.$store.state.floorName,
        // has_stock: false,
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
    _borrow (borrowInfo) {
      this.returnTime = borrowInfo.returnTime
      this.currentGoodId = borrowInfo.goodId
      this.maskActived = true
    },
    async borrow () {
      // borrowGoods
      this.$loading.start('处理中')
      this.maskActived = false
      let response = await borrowGoods({
        goods_id: this.currentGoodId,
        lent_name: this.$store.state.username,
        lent_code: this.$store.state.workCode,
        lent_count: 1
      })
      if (response.data.state === 0) {
        this.$notify({
          message: response.data.msg,
          duration: 100
        })
        this.$router.push('/me/record/borrow?assets_id=2')
      } else {
        this.$notify({
          message: response.data.msg,
          duration: 100,
          status: 'danger'
        })
      }
      this.$loading.close()
      this.init('数据重新加载中 ')
    },
    cancel () {
      this.maskActived = false
    },
    search (keyword) {
      let _k = keyword.trim()
      localStorage.searchKeyword = _k
      this.currentIndex = 0
      if (_k === '') {
        // this.$loading.start("加载中");
        // this.data = JSON.parse(JSON.stringify(this.originData));
        // this.$nextTick(()=> {
        //   this.$loading.close();
        // })
        this.init('数据重新加载中 ')
        return
      }
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
  }
}
</script>
<style lang="less" scoped>
.book {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  padding-top: 30px;
  .book-list {
    flex: 1;
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
        color: rgb(51, 51, 51);
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
            color: rgb(0, 135 , 204);
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
