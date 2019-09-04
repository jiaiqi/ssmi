<template>
  <div class="login">
    <div class="message">登录</div>
    <div id="darkbannerwrap"></div>
    <form method="post">
      <input name="action" value="login" type="hidden" />
      <input name="username" placeholder="用户名" required type="text" v-model="userName" />
      <hr class="hr15" />
      <input
        name="password"
        placeholder="密码"
        required
        type="password"
        v-model="pwd"
        @keyup.enter="toHome"
      />
      <hr class="hr15" />
      <input value="登录" style="width:100%;" type="button" @click="toHome()" />
      <hr class="hr20" />
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userName: '',
      pwd: ''
    };
  },
  mounted() {
  },
  methods: {
    toHome() {
      let self = this
      let user_no = this.userName
      let pwd = this.pwd
      let bxReqs = [];
      let bxReq = {};
      bxReq.serviceName = "srvuser_login";
      bxReq.data = [{ "user_no": user_no, "pwd": pwd }];
      bxReqs.push(bxReq);
      sessionStorage.setItem("need_login_flag", null);
      // let path = "http://192.168.0.192:8101/sso/operate/srvuser_login";
      let path = this.getServiceUrl("operate", bxReq.serviceName, "sso");
      let callBack = function (data) {
        if (data.state == "SUCCESS") {
          let resp = data.response[0];
          let bx_auth_ticket = resp.response.bx_auth_ticket;
          let current_login_user = resp.response.login_user_info;
          sessionStorage.setItem("bx_auth_ticket", bx_auth_ticket);
        } else {
          alert(data.resultMessage);
        }
      }
      function crosAjax(url, method, jsonData, succFun) {
        console.log(jsonData)
        if (sessionStorage.getItem("need_login_flag") == "need_login") {
        } else {
          // let bx_auth_ticket = sessionStorage.getItem("bx_auth_ticket");
          axios({
            // headers: { "bx_auth_ticket": bx_auth_ticket },
            url: url,
            method: method,
            data: jsonData,
            xhrFields: {
              withCredentials: true
            },
          }).then(res => {
            if (res.data.resultCode === "SUCCESS") {
              let resp = res.data.response[0]
              let bx_auth_ticket = res.data.response[0].response.bx_auth_ticket
              sessionStorage.setItem("bx_auth_ticket", bx_auth_ticket)
              let current_login_user = resp.response.login_user_info;
              sessionStorage.setItem("current_login_user", JSON.stringify(current_login_user))
              top.user = current_login_user;
              // window.user = current_login_user
              // self.$router.go(-1)
              console.log(self.$route)
              if (self.$route.query.length > 0) {
                let path = self.$route.query.from
                console.log(path)
                self.$router.push({ name: path })
              } else {
                self.$router.push({ name: 'dzbl' })
              }
            }
            console.log(res)
          }).catch(err => {
            console.log(err)
          });
        }
      }
      crosAjax(path, "POST", bxReqs, callBack);
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
body {
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  margin-top: 150px;
  // min-height: 420px;
  max-width: 420px;
  padding: 40px;
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  box-sizing: border-box;
  a {
    color: #27a9e3;
    text-decoration: none;
    cursor: pointer;
  }
}
a.logo {
  display: block;
  height: 58px;
  width: 167px;
  margin: 0 auto 30px auto;
  background-size: 167px 42px;
}
.message {
  margin: 10px 0 0 -58px;
  padding: 18px 10px 18px 60px;
  background: #27a9e3;
  position: relative;
  color: #fff;
  font-size: 16px;
}
#darkbannerwrap {
  background: url(../assets/images/aiwrap.png);
  width: 18px;
  height: 10px;
  margin: 0 0 20px -58px;
  position: relative;
}

input[type="text"],
input[type="file"],
input[type="password"],
input[type="email"],
select {
  border: 1px solid #dcdee0;
  vertical-align: middle;
  border-radius: 3px;
  height: 50px;
  padding: 0px 16px;
  font-size: 14px;
  color: #555555;
  outline: none;
  width: 100%;
}
input[type="text"]:focus,
input[type="file"]:focus,
input[type="password"]:focus,
input[type="email"]:focus,
select:focus {
  border: 1px solid #27a9e3;
}

input[type="submit"],
input[type="button"] {
  display: inline-block;
  vertical-align: middle;
  padding: 12px 24px;
  margin: 0px;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  color: #ffffff;
  background-color: #27a9e3;
  border-radius: 3px;
  border: none;
  -webkit-appearance: none;
  outline: none;
  width: 100%;
}
hr.hr15 {
  height: 15px;
  border: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
hr.hr20 {
  height: 20px;
  border: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
}

.copyright {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  display: block;
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>