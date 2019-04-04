import main from "./Notification.vue"
import Vue from "vue"
const NotificationConstructor = Vue.extend(main)
let statusMap = {
    danger: "danger"  // class
}
function Notication(options) {
    let instance = new NotificationConstructor()
    instance.$slots.default = options.message
    instance.$data.duration = options.duration || 0
    instance.$data.status = options.status || "info"
    instance.classList = statusMap[options.status]
    instance.$mount()
    document.body.appendChild(instance.$el);
    return instance
}

export default Notication