/* 手机号中间几位为隐藏星 */
export function hideMobileMiddleNumber(phone){
  if(phone){
    phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1XXXX$2');
  }
  return phone;
}
export function validEmail(rule, value, callback){
  if(rule.required && !value){
    return callback(new Error('邮箱不能为空/Please input email'));
  }
  if(value === '' || value === null) callback()
  // let rules = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  let rules = /^[a-zA-Z0-9_-]+([-_.][a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if(rules.test(value)) {
    callback()
  } else {
    callback(new Error('邮箱格式输入有误/Email format error'))
  }
}

/**
 * 生成一个从 start 到 end 的连续数组
 * @param start
 * @param end
 */
export function generateArray (start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start);
}
export function objKeySort(obj) {//排序的函数
  var newkey = Object.keys(obj).sort();
　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {};//创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
      newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj;//返回排好序的新对象
}

/**
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/* JS 获取最近(前)7天（一周内）和最近(前)3天日期 */
export function getDay(day){
　　var today = new Date();
　　var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
　　today.setTime(targetday_milliseconds); //注意，这行是关键代码
　　var tYear = today.getFullYear();
　　var tMonth = today.getMonth();
　　var tDate = today.getDate();
　　tMonth = doHandleMonth(tMonth + 1);
　　tDate = doHandleMonth(tDate);
　　return tMonth+"-"+tDate;
}

export function doHandleMonth(month){
　　var m = month;
　　if(month.toString().length == 1){
　　　　m = "0" + month;
　　}
　　return m;
}

