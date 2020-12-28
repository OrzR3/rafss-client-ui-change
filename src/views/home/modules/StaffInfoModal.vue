<template>
  <el-dialog
    :visible.sync="visible"
    :show-close="false"
    width="500px"
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
    <div class="staff-info">
      <el-form
        :model="formInline"
        ref="registerForm"
        label-width="7rem"
        class="demo-ruleForm"
        auto-complete="off"
      >
        <div v-for="(item, index) in formInline.formInlineList" :key="index">
          <!-- formInlineList就是数据结构、要与表单formInLine放在一起，就是放在它里面 -->
          <div v-if="!onlyReady">
            <el-form-item
              :label="item.label"
              :prop="'formInlineList.' + index + '.value'"
              :rules="item.rules.value"
            >
              <el-input
                v-model="item.value"
                :maxlength="item.maxLength"
                :placeholder="item.placeHolder"
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <div v-if="onlyReady">
            <el-form-item
              :label="item.label"
              :prop="'formInlineList.' + index + '.value'"
            >
              <div class="text-box">
                 {{ item.value }}
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div slot="footer" class="buttons-wrap" v-if="!onlyReady">
      <el-button
        class="footer-btn"
        type="primary"
        @click="submitClick"
        :loading="submitFlag"
        >提交</el-button
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
// import uploadDefaultImg from "@/assets/upload/upload-default.svg";
export default {
  name: "",
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    onlyReady: {
      type: Boolean,
      default: false,
    },
    personalInfo: {
      type: Object,
      default: () => {
        return null;
      },
    },
    title: {
      type: String,
      default: "信息完善",
    },
  },
  data() {
    return {
      // uploadDefaultImg,
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
            prop: "name",
            label: "姓名：",
            placeHolder: "请输入您的姓名",
            rules: {
              value: [
                {
                  required: true,
                  message: "请输入您的姓名",
                  trigger: "blur",
                },
              ],
            },
          },
          {
            value: "",
            prop: "idCardNum",
            label: "身份证号码：",
            placeHolder: "请输入您的身份证号码",
            maxLength: 18,
            rules: {
              value: [
                { required: true, trigger: "blur", validator: validIDCard },
              ],
            },
          },
          {
            value: "",
            prop: "teaNum",
            label: "员工号：",
            placeHolder: "请输入您的员工号",
            rules: {
              value: [
                {
                  required: true,
                  message: "请输入您的员工号",
                  trigger: "blur",
                },
              ],
            },
          },
          {
            value: "",
            prop: "teaDepartment",
            label: "部门：",
            placeHolder: "请输入您的部门",
            rules: {
              value: [
                {
                  required: true,
                  message: "请输入您的部门",
                  trigger: "blur",
                },
              ],
            },
          },
        ],
      },
      smsKey: "",
      emailKey: "",
      fileName: "",
      currdatetime: "",
      url: {
        upPersonalInfo: "/sys/user/upPersonalInfo", //教职工信息完善
      },
    };
  },
  watch: {},
  methods: {
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
          this.upPersonalInfo(formData);
        } else {
          return false;
        }
      });
    },
    upPersonalInfo(formData) {
      let that = this;
      this.submitFlag = true;
      let httpurl = this.url.upPersonalInfo;
      let method = "post";
      this.$api.httpAction(httpurl, formData, method).then((res) => {
        this.submitFlag = false;
        if (res.success) {
          this.$message.success(res.message);
          this.$emit("ok", true);
          this.cancelModal();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    initData() {
      if (this.onlyReady && this.personalInfo) {
        this.formInline.formInlineList.forEach((item) => {
          item.value = this.personalInfo[item.prop];
        });
      }
    },
  },
  created() {
    this.initData();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/variable.scss";
.wrapper {
}
.staff-info {
  width: 80%;
  margin: 20px auto 0;
}
.text-box{
  margin-left: 20px;
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
