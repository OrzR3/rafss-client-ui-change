<template>
  <div class="basic-list" v-if="list && list.length > 0">
    <div class="item wave-magnify" v-for="(item, index) in list" :key="index" @click="itemClick(item)">
      <div class="info">
        <div class="info-text">
          <div class="info-text-item">
            <div class="text-item-top">查档内容：{{ item.content }}</div>
            <div class="text-item-bottom">提交时间：{{ item.createTime }}</div>
          </div>
          <div class="info-text-item">
            <div class="text-item-top">利用目的：{{ item.purpose }}</div>
            <div class="text-item-bottom">备注：{{ item.remarks }}</div>
          </div>
          <!--<div class="info-text-item">-->
            <!--<div class="text-item-top">取档方式：{{ item.qdfs }}</div>-->
          <!--</div>-->
        </div>
        <div class="info-status submitted" v-if="item.blStatusType == '1'">已提交</div>
        <div class="info-status sent" v-if="item.blStatusType == '4' && item.qdfs=='邮寄' ">已发送</div>
        <div class="info-status sent" v-else-if="item.blStatusType == '4'">可取</div>
        <div class="info-status progressing" v-if="item.blStatusType == '2' || item.blStatusType == '3'">处理中</div>
        <div class="info-status refuse" v-if="item.blStatusType == '9'">拒绝受理</div>
        </div>
      <div class="operate">
        <div class="hasten operate-item" :class="{'grey-btn': item.isUrge== '1' || item.blStatusType=='9' || item.blStatusType=='4' }"  @click.stop="operate('hasten', item)">催办</div>
        <div class="division-operate"   v-if="item.blStatusType == '4'"></div>
        <div class="check operate-item" v-if="item.blStatusType == '4'" @click.stop="operate('check', item)">查看</div>
        <div class="division-operate"   v-if="item.feedbackurl!= null && item.feedbackurl!='' "></div>
        <div class="check operate-item" v-if="item.feedbackurl!= null && item.feedbackurl!='' " @click.stop="operate('viewRes', item)">结果查看</div>
        <div class="division-operate"></div>
        <div class="reply operate-item" v-if="item.blStatusType != '9' && item.blStatusType != '4'" @click.stop="operate('reply', item)">联系老师</div>
        <div class="reply operate-item" v-if="item.blStatusType == '9' || item.blStatusType == '4'" @click.stop="operate('reply', item)">沟通记录</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    list: {
      type: Array,
      defatult: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    operate(type, item) {
      if(type == 'hasten' && (item.isUrge== '1' || item.blStatusType=='9' || item.blStatusType=='4'))return;
      this.$emit("operate", { type, item });
    },
    itemClick(item){
      this.$emit("itemClick", item);
    }
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/variable.scss";
.basic-list {
  .item {
    @include flex;
    justify-content: space-between;
    padding: 0 2%;
    height: 84px;
    border: 2px solid #cccccc;
    border-radius: 8px;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover{
      border: 2px solid #2C62F2;
    }
    .info {
      @include flex;
      .info-text {
        @include flex;
        justify-content: flex-start;
        .info-text-item {
          text-align: left;
          line-height: 30px;
          margin-right: 25px;
          width: 230px;
          &>div {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .text-item-top {
            color: #3c3c3c;
            font-size: 16px;
          }
          .text-item-bottom {
            color: #aaaaaa;
            font-size: 14px;
          }
        }
      }
      .info-status {
        position: relative;
        min-width: 68px;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        border-radius: 5px;
      }
      .submitted {
        color: #2c62f2;
        background: #e9effe;
        border: 1px solid #2c62f2;
      }
      .sent {
        color: #5cb72f;
        background: #eef8ea;
        border: 1px solid #5cb72f;
      }
      .progressing {
        color: #da9328;
        background: #fbf4e9;
        border: 1px solid #da9328;
      }
      .refuse {
        color: #ff3000;
        background: #fbf4e9;
        border: 1px solid #da2000;
      }
    }
    .operate {
      @include flex;
      & > div {
        margin-right: 8px;
      }
      .operate-item{
        cursor: pointer;
        &:hover{
          transform:scale(1.1);
        }
      }
      .division-operate {
        width: 1px;
        height: 13px;
        background: rgba(221, 221, 221, 1);
      }
      .hasten {
        color: #2c62f2;
      }
      .check {
        color: #da9328;
      }
      .reply {
        color: #5cb72f;
      }
      .grey-btn{
        color: #aaaaaa;
        &:hover{
          transform:scale(1.0);
        }
      }
    }
  }
}
@media only screen and (max-width: 1500px) {
  .info-text-item  {
    margin-right: 15px !important;
    width: 140px !important;
    &:first-child{
      width: 180px !important;
    }
    .text-item-top {
      font-size: 14px !important;
    }
    .text-item-bottom {
      font-size: 12px !important;
    }
  }
}
</style>
