<template>
  <div class="list-item">
    <div
      class="material-icon"
      :style="{backgroundImage: listItem.img_path === ''? '' :`url(${listItem.img_path})`}"
    />
    <div class="material-info">
      <div class="item name">
        <span>{{ listItem.goods_name }}</span>
      </div>
      <div class="item stats">
        <div class="num">
          库存:{{ listItem.remaining_stock }}{{ listItem.unit }}
        </div>
        <div class="location">
          楼层:{{ listItem.floor_name }}
        </div>
      </div>
    </div>
    <div class="material-options">
      <div
        class="button borrow"
        @click="borrow"
      >
        借用
      </div>
      <!-- <router-link
          class="button check"
          to="/book/detail"
          tag="div"
        >
          查看
      </router-link>-->
    </div>
  </div>
</template>
<script>
export default {
  name: 'UmbrellaBorrowItem',
  props: {
    listItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    borrow () {
      this.$emit('borrow', {
        goodId: this.listItem.goods_id,
        returnTime: this.listItem.return_time
      })
    }
  }
}
</script>
<style lang="less" scoped>
.list {
  height: 100%;
  .list-item {
    text-align: left;
    display: flex;
    width: 100%;
    align-items: center;
    background: rgb(0, 135 , 204);
    border-radius: 6px;
    border: 1px solid rgb(51, 51, 51);
    padding: 24px;
    margin-bottom: 1.5vh;
    .material-icon {
      display: inline-block;
      height: 160px;
      width: 160px;
      vertical-align: middle;
      margin-right: 2vw;
      background: #fff;
      background-size: cover;
      border-radius: 1vw;
      border: 0.3vw solid rgb(51, 51, 51);
      // @include bg-image("../../assets/defaultImg");
      background-image: url("../../assets/defaultImg@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    background-image: url("../../assets/defaultImg@3x.png");
  };
      background-repeat: no-repeat;
    }
    .material-info {
      flex: 1;
      display: inline-flex;
      height: 160px;
      vertical-align: middle;
      flex-direction: column;
      justify-content: space-around;
      color: rgb(245, 245, 245);
      font-size: 30px;
      line-height: 36px;
      .item {
        // height: 40%;
        display: flex;
        align-items: center;
        &.stats {
          .num {
            margin-right: 15px;
          }
        }
      }
    }
    .material-options {
      height: 100%;
      display: inline-flex;
      flex-direction: column;
      justify-content: space-around;
      vertical-align: middle;
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        width: 144px;
        font-size: 28px;
        border-radius: 1vw;
        border: 0.3vw solid #333333;
        outline: none;
        &.borrow {
          background: rgb(255, 201, 31);
        }
        &.check {
          background: rgb(255, 255, 255);
        }
      }
    }
  }
}
</style>
