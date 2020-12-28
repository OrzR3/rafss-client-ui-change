<template>
  <div class="reservation-detail">
    <div class="back-btn">
      <!-- <el-button type="primary" icon="el-icon-arrow-left" @click="backClick"></el-button> -->
      <a @click="backClick">
        <i class="el-icon-arrow-left"></i>返回
      </a>
    </div>
    <div class="box">
      <box-title title="预约申请"></box-title>
      <div class="box-content">
        <div class="box-form">
          <appointment-form ref="appointmentForm" :applyRole="applyRole" :showFormTitle="true" :setTimeOutFlag="true" @loading="loadTypeChange" @complete="backClick"></appointment-form>
          <div class="submit-btn">
            <el-button type="primary" @click="submit" v-loading="loading">完成并提交</el-button>
          </div>
        </div>
        <!-- tips-mark.svg -->
        <div
          class="text-box align-start"
          :class="{ 'company-text-box': applyRole == 'company-user', 'hide-box': yyxzList.length == 0 }"
        >
          <div class="text-title">
            <div class="text-logo">
              <img src="~@/assets/img/home/logo/tips-mark.svg" alt />
            </div>
            <div>预约须知</div>
          </div>
          <div class="text-right">
            <div v-html="item.yyxz || item.text" v-for="(item, index) in yyxzList" :key="index"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { istudentInfo, istudentFlag } from "@/config/istudent.config.js";
import BoxTitle from "@/views/home/components/BoxTitle";
import AppointmentForm from '@/views/home/components/AppointmentForm'
import { getYyxz } from "@/http/reservation";

export default {
  name: "AppointmentApply",
  components: {
    BoxTitle,
    AppointmentForm,
  },
  props: {},
  data() {
    return {
      istudentInfo: istudentInfo[istudentFlag],
      istudentFlag,
      yyxzList: [],
      loading: false,
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["applyRole", "reserveTypeId"]),
  },
  methods: {
    submit(){
      this.$refs['appointmentForm'].submitForm();
    },
    backClick() {
      this.$emit("close");
    },
    loadTypeChange(type){
      this.loading = type;
    },
    getYyxzData() {
      let name = "rafss_yyxz,yyxz,id";
      if(this.istudentFlag == 'BUU-EXTRANET'){
        name += ",applicable='" + this.istudentFlag + "'";
      }else if(this.istudentFlag == 'BUU-INTRANET' && this.reserveTypeId){
        name += ",applicable='" + this.reserveTypeId + "'";
      }
      this.$api.getDictItems(name).then(res => {
        if (res.result) {
          this.yyxzList = res.result;
        }
      });
    },
  },
  created() {
    this.getYyxzData();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/variable.scss";
.reservation-detail {
  width: 85%;
  margin: 20px auto;
  .back-btn {
    text-align: left;
    a {
      color: $blue;
    }
  }
  .box {
    @include border-shadow;
    width: 100%;
    margin: 20px auto;
    .box-form {
      width: 50%;
      margin: 50px auto;
    }
  }
}
.box-content {
  @include flex;
  align-items: flex-start;
}
.margin-bottom {
  margin-bottom: 1rem;
}

.text-box {
  @include border-shadow;
  width: 37.5%;
  height: 55vh;
  margin: 20px auto;
  .text-right {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(55vh - 120px);
    padding: 20px;
  }
}

.company-text-box {
  height: 85vh;
  .text-right {
    height: calc(85vh - 120px);
  }
}

.text-title {
  @include flex;
  text-align: left;
  justify-content: flex-start;
  padding: 20px;
  font-size: 20px;
  .text-logo {
    width: 30px;
    height: 30px;
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
.align-start {
  align-items: start !important;
}
.hide-box{
  visibility: hidden;
}
@media only screen and (max-width: 1500px) {
  .box-form {
    margin-bottom: 20px !important;
  }
  .text-box {
    height: 65vh;
    .text-right {
      height: calc(65vh - 120px);
      padding: 20px;
    }
  }
  .company-text-box {
    height: 90vh;
    .text-right {
      height: calc(90vh - 120px);
    }
  }
}
</style>
