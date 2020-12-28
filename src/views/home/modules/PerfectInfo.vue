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
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal">
      <i class="el-dialog__close el-icon el-icon-close"></i>
    </button>
    <div class="box-steps">
      <el-steps :active="active" align-center finish-status="success" process-status="finish">
        <el-step v-for="(item, index) in steps" :title="item.title" :key="index"></el-step>
      </el-steps>
    </div>

    <div class="steps-bot-line"></div>
    <div class="steps-content" v-loading="loading">
      <div v-if="active == 0">
        <div class="text-tips text-content">
          <div class="text-box">
            <div class="text-logo">
              <img src="~@/assets/img/home/logo/question-mark.svg" alt />
            </div>
            <div v-if="formModel[userRoleType].type == 'company'">请填写好贵企业相关信息，以便档案馆能快速为您服务！！如您为授权代表办理，请选择授权代表并填写您的身份证相关信息！！</div>
            <div v-else>请填写好您的个人信息，系统将会进入校库校验，可点击示例图进行身份证照片的提交！！</div>
          </div>
        </div>
        <div class="steps-form">
          <div
            :class="{ 'company-form': formModel[userRoleType].type == 'company'}"
          >
            <basic-form
              :ref="formModel[userRoleType].infoEntryFormName"
              :formModel="formModel[userRoleType].infoEntryFormModel"
              :refName="formModel[userRoleType].infoEntryFormName"
              :halfFormFlag="formModel[userRoleType].infoEntryHalfFormFlag"
              @submit="submitForm"
            ></basic-form>
          </div>
        </div>
      </div>
      <div v-if="active == 1 && formModel[userRoleType].type != 'company'">
        <!-- 在校用户校库匹配成功 -->
        <div class="steps-basic" v-if="matchType">
          <div class="text-tips text-content justify-content-start">
            <div class="text-box align-start">
              <div class="text-logo">
                <img src="~@/assets/img/home/logo/tips-mark.svg" alt />
              </div>
              <div>
                下方为校库中匹配出的数据，请确定是否为您本人信息！！
                <br />1.正确，请您点击下一步进人脸核验！！
                <br />2.错误，返回上一步调整您的信息，重新校验匹配
              </div>
            </div>
          </div>
          <basic-table :tableList="formModel[userRoleType].tableList"></basic-table>
        </div>
        <!-- 在校用户校库匹配失败 -->
        <div class="steps-form" v-if="!matchType">
          <div class="text-tips text-content">
            <div class="text-box">
              <div class="text-logo">
                <img src="~@/assets/img/home/logo/tips-mark.svg" alt />
              </div>
              <div>当前界面为匹配失败！！请您自行输入您的学籍信息，以便您的档案快速找着您！！</div>
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
      <div v-if="active == 1 && formModel[userRoleType].type == 'company'">
        <!-- 企业用户，材料提交 -->
        <div class="text-tips text-content">
          <div class="text-box">
            <div class="text-logo">
              <img src="~@/assets/img/home/logo/tips-mark.svg" alt />
            </div>
            <div>请如实上传您企业相关资料。例如：营业执复印件、同校方签订的协议等证明材料！如为授权代表办理，请授权人上传手持授权书及身份证正反面的照片！！</div>
          </div>
        </div>
        <div class="steps-basic">
          <div>
            <basic-form
              :ref="formModel[userRoleType].bizMaterialFormName"
              :formModel="formModel[userRoleType].bizMaterialFormModel"
              :refName="formModel[userRoleType].bizMaterialFormName"
              @submit="submitForm"
            ></basic-form>
          </div>
        </div>
      </div>
      <!-- 第三步，为人脸核验 -->
      <div v-if="active == 2">
        <!-- 确定信息无误并人脸核对 -->
        <div class="steps-basic">
          <div class="text-tips text-content justify-content-start">
            <div class="text-box align-start">
              <div class="text-logo">
                <img src="~@/assets/img/home/logo/tips-mark.svg" alt />
              </div>
              <div>请通过手机扫描二维码，完成人脸校验，人脸校验通过后，可以进行预约提交！！</div>
            </div>
          </div>
          <div class="qcode">
            <q-r-code width="200" height="200" :content="codeUrl"></q-r-code>
          </div>
        </div>
      </div>
      <!-- 第四步，为预约提交 -->
      <div v-if="active == 3">
        <div class="text-tips text-content justify-content-start">
          <div class="text-box align-start">
            <div class="text-logo">
              <img src="~@/assets/img/home/logo/tips-mark.svg" alt />
            </div>
            <div>您已经关联角色，请提交预约申请！</div>
          </div>
        </div>
        <div class="steps-form">
          <div >
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
      >上一步</el-button>
      <!-- 第三步，人脸识别通过后，进行预约提交 -->
      <el-button
        v-if="active < steps.length - 2"
        class="steps-btn"
        type="primary"
        @click="submit"
      >下一步</el-button>
      <!-- 第四步，目前是最后一步，预约提交 -->
      <el-button
        v-if="active == steps.length -1"
        class="steps-btn"
        type="primary"
        @click="submit"
      >提交</el-button>
      <el-button v-if="active == 0" class="steps-btn" type="default" @click="cancelModal">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import BasicForm from "@/views/home/components/BasicForm";
import BasicTable from "@/views/home/components/BasicTable";
import QRCode from "@/components/QRCode";
import AppointmentForm from '@/views/home/components/AppointmentForm'
// import { codeUrl } from "@/config/index.js";
import { PerfectInfoFormModelMixin } from "@/mixins/PerfectInfoFormModelMixin.js";
export default {
  name: "PerfectInfo",
  mixins: [PerfectInfoFormModelMixin],
  components: {
    BasicForm,
    BasicTable,
    QRCode,
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
      codeUrl: "",
      steps: [
        {
          title: "信息录入",
        },
        {
          title: "校库校验",
        },
        {
          title: "人脸核验",
        },
        {
          title: "预约提交",
        },
      ],
      companySteps: [
        {
          title: "企业信息录入",
        },
        {
          title: "材料提交",
        },
        {
          title: "人脸核验",
        },
        {
          title: "预约提交",
        },
      ],
      matchType: false, //判断信息录入，是否匹配成功
      countTime: 0,
      countTimer: -1,
      waitStatusTime: 0,
      waitStatusTimer: -1,
      basicInfo: {
        name: "",
        idCard: "",
      },
      url: {
        list: "",
        //生成手机人脸识别地址
        generateAuthUrl: "/sys/user/getFaceVerificationUrl",
        //人脸识别状态
        authQRCodeStatus: "/sys/user/authQRCodeStatus",
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
  created() {
    clearInterval(this.countTimer);
    clearInterval(this.waitStatusTimer);
  },
  beforeDestroy() {
    clearInterval(this.countTimer);
    clearInterval(this.waitStatusTimer);
  },
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
    roleBingUp(){
      let httpurl=this.url.roleBingUp;
      let formData={};
      let method="post";
      this.$api.httpAction(httpurl,formData,method).then((res)=>{
        if(res.success){
        }else{
        }
      });
    },
    companyVerifyByQcode() {
      /* 公司通过验证码，验证后，去下一步 */
      this.next();
    },
    submitForm(object) {
      const { refName, formData } = object;
      let key = this.active;
      const model = this.formModel[this.userRoleType];
      let httpurl = "";
      let method = "post";
      this.loading = true;
      if(model.type == "company" && key == 0){
        if(formData.type == '1'){
          model.bizMaterialFormModel.formList.find(item =>item.prop == 'authorizeCardUrl').hideFormItem = false;
        }
      }
      switch (key) {
        case 0:
          this.basicInfo = formData;
          /*  第一步，完善资料，表单提交之后，调用的方法 */
          httpurl = model.infoEntryUrl;
          this.$api.httpAction(httpurl, formData, method).then((res) => {
            this.loading = false;
            if (res.success) {
              this.$message.success(res.message);
              if (model.type != "company") {
                this.basicInfo = res.result;
                this.setTableList(this.userRoleType, res.result);
              }
                this.matchType = res.success;
                this.next();
            } else {
              //存在重复的注册，并且该用户已经通过人工审核
              if(res.code==8002){
                this.$message.warning(res.message);
              }else{
                this.$message.warning(res.message);
                this.matchType = res.success;
                this.next();
              }
            }
          });
          break;
        case 1:
          if (model.type != "company") {
            /*  第二步，补充资料，表单提交之后，调用的方法 */
            httpurl = model.furtherInfoUrl;
            formData.idCardNum = this.basicInfo.idCard;
            this.$api.httpAction(httpurl, formData, method).then((res) => {
              this.loading = false;
              if (res.success) {
                this.$message.success(res.message);
                this.next();
              } else {
                this.$message.warning(res.message);
              }
            });
          } else {
            /* 第二步，企业用户提交材料 */
            httpurl = model.bizMaterialUrl;
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
          break;
        case 2:
          break;
        default:
          break;
      }
    },
    next() {
      if (this.active++ > this.steps.length - 1) this.active = 0;
      this.init();
    },
    prev() {
      this.active--;
      this.init();
    },
    init() {
      clearInterval(this.countTimer);
      clearInterval(this.waitStatusTimer);
      let key = this.active;
      switch (key) {
        case 1:
          break;
        case 2:
          /* 第三步，为人脸核验 */
          this.getCodeUrl();
         /*  if (this.formModel[this.userRoleType].type == "company") {
            this.countDown();
          } else if (this.matchType) {
            this.getCodeUrl();
          } else {
            this.countDown();
          } */
          break;
        case 3:
          /* 第四步，为预约提交 */
          break;
        default:
          break;
      }
    },
    getCodeUrl() {
      let params = {};
      let time = new Date().getTime();
      let name = "";
      let idNumber = "";
      let auth = "";
      if (this.formModel[this.userRoleType].type != "company") {
        name = this.basicInfo.name;
        idNumber = this.basicInfo.idCardNum;
      } else {
        let type = this.basicInfo.type;
            auth=type
        if (type == "1") {
          name = this.basicInfo.authorizeName;
          idNumber = this.basicInfo.authorizeCardNum;
        } else if (type == "0") {
          name = this.basicInfo.legalName;
          idNumber = this.basicInfo.legalCardNum;
        }
      }
      // 增加一个 applyRole 参数
      let applyRole = this.userRoleType;
      params = { idNumber, name, time, applyRole,auth};
      this.$api.getAction(this.url.generateAuthUrl, params).then((res) => {
        this.codeUrl = res.message || res.result;
      });
      this.authQRCodeStatus();
    },
    authQRCodeStatus() {
      this.waitStatusTimer = setInterval(() => {
        setTimeout(() => {
          let idNumber = this.basicInfo.idCard;
          // 增加一个 applyRole 参数
          let applyRole = this.userRoleType;
          let params = { idNumber, applyRole };
          this.$api.getAction(this.url.authQRCodeStatus, params).then((res) => {
            /* 根据返回结果判断，matchType */
            if (res.success) {
              let status = res.result.faceScanStatus;
              // 人脸识别状态 ；2 识别未通过，1通过，0未扫描
              if (status != 0) {
                // 拿到结果后，清除定时器
                clearInterval(this.waitStatusTimer);  
                let flag = status == 1;
                if (flag) {
                  this.$message.success("人脸识别通过");
                  // 人脸识别通过之后，跳转至下一步，预约提交
                  this.actionByMatchType(flag);
                } else {
                  this.$message.warning("人脸识别未通过，请重试或返回上一步修改身份证信息！！");
                }
              }
            }
          });
        }, 0);
      }, 6000);
    },
    actionByMatchType(flag) {
      if (flag) {
        /* 最后一步，上传角色英文名 */
        this.regRoleUp(this.userRoleItem);
        this.$store.commit("SET_APPLY_ROLE", this.userRoleItem.value);
        clearInterval(this.waitStatusTimer);
        this.setRealName();
        this.next();
      }
    },
    appointmentComplete(){
      // 预约提交，表单提交成功之后的回调函数
      this.roleBingUp();
      this.$store.commit("SET_ROLE_BING", "1");
    },
    submit() {
      const model = this.formModel[this.userRoleType];
      let key = this.active;
      switch (key) {
        case 0:
          this.$refs[this.formModel[this.userRoleType].infoEntryFormName].submit();
          break;
        case 1:
          if(model.type == 'company'){
            // 企业用户，提交材料
             this.$refs[
              this.formModel[this.userRoleType].bizMaterialFormName
            ].submit();
          }else if (this.matchType) {
            this.next();
          } else {
            this.$refs[
              this.formModel[this.userRoleType].furtherInfoFormName
            ].submit();
          }
          break;
        case 3:
          /* 第四步，预约提交的功能 */
          this.$refs['appointmentForm'].submitForm();
          this.$refs['appointmentForm'].props.showFormTitle=true;
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
    loadTypeChange(type){
      this.loading = type;
    },
    countDown() {
      /* 倒计时时间 */
      this.countTime = 120;
      this.countTimer = setInterval(() => {
        this.countTime--;
        if (this.countTime <= 0) {
          this.$router.push({ path: "review-progress" });
          clearInterval(this.countTimer);
        }
      }, 1000);
    },
    initUserRoleType(item) {
      if(this.applyRole == item.value){
        // 如果已经关联角色，直接跳转至第四步，预约提交
        this.active = 3;
      }
      this.userRoleItem = item;
      this.userRoleType = item.value;
      const model = this.formModel[this.userRoleType];
      if (model.type == "company") {
        this.steps = this.companySteps;
      }
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
