// @ts-nocheck
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
          furtherInfoFormName: "furtherInfoFormNameSchoolUser",
          // 信息完善
          furtherInfoUrl: '/personalInfo/persInfoSave',
          furtherInfoFormModel: {
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
                prop: "originSchool",
                label: "所在校区",
                placeHolder: "请选择您所在校区",
                yearList: true,
                type: "select",
                selectOptions: this.getSchool(),
                rules: {
                  value: [
                    {
                      required: false,
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
                      required: false,
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
        /* 校友用户 */
        "alumni-user": {
          furtherInfoFormName: "furtherInfoFormNameAlumniUser",
          // 信息完善
          furtherInfoUrl: '/personalInfo/persInfoSave',
          furtherInfoFormModel: {
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
                prop: "originSchool",
                label: "所在校区",
                placeHolder: "请选择您所在校区",
                yearList: true,
                type: "select",
                selectOptions: this.getSchool(),
                rules: {
                  value: [
                    {
                      required: false,
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
                      required: false,
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
      let schoolOptions = [];
      getSchoolList().then((response) => {
        response.result.schoolList.forEach((item) => {
          let obj = {
            value: item.departName,
            text: item.departName,
          };
          schoolOptions.push(obj);
        });
      });
      return schoolOptions;
    },
  }
}
