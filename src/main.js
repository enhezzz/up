import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Toast from '../src/components/Toast/index'
import Notification from './package/notification/index'
import Loading from './package/loading/index'
import './registerServiceWorker'

import './styles/variable.less'

Vue.config.productionTip = false
// Vue.use(Toast)
Vue.use(Notification)
Vue.use(Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
