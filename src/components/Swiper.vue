<template>
  <div class="swiper">
    <div class="options">
      <div class="option">
        设计类
      </div>
      <div class="option">
        产品类
      </div>
      <div class="option">
        工具类
      </div>
      <div class="option">
        管理类
      </div>
      <div class="option">
        管理类
      </div>
    </div>
    <div class="swiper-items">
      <div class="slider-box">
        <div
          v-for="(item,index) in 4"
          :key="item"
          class="swiper-item"
          :style="{left: `${index*100}%`}"
        >
          <div class="list">
            <div class="list-item">
              <div class="material-icon" />
              <div class="material-info">
                <div class="item name">
                  <span>设计中的设计</span>
                </div>
                <div class="item stats">
                  <div class="num">
                    10
                  </div>
                  <div class="location">
                    (2F)
                  </div>
                </div>
              </div>
              <div class="material-options">
                <div class="button borrow">
                  借用
                </div>
                <router-link
                  class="button check"
                  to="/book/detail"
                  tag="div"
                >
                  查看
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.swiper {
  display: flex;
  flex-direction: column;

  padding: 0 30px;
  //   color: $master-deep-orange;
  .options {
    white-space: nowrap;
    overflow-x: scroll;
    width: 100%;
    padding: 3.2vw 0;
    .option {
      display: inline-block;
      font-size: 30px;
      margin: 0px 41px;
      color: $assist-grey;
      font-weight: 600;
    }
  }
  .swiper-items {
    flex: 1;
    overflow: hidden;
    position: relative;
    .slider-box {
      width: 184vw;
      .swiper-item {
        width: 100%;
        height: 100%;
        position: absolute;
        .list {
          height: 100%;
          .list-item {
            text-align: left;
            display: flex;
            width: 100%;
            background: $assist-deep-blue;
            border-radius: 1vw;
            border: 0.4vw solid rgb(51, 51, 51);
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
              background-image: url("../assets/book/book.jpg");
              background-repeat: no-repeat;
            }
            .material-info {
              flex: 1;
              display: inline-flex;
              width: 40%;
              min-height: 100%;
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
              }
            }
            .material-options {
              min-height: 100%;
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
                  background: $master-light-orange;
                }
                &.check {
                  background: rgb(255, 255, 255);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
