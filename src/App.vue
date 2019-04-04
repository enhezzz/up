<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { login } from "./utils/request.js";
export default {
  created() {
    this._login();
  },
  methods: {
    _login() {
      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          corpId: "dingb38409443cbae4b035c2f4657eb6378f",
          onSuccess: result => {
            login({ code: result.code }).then(res => {
              switch (res.data.state) {
                //	0- 钉钉登入成功，1-无权登入，2-需要跳转到登入页面，3-服务错误
                case 0:
                  this.$store.commit("updateUsername", res.data.data.name);
                  this.$store.commit("updateWorkCode", res.data.data.job_num);
                  this.$store.commit("updateAvatar", res.data.data.avatar);
                  this.$store.commit("updateAvatar", res.data.data.dept_name);
                  break;
              }
            });
          },
          onFail: function(err) {
            alert("fail" + err);
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
