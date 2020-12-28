<template>
  <div>
    <div class="login-container">
      <div class="login-weaper  animated bounceInDown">
        <div class="login-left">
          <div style="width:100%;margin-bottom:30px;height:80px;">
            <img v-if="logoUrl!=''" :src="logoUrl" style="width:120px;display:inline-block;" alt="">
            <!-- <img v-else style="width:120px;display:inline-block;" src="../../assets/img/logo_hust.png" alt=""> -->
            <span style="float:right;height:100%;margin-top:40px;margin-right:20px;">{{ $t('message.LoginPageTitle') }}</span>
          </div>
          <!-- <img class="img" src="../../assets/img/lefttp.png" alt=""> -->
        </div>
        <div class="login-border" v-if="formType == 0">
          <div>
            <div class="title-container">
            <!-- <img class="img_title" src="../../assets/img/bt2.png" alt=""> -->
            </div>
            <div class="title_second">
              {{ $t('message.LoginTip1') }}
            </div>
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              auto-complete="on"
              label-position="left">
              <el-form-item prop="username">
                <span class="svg-container svg-container_login">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  v-model="loginForm.username"
                  maxlength="50"
                  name="username"
                  type="text"
                  auto-complete="on"
                  placeholder="username" />
              </el-form-item>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :type="passwordType"
                  v-model="loginForm.password"
                  maxlength="20"
                  name="password"
                  auto-complete="on"
                  placeholder="password"
                  @keyup.enter.native="handleLogin">
                  <span slot="suffix" class="show-pwd" @click="showPwd">
                    <svg-icon icon-class="eye" />
                  </span>
                </el-input>
              </el-form-item>

              <el-form-item prop="captcha">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  v-model="loginForm.captcha"
                  :placeholder="$t('message.PleaseInputCode')"
                  type="text"
                  maxlength="4"
                  @change="inputCodeChange"
                  @keyup.enter.native="handleLogin">
                  <div slot="suffix" style="width: 95px; margin-left:5px;float:left;">
                    <img v-if="requestCodeSuccess" :src="randCodeImage" style="height: 33px;margin-top: 1px;" @click="handleChangeCheckCode">
                    <!-- <img v-else style="margin-top: 2px;" src="../../assets/checkcode.png" @click="handleChangeCheckCode"> -->
                  </div>
                </el-input>
              </el-form-item>
              <el-row :gutter="0">
                <el-col :span="24">
                  <div style="width:100%;">
                    <el-button
                      :loading="loading"
                      type="text"
                      style="border-radius: 20px;width:80%;height:22px;display:block;margin:0 auto"
                      @click.native.prevent="handleRegister">{{ $t('message.Register') }}</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="0">
                <el-col :span="24">
                  <div style="width:100%;">
                    <el-button
                      :loading="loading"
                      type="primary"
                      style="border-radius: 20px;width:80%;height:44px; margin-bottom:30px;display:block;margin:0 auto"
                      @click.native.prevent="handleLogin">{{ $t('message.Login') }}</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="0" style="padding-top:8px;">
                <el-col :span="12">
                  <!-- <el-link style="font-size:16px;" type="success" href="#/verify"> {{ $t('message.SignVerify') }} </el-link> -->
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="register-border">
          <Register v-if="formType == 1" @close="closeRegisterForm"></Register>
        </div>
      </div>

    </div>
    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="right" label-width="140px" class="el-form">
        <el-form-item :label="$t('message.Name')" prop="name">
          <el-input v-model="dataForm.name" />
        </el-form-item>

        <el-form-item :label="$t('message.Sex')" prop="sex">
          <el-select v-model="dataForm.sex" placeholder="请选择性别">
            <el-option v-for="(item, index) in selectSex" :key="index" :value="item.value">
              {{ item.value }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('message.idNum')" prop="idNum" >
          <el-input v-model="dataForm.idNum" maxlength="60"/>
          <!--<font color="red">输入身份证号码</font>-->
        </el-form-item>
        <el-form-item :label="$t('message.idNumurl')" prop="idNumurl">
       <!--    <el-upload
            :action="uploadUrl"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader">
            <img v-if="idUrl" :src="idUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload> -->
        </el-form-item>
        <el-form-item :label="$t('message.School')" prop="school">
          <el-input v-model="dataForm.school" maxlength="100"/>
          <!-- <font color="red">内容限制1000字以内</font>-->
        </el-form-item>
        <el-form-item :label="$t('message.StudentNo')" prop="sno">
          <el-input v-model="dataForm.sno" maxlength="30"/>
        </el-form-item>
        <el-form-item :label="$t('message.Speciality')" prop="stuMajor">
          <el-input v-model="dataForm.stuMajor" maxlength="30"/>
        </el-form-item>
        <el-form-item :label="$t('message.Class')" prop="stuClass">
          <el-input v-model="dataForm.stuClass" maxlength="30"/>
        </el-form-item>
        <el-form-item :label="$t('message.degreeNum')" prop="degreeNum">
          <el-input v-model="dataForm.degreeNum" maxlength="30"/>
        </el-form-item>
        <el-form-item :label="$t('message.graduationNum')" prop="graduationNum">
          <el-input v-model="dataForm.graduationNum" maxlength="30"/>
        </el-form-item>
        <el-form-item :label="$t('message.site')" prop="site">
          <el-input v-model="dataForm.site" maxlength="30"/>
        </el-form-item>
        <el-form-item :label="$t('message.admissionDate')" prop="admissionDate">
          <el-input v-model="dataForm.admissionDate" maxlength="30"/>
        </el-form-item>
        <el-form-item :label="$t('message.graduationDate')" prop="graduationDate">
          <el-input v-model="dataForm.graduationDate" maxlength="30"/>
        </el-form-item>
        <el-form-item :label="$t('message.mailingAddress')" prop="mailingAddress">
          <el-input v-model="dataForm.mailingAddress" maxlength="30"/>
        </el-form-item>
        <el-form-item :label="$t('message.phoneNum')" prop="phoneNum">
          <el-input v-model="dataForm.phoneNum" maxlength="30"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('message.Cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('message.OK') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import i18n from '@/i18n/i18n'
// import { randomImage } from '@/api/verify'
// import { getToken } from '@/utils/auth'
import { setItem, getItem } from '@/utils/store.js'
import Register from './Register'

export default {
  name: 'Login',
  components: {
    Register,
  },

  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === null || value.length <= 0) {
        callback(new Error(i18n.t('message.LoginError')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(i18n.t('message.LoginError2')))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.toLowerCase() !== this.verifiedCode.toLowerCase()) {
        callback(new Error(i18n.t('message.codeError')))
      } else {
        callback()
      }
    }

    return {
      formType: 0,//0为登录，1位注册
      logoUrl: '',
      loginForm: {
        username: '',
        password: '',
        captcha: ''
      },
      idUrl: '',
      textMap: {
        update: i18n.t('message.Edit'),
        create: i18n.t('message.Create')
      },
      selectSex: [
        { value: '男' },
        { value: '女' },
      ],
      dialogFormVisible: false,
      dialogStatus: '',
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }],
        // inputCode: [{
        //   required: true,
        //   trigger: 'blur',
        //   validator: validateCode
        // }]
      },
      uploadUrl: window._CONFIG['BASE_API']+"/sys/common/upload",//window._CONFIG['BASE_API'] + '/student/caStorage/upload',
      url: {
        imgerver: window._CONFIG['BASE_API']+"/sys/common/view",
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空！', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空！', trigger: 'blur' }
        ],
        idNum: [
          { required: true, message: '身份证号不能为空！', trigger: 'blur' }
        ],
        school: [
          { required: true, message: '学校不能为空！', trigger: 'blur' }
        ],
        sno: [
          { required: true, message: '学号不能为空！', trigger: 'blur' }
        ],
        stuMajor: [
          { required: true, message: '专业不能为空！', trigger: 'blur' }
        ],
        stuClass: [
          { required: true, message: '班级不能为空！', trigger: 'blur' }
        ],
        site: [
          { required: true, message: '生源地不能为空！', trigger: 'blur' }
        ],
        categoryDa: [
          { required: true, message: '档案分类不能为空！', trigger: 'blur' }
        ],
        contentsId: [
          { required: true, message: '查档内容不能为空！', trigger: 'blur' }
        ],
        purposeId: [
          { required: true, message: '利用目的不能为空！', trigger: 'blur' }
        ],
        mailingAddress: [
          { required: true, message: '通讯地址不能为空！', trigger: 'blur' }
        ],
        qdfs: [
          { required: true, message: '取档方式不能为空！', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '手机号码不能为空！', trigger: 'blur' }
        ]
      },
      dataForm: {
        id: undefined,
        name: undefined,
        sex: undefined,
        idNum: undefined,
        school: undefined,
        sno: undefined,
        stuMajor: undefined,
        stuClass: undefined,
        degreeNum: undefined,
        graduationNum: undefined,
        site: undefined,
        admissionDate: undefined,
        graduationDate: undefined,
        contentsId: undefined,
        purposeId: undefined,
        mailingAddress: undefined,
        phoneNum: undefined,
        idNumurl: undefined,
        remarks: undefined,
        qdfs: undefined,
        imageUrl: undefined,
        categoryDa: undefined
      },
      passwordType: 'password',
      verifiedCode: '',
      inputCodeContent: '',
      currdatetime: '',
      randCodeImage: '',
      requestCodeSuccess: false,
      loading: false
    }
  },
  computed: {
   /*  headers() {
      return {
        'X-Access-Token': getToken()
      }
    } */
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    this.currdatetime = new Date().getTime()
    this.handleChangeCheckCode()
    this.getRouterData()
  },
  createData() {},
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    getRouterData() {
      this.$api.getAction(`/sys/getHeadName`).then(res => {
        setItem('logoURL', res.data.result)
        if(getItem('logoURL')=='data:image/jpg;base64,'){
          this.logoUrl = ''
        }else{
          this.logoUrl = getItem('logoURL')
        }
      }).catch(() => {
      })
    },
    generateCode(value) {
      this.verifiedCode = value.toLowerCase()
    },
    inputCodeChange(value) {
      this.inputCodeContent = value.toLowerCase()
      if (!value || value === 0) {
        this.inputCodeNull = true
      } else {
        this.inputCodeContent = this.inputCodeContent.toLowerCase()
        this.inputCodeNull = false
      }
    },
    handleRegister() {

    },
    getAvatarView() {
      return this.url.imgerver +"/"+ this.dataForm.imageUrl
    },
    handleAvatarSuccess(res, file) {
      this.idUrl = this.url.imgerver + '/' + res.message
      this.dataForm.idNumurl = res.message
      this.dataForm.imageUrl = this.url.imgerver + '/' + res.message
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error(i18n.t('message.UploadFormatError'))
      }
      if (!isLt2M) {
        this.$message.error(i18n.t('message.UploadSizeError'))
      }
      return isJPG && isLt2M
    },
    handleChangeCheckCode() {
      this.currdatetime = new Date().getTime()
     /*  randomImage(this.currdatetime).then(response => {
        const res = response.data
        if (res.success) {
          this.randCodeImage = res.result
          this.requestCodeSuccess = true
        } else {
          this.$message.error(res.message)
          this.requestCodeSuccess = false
        }
      }).catch(() => {
        this.requestCodeSuccess = false
      }) */
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        email: undefined,
        title: undefined,
        content: undefined,
        ccEmail: undefined,
        isdefault: false
      }
    },
    /* 注册的方法 */
    handleRegister(){
      this.formType = 1;
    },
    closeRegisterForm(){
      this.formType = 0;
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid && !this.loading) {
          this.loading = true
          // const checkParams = this.$refs.jgraphicCodeRef.getLoginParam()
          // this.loginForm['captcha'] = checkParams.checkCode
          // this.loginForm['checkKey'] = checkParams.checkKey
          this.loginForm['checkKey'] = this.currdatetime

          // console.log(this.loginForm)
          this.$store.dispatch('LoginByUsername', this.loginForm).then(response => {
            setItem('userType', response.data.result.userInfo.userType)
            console.log(getItem('userType'))
            this.loading = false
            this.$router.push({
              path: this.redirect || '/'
            })
          }).catch(response => {
            this.handleChangeCheckCode()
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .el-form {
    margin-left:30px;
    margin-right:30px;
  }
  .el-form-item{
    width: 100%;
  }
  .login-container:after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .login-container {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: $bg;
    text-align: center;
    font-size: 0;
    white-space: nowrap;
    overflow: hidden;

    .login-weaper {
      margin-top: 50px;
      width: 1200px;
      margin: 0px auto;
      display: inline-block;
      vertical-align: middle;
      background-color: white;
      border-radius: 8px;
      box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);

      .login-left {
        position: relative;
        // min-height: 600px;
        align-items: center;
        display: flex;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        justify-content: center;
        flex-direction: column;
        background-color: #f1f2ff;
        color: #fff;
        float: left;
        width: 45%;
        position: relative;
      }

      .login-border {
        position: relative;
        // min-height: 600px;
        align-items: center;
        display: inline-block;
        margin: 0px auto;
        width: 55%;
        /deep/ .el-input{
          width: 90%;
        }
      }

      .register-border{
        position: relative;
        // min-height: 600px;
        align-items: center;
        display: inline-block;
        margin: 0px auto;
        width: 55%;
      }

      .login-left .img {
        width: 640px;
        height: 450px;
      }

      .login-left div {
        padding-top: 20px;
        padding-left: 20px;
        text-align: left;
        font-weight: 300;
        // text-decoration: underline;
        font-size: 20px;
        color: rgb(0, 144, 255);
        width: 540px;
        height: 70px;
      }
    }

    .login-form {
      position: relative;
      left: 0;
      right: 0;
      width: 440px;
      margin: 0 auto;
      padding: 45px 35px 15px 25px;
    }

    .tips {
      font-size: 18px;
      color: #fff;
      margin-top: 0px;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      // padding: 6px 5px 6px 15px;
      color: $dark_gray;
      // vertical-align: middle;
      width: 30px;
      display: inline-block;
      font-size: 20px;
    }

    .title-container {
      padding: 55px 0 15px 0;
      position: relative;
      align: left;

      .img_title {

        width: 360px;
        // height: 40px;
      }

      // .title {
      //   font-size: 26px;
      //   font-weight: 400;
      //   color: $light_gray;
      //   margin: 0px auto 40px auto;
      //   text-align: center;
      //   font-weight: bold;
      // }
    }

    .title_second {
      display: inline-block;
      color: darkgray;
      text-align: center;
      width: 360px;
      height: 30px;
      font-size: 16px;
      font-weight: 400;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

</style>
