<template>
  <div class="wrapper">
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="dataForm"
      status-icon
      label-position="right"
      label-width="140px"
      class="el-form"
    >
      <div v-if="showFormTitle">
        <box-title title="预约内容填写（ <span style='color: red'>*</span> 为必填项）" :maxSize="true"></box-title>
        <div class="margin-bottom"></div>
      </div>
      <el-row class="form-row" style="padding-top: 23px">
        <el-col :span="12">
          <el-form-item label="档案分类" prop="categoryDa">
            <el-select
              v-model="dataForm.categoryDa"
              placeholder="请选择档案分类"
              style="width: 100%;"
              @change="((val)=>{getCdnr(val)})"
            >
              <el-option
                v-for="(item, index) in selectFl"
                :key="index"
                :label="item.text"
                :value="item.value"
              >{{ item.text }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="查档内容" prop="contentsId">
            <el-select v-model="dataForm.contentsId" placeholder="请选择查档内容" style="width: 100%;">
              <el-option
                v-for="(item, index) in selectCdnr"
                :key="index"
                :label="item.content"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row" >
        <el-col :span="12">
          <el-form-item label="利用目的" prop="purposeId">
            <el-select v-model="dataForm.purposeId" style="width: 100%;" placeholder="请选择利用目的">
              <el-option
                v-for="(item, index) in selectLymd"
                :key="index"
                :label="item.purpose"
                :value="item.id"
              >{{ item.purpose }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="查档学校" prop="departName" v-if="applyRole == 'company-user'">
            <el-select v-model="dataForm.departName" style="width: 100%;" placeholder="请选择查档学校">
              <el-option
                v-for="(item, index) in schoolData"
                :key="index"
                :label="item.departName"
                :value="item.id"
              >{{ item.departName }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row" >
        <el-form-item label="查档详细说明" prop="remarks">
          <el-input
            v-model="dataForm.remarks"
            type="textarea"
            maxlength="100"
            style="width: 100%;"
            :rows="5"
            placeholder="例如：xx年   xx单位/个人  xx事情（xx同志职务任免通知）"
          />
        </el-form-item>
      </el-row>
      <!-- 企业用户，预约申请，增加了上传 查档清单 的功能 -->
      <el-form-item label="查档清单" prop="checklistzip" v-if="applyRole == 'company-user'">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :headers="uploadHeader"
          :on-remove="handleRemove"
          :file-list="uploadList"
          :on-change="changeFile"
          :on-success="upLoadSuccess"
          :before-remove="beforeRemove"
          :before-upload="beforeUpload"
           multiple
          :limit="1"
        >
          <el-button size="mini" type="primary">点击上传</el-button>
          <div class="el-upload__tip" slot="tip">仅限上传压缩文件，或Excel文件，且不超过5MB</div>
        </el-upload>
      </el-form-item>
      <div v-if="showFormTitle">
        <box-title title="取档方式（ <span style='color: red'>*</span> 为必填项）" :maxSize="true"></box-title>
        <div class="margin-bottom"></div>
      </div>
      <el-row class="form-row" style="padding-top: 23px">
        <el-col :span="12">
          <el-form-item label="取档方式" prop="qdfs">
            <el-select v-model="dataForm.qdfs" style="width: 100%;" placeholder="请选择取档方式" :disabled="handleLocationText != null">
              <el-option
                v-for="(item, index) in selectQdfs"
                :key="index"
                :value="item.value"
              >{{ item.value }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-form-item label="邮箱地址" prop="mailingAddress" v-if="dataForm.qdfs == '邮箱'">-->
      <!--<el-input v-model="dataForm.mailingAddress" maxlength="30" style="width: 100%;" />-->
      <!--</el-form-item>-->
      <el-form-item label="邮寄地址" prop="areaQu" v-if="dataForm.qdfs == '邮寄'">
        <el-select
          v-model="dataForm.areaSheng"
          placeholder="请选择省"
          class="address_select"
          @change="((val)=>{getShi(val)})"
          style="width: 33%;margin-left: -5px"
        >
          <el-option v-for="item in selectSheng" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select
          v-model="dataForm.areaShi"
          placeholder="请选择市"
          class="address_select"
          @change="((val)=>{getQu(val)})"
          style="width: 33%;"
        >
          <el-option v-for="item in selectShi" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select
          v-model="dataForm.areaQu"
          placeholder="请选择区"
          class="address_select"
          style="width: 32%;"
        >
          <el-option v-for="item in selectQu" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="mailingAddress" v-if="dataForm.qdfs == '邮寄'">
        <el-input v-model="dataForm.mailingAddress" maxlength="30" style="width: 100%;" />
      </el-form-item>
    </el-form>
    <!-- 取档方式】下加一行字，字体颜色黑色加粗 -->
    <div v-if="handleLocationText != null" class="handle-location">
      {{ handleLocationText }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { istudentInfo, istudentFlag } from "@/config/istudent.config.js";
import BoxTitle from "@/views/home/components/BoxTitle";
import { validEmail } from "@/utils/validate";
import { getToken } from "@/utils/auth";
import {
  listMail,
  createMail,
  updateMail,
  deleteMail,
  getCdnrList,
  getLymdList,
  getCb,
  getUrgeData,
  getSchoolList,
  getsheng,
  getcity,
  getarea,
  addPj,
  getPjData,
  getYyxz,
} from "@/http/reservation";

export default {
  name: "AppointmentForm",
  components: {
    BoxTitle
  },
  props: {
    applyRole: {
      type: String,
      default: "",
    },
    showFormTitle: {
      type: Boolean,
      default: false,
    },
    setTimeOutFlag: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      istudentInfo: istudentInfo[istudentFlag],
      istudentFlag,
      selectCdnr: [],
      selectLymd: [],
      schoolData: [],
      selectCbnr: [],
      idUrl: "",
      selectSheng: [],
      selectShi: [],
      selectQu: [],
      selectFl: [
        { value: "教学类-本专科生教育" },
        { value: "教学类-研究生教育" },
        { value: "党群类" },
        { value: "行政类" },
        { value: "科研类" },
        { value: "基建类" },
        { value: "仪器设备类" },
        { value: "外事类" },
        { value: "财会类" },
        { value: "出版类" },
      ],
      selectQdfs: [{ value: "邮寄" }, { value: "自取" }],
      uploadList: [],
      dataForm: {
        id: undefined,
        categoryDa: undefined, //档案分类
        contentsId: undefined, //查档内容
        checklistzip: undefined,
        purposeId: undefined, //利用目的
        remarks: undefined, //备注
        mailingAddress: undefined, //通讯地址
        qdfs: undefined, //取档方式
        area: undefined,
        areaSheng: undefined,
        areaShi: undefined,
        areaQu: undefined,
      },
      rules: {
        categoryDa: [
          { required: true, message: "请选择档案分类", trigger: "change" },
        ],
        contentsId: [
          { required: true, message: "请选择查档内容", trigger: "blur" },
        ],
        checklistzip: [
          { required: true, message: "请上传查档清单", trigger: "change" },
        ],
        purposeId: [
          { required: true, message: "请选择利用目的", trigger: "blur" },
        ],
        departName: [
          { required: true, message: "请选择查档学校", trigger: "change" },
        ],
        remarks: [
          { required: true, message: "请输入您需查档明细记录等", trigger: "blur" },
        ],
        qdfs: [
          { required: true, message: "请选择取档方式", trigger: "change" },
        ],
        // mailingAddress: [
        //   { required: true, validator: validEmail, trigger: "change" },
        // ],
        areaQu: [
          { required: true, message: "请选择邮寄地址", trigger: "change" },
        ],
        mailingAddress: [
          { required: true, message: "请输入详细地址", trigger: "change" },
        ],
      },
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["reserveTypeId"]),
    uploadUrl() {
      return window._CONFIG["VUE_APP_UPLOAD_FILE"];
    },
    uploadHeader() {
      return {
        "X-Access-Token": getToken(),
      };
    },
    qdfsDisabledFlag(){
      return this.istudentFlag == 'BUU-EXTRANET';
    },
    changeFlag(){
      return this.istudentFlag == 'BUU-INTRANET' || this.istudentFlag == 'BUU-EXTRANET'
    },
    handleLocationText(){
      let text = null;
      if(this.istudentFlag == 'BUU-EXTRANET'){
        text = this.istudentInfo.handleLocation;
      }else if(this.istudentFlag == 'BUU-INTRANET' && this.reserveTypeId){
        if(this.istudentInfo.handleLocation)text = this.istudentInfo.handleLocation[this.reserveTypeId];
      }
      return text;
    },
  },
  methods: {
    upLoadSuccess(res, file) {},
    changeFile(file, fileList) {
      this.uploadList = fileList;
      if (this.uploadList.length > 0) {
        this.dataForm.checklistzip = "upload";
      } else {
        this.dataForm.checklistzip = "";
      }
    },
    handleRemove(file, fileList) {
      this.uploadList = fileList;
      if (this.uploadList.length > 0) {
        this.dataForm.checklistzip = "upload";
      } else {
        this.dataForm.checklistzip = "";
      }
    },
    beforeRemove(file, fileList) {},
    beforeUpload(file) {
      const fileType = /\.(rar|RAR|zip|ZIP|xls|XLS|xlsx|XLSX)$/.test(file.name);
      if (!fileType) {
        this.$message.error("只能上传预留压缩文件，或者Excel文件!");
        return false;
      }
      // const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLimit = file.size / 1024 / 1024 < 5;
      if (!isLimit) {
        this.$message.error("上传文件大小不能超过 5MB!");
      }
      return fileType && isLimit;
    },
    submitForm() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.$emit('loading', true);
          let formData = JSON.parse(JSON.stringify(this.dataForm));
          if (this.uploadList && this.uploadList.length > 0) {
            let checklistzip = this.uploadList
              .map((item) => item.url || item.response.message)
              .join(",");
            let checklistname = this.uploadList
              .map((item) => item.name)
              .join(",");
            formData.checklistzip = checklistzip;
            formData.checklistname = checklistname;
          }
          let obj = this.selectFl.find(item => item.value == formData.categoryDa);
          if(obj)formData.categoryDa = obj.text;
          createMail(formData)
            .then((response) => {
              if(this.setTimeOutFlag){
                setTimeout(() => {
                  this.$emit('loading', false);
                  this.$emit('complete');
                }, 1500);
              }else{
                this.$emit('loading', false);
                this.$emit('complete');
              }
              this.$message.success(response.message);
            })
            .catch(() => {
              this.selectLymd = [];
            });
        } else {
          return false;
        }
      });
    },
    getLymd() {
      getLymdList()
        .then((response) => {
          this.selectLymd = response.result.mdList;
        })
        .catch(() => {
          this.selectLymd = [];
        });
    },
    getSchool() {
      getSchoolList()
        .then((response) => {
          this.schoolData = response.result.schoolList;
        })
        .catch(() => {
          this.schoolData = [];
        });
    },
    getCdnr(value) {
      this.dataForm.contentsId = "";
      let text = "";
      let obj = this.selectFl.find(item => item.value == value);
      if(obj)text = obj.text;
      if(this.changeFlag){
        this.getNewLymd(value);
    }
    getCdnrList(text)
        .then((response) => {
          this.selectCdnr = response.result.nrList;
          this.addOtherCdnrItem();
        })
        .catch(() => {
          this.selectCdnr = [];
          this.addOtherCdnrItem();
        });
    },
    addOtherCdnrItem() {
      let item = {
        id: "other",
        content: "其他",
      };
      this.selectCdnr.push(item);
    },
    getShengData() {
      getsheng()
        .then((response) => {
          this.selectSheng = response.result.shengList;
        })
        .catch(() => {
          this.selectSheng = [];
        });
    },
    getShi(value) {
      getcity(value)
        .then((response) => {
          this.dataForm.areaShi = null;
          this.selectShi = response.result.shiList;
        })
        .catch(() => {
          this.selectShi = [];
        });
    },
    getQu(value) {
      getarea(value)
        .then((response) => {
          this.dataForm.areaQu = null;
          this.selectQu = response.result.quList;
        })
        .catch(() => {
          this.selectQu = [];
        });
    },
    getNewLymd(value){
      this.dataForm.purposeId = "";
      this.selectLymd = [];
      let name = "rafss_use_purpose,purpose,id,check_files_type=" + value;
      this.$api.getDictItems(name).then(res => {
        if (res.result) {
          let list = res.result;
          list.map(item =>{
            item.id = item.value;
            item.purpose = item.text;
          })
          this.selectLymd = list;
        }
      });
    },
    initData(){
      //根据字典Code, 初始化字典数组
      let name = "sys_dict_item,item_text,item_value,dict_id='1323503670010908673'";
      // 【预约申请】页面改造：
      // 外网 BUU-EXTRANET
      // （1）【档案分类】只有 
      if(this.istudentFlag == 'BUU-EXTRANET'){
        this.dataForm.qdfs = '自取';
        name += "and item_text_en='" + this.istudentFlag + "'";
      }else if(this.istudentFlag == 'BUU-INTRANET' && this.reserveTypeId){
        this.dataForm.qdfs = '自取';
        name += "and item_text_en='" + this.reserveTypeId + "'";
      }
      // （2）【查档内容】有四项：新生录取表  成绩单  毕业底册  其他
      // （3）【利用目的】有五项：出国留学 学历认证 补办证书 求职报考 其他
      this.$api.getDictItems(name).then(res => {
        if (res.result) {
            this.selectFl = res.result;
        }
      });
    },
  },
  created() {
    this.initData();
    if(!this.changeFlag)this.getLymd();
    // this.getCdnr();
    this.getShengData();
    this.getSchool();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.upload-demo {
  text-align: left;
  margin: 5px;
  .el-upload__tip {
    // color: #f56c6c;
  }
}
.text-tips {
  font-size: 16px;
  height: 60px;
  line-height: 20px;
}
.text-logo {
  width: 18px;
  height: 18px;
  margin-right: 5px;
  img {
    width: 100%;
  }
}
.handle-location{
  color: #000;
  font-weight: bolder;
  text-align: left;
  line-height: 24px;
  padding-left: 9%;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
