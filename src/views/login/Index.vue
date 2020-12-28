<template>
  <div class="login-web">
    <div class="login-warp">
      <div class="login-box">
        <div class="login-header">
          <div @click="formTabClick(0)" :class="{ activeTab: curTab == 0 }">
            <span class="logo" v-if="curTab == 0">
              <img src="~@/assets/img/login/user-focus.png" />
            </span>
            <span class="logo" v-else>
              <img src="~@/assets/img/login/user.png" />
            </span>
            账号登录
          </div>
          <div @click="formTabClick(1)" :class="{ activeTab: curTab == 1 }">
            <span class="logo" v-if="curTab == 1">
              <img src="~@/assets/img/login/code-focus.png" />
            </span>
            <span class="logo" v-else>
              <img src="~@/assets/img/login/code.png" />
            </span>
            验证登录
          </div>
        </div>
        <div class="header-line"></div>
        <div class="login-content">
          <!-- 在curTab==0时此板块显示 其他时候此板块不显示 -->
          <div v-show="curTab == 0" class="Cbody-item">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              auto-complete="on"
              label-position="top"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="loginForm.username"
                  maxlength="50"
                  name="username"
                  type="text"
                  class="text-line"
                  auto-complete="on"
                  placeholder="请输入您的账号"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  class="text-line"
                  v-model="loginForm.password"
                  maxlength="20"
                  name="password"
                  autocomplete="on"
                  placeholder="请输入密码"
                  show-password
                  @keyup.enter.native="handleLogin"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="captcha" style="margin-bottom: 0">
                <div class="captcha-list">
                  <el-input
                    class="text-line captcha-input"
                    v-model="loginForm.captcha"
                    placeholder="请输入验证码"
                    type="text"
                    maxlength="4"
                    @change="inputCodeChange"
                    @focus="handleChangeCheckCode"
                    @keyup.enter.native="handleLogin"
                    clearable
                  ></el-input>
                  <div class="captcha-img">
                    <img
                      v-if="requestCodeSuccess"
                      :src="randCodeImage"
                      @click="handleChangeCheckCode"
                    />
                    <img
                      v-else
                      src="~@/assets/img/checkcode.png"
                      @click="handleChangeCheckCode"
                    />
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <!-- 在curTab==1时此板块显示 其他时候此板块不显示 -->
          <div v-show="curTab == 1" class="Cbody-item">
            <el-form
              :model="reginForm"
              ref="reginForm"
              :rules="reginRules"
              class="regform"
              label-width="0"
            >
              <el-form-item prop="phone">
                <el-input
                  type="text"
                  class="text-line"
                  v-model.number="reginForm.phone"
                  placeholder="请输入您的手机号"
                  maxlength="11"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="emsCode">
                <div class="auth-list">
                  <el-input
                    class="text-line auth-input"
                    type="text"
                    v-model="reginForm.emsCode"
                    placeholder="请输入验证码"
                    clearable
                  ></el-input>
                  <el-button
                    class="auth-btn"
                    type="primary"
                    v-show="sendAuthCode"
                    @click="getAuthCode"
                    >发送验证码</el-button
                  >
                  <el-button
                    class="auth-btn"
                    type="info"
                    disabled
                    v-show="!sendAuthCode"
                  >
                    重新获取
                    <span>(</span>
                    <span class="auth-text-blue">{{ authTime }}</span>
                    <span>)</span>
                  </el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="register-list">
            <div class="pointer forget-pwd" @click="findBackPwd">
              忘记密码？
            </div>
            <div>
              <a @click="handleRegister">账号注册</a>
            </div>
          </div>
          <div class="clear"></div>
          <el-button
            type="primary"
            class="login-btn max-btn"
            @click="handleLogin"
            v-loading="loading"
            >登&nbsp;&nbsp;录</el-button
          >
        </div>
        <div style="clear:both"></div>
      </div>
      <div style="clear:both"></div>
    </div>
    <!-- 跑马灯，显示系统更新信息 -->
    <div class="notice-marquee">
      <div class="logo">
        <img src="~@/assets/img/login/alert.png" alt />
      </div>
      <div class="text">
        <marquee :delay="0.5" :speed="100" :content="marqueeText">
          <span v-for="(item, index) in marqueeText" :key="index">{{
            item
          }}</span>
        </marquee>
      </div>
    </div>
    <!-- 找回密码 -->
    <find-back
      ref="findBack"
      v-if="findBackVisible"
      :visible.sync="findBackVisible"
    ></find-back>
    <!-- 账号注册 -->
    <register
      ref="register"
      v-if="registerVisible"
      :visible.sync="registerVisible"
    ></register>
  </div>
</template>
<script>
import { phoneReg } from "@/utils/validate";
import FindBack from "@/views/login/modules/FindBack";
import Register from "@/views/login/modules/Register";
import Marquee from "@/components/Marquee";
import { setItem, getItem } from "@/utils/store.js";
import { checkNewOnly } from "@/http/login";

export default {
  name: "Login",
  components: {
    FindBack,
    Register,
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === null || value.length <= 0) {
        callback(new Error("请输入您的账号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        callback();
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (value.toLowerCase() !== this.verifiedCode.toLowerCase()) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    const telCheck = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入您的手机号"));
      } else if (!Number.isInteger(value)) {
        return callback(new Error("手机号必须是数字"));
      } else if (value.toString().length !== 11) {
        return callback(new Error("手机号必须是11位数字"));
      } else {
        callback();
      }
    };
    const codeCheck = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (!Number.isInteger(value)) {
        return callback(new Error("验证码必须是数字"));
      } else if (value.toString().length !== 6) {
        return callback(new Error("验证码必须是6位数字"));
      } else {
        callback();
      }
    };
    return {
      registerVisible: false, //账号注册
      findBackVisible: false, //找回密码
      curTab: 0, //默认选中第一个tab
      marqueeText: "",
      formType: 0, //0为登录，1位注册
      // 账户登录的表单
      loginForm: {
        username: "",
        password: "",
        captcha: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
      reginForm: {
        phone: "",
        emsCode: "",
      },
      reginRules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            validator: this.validateUserNameByPhone,
            trigger: "blur",
          },
        ],
        emsCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
      sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */,
      authTimer: -1,
      authTime: 0 /*倒计时 计数器*/,
      randCodeImage: "", //图片验证码
      requestCodeSuccess: false, //图片验证码获取成功
      loading: false, //登录按钮，加载中
      verifiedCode: "",
      inputCodeContent: "",
      currdatetime: "",
      emsKey: "",
      sendAuthCodeFlag: false, //能点击发送，为true
      url: {
        annountCement: "/sys/annountCement/list", //系统通告用
      },
    };
  },
  created() {
    this.currdatetime = new Date().getTime();
    this.handleChangeCheckCode();
    this.annountCement();
  },
  mounted() {},
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    annountCement() {
      let params = {
        column: "sendTime",
        order: "desc",
      };
      this.$api.getAction(this.url.annountCement, params).then((res) => {
        if (res.success) {
          let result = res.result;
          if (result && result.records && result.records.length > 0) {
            this.marqueeText = result.records[0].msgContent;
          }
        }
        if (res.code === 510) {
          this.$message.warning(res.message);
        }
      });
    },
    formTabClick(curTab) {
      if (this.curTab == curTab) return;
      this.curTab = curTab;
      if (curTab == 0) {
        this.resetForm("loginForm");
      } else if (curTab == 1) {
        this.resetForm("reginForm");
        this.sendAuthCodeFlag = false;
        clearInterval(this.authTimer);
        this.authTime = 0;
        this.sendAuthCode = true;
      }
    },
    //验证
    getAuthCode: function () {
      let phone = this.reginForm.phone;
      if (!phone) {
        this.$message.warning("请输入您的手机号");
        return;
      }
      if (!phoneReg.test(phone)) {
        this.$message.warning("手机号格式输入有误");
        return;
      }
      let data = { phone };
      checkNewOnly(data).then((res) => {
        let flag = false;
        if (res.success && res.result == 0) {
          flag = true; //该手机唯一，未注册
        }
        this.sendAuthCodeFlag = res.result == 0 ? false : true;
        if (flag) {
          this.$message.warning("手机号码还未注册");
        } else {
          // 已经注册过
          this.postPhoneEmsCode(phone);
        }
      });
    },
    postPhoneEmsCode(phone) {
      this.emsKey = new Date().getTime();
      this.$api.postPhoneEmsCode(this.emsKey, { phone:phone }).then((res) => {
        if (res.success) {
          this.$message.success("验证码已发送");
        } else {
          this.$message.warning(res.message);
        }
      });
      this.sendAuthCode = false;
      //设置倒计时秒
      this.authTime = 60;
      this.authTimer = setInterval(() => {
        this.authTime--;
        if (this.authTime <= 0) {
          this.sendAuthCode = true;
          clearInterval(this.authTimer);
        }
      }, 1000);
    },
    generateCode(value) {
      this.verifiedCode = value.toLowerCase();
    },
    inputCodeChange(value) {
      this.inputCodeContent = value.toLowerCase();
      if (!value || value === 0) {
      } else {
        this.inputCodeContent = this.inputCodeContent.toLowerCase();
      }
    },
    handleRegister() {},
    handleChangeCheckCode() {
      this.currdatetime = new Date().getTime();
      this.$api
        .randomImage(this.currdatetime)
        .then((res) => {
          if (res.success) {
            this.randCodeImage = res.result;
            this.requestCodeSuccess = true;
          } else {
            this.$message.error(res.message);
            this.requestCodeSuccess = false;
          }
        })
        .catch(() => {
          this.requestCodeSuccess = false;
        });
    },
    /* 找回密码 */
    findBackPwd() {
      this.findBackVisible = true;
      if (this.$refs["findBack"]) {
        this.$refs["findBack"].initForm();
      }
    },
    /* 注册的方法 */
    handleRegister() {
      this.registerVisible = true;
      if (this.$refs["register"]) {
        this.$refs["register"].initForm();
      }
    },
    handleLogin() {
      if (this.curTab == 0) this.accountLogin();
      else if (this.curTab == 1) this.verifyLogin();
    },
    // 账号登录
    accountLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid && !this.loading) {
          this.loading = true;
          this.loginForm["checkKey"] = this.currdatetime;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then((response) => {
              this.loading = false;
              if (response.result) {
                let userInfo = response.result.userInfo;
                // 如果roleBing为0，且applyRole有值，则跳转至审核进度页面
                let flag = userInfo.roleBing == "0" && userInfo.applyRole;
                this.$router.push({
                  path: this.redirect || "/",
                });
              } else {
                this.$notify.error({
                  title: "失败",
                  message: response.message,
                });
              }
            })
            .catch((response) => {
              this.handleChangeCheckCode();
              this.$notify.error({
                title: "失败",
                message: response.message,
              });
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    // 验证登录
    verifyLogin() {
      this.$refs.reginForm.validate((valid) => {
        if (valid && !this.loading) {
          this.loading = true;
          this.reginForm["emsKey"] = this.emsKey;
          this.$store
            .dispatch("LoginByPhone", this.reginForm)
            .then((response) => {
              this.loading = false;
              if (response.result) {
                let userInfo = response.result.userInfo;
                let flag = userInfo.roleBing == "0" && userInfo.applyRole;
                this.$router.push({
                  path: this.redirect || "/",
                });
              } else {
                this.$notify.error({
                  title: "失败",
                  message: response.message,
                });
              }
            })
            .catch((response) => {
              this.$notify.error({
                title: "失败",
                message: response.message,
              });
              this.loading = false;
            });
        }
      });
    },
    /* 校验手机号码 */
    validateUserNameByPhone(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        if (phoneReg.test(value)) {
          let data = { phone: value };
          checkNewOnly(data).then((res) => {
            let flag = false;
            if (res.success && res.result == 0) {
              flag = true; //该手机唯一，未注册
            }
            this.sendAuthCodeFlag = res.result == 0 ? false : true;
            if (flag) {
              callback(new Error("手机号码还未注册"));
            } else {
              // 已经注册过
              callback();
            }
          });
        } else {
          return callback(new Error("手机号格式输入有误"));
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/variable.scss";
.login-web {
  width: 100%;
}
.forget-pwd {
  color: #9ba3b5;
}
a {
  color: #4c75ea;
}
.login-header {
  @include flex;
  justify-content: space-evenly;
  // background: $blue;
  color: #9ba3b5;
  div {
    @include flex;
    width: 100%;
    padding: 25px 0 20px;
    font-size: 24px;
    .logo {
      margin-right: 5px;
      margin-top: 5px;
    }
  }
}
.login-header span {
  cursor: pointer;
}
.header-line {
  width: 87%;
  margin: 0 auto;
  height: 2px;
  background: #d2d2d2;
}
.login-content {
  width: 87%;
  margin: 30px auto 0;
  margin-bottom: 20px;
}
.login-box {
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.Cbody-item {
  border: 0px solid #999;
  overflow: hidden;
}
.activeTab {
  color: #2c62f2;
}
.login-warp {
  @include border-shadow;
  position: relative;
  display: block;
  top: 0;
  bottom: 0;
  left: 22%;
  margin: auto;
  display: flex;
  width: 480px;
  // height: 488px;
  overflow: hidden;
  transition: ease all 0.5s;
  cursor: pointer;
}
.register-list {
  @include flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.login-btn {
  margin-top: 25px;
  margin-bottom: 10px;
  height: 62px;
  background-color: #2c62f2;
  border-color: #2c62f2;
  font-size: 24px;
}
.notice-marquee {
  @include flex;
  background: rgba(255, 255, 255, 0.2);
  width: 78%;
  padding: 0 14%;
  /* margin: 10px auto; */
  position: absolute;
  bottom: 0;
  height: 52px;
  .logo {
    margin-right: 10px;
  }
  .text {
    width: 100%;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
  }
}
.captcha-list,
.auth-list {
  @include flex;
  justify-content: space-between;
}
.auth-input {
  width: 180px;
}
.auth-btn {
  width: 130px;
  background-color: #2c62f2;
  border-color: #2c62f2;
}
.captcha-input {
  width: 250px;
}
.captcha-img {
  @include flex;
  height: 50px;
  width: 130px;
  position: absolute;
  right: 5px;
  bottom: 0;
}

/deep/ .el-form-item {
  margin-bottom: 20px !important;
}
/deep/.text-line .el-input__inner {
  border: none !important;
  border-bottom: 2px solid #d2d2d2 !important;
  outline: none !important;
  border-radius: 0 !important;
  padding-left: 0 !important;
  font-size: 18px;
  font-weight: 400;
  color: #9ba3b5;
  input {
    &:-webkit-autofill {
      /*   background-color:#FFFFFF !important;
          box-shadow:0 9px 18px 0 rgba(168,172,185,0.62);
          border-radius:5px; */
      -webkit-animation: autofill-fix 1s infinite; /**利用动画方式将背景图遮挡住*/
      // -webkit-text-fill-color: #94ccda;				/**字体颜色可按需求定义*/
    }
  }
}
@-webkit-keyframes autofill-fix {
  from {
    background-color: transparent !important;
    box-shadow: 0 9px 18px 0 rgba(168, 172, 185, 0.62);
    border-radius: 5px;
  }
  to {
    background-color: transparent !important;
    box-shadow: 0 9px 18px 0 rgba(168, 172, 185, 0.62);
    border-radius: 5px;
  }
}
/deep/.text-line .el-input__inner:focus {
  border-bottom: 2px solid #2f5cd4 !important;
}

/deep/.text-line .el-input__inner::-webkit-input-placeholder {
  font-size: 18px;
  font-weight: 400;
  color: #9ba3b5;
}
/deep/.text-line .el-input__inner:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: 18px;
  font-weight: 400;
  color: #9ba3b5;
}
/deep/.text-line .el-input__inner::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: 18px;
  font-weight: 400;
  color: #9ba3b5;
}
/deep/.text-line .el-input__inner:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-size: 18px;
  font-weight: 400;
  color: #9ba3b5;
}

.text-line > input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  -webkit-text-fill-color: #333;
}
@media only screen and (max-width: 1500px) {
  .login-warp {
    width: 450px;
    right: 10%;
  }
  .login-header {
    div {
      padding: 15px 0 10px;
      font-size: 24px;
    }
  }
  .login-content {
    margin: 20px auto 0;
  }
  .Cbody-item  {
    height: 195px;
  }
  /deep/ .el-form-item  {
    margin-bottom: 25px !important;
  }
  .login-btn {
    margin-top: 0;
  }
}
</style>

