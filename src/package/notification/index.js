import Notification from "./src/main"

export default {
    install(Vue) {
        Vue.prototype.$notify = Notification
    }
}