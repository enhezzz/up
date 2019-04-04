import Vue from "vue"
import main from "./Loading.vue"

let loadingConstructor = Vue.extend(main)

let loading = null
function start(tip) {
    loading = new loadingConstructor()
    loading.tip = tip
    loading.$mount()
    document.body.appendChild(loading.$el)
}

function close() {
    loading.$destroy(true)
    document.body.removeChild(loading.$el)
}

export default {
    start,
    close
}