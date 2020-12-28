<template>
  <div class="reservation-detail">
    <div class="back-btn">
      <!-- <el-button type="primary" icon="el-icon-arrow-left" @click="backClick"></el-button> -->
      <a  @click="backClick">
        <i class="el-icon-arrow-left"></i>返回
      </a>
    </div>
    <div class="box">
      <box-title :title="title"></box-title>
      <div class="box-text">
        <div><span>查档分类：</span>{{ detailObj.categoryDa }}</div>
        <div><span>查档内容：</span>{{ detailObj.content }}</div>
      </div>
      <div class="box-text">
        <div><span>利用目的：</span>{{ detailObj.purpose }}</div>
        <div><span>取档方式：</span>{{ detailObj.qdfs }}</div>
      </div>
      <div v-if="detailObj.qdfs=='邮寄'" class="box-text">
        <div><span>快递公司：</span>{{ detailObj.courierCompany }}</div>
        <div><span>快递单号：</span>{{ detailObj.courierNum }}</div>
      </div>
      <div class="box-textarea">
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8}"
          placeholder="请输入内容"
          :readonly="true"
          v-model="detailObj.remarks"
        ></el-input>
      </div>
    </div>
    <div class="box">
      <box-title title="审批进度"></box-title>
      <div class="box-table">
        <el-table :data="detailTableList" style="width: 100%">
          <el-table-column prop="processInfo" label="状态"></el-table-column>
          <el-table-column prop="reviewBy" label="处理人"></el-table-column>
          <el-table-column prop="reviewTime" label="处理时间"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import BoxTitle from "@/views/home/components/BoxTitle";

export default {
  name: "ReservationDetail",
  components: {
    BoxTitle,
  },
  props: {
    title:{
      type: String,
      default: ""
    },
    expressInfo:{
      type: Object,
      default:()=>{
        return {
          courierCompany: "",
          courierNum: ""
        }
      }
    },
    detailObj:{
      type: Object,
      default: ()=>{
        return {
          remarks: ""
        }
      }
    },
    detailTableList: {
      type: Array,
      default: () => {
        return [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ];
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    backClick() {
      this.$emit("close");
    },
  },
  created() {},
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
    .box-text {
      @include flex;
      justify-content: flex-start;
      height: 30px;
      width: 80%;
      margin: 10px auto;
      text-align: left;
      div{
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span{
        /*margin: 20px 20px ;*/
      }
    }
    .box-textarea {
      width: 80%;
      margin: 0 auto 50px;
    }
    .box-table {
      width: 95%;
      margin: 50px auto;
    }
  }
}
</style>
