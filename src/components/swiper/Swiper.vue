<template>
  <div class="swiper">
    <slot name="options" />
    <div class="swiper-items">
      <slot name="sliderBox" />
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
    padding: 20px 0 18px;
    .option {
      position: relative;
      display: inline-block;
      height: 49px;
      font-size: 30px;
      margin: 0px 41px;
      color: $assist-grey;
      font-weight: 600;
      overflow: hidden;
      // line-height: 36px;
      &:after {
          content: "";
          display: block;
          position: absolute;
          height: 4px;
          background:$assist-deep-blue;
          width: 80%;
          left: 100%;
          // transform: translateX(-200%);
          // animation: non-select .4s ease-out both;
          border-radius: 2px
        }
      &.actived {
        &:after {
         animation: select .4s cubic-bezier(.49,.86,.67,1.95)  both;
        }
      }
    }
  }
  @keyframes non-select {
    to {
      transform: translateX(-300%)
    }
  }
  @keyframes select {
    to {
      transform: translateX(-50%);
      left: 50%
    }
  }
  .swiper-items {
    flex: 1;
    overflow: hidden;
    position: relative;
    .slider-box {
      width: 100%;
      height: 100%;
      transition: transform .4s ease;
      .swiper-item {
        width: 100%;
        height: 100%;
        float: left;
        padding: 0 1px;
        .list {
          height: 100%;
          overflow-y: auto;
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
              background-image: url("../../assets/book/book.jpg");
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
