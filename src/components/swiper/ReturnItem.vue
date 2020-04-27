<template>
  <div class="list-item">
    <div class="material-icon" />
    <div class="material-info">
      <div class="name">
        <span>{{ listItem.goods_name }}</span>
      </div>
      <div class="stats">
        <div class="item borrow-date">
          <span class="tag">借</span>
          <span class="date">{{ listItem.lent_time.slice(0, 10) }}</span>
        </div>
        <div
          v-if="listItem.return_time"
          class="item return-date"
        >
          <span class="tag">还</span>
          <span class="date">{{ listItem.return_time.slice(0, 10) }}</span>
        </div>
      </div>
    </div>
    <div class="material-options">
      <div
        v-if="type === 'noreturn_list'"
        class="button borrow"
        @click="returns"
      >
        归还
      </div>
      <router-link
        class="button check"
        :to="`/book/detail?goods_id=${listItem.goods_id}`"
        tag="div"
      >
        查看
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReturnItem',
  props: {
    listItem: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    returns () {
      this.$emit('returns', {
        goods_id: this.listItem.goods_id,
        lent_info_id: this.listItem.lent_info_id
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
      background-size: contain;
      background-position: center;
      border-radius: 1vw;
      border: 0.3vw solid rgb(51, 51, 51);
      background-image: url("../../assets/book/book.jpg");
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
      // .item {
      //   // height: 40%;
      //   display: flex;
      //   align-items: center;
      // }
      .stats {
        .item {
          display: flex;
          align-items: center;

          .tag {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 28px;
            width: 28px;
            border-radius: 4px;
            border: 1px solid rgb(118, 209, 230);
            font-size: 22px;
            color: rgb(118, 209, 230);
            line-height: 29px;
            margin-right: 19px;
          }
          .date {
            font-size: 24px;
            line-height: 36px;
            color: rgb(245, 245, 245);
          }
        }
      }
    }
    .material-options {
      height: 160px;
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
