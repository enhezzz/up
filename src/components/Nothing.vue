<template>
  <div class="nothing">
    <div>
      <div class="icon" />
      <div class="tips">
        没有相关信息呀(●ˇ∀ˇ●)
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Nothing'
}
</script>
<style lang="less" scoped>
.nothing {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  .icon {
    width: 363px;
    height: 279px;
    margin: 150px auto 0;
    background-image: url("../assets/nothing@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    background-image: url("../assets/nothing@3x.png");
  }
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transform-origin: top center;
    // animation: swing 2s infinite;
  }
  .tips {
    color: #333;
    margin-top: 35px;
  }
}
@keyframes swing {
  20% {
    -webkit-transform: rotate3d(0, 0, 1, 15deg);
    -ms-transform: rotate3d(0, 0, 1, 15deg);
    transform: rotate3d(0, 0, 1, 15deg);
  }
  40% {
    -webkit-transform: rotate3d(0, 0, 1, -10deg);
    -ms-transform: rotate3d(0, 0, 1, -10deg);
    transform: rotate3d(0, 0, 1, -10deg);
  }
  60% {
    -webkit-transform: rotate3d(0, 0, 1, 5deg);
    -ms-transform: rotate3d(0, 0, 1, 5deg);
    transform: rotate3d(0, 0, 1, 5deg);
  }
  80% {
    -webkit-transform: rotate3d(0, 0, 1, -5deg);
    -ms-transform: rotate3d(0, 0, 1, -5deg);
    transform: rotate3d(0, 0, 1, -5deg);
  }
  100% {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    -ms-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg);
  }
}
</style>
