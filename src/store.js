import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart: {
      namespaced: true,
      state: {
        c: {

        }
      },
      mutations: {
        add (state, itemInfo) {
          if (itemInfo.goods_id in state.c) {
            state.c[itemInfo.goods_id]['num']++
          } else {
            state.c[itemInfo.goods_id] = {
              goods_name: itemInfo.goods_name,
              num: 1
            }
          }
          state.c = { ...state.c }
        },
        sub (state, itemInfo) {
          if (itemInfo.goods_id in state.c) {
            if (state.c[itemInfo.goods_id]['num'] > 1) { state.c[itemInfo.goods_id]['num']-- } else { delete state.c[itemInfo.goods_id] }
            state.c = { ...state.c }
          }
        },
        clear (state) {
          state.c = {}
        }
      }
    }
  },
  state: {
    username: "admin",
    workCode: "2018000",
    floorName: "",
    department: "研发部",
    avatar: ""
  },
  mutations: {
    updateUsername(state,username) {
      state.username = username
    },
    updateWorkCode(state, workCode) {
      state.workCode = workCode
    },
    updateAvatar(state, avatar) {
      state.avatar = avatar
    },
    updateDepartment(state, department) {
      state.department = department
    }
  },
  actions: {

  }
})
