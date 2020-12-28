<template>
  <el-dialog
    :visible.sync="visible"
    :show-close="false"
    width="800px"
    :modal="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="title"
    center
  >
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal">
      <i class="el-dialog__close el-icon el-icon-close"></i>
    </button>
    <el-steps :active="active" align-center finish-status="success" process-status="finish">
      <el-step v-for="(item, index) in steps" :title="item.title" :key="index"></el-step>
    </el-steps>
    <div class="steps-bot-line"></div>
    <div class="steps-content" v-loading="loading">
      <div v-if="active == 0">
        <div class="steps-form">
          <el-form
            ref="accountForm"
            :model="accountForm"
            :rules="accountRules"
            label-width="7rem"
            class="login-form"
            auto-complete="off"
            label-position="right"
          >
            <el-form-item label="登录账号" prop="username">
              <el-input
                v-model="accountForm.username"
                maxlength="50"
                name="username"
                type="text"
                auto-complete="on"
                placeholder="请输入您的账号/手机号"
                clearable
              />
            </el-form-item>
            <el-form-item label="验证码" prop="captcha" style="margin-bottom: 0;">
              <div class="captcha-list">
                <el-input
                  class="captcha-input"
                  v-model="accountForm.captcha"
                  placeholder="请输入验证码"
                  type="text"
                  maxlength="4"
                  @focus="handleChangeCheckCode"
                  @keyup.enter.native="submit"
                  clearable
                ></el-input>
                <div class="captcha-img">
                  <img
                    v-if="requestCodeSuccess"
                    :src="randCodeImage"
                    @click="handleChangeCheckCode"
                  />
                  <img v-else src="~@/assets/img/checkcode.png" @click="handleChangeCheckCode" />
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-if="active == 1">
        <!--<div>
          &lt;!&ndash;邮箱验证&ndash;&gt;
          <div class="auth-tips text-content">
            <div class="text-box">
              尊敬的
              <span class="auth-blue-text">{{ userName }}</span>您好，您现在正在修改密码操作，请谨慎操作，
              <br />以下为您的账号及绑定的邮箱，请至该邮箱获取您的验证码。
            </div>
          </div>
          <div class="auth-info">
            <div class="auth-info-content">
              <table
                class="auth-info-table"
                style="border-collapse:separate; border-spacing:0px 10px;"
              >
                <tr>
                  <td class="label">账号：</td>
                  <td class="text">{{ userName }}</td>
                </tr>
                <tr>
                  <td class="label">绑定邮箱：</td>
                  <td class="text">{{ bindEmail }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="steps-form">
            <el-form
              ref="authForm"
              :model="authForm"
              :rules="authRules"
              label-width="7rem"
              class="login-form"
              auto-complete="off"
              label-position="right"
            >
              <el-form-item label="手机验证码" prop="code">
                <div class="auth-list">
                  <el-input
                    class="auth-input"
                    type="text"
                    v-model="authForm.code"
                    placeholder="请输入验证码"
                    clearable
                    @keyup.enter.native="submit"
                  ></el-input>
                  <el-button
                    class="auth-btn"
                    type="primary"
                    v-show="sendAuthCode"
                    @click="getAuthCodeEmail"
                  >获取验证码</el-button>
                  <el-button class="auth-btn" type="info" disabled v-show="!sendAuthCode">
                    重新获取
                    <span>(</span>
                    <span class="auth-text-blue">{{ authTime }}</span>
                    <span>)</span>
                  </el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>-->

      <!--手机验证-->
      <div>
        <div class="auth-tips text-content">
          <div class="text-box">
            尊敬的
            <span class="auth-blue-text">{{ realname }}</span>您好，您现在正在修改密码操作，请谨慎操作，
            <br />以下为您的账号及绑定手机号，请通过该手机号获取您的验证码。
          </div>
        </div>
        <div class="auth-info">
          <div class="auth-info-content">
            <table
              class="auth-info-table"
              style="border-collapse:separate; border-spacing:0px 10px;"
            >
              <tr>
                <td class="label">账号：</td>
                <td class="text">{{ userName }}</td>
              </tr>
              <tr>
                <td class="label">绑定手机号：</td>
                <td class="text">{{ bindPhone }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="steps-form">
          <el-form
            ref="authForm"
            :model="authForm"
            :rules="authRules"
            label-width="7rem"
            class="login-form"
            auto-complete="off"
            label-position="right"
          >
            <el-form-item label="手机验证码" prop="code">
              <div class="auth-list">
                <el-input
                  class="auth-input"
                  type="text"
                  v-model="authForm.code"
                  placeholder="请输入验证码"
                  clearable
                  @keyup.enter.native="submit"
                ></el-input>
                <el-button
                  class="auth-btn"
                  type="primary"
                  v-show="sendAuthCode"
                  @click="getAuthCode"
                >获取验证码</el-button>
                <el-button class="auth-btn" type="info" disabled v-show="!sendAuthCode">
                  重新获取
                  <span>(</span>
                  <span class="auth-text-blue">{{ authTime }}</span>
                  <span>)</span>
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
        </div>
      </div>
    <div v-if="active == 2">
      <div class="steps-form">
        <el-form
          ref="pwdForm"
          :model="pwdForm"
          :rules="pwdRules"
          label-width="7rem"
          class="login-form"
          auto-complete="off"
          label-position="right"
        >
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="pwdForm.password"
              maxlength="50"
              name="password"
              auto-complete="new-password"
              placeholder="请设置新的密码"
              show-password
              clearable
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input
              type="password"
              v-model="pwdForm.repassword"
              maxlength="50"
              name="password"
              auto-complete="new-password"
              placeholder="请二次确认密码"
              show-password
              @keyup.enter.native="submit"
              clearable
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="active == 3">
      <div class="complete-tips">您的密码已修改成功！！请您妥善保管！！</div>
      <div class="complete-logo">
        <img src="~@/assets/img/smile.svg" alt />
      </div>
    </div>
    </div>
    <div class="steps-action">
      <el-button
        v-if="active > 0 && active != steps.length - 1"
        class="steps-btn"
        type="primary"
        @click="prev"
      >上一步</el-button>
      <el-button
        v-if="active < steps.length - 1"
        class="steps-btn"
        :class="{ 'big-btn': active== 0 }"
        type="primary"
        @click="submit"
      >下一步</el-button>
      <el-button
        v-if="active == steps.length - 1"
        class="steps-btn big-btn"
        type="primary"
        @click="cancelModal"
      >完成</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { hideMobileMiddleNumber } from "@/utils/tools.js";
  import { validPwd } from "@/utils/validate";
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value === null || value.length <= 0) {
          callback(new Error("请输入您的账号/手机号"));
        } else {
          callback();
        }
      };
      return {
        title: "找回密码",
        loading: false,
        active: 0,
        steps: [
          {
            title: "确认账号",
          },
          {
            title: "身份验证",
          },
          {
            title: "设置新密码",
          },
          {
            title: "完成",
          },
        ],
        sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */,
        authTime: 0 /*倒计时 计数器*/,
        randCodeImage: "", //图片验证码
        requestCodeSuccess: false, //图片验证码获取成功
        orderForm: {},
        addRules: {
          fromContact: [
            { required: true, message: "请输入联系人姓名", trigger: "blur" },
          ],
          fromPhone: [{ required: true, message: "请输入", trigger: "blur" }],
        },
        // 确认账号的表单
        accountForm: {
          username: "",
          captcha: "",
        },
        accountRules: {
          username: [
            {
              required: true,
              trigger: "blur",
              validator: validateUsername,
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
        userName: "",
        realname: "",
        bindPhone: "",
        bindEmail: "",
        bindPhoneHide: "",
        bindEmailHide: "",
        authForm: {
          code: "",
        },
        authRules: {
          code: [
            {
              required: true,
              message: "请输入验证码",
              trigger: "blur",
            },
          ],
        },
        pwdForm: {
          password: "",
          repassword: "",
        },
        pwdRules: {
          password: [
            {
              required: true,
              trigger: "blur",
              validator: validPwd,
            },
          ],
          repassword: [
            {
              required: true,
              validator: this.validateRePassword,
              trigger: "blur",
            },
          ],
        },
        currdatetime: "",
        postPhoneKeyCode: "",
        url: {
          // 定义接口
          checkUser: "/sys/user/checkUser", //验证用户名
          postPhoneEmsCode: "/sys/user/postPhoneEmsCode", //发送短信验证码
          retrieveSendEmailCode: "/sys/user/retrieveSendEmailCode", //发送邮箱验证码
          authUserEms: "/sys/user/authUserEms", //短信身份验证复制,
          changeUserPassword: "/sys/user/changeUserPassword", //修改密码
        },
      };
    },
    created() {
      this.handleChangeCheckCode();
    },
    methods: {
      next() {
        if (this.active++ > this.steps.length - 1) this.active = 0;
        this.init();
      },
      prev() {
        this.active--;
        this.init();
      },
      init() {
        let key = this.active;
        switch (key) {
          case 0: //确认账号
            // this.resetForm("accountForm");
            break;
          case 1: //身份验证
            this.sendAuthCode = true; /*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
            this.authTime = 0; /*倒计时 计数器*/
            break;
          case 2: //设置新密码
            break;
          default:
            break;
        }
      },
      submit() {
        let key = this.active;
        switch (key) {
          case 0: //确认账号
            this.accountSubmit();
            break;
          case 1: //身份验证
            this.authSubmit();
            break;
          case 2: //设置新密码
            this.pwdSubmit();
            break;
          default:
            this.next();
            break;
        }
      },
      resetForm(formName) {
        this.$nextTick(() => {
          this.$refs[formName].resetFields();
        });
      },
      // 确认账号
      accountSubmit() {
        this.$refs.accountForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.userName = this.accountForm.username;

            this.accountForm.checkKey = this.currdatetime;
            let httpurl = this.url.checkUser;
            let formData = this.accountForm;
            let method = "post";
            this.$api
              .httpAction(httpurl, formData, method)
              .then((res) => {
                this.loading = false;
                if (res.success) {
                  this.bindPhone = res.result.phone;
                  this.bindEmail = res.result.email;
                  this.realname = res.result.realname;
                  // this.bindPhoneHide = hideMobileMiddleNumber(this.bindPhone);
                  // this.bindEmailHide = hideMobileMiddleNumber(this.bindEmail);
                  this.next();
                } else {
                  this.$message.warning(res.message);
                }
              })
              .finally(() => {});
          } else {
            return false;
          }
        });
      },
      // 身份验证
      authSubmit() {
        this.$refs.authForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = {
              code: this.authForm.code,
              key: this.postPhoneKeyCode,
            };
            this.$api.getAction(this.url.authUserEms, params).then((res) => {
              this.loading = false;
              if (res.success) {
                this.next();
              } else {
                this.$message.warning(res.message);
              }
            });
          }
        });
      },
      // 设置新密码
      pwdSubmit() {
        this.$refs.pwdForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = {
              username: this.userName,
              password: this.pwdForm.password,
            };
            let httpurl = this.url.changeUserPassword;
            let formData = params;
            let method = "post";
            this.$api.httpAction(httpurl, formData, method).then((res) => {
              this.loading = false;
              if (res.success) {
                this.$message.success(res.message);
                this.next();
              } else {
                this.$message.warning(res.message);
              }
            });
          }
        });
      },
      validateRePassword(rule, value, callback) {
        let password = this.pwdForm.password;
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      },
      initForm() {
        this.orderForm = {
          fromContact: "",
          fromPhone: "",
        };
        if (this.$refs.orderForm) {
          this.$refs.orderForm.resetFields();
        }
      },
      cancelModal() {
        // 关闭弹窗，触发父组件修改visible值
        this.$emit("update:visible", false);
      },
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
      //验证
      getAuthCode: function () {
        this.postPhoneKeyCode = new Date().getTime();
        this.$api.postPhoneEmsCode(this.postPhoneKeyCode, { phone: this.userName }).then((res) => {
          if (res.success) {
            // this.$message.success(res.message);
            this.$message.success('验证码已发送');
          } else {
            this.$message.warning(res.message);
          }
        });
        this.sendAuthCode = false;
        //设置倒计时秒
        this.authTime = 90;
        var authTime = setInterval(() => {
          this.authTime--;
          if (this.authTime <= 0) {
            this.sendAuthCode = true;
            clearInterval(authTime);
          }
        }, 1000);
      },
      getAuthCodeEmail: function () {
        this.postPhoneKeyCode = new Date().getTime();
        this.$api.sendEmailCode(this.postPhoneKeyCode,{ username: this.userName }).then((res) => {
          if (res.success) {
            this.$message.success('验证码已发送');
          } else {
            this.$message.warning(res.message);
          }
        });
        this.sendAuthCode = false;
        //设置倒计时秒
        this.authTime = 90;
        var authTime = setInterval(() => {
          this.authTime--;
          if (this.authTime <= 0) {
            this.sendAuthCode = true;
            clearInterval(authTime);
          }
        }, 1000);
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/mixin.scss";
  @import "@/assets/scss/variable.scss";
  .wrapper {
  }
  .steps-list {
  }
  .steps-bot-line {
    width: 90%;
    margin: 10px auto;
    border-bottom: 1px solid #ccc;
  }
  .captcha-list,
  .auth-list {
    @include flex;
    justify-content: space-between;
  }
  .auth-input {
    width: 60%;
  }
  .auth-btn {
    width: 130px;
  }
  .captcha-input {
    width: 65%;
  }
  .captcha-img {
    width: 30%;
    @include flex;
  }
  .steps-content {
    text-align: center;
    min-height: 200px;
  }
  .steps-form {
    width: 60%;
    margin: 0 auto;
    margin-top: 50px;
  }
  // 身份验证
  .auth-tips {
    font-size: 16px;
    height: 60px;
    line-height: 20px;
  }
  .text-content {
    @include flex;
    position: relative;
    width: 100%;
    .text-box {
      position: absolute;
      text-align: left;
    }
  }
  .auth-blue-text {
    color: $blue;
    margin: 0 5px;
  }

  .auth-info {
    border: 1px dashed;
    width: 50%;
    margin: 10px auto 20px;
    padding: 10px 20px;
    background: #fffbdb;
  }

  .auth-info-table {
    .label {
      text-align: right;
    }

    .text {
      text-align: left;
    }
  }
  .complete-tips {
    margin-top: 30px;
    font-size: 16px;
  }
  .complete-logo {
    width: 200px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .steps-action {
    width: 60%;
    text-align: center;
    margin: 0 auto;
  }
  .steps-btn {
    width: 33%;
  }
  .big-btn {
    width: 66%;
  }
</style>
