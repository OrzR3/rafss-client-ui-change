<template>
  <div>
    <div class="select-role-wrapper">
      <div class="base">
        <div class="title">下方为您输入填写的信息，正在进行人工辅助审核，请您耐心等待辅助审核通过！！也请及时关注，以便给管理员提供更多的辅助信息！！</div>
        <div class="main">
          <div class="box">
            <box-title title="已录入信息："></box-title>
            <div class="box-content">
              <box-table :tableList="infoList"></box-table>
            </div>
          </div>
          <div class="box">
            <box-title title="辅助审核进度："></box-title>

            <!--<div class="box-steps" v-if="stepsList && stepsList.length > 0">-->
            <!--<el-steps :active="active" align-center>-->
            <!--<el-step :title="item.processInfo" v-for="(item,index) in stepsList" :key="index">-->
            <!--<i class="step-icon" slot="icon"></i>-->
            <!--<div slot="description" class="description" :class="{ 'face-verify': index == 2}">-->
            <!--<div v-if="index < 2">{{ item.reviewBy }}</div>-->
            <!--<div v-if="index == 0">{{ item.reviewTime }}</div>-->
            <!--<div v-if="index == 1">-->
            <!--<a @click="hastenWork">催一下</a>-->
            <!--<a @click="perfectInfo">补充</a>-->
            <!--</div>-->
            <!--<div v-if="index == 2">-->
            <!--<el-popover placement="top" title width="180" trigger="hover" v-if="codeUrl">-->
            <!--<q-r-code width="180" height="180" :content="codeUrl"></q-r-code>-->
            <!--<a @click="faceVerify" slot="reference">人脸核验</a>-->
            <!--</el-popover>-->
            <!--<a @click="faceVerify" v-else>人脸核验</a>-->
            <!--</div>-->
            <!--</div>-->
            <!--</el-step>-->
            <!--</el-steps>-->
            <!--</div>-->

            <div class="box-steps" v-if="stepsList && stepsList.length > 0">
              <el-steps :active="active" align-center>
                <el-step :title="item.processInfo" v-for="(item,index) in stepsList" :key="index">

                  <i v-if="item.currentFlag!=0" class="el-icon-loading" slot="icon"></i>

                  <div slot="description" class="description" :class="{ 'face-verify': item.seq==3}">
                    <div v-if="item.reviewResultCode!=0 || item.currentFlag!=0">{{ item.reviewResult }}</div>
                    <div v-if="item.reviewResultCode!=0" >{{ item.reviewTime }}</div>

                    <!--<div v-if="item.seq==2 && item.currentFlag==1">-->
                    <!--<a @click="hastenWork">催一下</a>-->
                    <!--<a @click="perfectInfo">补充</a>-->
                    <!--</div>  -->

                    <div v-if="(item.seq==2 || item.seq==3) && item.currentFlag==1 && item.reviewResultCode==2">
                      <a @click="viewReason(item.reviewOpinion)">原因查看</a>
                    </div>


                    <div v-if="item.seq==3 && item.currentFlag==1">

                      <el-popover placement="top" title width="180" trigger="click" v-if="codeUrl">
                        <q-r-code width="180" height="180" :content="codeUrl"></q-r-code>
                        <a @click="faceVerify" slot="reference">人脸核验</a>
                      </el-popover>
                    </div>
                  </div>
                </el-step>
              </el-steps>
            </div>
          </div>
          <div class="box box-dashed">
            <box-title title="辅助审核说明：" :hideUnderLine="true"></box-title>
            <div class="box-content box-word">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BoxTable from "@/views/home/components/BoxTable";
  import BoxTitle from "@/views/home/components/BoxTitle";
  import QRCode from "@/components/QRCode";
  import { MessageBox } from "element-ui";
  export default {
    name: "",
    components: {
      BoxTable,
      BoxTitle,
      QRCode,
    },
    props: {},
    data() {
      return {
        active: null,
        infoList: [],
        stepsList: [],
        codeUrl: "",
        basicInfo: null,
        loading: false,
        url: {
          // 审核进度-流程图
          getAuditFlow: "/rafssReviewRecord/getAuditFlow",
          // 审核进度-已录入身份信息
          getAuditInfo: "/rafssReviewRecord/getAuditInfo",
          //生成手机人脸识别地址
          getFaceVerificationUrl: "/sys/user/getFaceVerificationUrl",
          //人脸识别状态 轮循
          authQRCodeStatus: "/sys/user/authQRCodeStatus",
          //清空用户角色
          clearApplyRole: "/sys/user/clearApplyRole",
        },
        waitStatusTimer: -1,
      };
    },
    watch: {},
    computed: {},
    methods: {
      // 审核进度-流程图
      getAuditFlow() {
        let params = {};
        this.$api.getAction(this.url.getAuditFlow, params).then((res) => {
          if (res.success) {
            this.stepsList = res.result;
            res.result.forEach((item)=>{
                if(item.currentFlag==1){
                  this.active=item.seq;
                }
              }
            );

            // this.stepsList = this.stepsList.slice(0, 3);
          } else {
            this.$message.error(res.message);
          }
        });
      },
      // 审核进度-已录入身份信息
      getAuditInfo() {
        let params = {};
        this.$api.getAction(this.url.getAuditInfo, params).then((res) => {
          if (res.success) {
            let data = res.result;
            if (data) {
              this.basicInfo = data;
              this.getCodeUrl();
            }
            if(this.$store.state.user.applyRole!="company-user"){
              this.infoList = [
                [
                  "姓名：",
                  data.name,
                  "性别：",
                  data.sexText,
                  "身份证号码：",
                  data.idCardNum,
                  "入学年份：",
                  data.regYear,
                ],
                [
                  "学校名称：",
                  data.originSchool,
                  "学号：",
                  data.stuNo,
                  "所在院系：",
                  data.department,
                  "修读专业：",
                  data.graduated,
                ],
              ];
            }else{
              if(this.$store.state.user.auth!=1){
                  this.infoList = [
                    [
                      "统一社会信用代码：",
                      data.companyCode,
                      "企业名称：",
                      data.companyName,
                      "法定代表人：",
                      data.legalName,
                      "法人身份证号码：",
                      data.legalCardNum,
                    ],
                  ];
              }else{
                  this.infoList=[
                    [
                      "统一社会信用代码：",
                      data.companyCode,
                      "企业名称：",
                      data.companyName,
                      "法定代表人：",
                      data.legalName,
                      "法人身份证号码：",
                      data.legalCardNum,
                    ],
                    [
                      "授权代表姓名：",
                      data.authorizeName,
                      "授权代表身份证号码：",
                      data.authorizeCardNum,
                    ],
                  ];
              }
            }
          } else {
            this.$message.error(res.message);
          }
        });
      },
      getCodeUrl() {
        let idNumber =null;
        let auth = 0;
        if(this.$store.state.user.applyRole!="company-user"){
          idNumber = this.basicInfo.idCardNum;
        }else{
          idNumber =  this.$store.state.user.auth!=1?this.basicInfo.legalCardNum:this.basicInfo.authorizeName;
          auth = this.$store.state.user.auth;
        }
        let time = new Date().getTime();
        let applyRole = this.$store.state.user.applyRole;
        let params = { idNumber,time,auth,applyRole };
        this.$api.getAction(this.url.getFaceVerificationUrl, params).then((res) => {
          this.codeUrl = res.message || res.result;
        });
      },
      // 催办
      hastenWork() {
        // this.$message.success("催办");
      },
      // 补充
      perfectInfo() {
        // this.$message.success("补充");
      },
      //未通过原因
      viewReason(reviewOpinion) {
          const h = this.$createElement;
          this.$msgbox({
            title: '审核原因',
            showClose:false,
            message: h('p', null, [
              h('span', null, reviewOpinion)
            ]),
            showCancelButton: true,
            confirmButtonText: '修改重新提交',
            cancelButtonText: '取消',

            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                this.$api.postAction(this.url.clearApplyRole, null).then((res) => {
                  if (res.success) {
                    this.$store.commit("SET_APPLY_ROLE_TEXT", '');
                    this.$store.commit("SET_APPLY_ROLE", '');
                    this.$router.push({
                      path: this.redirect || "/",
                    });
                  }else {
                    this.$message.error(res.message);
                  }
                });
                done()
              } else {
                done();
              }
            }
          }).catch(e=>e);

        // MessageBox.alert(reviewOpinion, "审核原因",
        //   {
        //     dangerouslyUseHTMLString: true,
        //     customClass: "myAlert",
        //     confirmButtonText: "确认",
        //     cancelButtonText:  "取消",
        //     type: "info",
        //     callback: () => {
        //       console.log("点击");
        //       // that.$router.push({ path: "review-progress" });
        //     },
        //   }
        // );
      },
      // 人脸校验
      faceVerify() {
        this.waitStatusTimer = setInterval(() => {
          setTimeout(() => {
            let that = this;
            let applyRole = this.$store.state.user.applyRole;
            let params = { applyRole };
            this.$api.getAction(this.url.authQRCodeStatus, params).then((res) => {
              if (res.success) {
                let status = res.result.faceScanStatus;
                // 人脸识别状态 ；2 识别未通过，1通过，0未扫描
                if (status != 0) {
                  let flag = status == 1;
                  if(flag){
                    // this.getAuditFlow();
                      MessageBox.alert("人脸识别通过！<br/>即将为您跳转至首页", "温馨提示",
                        {
                          dangerouslyUseHTMLString: true,
                          customClass: "myAlert",
                          confirmButtonText: "确认",
                          type: "success", //success，error，info和warning
                          callback: () => {
                            that.$store.commit("SET_ROLE_BING", "1");
                            that.$router.push({ path: "/" });
                          },
                        }
                      );
                      setTimeout(() => {
                        MessageBox.close();
                        that.$store.commit("SET_ROLE_BING", "1");
                        that.$router.push({ path: "/" });
                      }, 3000);
                  }

                  // else{
                  //   MessageBox.alert("人脸识别未通过！每人每天只能核验三次，请谨慎操作！！", "温馨提示",
                  //     {
                  //       dangerouslyUseHTMLString: true,
                  //       customClass: "myAlert",
                  //       confirmButtonText: "确认",
                  //       type: "error", //success，error，info和warning
                  //       callback: () => {
                  //         console.log("点击");
                  //         // that.$router.push({ path: "review-progress" });
                  //       },
                  //     }
                  //   );
                  // }
                  //停止
                    clearInterval(that.waitStatusTimer);
                }
              }
            });
          }, 0);
        }, 6000);
      },
    },
    created() {
      clearInterval(this.waitStatusTimer);
      //
      if(this.$store.state.user.roleBing!=0){
        this.$router.push({ path: "/" });
      }
      if(this.$store.state.user.applyRole==""){
        this.$router.push({
          path: this.redirect || "/",
        });
      }
      // 审核进度-流程图
      this.getAuditFlow();
      // 审核进度-已录入身份信息
      this.getAuditInfo();
    },
    beforeDestroy() {
      clearInterval(this.waitStatusTimer);
    },
    mounted() {},
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/mixin.scss";
  @import "@/assets/scss/variable.scss";
  .select-role-wrapper {
    width: 80%;
    min-width: 1100px;
    margin: 30px auto;
    color: #fff;
  }
  a {
    color: $blue;
  }
  .base {
    @include border-shadow;
    .title {
      @include flex;
      height: 100px;
      background: $blue;
      justify-content: flex-start;
      text-align: left;
      padding: 0 20px;
      border-radius: 4px 4px 0 0;
      font-size: 18px;
    }
    .main {
      position: relative;
      .box {
        @include border-shadow;
        width: 92%;
        margin: 20px auto;
      }
      .box-dashed {
        border: 2px dashed #f6ad62;
        border-radius: 0;
      }
    }
    .box-steps {
      position: relative;
      margin: 50px auto;
      width: 100%;
    }
    .box-word {
      color: #000;
      font-size: 14px;
      margin: 20px 20px 30px;
      text-align: left;
    }
    .description {
      height: 60px;
      line-height: 30px;
      margin-top: 20px;
      color: #000;
    }
    .face-verify {
      line-height: 30px;
    }
    .step-icon {
      width: 5px;
      height: 5px;
      border: 1px solid #ccc;
      background-color: #ccc;
      border-radius: 10px;
    }
    .is-finish {
      .step-icon {
        border: 1px solid $blue;
        background-color: $blue;
      }
    }
    .is-process {
      .step-icon {
        border: 1px solid #303133;
        background-color: #303133;
      }
    }
    /deep/ .el-step__icon {
      border: none !important;
    }
    /deep/ .is-process {
      color: #c5c5c5;
    }
  }
</style>
