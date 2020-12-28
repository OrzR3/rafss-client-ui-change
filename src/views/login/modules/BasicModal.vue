<template>
  <el-dialog
    :visible.sync="visible"
    :show-close="false"
    width="600px"
    :modal="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <h2 slot="title">添加订单</h2>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal">
      <i class="el-dialog__close el-icon el-icon-close"></i>
    </button>
    <el-form
      class="form-wrapper"
      ref="orderForm"
      :model="orderForm"
      :rules="addRules"
      label-width="110px"
    >
      <el-form-item label="联系人：" prop="fromContact">
        <el-input v-model="orderForm.fromContact" type="text" placeholder="请输入联系人名称"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="fromPhone">
        <el-input v-model="orderForm.fromPhone" type="text" placeholder="请输入联系电话"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="buttons-wrap">
      <el-button type="primary" >确定</el-button>
      <el-button type="default" @click="cancelModal">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      orderForm: {},
      addRules: {
        fromContact: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
        ],
        fromPhone: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    initForm() {
      this.orderForm = {
        fromContact: "",
        fromPhone: "",
      };
      if (this.$refs.orderForm) {
        this.$refs.orderForm.resetFields();
      }
    },
    cancelModal() {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style scoped>
.wrapper {
}
</style>
