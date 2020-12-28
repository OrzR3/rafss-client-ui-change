// @ts-nocheck
// 手机号验证2020年最新正则表达式
export const phoneReg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/

export const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export const idcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

export const nameReg = /^([\u4e00-\u9fa5]{2,20}|[a-zA-Z.\s]{2,20})$/;

/**
 * 验证邮箱输入
 * @param {验证规则} rule
 * @param {验证的值} value
 * @param {回调函数} callback
 */
export function validPhoneOrEmail(rule, value, callback) {
  if (rule.required && !value) {
    return callback(new Error('请输入手机号/邮箱'));
  }
  if (value === '' || value === null) callback()
  if (phoneReg.test(value) || emailReg.test(value)) {
    callback()
  } else {
    callback(new Error('手机号/邮箱格式输入有误'))
  }
}
export function validPhone(rule, value, callback) {
  if (rule.required && !value) {
    return callback(new Error('请输入手机号码'));
  }
  if (value === '' || value === null) callback()
  if (phoneReg.test(value)) {
    callback()
  } else {
    callback(new Error('手机号格式输入有误'))
  }
}
export function validEmail(rule, value, callback) {
  if (rule.required && !value) {
    return callback(new Error('请输入邮箱'));
  }
  if (value === '' || value === null) callback()
  if (emailReg.test(value)) {
    callback()
  } else {
    callback(new Error('邮箱格式输入有误'))
  }
}
export function validIDCard(rule, value, callback) {
  if (rule.required && !value) {
    return callback(new Error('请输入身份证号码'));
  }
  if (value === '' || value === null) callback()
  if (idcardReg.test(value)) {
    callback()
  } else {
    callback(new Error('身份证号填写有误'))
  }
}
export function vaildRealName(rule, value, callback){
  if (rule.required && !value) {
    return callback(new Error('请输入真实姓名'));
  }
  if (value === '' || value === null) callback()
  if (nameReg.test(value)) {
    callback()
  } else {
    callback(new Error('真实姓名填写有误'))
  }
}

/*
验证密码
*/
export function validPwd(rule, value, callback) {
  if (rule.required && !value) {
    return callback(new Error('请输入密码（密码需大于8位,由数字、字母和特殊符号组成）'));
  }
  if (value === '' || value === null) callback();
  /* js正则校验密码，要求是8-16位 */
  // let rules = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  let rules = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/;
  if (rules.test(value)) {
    callback()
  } else {
    callback(new Error('密码由8位数字、字母和特殊符号组成!'))
  }
}
