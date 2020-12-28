<template>
  <div class="wrapper">
    <Left-return />
    <div class="page-title">用户注册</div>
    <div class="web-base">
      <el-form :model="formInline" ref="registerForm" label-width="2.6rem" class="demo-ruleForm">
        <div v-for="(item, index) in formInline.formInlineList" :key="index">
          <!-- formInlineList就是数据结构、要与表单formInLine放在一起，就是放在它里面 -->
          <el-form-item
            :label="item.label"
            :prop="'formInlineList.' + index + '.value'"
            :rules="item.rules.value"
            v-if="checkFormItemShow(item)"
          >
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
             <div v-if="item.type == 'upload'">
              <!-- vant的upload组件 -->
              <div class="upload-img">
                <van-uploader
                  :after-read="onRead"
                  accept="image/*"
                  style="width: 88px;height:88px;"
                >
                  <img :src="unitFileDefault" style="width: 100%;height: 100%;" v-if="!item.value" />
                  <img class="image" :src="baseURL+ '/' + item.value" v-if="item.value" />
                </van-uploader>
              </div>
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
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="submitClick" :loading="submitFlag">保存</el-button>
          <el-button @click="closeClick">关闭</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  validPhone,
  validEmail,
  validIDCard,
  validPwd,
  vaildRealName
} from "@/utils/validate";
import { setItem, getItem, removeItem } from "@/utils/store";
import unitFileDefault from "@/assets/upload/unit-file-default.svg";

export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      unitFileDefault,
      submitFlag: false,
      formInline: {
        formInlineList: [
          {
            value: "",
            prop: "userType",
            label: "账户类型",
            placeHolder: "请选择",
            type: "select",
            selectOptions: [],
            rules: {
              value: [
                { required: true, message: "请选择账户类型", trigger: "change" }
              ]
            }
          },
          {
            value: "",
            prop: "username",
            label: "账号",
            placeHolder: "请输入账号",
            rules: {
              value: [
                {
                  required: true,
                  message: "请输入账号",
                  trigger: "blur"
                  // validator: this.validateUserName
                }
              ]
            }
          },
          {
            value: "",
            prop: "password",
            label: "密码",
            placeHolder: "请输入(8-16位字母+数字)",
            maxLength: 16,
            type: 'password',
            rules: {
              value: [
                {
                  required: true,
                  trigger: "blur",
                  validator: validPwd
                }
              ]
            }
          },
          {
            value: "",
            prop: "repassword",
            label: "确认密码",
            placeHolder: "请确认密码",
            maxLength: 16,
            type: 'password',
            rules: {
              value: [
                {
                  required: true,
                  validator: this.validateRePassword,
                  trigger: "blur"
                }
              ]
            }
          },
          {
            value: "",
            prop: "phone",
            label: "手机号码",
            placeHolder: "请输入手机号码",
            maxLength: 11,
            rules: {
              value: [
                { required: true, trigger: "blur", validator: validPhone }
              ]
            }
          },
          {
            value: "",
            prop: "realname",
            label: "真实姓名",
            placeHolder: "请输入真实姓名",
            rules: {
              value: [
                { required: true, trigger: "blur", validator: vaildRealName }
              ]
            }
          },
          {
            value: "",
            prop: "idNum",
            label: "身份证号码",
            placeHolder: "请输入身份证号码",
            maxLength: 18,
            rules: {
              value: [
                { required: true, trigger: "blur", validator: validIDCard }
              ]
            }
          },
          {
            value: "",
            prop: "email",
            label: "邮箱地址",
            placeHolder: "请输入邮箱地址",
            rules: {
              value: [
                { required: true, trigger: "blur", validator: validEmail }
              ]
            }
          },
          // unitFiledUrl 单位证明材料 unitName 单位名称
          {
            value: "",
            prop: "unitName",
            label: "单位名称",
            placeHolder: "请输入单位名称",
            maxLength: 50,
            rules: {
              value: [
                { required: true, message: "请输入单位名称", trigger: "blur"  }
              ]
            }
          },
           {
            value: "",
            prop: "unitFiledUrl",
            label: "单位证明材料",
            placeHolder: "请上传单位证明材料",
            type: "upload",
            rules: {
              value: [
                { required: true, message: "请上传单位证明材料", trigger: "blur"  }
              ]
            }
          },
        ]
      }
    };
  },
  watch: {},
   computed: {
    uploadUrl() {
      return window._CONFIG["VUE_APP_UPLOAD_FILE"];
    },
    uploadHeader() {
      return {
        "X-Access-Token": getItem("Token")
      };
    },
    baseURL() {
      return window._CONFIG["BASE_API"];
    }
  },
  methods: {
    initAccountType() {
      let list = [
        {
          value: 1,
          text: "个人用户（毕业校友）"
        },
        {
          value: 2,
          text: "企业用户（校外单位）"
        }
      ];
      this.formInline.formInlineList.find(
        item => item.prop == "userType"
      ).selectOptions = list;
    },
    submitClick() {
      let that = this;
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          let formData = {};
          that.formInline.formInlineList.forEach(item => {
            formData[item.prop] = item.value;
          });
          this.register(formData);
        } else {
          return false;
        }
      });
    },
    register(formData) {
     /*  this.$router.push({
        name: "face-verify",
        params: {
          data: formData
        }
      });
      return; */
      let that = this;
      this.$api
        .register(formData)
        .then(res => {
          if (res.success) {
            that.$Toast.success(res.message);
            if (res.code == 200) {
              // that.$router.replace("/face-verify");
              let second = 3;
              const timer = setInterval(() => {
                second--;
                if (!second) {
                  clearInterval(timer);
                  that.$router.replace('/login');
                }
              }, 1000);
            }
          } else {
            that.$Toast.fail(res.message);
          }
        })
        .catch(() => {});
    },
    closeClick() {
      this.$router.go(-1);
    },
    validateRePassword(rule, value, callback) {
      let password = this.formInline.formInlineList.find(
        item => item.prop == "password"
      ).value;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    /* 校验真实姓名 */
    validateUserName(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入账号"));
      } /* else if (value.length > 50) {
        callback(new Error('账号不超过50个字符'));
      } else if (!/^[a-zA-Z][a-zA-Z0-9_\-]*$/.test(value)) {
        callback(new Error('以字母开头，英文、数字、下划线、中划线(此四项非必须)'));
      } */ else {
        let data = { code: value };
        if (this.type === 1) {
          data.id = this.jobForm.id;
        }
        callback();
        /*   this.validateUserNameRepeat(data).then(res => {
          if (res) {
            callback(new Error("账号重复"));
          } else {
            callback();
          }
        }); */
      }
    },
     onRead(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Access-Token": getItem("Token")
        }
      };
      let that = this;
      that.$loadingImg();
      // t.showLoadImg();
      this.$axios
        .post(window._CONFIG["VUE_APP_UPLOAD_FILE"], formData, config)
        .then(function(res) {
          that.$Toast.success("上传图片成功！");
          let str = res.data.message;
          that.formInline.formInlineList.find(
            item => item.prop == "unitFiledUrl"
          ).value = str;
        });
    },
    checkFormItemShow(item) {
      let flag = true;
      let value = this.formInline.formInlineList.find(
        item => item.prop == "userType"
      ).value;
      let prop = item.prop;
      //unitFiledUrl 单位证明材料 unitName 单位名称
      if(prop == "unitFiledUrl" || prop == "unitName"){
        if(value != 2)flag = false;
      }
      return flag;
    },
    validateUserNameRepeat(data) {
    }
  },
  created() {
    this.initAccountType();
  },
  mounted() {}
};
</script>
<style scoped>
.wrapper {
}
.web-base {
  width: 90%;
  margin: 10px auto;
}
.upload-img {
  display: flex;
  flex-wrap: wrap;
}
.img-box {
  　width: 88px;
  　height: 88px;
  　margin-right: 8px;
  　margin-bottom: 8px;
}

.image {
  width: 88px;
  height: 88px;
}
</style>
