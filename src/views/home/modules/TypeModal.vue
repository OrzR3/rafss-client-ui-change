<template>
  <el-dialog
    :visible.sync="visible"
    :show-close="false"
    width="400px"
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
      <div v-for="(item, index) in list" :key="index">
        <el-button type="primary" @click="listItemClick(item)" class="list-btn">{{ item.text }}</el-button>
      </div>
    </div>
    <!--  <div slot="footer" class="buttons-wrap" v-if="!onlyReady">
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
    </div> -->
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
    list: {
      type: Array,
      default: ()=>{
        return []
      }
    }
  },
  data() {
    return {
      // uploadDefaultImg,
      title: "请选择预约类型",
    };
  },
  watch: {},
  methods: {
    cancelModal() {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit("update:visible", false);
    },
    listItemClick(item){
      this.$emit('click', item);
      this.cancelModal();
    }
  },
  created() {
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
.list-btn{
  width: 100%;
  margin: 10px 0;
}
.footer-btn {
  width: 100px;
  margin: 0 45px;
}
</style>
