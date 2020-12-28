<template>
  <div>
    <div class="home-page" v-if="!pageFlag">
      <div class="home-header">
        <div class="left">
          <div class="top">
            <div class="user-avatar">
              <!-- <img :src="baseURL + avatar" width="50" alt v-if="avatar"/> -->
              <img :src="avatar" alt v-if="avatar" />
              <img src="~@/assets/img/home/header/default-avatar.png" alt v-if="!avatar" />
            </div>
            <div
              class="welcome-text"
            >{{ $store.state.user.realname || $store.state.user.name }} ，您好!</div>
          </div>
          <div class="bottom">
            <div class="status-list">
              <div class="status-div">
                <div class="number applying">
                  <!--    <count-in :startVal='0' :endVal='100.11' :speed='3000' :decimals="1" :isReverse=false />-->
                  <count-in
                    :startVal="0"
                    :endVal="applyingNumber"
                    :speed="0.1"
                    :decimals="3"
                    :isReverse="false"
                    v-if="countInFlag.applying"
                  />
                </div>
                <div class="text">申请中</div>
              </div>
              <div class="division-line"></div>
              <div class="status-div">
                <div class="number processing">
                  <!-- <count-in :startVal='0' :endVal='100' :speed='1' :decimals="3" :isReverse=false /> -->
                  <count-in
                    :startVal="0"
                    :endVal="handingNumber"
                    :speed="0.1"
                    :decimals="3"
                    :isReverse="false"
                    v-if="countInFlag.handing"
                  />
                </div>
                <div class="text">处理中</div>
              </div>
              <div class="division-line"></div>
              <div class="status-div">
                <div class="number sent">
                  <count-in
                    :startVal="0"
                    :endVal="sentNumber"
                    :speed="0.1"
                    :decimals="3"
                    :isReverse="false"
                    v-if="countInFlag.sent"
                  />
                </div>
                <div class="text">处理完成</div>
              </div>
              <div class="division-line"></div>
              <div class="status-div">
                <div class="number refuse">
                  <count-in
                    :startVal="0"
                    :endVal="refuseNumber"
                    :speed="0.1"
                    :decimals="3"
                    :isReverse="false"
                    v-if="countInFlag.refuse"
                  />
                </div>
                <div class="text">拒绝</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <!--  校内教职工注册后，首次登录，需进行【信息完善】，包括：姓名、员工号、部门。 -->
          <div class="appointment-btn" @click="perfectInfoClick" v-if="perfectInfoFlag">
            {{ staffInfoTitle }}
          </div>
          <div class="appointment-btn" @click="appointmentClick" v-if="showRightBtnFlag">一键预约</div>
        </div>
      </div>
      <!-- 计数器 -->
      <div class="home-main">
        <div class="left">
          <div class="apply-title">
            <div class="title-text">最近申请记录</div>
            <!--先注释-->
            <!--<div class="more pointer" @click="moreClick">-->
              <!--&lt;!&ndash; \src\assets\img\home\page &ndash;&gt;-->
              <!--更多-->
              <!--<div class="logo">-->
                <!--<img src="~@/assets/img/home/page/more-logo.png" />-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <div class="apply-list">
            <!-- 申请记录列表 -->
            <basic-list :list="applyList" @operate="listOperate" @itemClick="listItemClick"></basic-list>
          </div>
        </div>
        <div class="right">
          <div class="progress-title" @click="next">办理进度</div>
          <advanced-steps :list="progressList" :active="progressActive"></advanced-steps>
        </div>
      </div>
    </div>
    <div v-if="pageFlag == 'check'">
      <reservation-detail
        :title="detailTitle"
        :detailObj="detailObj"
        :expressInfo="expressInfo"
        :detailTableList="detailTableList"
        @close="closeChildPage"
      ></reservation-detail>
    </div>
    <div v-if="pageFlag == 'apply'">
      <appointment-apply @close="closeChildPage"></appointment-apply>
    </div>
    <message-box
      ref="messageBox"
    ></message-box>
    <!-- 教职工信息完善 -->
    <staff-info-modal
      ref="register"
      :onlyReady="reviewStatus == '1'"
      :personalInfo="personalInfo"
      v-if="staffInfoVisible"
      :title="staffInfoTitle"
      :visible.sync="staffInfoVisible"
      @ok="updatePerfectInfoFlag"
    ></staff-info-modal>
    <type-modal
      v-if="typeModalVisible"
      :visible.sync="typeModalVisible"
      :list="reserveTypeList"
      @click="typeModalClick"
    ></type-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { istudentInfo, istudentFlag } from "@/config/istudent.config.js";
import BasicList from "@/views/home/components/BasicList";
import AdvancedSteps from "@/views/home/components/AdvancedSteps";
import ReservationDetail from "@/views/home/components/ReservationDetail";
import AppointmentApply from "@/views/home/components/AppointmentApply";
import StaffInfoModal from '@/views/home/modules/StaffInfoModal'
import TypeModal from '@/views/home/modules/TypeModal'
import CountIn from "@/views/home/components/CountIn";
import MessageBox from '@/views/home/components/MessageBox'

export default {
  name: "HomePage",
  components: {
    BasicList,
    AdvancedSteps,
    ReservationDetail,
    AppointmentApply,
    StaffInfoModal,
    TypeModal,
    CountIn,
    MessageBox,
  },
  props: {},
  data() {
    return {
      istudentInfo: istudentInfo[istudentFlag],
      istudentFlag,
      staffInfoVisible: false,//校内教职工，信息完善的弹框
      typeModalVisible: false,//选择预约类型的弹框
      personalInfo: null,
      applyList: [],
      perfectInfoBtnFlag: false,
      reserveTypeList: [
        {
          value: "INSTRUMENT",
          text: "文书类",
        },
        {
          value: "PERSONNEL",
          text: "人事类",
        },
        {
          value: "ACCOUNTING",
          text: "财会类",
        },
      ],
      reserveTypeId: "",
      progressList: [
        /*  {
          title: "审核提交",
          time: "2020-08-18    22：50：56",
          statusText: "已提交",
          state: 1,
          remarks: "审核意见：审核通过",
        },
        {
          title: "单位领导审核",
          time: "2020-08-18    22：50：56",
          statusText: "审核通过",
          state: 1,
          remarks: "审核意见：审核通过",
        },
        {
          title: "馆长审核",
          time: "2020-08-18    22：50：56",
          statusText: "等待审核",
          state: 0,
          remarks: "",
        },
        {
          title: "等待审核",
          time: "",
          statusText: "",
          state: 0,
          remarks: "",
        }, */
      ],
      progressActive: 1,
      pageFlag: "",
      detailTableList: [],
      detailTitle: "",
      detailObj: null,
      expressInfo: null,
      url: {
        checkDetailReviewRecord: "/homePage/checkDetailReviewRecord", //审批进度
        getExpressInformation: "/homePage/getExpressInformation", //查档内容快递信息
        getRecentReservationRecord: "/homePage/getRecentReservationRecord", //最近申请记录
        getReservationList: "/homePage/getReservationList", //获取预约状态列表
        addCb: "/reservation/reservation/addCb",//催办信息-添加
        getUrgeData: "reservation/reservation/getUrgeData",//查看回复
        downloads: "/reservation/reservation/downloads",//结果下载接口
        getPersonalInfo: "/personalInfo/getPersonalInfo",//查看信息
      },
      countInFlag: {
        applying: false,
        handing: false,
        sent: false,
        refuse: false,
      },
      applyingNumber: 0,
      handingNumber: 0,
      sentNumber: 0,
      refuseNumber: 0,
      hastenFlag: false,
      replyFlag: false,
      imgerver: window._CONFIG['BASE_API'] + '/sys/common/view/',
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["avatar","reviewStatus"]),
    perfectInfoFlag(){
      return this.istudentFlag == 'BUU-INTRANET'
    },
    showRightBtnFlag(){
      let flag = false;
      if(this.istudentFlag == 'BUU-INTRANET' || this.istudentFlag == 'BUU-EXTRANET'){
        flag = true;
      }else if(this.reviewStatus == '1'){
        flag = true;
      }
      return flag
    },
    staffInfoTitle(){
      return this.reviewStatus == '1' ?  '信息查看': '信息完善';
    }
  },
  methods: {
    // downloadResult(id){
    //   let params = { id }
    //   this.$api.getAction(this.url.downloads, params).then((data) => {
    //
    //     debugger
    //     console.log(data);
    //         // this.confirmLoading = false;
    //     if (!data) {
    //       this.$message.warning("文件下载失败")
    //       return
    //     }
    //     if (typeof window.navigator.msSaveBlob !== 'undefined') {
    //       window.navigator.msSaveBlob(new Blob([data]), name )
    //     } else {
    //       let url = window.URL.createObjectURL(new Blob([data]))
    //       let link = document.createElement('a')
    //       link.style.display = 'none'
    //       link.href = url
    //       link.setAttribute('download', visaPrintTableTypeName )
    //       document.body.appendChild(link)
    //       link.click()
    //       document.body.removeChild(link); //下载完成移除元素
    //       window.URL.revokeObjectURL(url); //释放掉blob对象
    //     }
    //   })
    // },
    viewRes(feedbackurl) {
        const url = this.imgerver+feedbackurl+'?t='+new Date().getTime();
        window.open(url, "_blank")
    },
    lookTheReply(id,blStatusType){
      this.$refs.messageBox.show(id,blStatusType);
    },
    addCb(item){
      let httpurl=this.url.addCb;
      let formData=item;
      let method="post";
      this.hastenFlag = true;
      this.$api.httpAction(httpurl,formData,method).then((res)=>{
        this.hastenFlag = false;
        if(res.success){
          this.$message.success('催办成功！');
          item.isUrge = '1';
        }else{
          this.$message.warning(res.message);
        }
      });
    },
    //审批进度
    checkDetailReviewRecord(reservationId) {
      let params = { reservationId };
      this.$api
        .getAction(this.url.checkDetailReviewRecord, params)
        .then((res) => {
          if (res.success) {
            this.detailTableList = res.result;
            /* 办理进度的页面 */
            this.progressList = [];
            this.detailTableList.forEach((item, index) => {
              let obj = {
                title: item.processInfo,
                time: item.createTime,
                statusText: item.reviewResult,
                state: index == this.detailTableList.length - 1 ? 0 : 1,
                remarks: item.reviewOpinion,
              };
              this.progressList.push(obj);
            });
          } else {
            this.$message.warning(res.message);
          }
        });
    },
    //查档内容快递信息
    getExpressInformation(id) {
      let params = { id };
      this.$api
        .getAction(this.url.getExpressInformation, params)
        .then((res) => {
          if (res.success) {
            this.expressInfo = res.result;
          } else {
            this.$message.warning(res.message);
          }
        });
    },
    //最近申请记录
    getRecentReservationRecord() {
      let params = {};
      this.$api
        .getAction(this.url.getRecentReservationRecord, params)
        .then((res) => {
          if (res.success) {
            this.applyList = res.result;
            if (this.applyList && this.applyList.length > 0) {
              let id = this.applyList[0].id;
              this.checkDetailReviewRecord(id);
            }
          } else {
            this.$message.warning(res.message);
          }
        });
    },
    //获取预约状态列表
    getReservationList() {
      let params = {};
      this.$api.getAction(this.url.getReservationList, params).then((res) => {
        let result = res.result;
        if (res.success && res.result) {
          this.applyingNumber = result.applying;
          this.handingNumber = result.handing;
          this.sentNumber = result.sent;
          this.refuseNumber = result.refuse;
        }
        this.countInFlag = {
          applying: true,
          handing: true,
          sent: true,
          refuse: true,
        };
      });
    },
    next() {
      if (this.active++ > 4) this.active = 0;
    },
    updatePerfectInfoFlag(flag){
      this.$store.commit('SET_REVIEW_STATUS', '1');
    },
    perfectInfoClick(){
      if(this.reviewStatus == '1'){
        if(this.personalInfo){
          this.staffInfoVisible = true;
          return;
        }
      // 校内教职工注册后，首次登录，需进行【信息完善】，包括：姓名、员工号、部门。
        let params = {}
        this.$api.getAction(this.url.getPersonalInfo, params).then((res) => {
          if (res.success){
            this.personalInfo = res.result;
          }
          this.staffInfoVisible = true;
        })
      }else{
        this.staffInfoVisible = true;
      }
    },
    typeModalClick(item){
      this.reserveTypeId = item.value;
      this.$store.commit("SET_RESERVE_TYPE_ID", item.value);
      this.pageFlag = "apply";
    },
    appointmentClick() {
      if(this.istudentFlag == 'BUU-INTRANET'){
      // 校内教职工注册后，首次登录，需进行【信息完善】，包括：姓名、员工号、部门。
        if(this.reviewStatus != '1')this.$message.warning('请进行信息完善');
        else this.typeModalVisible = true;
      }else{
        setTimeout(() => {
          this.pageFlag = "apply";
        }, 300);
      }
    },
    moreClick() {
      // this.$message.success("更多");
    },
    listItemClick(item) {
      this.checkDetailReviewRecord(item.id);
    },
    listOperate(obj) {
      const { type, item } = obj;
      //hasten 催办
      //check 查看
      //reply 查看回复
      switch (type) {
        case 'hasten':
          if(this.hastenFlag)return;
          this.addCb(item);
          break;
        case "check":
          let content = item.content || "";
          let purpose = item.purpose || "";
          this.detailTitle =
            "查档内容：" + content + "\u0009\u0009\u0009利用目的：" + purpose;
          this.detailObj = item;
          this.pageFlag = type;
          //查档内容快递信息
          // this.getExpressInformation(item.id);
          //审批进度
          this.checkDetailReviewRecord(item.id);
          break;
        case 'reply':
          if(this.replyFlag)return;
          // 查看回复
          this.lookTheReply(item.id,item.blStatusType);
          break;
        case 'viewRes':
          this.viewRes(item.feedbackurl);
        default:
          break;
      }
    },
    closeChildPage() {
      this.pageFlag = "";
      this.initData();
    },
    initData() {
      /* 初始化滚动数组的状态，解决数值不刷新的问题 */
      this.countInFlag = {
        applying: false,
        handing: false,
        sent: false,
        refuse: false,
      };
      //最近申请记录
      this.getRecentReservationRecord();
      //获取预约状态列表
      this.getReservationList();
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
.home-page {
  width: 85%;
  margin: 0 auto;
  .home-header {
    @include flex;
    width: 100%;
    background: url("/static/img/home/banner.png");
    background-repeat: no-repeat;
    padding-bottom: 2.5%;
    background-size: 100% 99%;
    margin-top: 10px;
    color: #fff;
    .left {
      width: 50%;
      .top {
        @include flex;
        justify-content: flex-start;
        padding: 4% 11%;
        .user-avatar {
          position: relative;
          border-radius: 100%;
          width: 88px;
          height: 88px;
          img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            margin: auto;
            border-radius: 100%;
          }
        }
        .welcome-text {
          font-size: 30px;
          font-weight: bolder;
          min-width: 120px;
          color: #fff;
          text-align: left;
          margin-left: 3%;
        }
      }
      .bottom {
        @include flex;
        justify-content: flex-start;
        margin-left: 18.5%;
        margin-top: -1%;
        .status-list {
          @include flex;
          & > div {
            margin-right: 25px;
          }
          .status-div {
            width: 110px;
            .number {
              font-size: 36px;
              font-weight: bold;
              margin-bottom: 6px;
              height: 40px;
            }
            .text {
              font-size: 18px;
              font-weight: 400;
            }
          }
          .division-line {
            width: 1px;
            height: 40px;
            background: rgba(255, 255, 255, 1);
            margin-top: 18px;
          }
          .applying {
            color: #00d8ff;
          }
          .processing {
            color: #da9328;
          }
          .sent {
            color: #87cb66;
          }
          .refuse {
            color: #ff4e0d;
          }
        }
      }
    }
    .right {
      @include flex;
      width: 50%;
      // padding-right: 7.5%;
      margin-top: 3%;
      .appointment-btn {
        position: relative;
        width: 180px;
        height: 52px;
        line-height: 52px;
        margin-left: 30px;
        background: rgba(255, 255, 255, 1);
        // box-shadow: 0px 0px 13px 0px rgba(18, 18, 18, 0.52);
        border-radius: 12px;
        color: #2c62f2;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0px 6px 0px #2c62f2, 0px 9px 25px rgba(0, 0, 0, 0.7);
        -webkit-transition: all 0.1s ease;
        -moz-transition: all 0.1s ease;
        transition: all 0.1s ease;
      }

      .appointment-btn:active {
        position: relative;
        box-shadow: 0px 3px 0px #2c62f2, 0px 3px 6px rgba(0, 0, 0, 0.9);
        // box-shadow: 0px 0px 13px 0px rgba(18, 18, 18, 0.52);
        top: 2px;
      }
    }
  }
  .home-main {
    width: 100%;
    @include flex;
    justify-content: space-around;
    align-items: self-start;
    margin-top: 10px;
    padding-bottom: 20px;
    height: 50vh;
    .left {
      @include border-shadow;
      background: #fff;
      width: 69.5%;
      height: 100%;
      padding-bottom: 20px;
      overflow-x: hidden;
      overflow-y: auto;
      .apply-title {
        @include flex;
        justify-content: space-between;
        margin: 15px 0;
        padding: 0 2% 0 2.5%;
        .title-text {
          font-size: 20px;
          font-weight: 500;
        }
        .more {
          @include flex;
          .text {
          }
          .logo {
            width: 24px;
            height: 24px;
          }
        }
      }
      .apply-list {
        width: 96%;
        margin: 0 auto;
      }
    }
    .right {
      @include border-shadow;
      background: #fff;
      width: 27%;
      height: 100%;
      padding-bottom: 20px;
      overflow-x: hidden;
      overflow-y: auto;
      .progress-title {
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        margin-top: 20px;
      }
    }
  }
}

@media only screen and (max-width: 1500px) {
  .home-main {
    height: 42vh !important;
  }
}
</style>
