<template>
  <div :class="['notification',status]">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Notification',
  data () {
    return {
      verticalPosition: 16,
      status: 'danger',
      duration: 0
    }
  },
  mounted () {
    if (this.duration !== 0) {
      setTimeout(() => {
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
      }, this.duration + 2000)
    }
  }
}
</script>
<style lang="scss" scoped>
.notification {
  position: fixed;
  z-index: 6666;
  // width: 55%;
  left: 50%;
  top: 50%;
  width: 80%;
  text-align: center;
  // min-height: 60px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  transform: translateX(-50%) translateY(-50%);
  // transform-origin: 0 50%;
  box-shadow: 0 0 5px -2px;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 60px;
  background: rgba($color: #000000, $alpha: 0.502);
  font-size: 28px;
  color: #fff;
  // white-space: nowrap;
  // &.danger {
  //   animation: tada 1s;
  // }
  // &.info {
  //     animation: hinge 2s 2s both
  // }
}
// @keyframes tada {
//   0% {
//     -webkit-transform: scale3d(1, 1, 1) translateX(-50%);
//     -ms-transform: scale3d(1, 1, 1) translateX(-50%);
//     transform: scale3d(1, 1, 1) translateX(-50%);
//   }
//   10%,
//   20% {
//     -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)
//       translateX(-50%);
//     -ms-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)
//       translateX(-50%);
//     transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg) translateX(-50%);
//   }
//   30%,
//   50%,
//   70%,
//   90% {
//     -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)
//       translateX(-50%);
//     -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)
//       translateX(-50%);
//     transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg) translateX(-50%);
//   }
//   40%,
//   60%,
//   80% {
//     -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)
//       translateX(-50%);
//     -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)
//       translateX(-50%);
//     transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg) translateX(-50%);
//   }
//   100% {
//     -webkit-transform: scale3d(1, 1, 1) translateX(-50%);
//     -ms-transform: scale3d(1, 1, 1) translateX(-50%);
//     transform: scale3d(1, 1, 1) translateX(-50%);
//   }
// }
// @keyframes hinge {
//   0% {
//     -webkit-transform-origin: -50% 0;
//     -ms-transform-origin: -50% 0;
//     transform-origin: -50% 0;
//     -webkit-animation-timing-function: ease-in-out;
//     animation-timing-function: ease-in-out;
//     transform: rotate3d(0, 0, 1, 0deg) translateX(-50%);
//   }
//   20%,
//   60% {
//     -webkit-transform: rotate3d(0, 0, 1, 80deg) translateX(-50%);
//     -ms-transform: rotate3d(0, 0, 1, 80deg) translateX(-50%);
//     transform: rotate3d(0, 0, 1, 80deg) translateX(-50%);
//     -webkit-transform-origin: -50% 0 ;
//     -ms-transform-origin: -50% 0 ;
//     transform-origin: -50% 0;
//     -webkit-animation-timing-function: ease-in-out;
//     animation-timing-function: ease-in-out
//   }
//   40%,
//   80% {
//     -webkit-transform: rotate3d(0, 0, 1, 60deg) translateX(-50%);
//     -ms-transform: rotate3d(0, 0, 1, 60deg) translateX(-50%);
//     transform: rotate3d(0, 0, 1, 60deg) translateX(-50%);
//     -webkit-transform-origin: -50% 0;
//     -ms-transform-origin: -50% 0;
//     transform-origin: -50% 0;
//     -webkit-animation-timing-function: ease-in-out;
//     animation-timing-function: ease-in-out;
//     opacity: 1
//   }
//   100% {
//     -webkit-transform: translate3d(0, 700px, 0) translateX(-50%);
//     -ms-transform: translate3d(0, 700px, 0) translateX(-50%);
//     transform: translate3d(0, 700px, 0) translateX(-50%);
//     opacity: 0
//   }
// }
</style>
