<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { login } from './utils/request.js'
export default {
  created () {
    // this._login()
  },
  methods: {
    _login () {
      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          // corpId: "dingb38409443cbae4b035c2f4657eb6378f",
          corpId: 'ding9385b4aebd9af88635c2f4657eb6378f',
          onSuccess: result => {
            login({ code: result.code }).then(res => {
              switch (res.data.state) {
                //  0- 钉钉登入成功，1-无权登入，2-需要跳转到登入页面，3-服务错误
                case 0:
                  this.$store.commit('updateUsername', res.data.data.name)
                  this.$store.commit('updateWorkCode', res.data.data.job_num)
                  this.$store.commit('updateAvatar', res.data.data.avatar)
                  this.$store.commit('updateDepartment', res.data.data.dept_name)
                  this.$store.commit('updateFloorName', res.data.data.floor_name)
                  this.$store.commit('updateFloorId', res.data.data.floor)
                  break
              }
            })
          },
          onFail: function (err) {
            alert('fail' + err)
          }
        })
      })
      dd.error(function (error) {
        /**
        {
           errorMessage:"错误信息",// errorMessage 信息会展示出钉钉服务端生成签名使用的参数，请和您生成签名的参数作对比，找出错误的参数
           errorCode: "错误码"
        }
       **/
        alert('dd error: ' + JSON.stringify(error))
      })
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
   overflow:auto;   /* 用于 android4+，或其他设备 */
  -webkit-overflow-scrolling:touch;    /* 用于 ios5+ */
}
* {
  box-sizing: border-box;
}
</style>
