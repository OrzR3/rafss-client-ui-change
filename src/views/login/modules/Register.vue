<template>
  <el-dialog
    :visible.sync="visible"
    :show-close="false"
    width="700px"
    :modal="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="title"
    center
  >
    <button
      type="button"
      aria-label="Close"
      class="el-dialog__headerbtn"
      @click.stop="cancelModal"
    >
      <i class="el-dialog__close el-icon el-icon-close"></i>
    </button>
    <div class="web-base">
      <el-form
        :model="formInline"
        ref="registerForm"
        label-width="7rem"
        class="demo-ruleForm"
        auto-complete="off"
      >
        <div v-for="(item, index) in formInline.formInlineList" :key="index">
          <!-- formInlineList就是数据结构、要与表单formInLine放在一起，就是放在它里面 -->
          <el-form-item
            :label="item.label"
            :prop="'formInlineList.' + index + '.value'"
            :rules="item.rules.value"
          >
            <div v-if="item.type == 'select'">
              <el-select
                v-model="item.value"
                :placeholder="item.placeHolder"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="option in item.selectOptions"
                  :key="option.value"
                  :label="option.text"
                  :value="option.value"
                ></el-option>
              </el-select>
            </div>
            <div v-if="item.type == 'password'">
              <el-input
                v-model.trim="item.value"
                type="password"
                :maxlength="item.maxLength"
                autocomplete="new-password"
                :placeholder="item.placeHolder"
                clearable
                show-password
              ></el-input>
            </div>
            <div v-if="item.type == 'captcha'">
              <div class="captcha-list">
                <el-input
                  class="captcha-input"
                  v-model="item.value"
                  :placeholder="item.placeHolder"
                  type="text"
                  :maxlength="item.maxLength"
                  @focus="handleChangeCheckCode"
                  clearable
                ></el-input>
                <div class="captcha-img pointer">
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
            </div>
            <div v-if="item.type == 'code'">
              <div class="auth-list">
                <el-input
                  class="auth-input"
                  type="text"
                  v-model="item.value"
                  :maxlength="item.maxLength"
                  :placeholder="item.placeHolder"
                  clearable
                ></el-input>
                <el-button
                  class="auth-btn"
                  type="primary"
                  v-show="sendAuthCode"
                  @click="getAuthCode"
                  >获取手机验证码</el-button
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
            </div>

            <div v-if="item.type == 'email'">
              <el-input
                type="text"
                v-model="item.value"
                :placeholder="item.placeHolder"
                clearable
              ></el-input>
            </div>

            <div v-if="item.type == 'emailCode'">
              <div class="auth-list">
                <el-input
                  class="auth-input"
                  type="text"
                  v-model="item.value"
                  :maxlength="item.maxLength"
                  :placeholder="item.placeHolder"
                  clearable
                ></el-input>
                <el-button
                  class="auth-btn"
                  type="primary"
                  v-show="sendAuthCode"
                  @click="getEmailCode"
                  >获取验证码</el-button
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
            </div>
            <div v-if="!item.type">
              <el-input
                v-model="item.value"
                :maxlength="item.maxLength"
                :placeholder="item.placeHolder"
                clearable
              ></el-input>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div slot="footer" class="buttons-wrap">
      <el-button
        class="footer-btn"
        type="primary"
        @click="submitClick"
        :loading="submitFlag"
        >注册</el-button
      >
      <el-button class="footer-btn" type="default" @click="cancelModal"
        >取消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {
  phoneReg,
  validPhone,
  validEmail,
  validIDCard,
  validPwd,
  vaildRealName,
} from "@/utils/validate";
import { setItem, getItem } from "@/utils/store.js";
import { MessageBox } from "element-ui";
import { getToken } from "@/utils/auth";
import { register, checkNewOnly } from "@/http/login";
import { istudentInfo, istudentFlag } from "@/config/istudent.config.js";
// import uploadDefaultImg from "@/assets/upload/upload-default.svg";
export default {
  name: "",
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // uploadDefaultImg,
      title: "用户注册",
      istudentInfo: istudentInfo[istudentFlag],
      istudentFlag,
      submitFlag: false,
      randCodeImage: "", //图片验证码
      requestCodeSuccess: false, //图片验证码获取成功
      sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */,
      authTimer: -1,
      authTime: 0 /*倒计时 计数器*/,
      formInline: {
        formInlineList: [
          {
            value: "",
            prop: "phone",
            label: "手机号",
            placeHolder: "请输入您的真实手机号，以便管理员联系到您",
            maxLength: 11,
            rules: {
              value: [
                {
                  required: true,
                  trigger: "blur",
                  validator: this.validateUserNameByPhone,
                },
              ],
            },
          },
          // {
          //   value: "",
          //   prop: "username",
          //   label: "用户名",
          //   placeHolder: "请输入您的账号",
          //   rules: {
          //     value: [
          //       {
          //         required: true,
          //         message: "请输入您的账号",
          //         trigger: "blur",
          //       },
          //     ],
          //   },
          // },
          {
            value: "",
            prop: "password",
            label: "密码",
            placeHolder: "请输入密码",
            maxLength: 16,
            type: "password",
            rules: {
              value: [
                {
                  required: true,
                  trigger: "blur",
                  validator: validPwd,
                },
              ],
            },
          },
          {
            value: "",
            prop: "repassword",
            label: "重复密码",
            placeHolder: "请再次输入密码，以便确认密码一致性",
            maxLength: 16,
            type: "password",
            rules: {
              value: [
                {
                  required: true,
                  validator: this.validateRePassword,
                  trigger: "blur",
                },
              ],
            },
          },
          {
            value: "",
            prop: "smsCode",
            label: "手机验证码",
            placeHolder: "请输入手机验证码",
            /* 验证码长度还未确定 */
            maxLength: 4,
            type: "code",
            rules: {
              value: [
                {
                  required: true,
                  message: "请输入手机验证码",
                  trigger: "blur",
                },
              ],
            },
          },
          /*{
            value: "",
            prop: "email",
            label: "邮箱Email",
            placeHolder: "请输入您的真实邮箱,以方便找回密码",
            type: "email",
            rules: {
              value: [
                {
                  required: true,
                  validator: this.validEmail,
                  trigger: "blur",
                },
              ],
            },
          },
          {
            value: "",
            prop: "emailCode",
            label: "邮箱验证码",
            placeHolder: "请输入邮箱中验证码",
            maxLength: 6,
            type: "emailCode",
            rules: {
              value: [
                {
                  required: true,
                  message: "请输入邮箱中验证码",
                  trigger: "blur",
                },
              ],
            },
          },*/
          // {
          //   value: "",
          //   prop: "captcha",
          //   label: "验证码",
          //   placeHolder: "请输入验证码",
          //   maxLength: 4,
          //   type: "captcha",
          //   rules: {
          //     value: [
          //       {
          //         required: true,
          //         message: "请输入验证码",
          //         trigger: "blur",
          //       },
          //     ],
          //   },
          // },
        ],
      },
      smsKey: "",
      emailKey: "",
      fileName: "",
      currdatetime: "",
    };
  },
  watch: {},
  methods: {
    //验证
    getAuthCode: function () {
      let phone = this.formInline.formInlineList.find(
        (item) => item.prop == "phone"
      ).value;
      if (!phone) {
        this.$message.warning("请输入您的手机号");
        return;
      }
      let data = { phone };
      if (phoneReg.test(phone)) {
        checkNewOnly(data).then((res) => {
          let flag = false;
          if (res.success && res.result == 0) {
            flag = true; //该手机唯一
          }
          if (flag) {
            this.smsKey = new Date().getTime();
            this.$api
              .postPhoneEmsCode(this.smsKey, { phone: phone })
              .then((res) => {
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
          } else {
            // 已经注册过
          }
        });
      }
    },
    getEmailCode: function () {
      let email = this.formInline.formInlineList.find(
        (item) => item.prop == "email"
      ).value;
      if (!email) {
        this.$message.warning("请输入您的邮箱！");
        return;
      }
      this.emailKey = new Date().getTime();
      this.$api.sendEmailCode(this.emailKey, { email }).then((res) => {
        if (res.success) {
          this.$message.success("验证码已发送");
        } else {
          this.$message.warning(res.message);
        }
      });

      this.sendAuthCode = false;
      //设置倒计时秒
      this.authTime = 90;
      this.authTimer = setInterval(() => {
        this.authTime--;
        if (this.authTime <= 0) {
          this.sendAuthCode = true;
          clearInterval(this.authTimer);
        }
      }, 1000);
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
    initForm() {
      this.handleChangeCheckCode();
      /*  this.orderForm = {
        fromContact: "",
        fromPhone: "",
      };
      if (this.$refs.orderForm) {
        this.$refs.orderForm.resetFields();
      } */
    },
    cancelModal() {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit("update:visible", false);
    },
    submitClick() {
      let that = this;
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          let formData = {};
          that.formInline.formInlineList.forEach((item) => {
            formData[item.prop] = item.value;
          });
          this.register(formData);
        } else {
          return false;
        }
      });
    },
    register(formData) {
      let that = this;
      this.submitFlag = true;
      formData.checkKey = this.currdatetime;
      formData.username = formData.phone;
      formData.emailKey = this.emailKey;
      formData.smsKey = this.smsKey;
      //注册（内网（入参：type 值：BUU-INTRANET）  教职工注册）：
      if(this.istudentFlag == 'BUU-INTRANET')formData.type = this.istudentFlag;
      this.$api
        .register(formData)
        .then((res) => {
          this.submitFlag = false;
          if (res.success) {
            // 注册成功后，直接登录
            let timer = setTimeout(() => {
              MessageBox.close();
              this.accountLogin(formData);
            }, 3000);
            MessageBox.alert("注册成功！<br/>即将为您跳转至首页", "温馨提示", {
              dangerouslyUseHTMLString: true,
              confirmButtonText: "确认",
              type: "success", //success ，error，info和warning
              callback: (action) => {
                clearTimeout(timer);
                this.accountLogin(formData);
              },
            });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {});
    },
    // 账号登录
    accountLogin(formData) {
      const { username, password, captcha } = formData;
      let loginForm = {
        username,
        password,
        captcha,
      };
      this.$store
        .dispatch("LoginByUsername", loginForm)
        .then((response) => {
          if (response.result) {
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
        });
    },
    closeClick() {
      this.$emit("close");
    },
    validateRePassword(rule, value, callback) {
      let password = this.formInline.formInlineList.find(
        (item) => item.prop == "password"
      ).value;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
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
              flag = true; //该手机唯一
            }
            if (flag) {
              callback();
            } else {
              // 已经注册过
              callback(new Error("手机号码已经被注册过"));
            }
          });
        } else {
          return callback(new Error("手机号格式输入有误"));
        }
      }
    },

    validEmail(rule, value, callback) {
      if (rule.required && !value) {
        return callback(new Error("邮箱不能为空"));
      }
      if (value === "" || value === null) callback();
      let rules = /^[a-zA-Z0-9_-]+([-_.][a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (rules.test(value)) {
        let data = { email: value };
        checkNewOnly(data).then((res) => {
          let flag = false;
          if (res.success && res.result == 0) {
            flag = true; //邮箱唯一
          }
          if (flag) {
            callback();
          } else {
            // 已经注册过
            callback(new Error("该邮箱已注册！"));
          }
        });
      } else {
        callback(new Error("邮箱格式输入有误"));
      }
    },

    validateUserNameRepeat(data) {},
  },
  created() {
    this.handleChangeCheckCode();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/variable.scss";
.wrapper {
}
.web-base {
  width: 80%;
  margin: 0 auto;
}
.captcha-list,
.auth-list {
  @include flex;
  justify-content: space-between;
}
.auth-input {
  width: 65%;
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
.footer-btn {
  width: 100px;
  margin: 0 45px;
}
</style>
