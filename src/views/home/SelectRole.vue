<template>
  <div>
    <div class="select-role-wrapper">
      <div class="base">
        <div class="title">
          <span>档案预约系统，现已经集成如下用户角色，请选择您要关联的角色信息</span>
          <!--<span v-if="applyRole!=null">您已经关联角色{{applyRoleText}}，请耐心等待审核通过！</span>-->
          <span></span>
        </div>
        <div class="text-box">
          <div class="text-logo" @click="tipsDialogVisible = true">
            <img title="点击查看预约须知！！" src="~@/assets/img/home/logo/question-mark.svg" alt />
          </div>
        </div>
        <div class="list">
          <div
            v-for="(item, index) in userTypeList"
            class="item pointer UpbelowYY hover-magnify SlowAlterBac"
            :key="index"
            @click="perfectInfoClick(item)"
          >
            <div class="logo">
              <img :src="'/static/img/role/' + item.logo + '.svg'" alt />
            </div>
            <div class="text">{{ item.text }}</div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <perfect-info ref="perfectInfo" v-if="perfectInfoVisible" :visible.sync="perfectInfoVisible"></perfect-info>
    <perfect-info-buu ref="perfectInfoBuu" v-if="perfectInfoBuuVisible" :visible.sync="perfectInfoBuuVisible"></perfect-info-buu>
    <el-dialog
      title="预约须知"
      :visible.sync="tipsDialogVisible"
      width="70%"
      center>
      <div class="tips-html">
        <div v-html="item.yyxz" v-for="(item, index) in yyxzList" :key="index"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tipsDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { istudentInfo, istudentFlag } from "@/config/istudent.config.js";
import { MessageBox } from "element-ui";
import PerfectInfo from "@/views/home/modules/PerfectInfo";
import PerfectInfoBuu from "@/views/home/modules/PerfectInfoBuu";
import { getYyxz } from "@/http/reservation";

const baseTypeList = [
  {
    value: "school-user",
    text: "在校生用户",
    logo: "school-user",
  },
  {
    value: "company-user",
    text: "企业用户",
    logo: "company-user",
  },
  {
    value: "alumni-user",
    text: "校友用户",
    logo: "alumni-user",
  },
  {
    value: "staff",
    text: "教职工",
    logo: "staff",
  },
]

const buuTypeList = [
  {
    value: "school-user",
    text: "在校生用户",
    logo: "school-user",
  },
  {
    value: "alumni-user",
    text: "校友用户",
    logo: "alumni-user",
  },
]

export default {
  name: "",
  components: {
    PerfectInfo,
    PerfectInfoBuu,
  },
  props: {},
  data() {
    return {
      perfectInfoVisible: false,
      perfectInfoBuuVisible: false,
      istudentInfo: istudentInfo[istudentFlag],
      istudentFlag,
      userTypeList: [],
      tipsDialogVisible: false,
      yyxzList: [],
      url: {
        regRoleUp: "/sys/user/regRoleUp",
      }
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["applyRole"]),
    buuFlag(){
      return this.istudentFlag == 'BUU-EXTRANET';
    }
  },
  methods: {
    perfectInfoClick(item) {
      if (item.TBE) {
        this.$message.warning("暂未开放，敬请期待!");
        return;
      }
      if (this.applyRole) {
        let obj = this.userTypeList.find(
          (element) => element.value == this.applyRole
        );
        let roleNameText = "";
        if (obj) roleNameText = obj.text;
        if (this.applyRole == item.value) {
          this.showPerfectInfo(item);
        } else {
          this.$message.warning("您已经关联角色: " + roleNameText);
        }
        return;
      }
      this.showPerfectInfo(item);
    },
    regRoleUp(item) {
      let httpurl = this.url.regRoleUp;
      let formData = {
        applyRole: item.value, //角色
        applyRoleText: item.text, //角色名称
        roleUpType: this.istudentFlag,
      };
      let method = "post";
      this.$api.httpAction(httpurl, formData, method).then((res) => {
        if (res.success) {
          this.$message.success("您已经关联角色: " +   item.text);
          this.$store.commit("SET_ROLE_BING", "1");
        } else {
        }
      });
    },
    showPerfectInfo(item) {
      if(this.buuFlag){
        this.perfectInfoBuuVisible = true;
        this.$nextTick(() => {
          this.$refs["perfectInfoBuu"].initUserRoleType(item);
        });
      }else{
        this.perfectInfoVisible = true;
        this.$nextTick(() => {
          this.$refs["perfectInfo"].initUserRoleType(item);
        });
      }
    },
    toRProgress() {
      if (this.applyRole) {
        this.$router.push({ path: "review-progress" });
      }
    },
    getYyxzData() {
      getYyxz({ t: new Date().getTime() })
        .then((response) => {
          if (response.success) {
            this.yyxzList = response.result.yyxzList;
            if (this.yyxzList.length == 0) {
              this.yyxzList = [{ yyxz: "未上传预约须知" }];
            }
            this.tipsDialogVisible = true;
          }
        })
        .catch(() => {});
    },
    initData(){
      if(this.buuFlag){
        this.userTypeList = buuTypeList;
      }else{
        this.userTypeList = baseTypeList;
      }
    },
  },
  created() {
    this.initData();
    this.getYyxzData();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/variable.scss";
.tips-html{
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(55vh - 120px);
  padding: 20px;
}
 .text-box {
    @include flex;
    justify-content: flex-end;
    .text-logo {
      width: 49px;
      width: 49px;
      margin-right: 10px;
      margin-top: 10px;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
}
.select-role-wrapper {
  width: 80%;
  margin: 30px auto;
  color: #fff;
}
.base {
  @include border-shadow;
  .title {
    @include flex;
    height: 100px;
    background: $blue;
    justify-content: flex-start;
    padding: 0 20px;
    border-radius: 4px 4px 0 0;
    font-size: 18px;
  }
  .list {
    position: relative;
    // display: inline-block;
    width: 99.5%;
    padding: 2%;
    padding-top: 0;
    .item {
      position: relative;
      width: 22%;
      padding: 2% 0;
      margin: 1%;
      @include flex;
      @include border-shadow;
      justify-content: space-evenly;
      float: left;
      // transform: all .6s linear;
      overflow: hidden;
      .logo {
        width: 30%;
        img {
          width: 100%;
        }
      }
      .text {
        font-weight: bolder;
        color: #b5b5b5;
        font-size: 28px;
      }
      &:hover {
        .text {
          color: $blue;
        }
      }
    }
  }
}
</style>
