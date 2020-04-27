<template>
  <div class="bouncing-loader">
    <div class="balls">
      <div />
      <div />
      <div />
    </div>
    <div class="tip">
      {{ tip }}
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tip: ''
    }
  }
}
</script>
<style lang="less" scoped>
@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}
.bouncing-loader {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100vw;
  background: rgba(199, 199, 199, 0.5);
  z-index: 233;
  .balls {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 0.75rem;
      height: 0.75rem;
      margin: 1rem 0.2rem;
      background: #0087cc;
      border-radius: 50%;
      animation: bouncing-loader 0.6s infinite alternate;
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
  .tip {
    width: 100%;
    color: #0087cc;
    text-align: center;
  }
}
</style>
