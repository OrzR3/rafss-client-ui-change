<template>
  <el-dialog
    :visible.sync="visible"
    :show-close="false"
    width="62%"
    top="50px"
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
    <div class="box-steps">
      <el-steps
        :active="active"
        align-center
        finish-status="success"
        process-status="finish"
      >
        <el-step
          v-for="(item, index) in steps"
          :title="item.title"
          :key="index"
        ></el-step>
      </el-steps>
    </div>
    <div class="steps-bot-line"></div>
    <div class="steps-content" v-loading="loading">
      <!-- 第一步，为信息完善 -->
      <div v-if="active == 0 && formModel[userRoleType].type != 'company'">
        <!-- 在校用户校库匹配失败 -->
        <div class="steps-form">
          <div class="text-tips text-content">
            <div class="text-box">
              <div class="text-logo">
                <img src="~@/assets/img/home/logo/tips-mark.svg" alt />
              </div>
              <div>请您自行输入您的学籍信息，以便您的档案快速找着您！！</div>
            </div>
          </div>
          <div class="overflow-auto">
            <basic-form
              :ref="formModel[userRoleType].furtherInfoFormName"
              :formModel="formModel[userRoleType].furtherInfoFormModel"
              :refName="formModel[userRoleType].furtherInfoFormName"
              :halfFormFlag="formModel[userRoleType].furtherInfoHalfFormFlag"
              @submit="submitForm"
            ></basic-form>
          </div>
        </div>
      </div>
      <!-- 第二步，为预约提交 -->
      <div v-if="active == 1">
        <div class="text-tips text-content justify-content-start">
          <div class="text-box align-start">
            <div class="text-logo">
              <img src="~@/assets/img/home/logo/tips-mark.svg" alt />
            </div>
            <div>您已经关联角色，请提交预约申请！</div>
          </div>
        </div>
        <div class="steps-form">
          <div>
            <appointment-form
              ref="appointmentForm"
              :applyRole="userRoleItem.value"
              @loading="loadTypeChange"
              @complete="appointmentComplete"
            ></appointment-form>
          </div>
        </div>
      </div>
    </div>
    <div class="steps-action">
      <el-button
        v-if="active > 0 && active != steps.length - 1"
        class="steps-btn"
        type="primary"
        @click="prev"
        >上一步</el-button
      >
      <el-button
        v-if="active < steps.length - 1"
        class="steps-btn"
        type="primary"
        @click="submit"
        >下一步</el-button
      >
      <el-button
        v-if="active == steps.length - 1"
        class="steps-btn"
        type="primary"
        @click="submit"
        >提交</el-button
      >
      <el-button
        v-if="active == 0"
        class="steps-btn"
        type="default"
        @click="cancelModal"
        >取消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import BasicForm from "@/views/home/components/BasicForm";
import AppointmentForm from "@/views/home/components/AppointmentForm";
import { PerfectInfoFormModelMixin } from "@/mixins/PerfectInfoFormModelMixinBuu.js";
export default {
  name: "PerfectInfo",
  mixins: [PerfectInfoFormModelMixin],
  components: {
    BasicForm,
    AppointmentForm,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: "信息完善",
      loading: false,
      active: 0,
      steps: [
        {
          title: "信息完善",
        },
        {
          title: "预约提交",
        },
      ],
      basicInfo: {
        name: "",
        idCard: "",
      },
      url: {
        list: "",
        //更新用户注册角色信息
        regRoleUp: "/sys/user/regRoleUp",
        //用户提交后，改变RoleBing
        roleBingUp: "/sys/user/roleBingUp",
      },
    };
  },
  computed: {
    ...mapGetters(["applyRole"]),
  },
  created() {},
  beforeDestroy() {},
  methods: {
    regRoleUp(item) {
      let httpurl = this.url.regRoleUp;
      let formData = {
        applyRole: item.value, //角色
        applyRoleText: item.text, //角色名称
      };
      let method = "post";
      this.$api.httpAction(httpurl, formData, method).then((res) => {
        if (res.success) {
        } else {
        }
      });
    },
    roleBingUp() {
      let httpurl = this.url.roleBingUp;
      let formData = {};
      let method = "post";
      this.$api.httpAction(httpurl, formData, method).then((res) => {
        if (res.success) {
        } else {
        }
      });
    },
    submitForm(object) {
      const { refName, formData } = object;
      let key = this.active;
      const model = this.formModel[this.userRoleType];
      let httpurl = "";
      let method = "post";
      this.loading = true;
      switch (key) {
        case 0:
          this.basicInfo = formData;
          /*  第一步，完善信息 */
          httpurl = model.furtherInfoUrl;
          console.log(this.userRoleItem);
          this.$api.httpAction(httpurl, formData, method).then((res) => {
            this.loading = false;
            if (res.success) {
              this.$message.success(res.message);
              this.perfectInfoComplete();
              this.next();
            } else {
              this.$message.warning(res.message);
            }
          });
          break;
        case 1:
          break;
        default:
          break;
      }
    },
    next() {
      if (this.active++ > this.steps.length - 1) this.active = 0;
    },
    prev() {
      this.active--;
    },
    perfectInfoComplete() {
      this.regRoleUp(this.userRoleItem);
      this.$store.commit("SET_APPLY_ROLE", this.userRoleItem.value);
      this.setRealName();
    },
    appointmentComplete() {
      // 预约提交，表单提交成功之后的回调函数
      this.roleBingUp();
      this.$store.commit("SET_ROLE_BING", "1");
    },
    submit() {
      const model = this.formModel[this.userRoleType];
      let key = this.active;
      switch (key) {
        case 0:
          /* 第一步，信息完善 */
          this.$refs[
            this.formModel[this.userRoleType].furtherInfoFormName
          ].submit();
          break;
        case 1:
          /* 第二步，预约提交的功能 */
          this.$refs["appointmentForm"].submitForm();
          this.$refs["appointmentForm"].props.showFormTitle = true;
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
    loadTypeChange(type) {
      this.loading = type;
    },
    initUserRoleType(item) {
      if (this.applyRole == item.value) {
        // 如果已经关联角色，直接跳转至第二步，预约提交
        this.active = 1;
      }
      this.userRoleItem = item;
      this.userRoleType = item.value;
    },
    cancelModal() {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit("update:visible", false);
    },
    setRealName() {
      let realname = this.basicInfo.name;
      this.$store.commit("SET_REAL_NAME", realname);
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
.box-steps {
  position: relative;
  margin: 0 auto;
  width: 115%;
  left: -8%;
}
.steps-content {
  text-align: center;
  min-height: 400px;
}
.steps-basic {
  position: relative;
  width: 82%;
  margin: 0 auto;
}
.steps-form {
  width: 83%;
  margin: 0 auto;
}
.text-tips {
  font-size: 16px;
  height: 30px;
  line-height: 20px;
}
.text-content {
  @include flex;
  position: relative;
  width: 100%;
  .text-box {
    @include flex;
    text-align: left;
    height: 18px;
    line-height: 18px;
    font-size: 14px;
    .text-logo {
      width: 18px;
      height: 18px;
      margin-right: 5px;
      img {
        width: 100%;
      }
    }
    .text-orange-color {
      color: #ff8d1a;
      font-size: 18px;
      padding: 0 5px;
    }
  }
}
.align-start {
  align-items: start !important;
}
.justify-content-start {
  // justify-content: start !important;
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
  width: 26%;
}
.big-btn {
  width: 52%;
}
.qcode {
  display: inline-block;
  @include border-shadow;
  margin-top: 65px;
  padding: 2px;
}
.overflow-auto {
  /*height: 380px;*/
  overflow-x: hidden;
  overflow-y: auto;
  // margin-right: -60px;
  padding-right: 40px;
  padding-bottom: 20px;
}
.company-form {
  padding-right: 0px;
}
</style>
