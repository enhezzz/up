<template>
  <div class="search-container">
    <i class="search-icon" />
    <input
      v-model="query"
      class="search-input"
      type="text"
      :placeholder="placeholder"
      @keydown.enter="search"
    >
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  props: {
    placeholder: {
      type: String,
      default: '搜索书本名称'
    }
  },
  data () {
    return {
      query: '',
      prevTime: Date.now(),
      nowTime: Date.now(),
      interval: null
    }
  },
  created () {
    this.query = localStorage.searchKeyword || ''
  },
  mounted () {
    this.interval = setInterval(() => {
      this.nowTime += 1000
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    search () {
      if (this.nowTime - this.prevTime <= 1000) {} else {
        this.prevTime = this.nowTime
        this.$emit('search', this.query)
      }
    }
  }
}
</script>

<style scoped lang='less'>
  .search-container {
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 92vw;
    height: 9.6vw;
    border: 2px solid #333;
    border-radius: 6px;
    background-color: rgb(255, 201, 31);
    .search-icon {
      width: 4vw;
      height: 30px;
      background-image: url('../assets/common/icon_search@2x.png');
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    background-image: url('../assets/common/icon_search@3x.png');
  }
      background-size: contain;
      background-repeat: no-repeat;
      margin: 0 2.1333vw 0 4vw;
    }
    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 3.4667vw;
      color: #333;
      background-color: rgb(255, 201, 31);
    }
  }
</style>
