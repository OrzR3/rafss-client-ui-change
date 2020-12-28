<template>
  <div class="basic-form">
    <el-form
      :model="formModel"
      :ref="refName"
      :label-width="formModel.labelWidth || '9rem'"
      :class="{ 'half-form': halfFormFlag }"
      v-if="formModel && formModel.formList && formModel.formList.length > 0"
    >
      <div v-for="(item, index) in formModel.formList" :key="index">
        <!-- formModel 就是数据结构、要与表单 formList 放在一起，就是放在它里面 -->
        <el-form-item
          :label="item.label"
          :prop="'formList.' + index + '.value'"
          :rules="item.rules.value"
          :class="{ 'max-form': item.maxForm, 'clear-form': item.clearForm }"
          v-if="!item.hideFormItem || !formModel.hideFormFlag"
        >
          <div v-if="item.type == 'radio'" class="radio-group">
            <el-radio-group
              v-model="item.value"
              @change="(value) =>{
                return radioGroupChange(value, item)
              }"
            >
              <el-radio
                :label="item.value"
                v-for="(item, index) in item.selectOptions"
                :key="index"
              >{{ item.text }}</el-radio>
            </el-radio-group>
          </div>
          <div v-if="item.type == 'select'">
            <el-select
              v-model="item.value"
              :placeholder="item.placeHolder"
              style="width:100%;"
              clearable
            >
              <el-option
                v-for="option in item.selectOptions"
                :key="option.value"
                :label="option.text"
                :value="option.value"
              ></el-option>
            </el-select>
          </div>
          <div v-if="item.type == 'password'">
            <el-input
              v-model.trim="item.value"
              type="password"
              :maxlength="item.maxLength"
              :placeholder="item.placeHolder"
              show-password
            ></el-input>
          </div>
          <div v-if="item.type == 'textarea'">
            <el-input
              v-model.trim="item.value"
              type="textarea"
              :rows="item.rows || 2"
              :maxlength="item.maxLength"
              :placeholder="item.placeHolder"
              show-password
            ></el-input>
          </div>
          <div v-if="!item.prop">
            <div v-if="item.type == 'tips'" class="tips-title">
              <div>{{ item.text }}</div>
            </div>
          </div>

          <div
            v-if="item.type =='uploadPicture' || item.type == 'upload'"
            :class="{'id-card': item.prop == 'idCardIcon' || item.prop == 'idCardEmblem'}"
          >
            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              list-type="picture-card"
              :on-remove="(file,fileList)=>{
                  return handleRemove(file,fileList,item)
              }"
              :file-list="item.fileList"
              :on-change="(file,fileList)=>{
                return changeFile(file,fileList,item)
              }"
              :on-success="(res, file) =>{
                return upLoadSuccess(res,file,item)
              }"
              :before-remove="beforeRemove"
              :before-upload="beforeAvatarUpload"
              :headers="uploadHeader"
              multiple
              :limit="item.limit || 2"
              :class="{hide: item.fileList.length >= item.limit}"
            >
              <div v-if="item.fileList.length == 0 && (item.prop == 'idCardIcon' || item.prop == 'idCardEmblem')">
                <img v-if="item.prop == 'idCardIcon'" src="/static/img/default/idCardIcon.png" >
                <img v-if="item.prop == 'idCardEmblem'" src="/static/img/default/idCardEmblem.png" >
              </div>
              <i class="el-icon-plus" v-else></i>
            </el-upload>
          </div>
          <div v-if="item.type =='uploadFile'">
            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :on-remove="(file,fileList)=>{
                  return handleRemove(file,fileList,item)
              }"
              :file-list="item.fileList"
              :on-change="(file,fileList)=>{
                return changeFile(file,fileList,item)
              }"
              :on-success="(res, file) =>{
                return upLoadSuccess(res,file,item)
              }"
              :before-remove="beforeRemove"
              :before-upload="beforeFileUpload"
              :headers="uploadHeader"
              multiple
              :limit="item.limit || 2"
            >
              <el-button
                size="small"
                type="primary"
                icon="el-icon-upload2"
                :disabled="item.fileList.length >= item.limit"
              >点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </div>
          <div v-if="!item.type">
            <el-input
              v-model="item.value"
              :maxlength="item.maxLength"
              :placeholder="item.placeHolder"
            ></el-input>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div class="clearfix"></div>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
  name: "",
  components: {},
  props: {
    formModel: {
      type: Object,
      default: () => {
        return null;
      },
    },
    formList: {
      type: Array,
      default: () => {
        return null;
      },
    },
    refName: {
      type: String,
      default: "refForm",
    },
    halfFormFlag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    uploadUrl() {
      return window._CONFIG["VUE_APP_UPLOAD_FILE"];
    },
    uploadHeader() {
      return {
        "X-Access-Token": getToken(),
      };
    },
  },
  methods: {
    radioGroupChange(value, obj) {
      let switchFlag = obj.hideFormSwitch;
      if (switchFlag) {
        this.formModel.hideFormFlag = !this.formModel.hideFormFlag;
      }
    },
    upLoadSuccess(res, file, obj) {
      let tempList = this.formModel.formList.find(
        (item) => item.prop == obj.prop
      ).fileList;
      tempList[tempList.length - 1].url =
        window._CONFIG["BASE_API"] + "/" + res.message;
      tempList[tempList.length - 1].fieldUrl = res.message;
    },
    changeFile(file, fileList, obj) {
      this.formModel.formList.find(
        (item) => item.prop == obj.prop
      ).fileList = fileList;
      if (fileList.length > 0) {
        this.formModel.formList.find((item) => item.prop == obj.prop).value =
          "upload";
      } else {
        this.formModel.formList.find((item) => item.prop == obj.prop).value =
          "";
      }
    },
    handleRemove(file, fileList, obj) {
      let deleteIdX = -1;
      this.formModel.formList
        .find((item) => item.prop == obj.prop)
        .fileList.map((item, index) => {
          if (item === file) {
            deleteIdX = index;
          }
        });
      if (deleteIdX > -1) {
        this.formModel.formList
          .find((item) => item.prop == obj.prop)
          .fileList.splice(deleteIdX, 1);
      }
      if (fileList.length > 0) {
        this.formModel.formList.find((item) => item.prop == obj.prop).value =
          "upload";
      } else {
        this.formModel.formList.find((item) => item.prop == obj.prop).value =
          "";
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeFileUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submit() {
      let that = this;
      this.$refs[this.refName].validate((valid) => {
        if (valid) {
          let formData = {};
          let refName = this.refName;
          let uploadAlertFlag = false;
          that.formModel.formList.forEach((item) => {
            if (
              item.type &&
              item.type.includes("upload") &&
              item.fileList &&
              item.fileList.length > 0
            ) {
              item.value = item.fileList
                .map(
                  (item) => item.fieldUrl || item.url || item.response.message
                )
                .join(",");
              if(item.value.indexOf("blob:") == 0)uploadAlertFlag = true;
            }
            formData[item.prop] = item.value;
          });
          if(uploadAlertFlag){
            this.$message.warning('还未上传完成！');
            return;
          }
          this.$emit("submit", { refName, formData });
        } else {
          return false;
        }
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.basic-form {
}
.half-form .el-form-item {
  width: 50%;
  float: left;
  /deep/ .el-form-item__label {
  }
  /deep/ .el-input__inner {
  }
}
.upload-demo {
  text-align: left;
}
.radio-group {
  text-align: left;
}
.max-form {
  width: 100% !important;
}
.clear-form {
  clear: both !important;
}
.tips-title {
  position: relative;
  left: -30%;
  text-align: left;
  width: 130%;
  border-bottom: 1px solid #ccc;
}
</style>
<style>
.hide .el-upload--picture-card {
  display: none;
}

.id-card .el-upload--picture-card {
  width: 240px !important;
  height: 151px !important;
  line-height: 151px !important;
}
.id-card .el-upload-list--picture-card .el-upload-list__item {
  width: 240px !important;
  height: 151px !important;
  line-height: 151px !important;
}
.id-card .el-upload-list__item.is-success .el-upload-list__item-status-label{
  display: none;
}
/*.id-card-img{
  -webkit-filter: blur(1px);
  filter: blur(1px);
}*/

@media only screen and (max-width: 1550px) {
  .id-card .el-upload--picture-card {
    width: 155px !important;
    height: 97.5px !important;
    line-height: 97.5px !important;
  }
  .id-card .el-upload-list--picture-card .el-upload-list__item {
    width: 155px !important;
    height: 97.5px !important;
    line-height: 97.5px !important;
  }
}
</style>
