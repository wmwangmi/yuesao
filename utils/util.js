const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 验证
var rge={}
//手机验证
rge.regphone = phone=>{
  var mobile = /^(1[3|4|5|7|8])\d{9}$/;
  if (mobile.test(phone)){
    return true;
  }
  return false;
}
//验证码验证
rge.regcode = code => {
  var numreg = /^\d{6}$/;
  if (numreg.test(code)) {
    return true;
  }
  return false;
}

module.exports = {
  formatTime: formatTime,
  rge: rge
}
