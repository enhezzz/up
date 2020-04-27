<template>
  <div class="list-item">
    <div
      class="material-icon"
      :style="{backgroundImage: `url(${listItem.img_path})`}"
    />
    <div class="material-info">
      <div class="name">
        <span>{{ listItem.goods_name }}</span>
      </div>
      <div class="stats">
        <div class="item borrow-date">
          <span class="date">日期：</span>
          <span class="date">{{ listItem.lent_time }}</span>
        </div>
        <div class="item return-date">
          <span class="date">数量：</span>
          <span class="date">{{ listItem.lent_count }}</span>
        </div>
      </div>
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
      background-size: cover;
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
  }
}
</style>
