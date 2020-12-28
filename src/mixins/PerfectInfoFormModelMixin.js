import { generateArray } from "@/utils/tools.js";
import {
  getSchoolList,
} from "@/http/reservation";
import {
  validPhone,
  validEmail,
  validIDCard,
  validPwd,
  vaildRealName,
} from "@/utils/validate";
export const PerfectInfoFormModelMixin = {
  /*在校用户 school-user
    企业用户 company-user
    校友用户 alumni-user
    家长用户 patriarch-user
    教职工   staff
    校内部门 school-department
    */
  data() {
    return {
      yearOptions: [], //学年的选项
      userRoleType: "school-user",
      userRoleItem: null,
      formModel: {
        /* 在校用户信息录入 */
        "school-user": {
          infoEntryFormName: "infoEntryFormNameSchoolUser",
          // 在校用户信息录入 核验
          infoEntryUrl: '/sys/user/schoolInformCheck',
          infoEntryFormModel: {
            formList: [
              {
                value: "",
                prop: "name",
                label: "真实姓名",
                placeHolder: "请输入您的真实姓名",
                rules: {
                  value: [
                    {
                      required: true,
                      trigger: "blur",
                      validator: vaildRealName,
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "idCardNum",
                label: "身份证号码",
                placeHolder: "请输入您的身份证号码",
                maxLength: 18,
                rules: {
                  value: [
                    { required: true, trigger: "blur", validator: validIDCard },
                  ],
                },
              },
              // {
              //   value: "",
              //   prop: "stuNo",
              //   label: "学号",
              //   placeHolder: "请输入您的学号",
              //   rules: {
              //     value: [
              //       {
              //         required: true,
              //         message: "请输入您的学号",
              //         trigger: "blur",
              //       },
              //     ],
              //   },
              // },
              {
                value: "",
                prop: "idCardIcon",
                label: "身份证头像页",
                type: "uploadPicture",
                limit: 1,
                fileList: [],
                placeHolder: "",
                clearForm: true,
                rules: {
                  value: [{
                    required: true,
                    message: "请上传身份证头像页",
                    trigger: "change"
                  }]
                }
              }, {
                value: "",
                prop: "idCardEmblem",
                label: "身份证国徽页",
                type: "uploadPicture",
                limit: 1,
                fileList: [],
                placeHolder: "",
                rules: {
                  value: [{
                    required: true,
                    message: "请上传身份证国徽页",
                    trigger: "change"
                  }]
                }
              }
            ],
          },
          infoEntryHalfFormFlag: true,
          furtherInfoFormName: "furtherInfoFormNameSchoolUser",
          // 在校用户信息人工校库信息校检
          furtherInfoUrl: '/sys/user/handWorkInformCheck',
          furtherInfoFormModel: {
            formList: [
              {
                value: "",
                prop: "originSchool",
                label: "所在校区",
                placeHolder: "请选择您所在校区",
                yearList: true,
                type: "select",
                selectOptions: this.getSchool(),
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请选择所在校区，更方便查找噢！",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "regYear",
                label: "入学年份",
                placeHolder: "请选择您的入学年份",
                yearList: true,
                type: "select",
                selectOptions: this.setYearOptions(),
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请选择您的入学年份",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "stuOrigin",
                label: "生源地",
                placeHolder: "请选择您的生源地（高考省份）",
                yearList: true,
                type: "select",
                selectOptions: this.getStuOrigin(),
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请选择您的生源地",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "department",
                label: "所在院系",
                placeHolder: "请输入您的院系",
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请输入您的院系",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "graduated",
                label: "修读专业",
                placeHolder: "请输入您的专业",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入您的专业",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "stuNo",
                label: "学号",
                placeHolder: "请输入您的学号",
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请输入您的学号",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "className",
                label: "班级",
                placeHolder: "请输入您班级",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入您班级",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "remarks",
                label: "备注",
                placeHolder: "备注信息",
                type: "textarea",
                maxForm: true,
                rows: 5,
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请输入备注信息",
                      trigger: "blur",
                    },
                  ],
                },
              },
            ],
          },
          furtherInfoHalfFormFlag: true,
          tableName: "infoEntryTableSchoolUser",
          tableList: [],
        },
        /* 教职工 */
        "staff": {
          infoEntryFormName: "infoEntryFormNameStaff",
          // 在校用户信息录入 核验
          infoEntryUrl: '/sys/user/schoolInformCheck',
          infoEntryFormModel: {
            formList: [
              {
                value: "",
                prop: "name",
                label: "真实姓名",
                placeHolder: "请输入您的真实姓名",
                rules: {
                  value: [
                    {
                      required: true,
                      trigger: "blur",
                      validator: vaildRealName,
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "idCardNum",
                label: "身份证号码",
                placeHolder: "请输入您的身份证号码",
                maxLength: 18,
                rules: {
                  value: [
                    { required: true, trigger: "blur", validator: validIDCard },
                  ],
                },
              },
              {
                value: "",
                prop: "idCardIcon",
                label: "身份证头像页",
                type: "uploadPicture",
                limit: 1,
                fileList: [],
                placeHolder: "",
                clearForm: true,
                rules: {
                  value: [{
                    required: true,
                    message: "请上传身份证头像页",
                    trigger: "change"
                  }]
                }
              }, {
                value: "",
                prop: "idCardEmblem",
                label: "身份证国徽页",
                type: "uploadPicture",
                limit: 1,
                fileList: [],
                placeHolder: "",
                rules: {
                  value: [{
                    required: true,
                    message: "请上传身份证国徽页",
                    trigger: "change"
                  }]
                }
              }
            ],
          },
          infoEntryHalfFormFlag: true,
          furtherInfoFormName: "furtherInfoFormNameStaff",
          // 在校用户信息人工校库信息校检
          furtherInfoUrl: '/sys/user/handWorkInformCheck',
          furtherInfoFormModel: {
            formList: [
              // {
              //   value: "",
              //   prop: "originSchool",
              //   label: "学校名称",
              //   placeHolder: "请输入您就读学校名称精确至校区",
              //   rules: {
              //     value: [
              //       {
              //         required: true,
              //         message: "请输入您就读学校名称，精确至校区更方便查找噢！",
              //         trigger: "blur",
              //       },
              //     ],
              //   },
              // },
              {
                value: "",
                prop: "originSchool",
                label: "所在校区",
                placeHolder: "请选择您所在校区",
                yearList: true,
                type: "select",
                selectOptions: this.getSchool(),
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请选择所在校区，更方便查找噢！",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "teaEntryYear",
                label: "入职年份",
                placeHolder: "请选择您的入职年份",
                yearList: true,
                type: "select",
                selectOptions: this.setYearOptions(),
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请选择您的入职年份",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "teaDepartment",
                label: "所在部门",
                placeHolder: "请输入您所在部门",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入您所在部门",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "teaNum",
                label: "职工号",
                placeHolder: "请输入您的职工号",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入您的职工号",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "remarks",
                label: "备注",
                placeHolder: "备注信息",
                type: "textarea",
                maxForm: true,
                rows: 5,
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请输入备注信息",
                      trigger: "blur",
                    },
                  ],
                },
              },
            ],
          },
          furtherInfoHalfFormFlag: true,
          tableName: "infoEntryTableStaff",
          tableList: [],
        },
         /* 校内部门 */
        "school-department": {
          infoEntryFormName: "infoEntryFormNameSchoolDepartment",
          // 在校用户信息录入 核验
          infoEntryUrl: '/sys/user/schoolInformCheck',
          infoEntryFormModel: {
            formList: [
              {
                value: "",
                prop: "name",
                label: "真实姓名",
                placeHolder: "请输入您的真实姓名",
                rules: {
                  value: [
                    {
                      required: true,
                      trigger: "blur",
                      validator: vaildRealName,
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "idCardNum",
                label: "身份证号码",
                placeHolder: "请输入您的身份证号码",
                maxLength: 18,
                rules: {
                  value: [
                    { required: true, trigger: "blur", validator: validIDCard },
                  ],
                },
              },
              // {
              //   value: "",
              //   prop: "stuNo",
              //   label: "学号",
              //   placeHolder: "请输入您的学号",
              //   rules: {
              //     value: [
              //       {
              //         required: true,
              //         message: "请输入您的学号",
              //         trigger: "blur",
              //       },
              //     ],
              //   },
              // },
              {
                value: "",
                prop: "idCardIcon",
                label: "身份证头像页",
                type: "uploadPicture",
                limit: 1,
                fileList: [],
                placeHolder: "",
                clearForm: true,
                rules: {
                  value: [{
                    required: true,
                    message: "请上传身份证头像页",
                    trigger: "change"
                  }]
                }
              }, {
                value: "",
                prop: "idCardEmblem",
                label: "身份证国徽页",
                type: "uploadPicture",
                limit: 1,
                fileList: [],
                placeHolder: "",
                rules: {
                  value: [{
                    required: true,
                    message: "请上传身份证国徽页",
                    trigger: "change"
                  }]
                }
              }
            ],
          },
          infoEntryHalfFormFlag: true,
          furtherInfoFormName: "furtherInfoFormNameSchoolDepartment",
          // 在校用户信息人工校库信息校检
          furtherInfoUrl: '/sys/user/handWorkInformCheck',
          furtherInfoFormModel: {
            formList: [
              // {
              //   value: "",
              //   prop: "originSchool",
              //   label: "学校名称",
              //   placeHolder: "请输入您就读学校名称精确至校区",
              //   rules: {
              //     value: [
              //       {
              //         required: true,
              //         message: "请输入您就读学校名称，精确至校区更方便查找噢！",
              //         trigger: "blur",
              //       },
              //     ],
              //   },
              // },
              {
                value: "",
                prop: "originSchool",
                label: "所在校区",
                placeHolder: "请选择您所在校区",
                yearList: true,
                type: "select",
                selectOptions: this.getSchool(),
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请选择所在校区，更方便查找噢！",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "regYear",
                label: "入学年份",
                placeHolder: "请选择您的入学年份",
                yearList: true,
                type: "select",
                selectOptions: this.setYearOptions(),
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请选择您的入学年份",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "department",
                label: "所在院系",
                placeHolder: "请输入您的院系",
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请输入您的院系",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "graduated",
                label: "修读专业",
                placeHolder: "请输入您的专业",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入您的专业",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "stuNo",
                label: "学号",
                placeHolder: "请输入您的学号",
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请输入您的学号",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "className",
                label: "班级",
                placeHolder: "请输入您班级",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入您班级",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "remarks",
                label: "备注",
                placeHolder: "备注信息",
                type: "textarea",
                maxForm: true,
                rows: 5,
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请输入备注信息",
                      trigger: "blur",
                    },
                  ],
                },
              },
            ],
          },
          furtherInfoHalfFormFlag: true,
          tableName: "infoEntryTableSchoolDepartment",
          tableList: [],
        },
        /* 企业用户 */
        "company-user": {
          infoEntryFormName: "infoEntryFormNameCompanyUser",
          type: 'company',
          //企业用户信息录入 核验
          infoEntryUrl: '/sys/user/businessInformCheck',
          infoEntryFormModel: {
            labelWidth: "9rem",
            hideFormFlag: true,//默认隐藏
            formList: [
              {
                value: "0",
                prop: "type",
                label: "是否授权人",
                placeHolder: "",
                type: "radio",
                hideFormSwitch: true,
                selectOptions: [
                  {
                    value: '1',
                    text: "是",
                  },
                  {
                    value: '0',
                    text: "否",
                  },
                ],
                rules: {
                  value: [
                    {
                      required: false,
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "companyCode",
                label: "统一社会信用代码",
                placeHolder: "请输入统一社会信用代码，与营业执照正本一致",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入统一社会信用代码，与营业执照正本一致",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "companyName",
                label: "企业名称",
                placeHolder: "请输入企业名称",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入企业名称",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "legalName",
                label: "法定代表人",
                placeHolder: "请输入法定代表人姓名",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入法定代表人姓名",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "legalCardNum",
                label: "身份证号码",
                placeHolder: "请输入法人身份证号码",
                maxLength: 18,
                rules: {
                  value: [
                    {
                      required: true,
                      validator: validIDCard,
                      trigger: "blur",
                    },
                  ],
                },
              },
              // 授权信息
              {
                type: 'tips',
                text: '授权信息',
                hideFormItem: true,
                rules: {
                  value: [
                    {
                      required: false,
                      message: "",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "authorizeName",
                label: "您的真实姓名",
                placeHolder: "请输入您真实姓名",
                hideFormItem: true,
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入您真实姓名",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "authorizeCardNum",
                label: "身份证号码",
                placeHolder: "请输入您的身份证号码",
                maxLength: 18,
                hideFormItem: true,
                rules: {
                  value: [
                    {
                      required: true,
                      trigger: "blur",
                      validator: validIDCard,
                    },
                  ],
                },
              },

            ],
          },
          furtherInfoFormName: "",
          furtherInfoFormModel: {
            formList: [],
          },
          bizMaterialFormName: "bizMaterialFormNameCompanyUser",
          bizMaterialUrl: '/sys/user/bizMaterialAdd',
          bizMaterialFormModel: {
            labelWidth: "9rem",
            hideFormFlag: true,//默认隐藏
            formList: [
              {
                value: "",
                prop: "authorizeCardUrl",
                label: "授权人资料",
                type: "uploadPicture",
                limit: 4,
                fileList: [],
                placeHolder: "",
                hideFormItem: true,//默认隐藏
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请上传授权人持授权书、身份证正反面照片",
                      trigger: "change",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "evidenceUrl",
                label: "企业证明材料",
                type: "uploadPicture",
                limit: 4,
                fileList: [],
                placeHolder: "",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请上传证明材料",
                      trigger: "change",
                    },
                  ],
                },
              },
            ]
          },
          tableName: "",
          tableList: [],
        },
        /* 校友用户 */
        "alumni-user": {
          infoEntryFormName: "infoEntryFormNameAlumniUser",
          //校友用户信息录入 核验
          infoEntryUrl: '/sys/user/alumnusInformCheck',
          infoEntryFormModel: {
            formList: [
              {
                value: "",
                prop: "name",
                label: "真实姓名",
                placeHolder: "请输入您的真实姓名",
                rules: {
                  value: [
                    {
                      required: true,
                      trigger: "blur",
                      validator: vaildRealName,
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "idCardNum",
                label: "身份证号码",
                placeHolder: "请输入您的身份证号码",
                maxLength: 18,
                rules: {
                  value: [
                    { required: true, trigger: "blur", validator: validIDCard },
                  ],
                },
              },
              {
                value: "",
                prop: "idCardIcon",
                label: "身份证头像页",
                type: "uploadPicture",
                limit: 1,
                fileList: [],
                placeHolder: "",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请上传身份证头像页",
                      trigger: "change",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "idCardEmblem",
                label: "身份证国徽页",
                type: "uploadPicture",
                limit: 1,
                fileList: [],
                placeHolder: "",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请上传身份证国徽页",
                      trigger: "change",
                    },
                  ],
                },
              },
            ],
          },
          infoEntryHalfFormFlag: true,
          furtherInfoFormName: "furtherInfoFormNameAlumniUser",
          // 校友用户信息录入 人工核验
          furtherInfoUrl: '/sys/user/alumnusHandworkInformCheck',
          furtherInfoFormModel: {
            formList: [
              {
                value: "",
                prop: "originSchool",
                label: "所在校区",
                placeHolder: "请选择您所在校区",
                yearList: true,
                type: "select",
                selectOptions: this.getSchool(),
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请选择所在校区，更方便查找噢！",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "regYear",
                label: "入学年份",
                placeHolder: "请选择您的入学年份",
                yearList: true,
                type: "select",
                selectOptions: this.setYearOptions(),
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请选择您的入学年份",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "gradYear",
                label: "毕业年份",
                placeHolder: "请选择您的毕业年份",
                yearList: true,
                type: "select",
                selectOptions: this.setYearOptions(),
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请选择您的毕业年份",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "department",
                label: "所在院系",
                placeHolder: "请输入您的院系",
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请输入您的院系",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "graduated",
                label: "修读专业",
                placeHolder: "请输入您的专业",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入您的专业",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "stuOrigin",
                label: "生源地",
                placeHolder: "请选择您的生源地（高考省份）",
                yearList: true,
                type: "select",
                selectOptions: this.getStuOrigin(),
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请选择您的生源地",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "stuNo",
                label: "学号",
                placeHolder: "请输入您的学号",
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请输入您的学号",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "className",
                label: "班级",
                placeHolder: "请输入您的班级",
                rules: {
                  value: [
                    {
                      required: true,
                      message: "请输入您的班级",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "degreeNum",
                label: "学位证书号",
                placeHolder: "请输入您的学位证书号",
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请输入您的学位证书号",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "graduationNum",
                label: "毕业证书号",
                placeHolder: "请输入您的毕业证书号",
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请输入您的毕业证书号",
                      trigger: "blur",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "degreeCerdPhoto",
                label: "学位证书附件",
                placeHolder: "",
                clearForm: true,
                type: "uploadFile",
                limit: 1,
                fileList: [],
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请上传学位证书附件",
                      trigger: "change",
                    },
                  ],
                },
              },
              {
                value: "",
                prop: "graduateCerdPhoto",
                label: "毕业证书附件",
                placeHolder: "",
                type: "uploadFile",
                limit: 1,
                fileList: [],
                rules: {
                  value: [
                    {
                      required: false,
                      message: "请上传毕业证书附件",
                      trigger: "change",
                    },
                  ],
                },
              },
            ],
          },
          furtherInfoHalfFormFlag: true,
          tableName: "infoEntryTableAlumniUser",
          tableList: [],
        },
      },
    }
  },
  methods: {
    setYearOptions() {
      let year = new Date().getFullYear();
      let yearList = generateArray(1988, year).reverse();
      let yearOptions = [];
      yearList.forEach((item) => {
        let obj = {
          value: item,
          text: item,
        };
        yearOptions.push(obj);
      });
      return yearOptions;
    },
    //获取校区信息
    getSchool() {
        let schoolOptions =[];
      getSchoolList().then((response) => {
        response.result.schoolList.forEach((item) => {
            let obj = {
              value: item.departName,
              text:  item.departName,
            };
            schoolOptions.push(obj);
          });
        });
          return schoolOptions;
    },

    //获取生源地信息
    getStuOrigin() {
      let StuOriginOptions =[];
      this.$api.getDictItems("sys_province_city,name,name,type='1'").then(res => {
        if (res.result) {
              res.result.forEach((item) => {
                let obj = {
                  value: item.value,
                  text:  item.text,
                };
                StuOriginOptions.push(obj);
              });
        }
      });
          return StuOriginOptions;
    },

    setTableList(key, data) {
      /*在校用户
         教职工   staff
         校内部门 school-department
         */
      switch (key) {
        //在校用户
        case 'school-user':
          this.formModel[key].tableList = [
            [
              "姓名：",
              data.name,
              "性别：",
              data.sexText,
              "身份证号码：",
              data.idCard,
            ],
            [
              "入学年份：",
              data.regYear,
              "学号：",
              data.stuNo,
              "所在院系：",
              data.department,
              "修读专业：",
              data.graduated,
            ],
          ];
          break;
        //企业用户
        case 'company-user':
          break;
        //校友用户
        case 'alumni-user':
          this.formModel[key].tableList = [
            [
              "姓名：",
              data.name,
              "性别：",
              data.sexText,
              "身份证号码：",
              data.idCard,
            ],
            [
              "所在院系：",
              data.department,
              "修读专业：",
              data.graduated,
            ],
          ];
          break;
        //家长用户
        case 'patriarch-user':

          break;
        // 教职工
        case 'staff':

          break;
        // 校内部门
        case 'school-department':

          break;
        default:
          break;
      }
    }
  }
}
