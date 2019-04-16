import Vue from "vue"
import main from "./Loading.vue"

let loadingConstructor = Vue.extend(main)

let loadings = []
function start(tip) {
    let loading = new loadingConstructor()
    loading.tip = tip
    loading.$mount()
    loadings.push(loading)
    document.body.appendChild(loading.$el)
}

function close() {
    let loading = loadings.pop()
    loading.$destroy(true)
    document.body.removeChild(loading.$el)
}

export default {
    start,
    close
}