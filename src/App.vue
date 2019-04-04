<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import {login} from "./utils/request.js"
export default {
  created() {
    this._login()
  },
  methods: {
    _login() {
      dd.ready(  ()=> {
        dd.runtime.permission.requestAuthCode({
          corpId: "ding9385b4aebd9af88635c2f4657eb6378f",
          onSuccess: (result)=> {
            login({code: result.code})
            .then(res => {
              console.log(res)
              switch (res.data.status) {
                //	0- 钉钉登入成功，1-无权登入，2-需要跳转到登入页面，3-服务错误
                case 0:
                  this.$store.commit("updateUsername", res.data.name)
                  this.$store.commit("updateWorkCode", res.data.job_num)
                  this.$store.commit("updateAvatar", res.data.avatar)
                  this.$store.commit("updateAvatar", res.data.dept_name)
                  break;
                // case 2:
                //   that.userid = res.data.user_id;
                //   that.loading = false;
                //   break;
                // default:
                //   that.loading = false
                //   that.message = res.data.message
                //   break;
              }
            })
          },
          onFail: function(err) {
            alert("fail"+ err)
          }
        });
      })

    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
* {
  box-sizing: border-box;
}
</style>
