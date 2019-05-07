import loading from './src/main'

export default {
  install (Vue) {
    Vue.prototype.$loading = loading
  }
}
