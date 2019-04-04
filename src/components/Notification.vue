<template>
  <div
    ref="container"
    class="notification-box"
    :style="{height: `${notifications.length*100}%`}"
  >
    <div
      v-for="notification in notifications"
      :key="notification.announcement_id"
      class="item"
      :style="{height: `${100/notifications.length}%`}"
    >
      {{ notification.title }}
      <!-- <span  class="content"></span> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "Notification",
  props: {
    notifications: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      interval: null,
      timeout: null
    };
  },
  watch: {
    notifications() {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      if (this.notifications.length > 1) {
        this.interval = setInterval(() => {
          this.$refs.container.style = `transform: translate3d(0px, ${-100 /
            this.notifications
              .length}%, 0px);transition: transform 1000ms ease;height: ${this
            .notifications.length * 100}%`;
          this.timeout = setTimeout(() => {
            this.notifications.push(this.notifications.shift());
            if (this)
              this.$refs.container.style = `transform: translate3d(0px, 0, 0px);transition: transform 0ms ease;height: ${this
                .notifications.length * 100}%`;
          }, 1200);
        }, 6000);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }
};
</script>
<style lang="scss" scoped>
.notification-box {
  position: absolute;
  width: 91%;
  overflow: hidden;
  .item {
    width: 100%;
    height: 100%;
    /deep/ * {
      display: inline-block;
      margin: 0;
      padding: 0;
    }
    /deep/img {
      height: 15px;
    }
  }
}
</style>
