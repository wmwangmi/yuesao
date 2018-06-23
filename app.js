//app.js
var allconfig = require('./allconfig.js');
App({
  domainurl: allconfig.domainurl,
  originurl: allconfig.originurl,
  appid: allconfig.appid,
  allconfig: allconfig,
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.clearStorageSync()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
    console.log("appId: " + allconfig.appid);
  },
  globalData: {
    userInfo: null
  },
  ask: function (Url, Data, sucfn, str) {
    var Url = this.domainurl + Url;
    wx.request({
      url: Url, 
      data: Data,
      // header: {
      //   'content-type': 'application/json'
      // },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode!=200){
          console.log(Url + '接口 ' + res.statusCode+' 啦');
          return;
        }
        if(res.data){
          if (res.data.code!=200){
            wx.showToast({
              title: res.data.tip_msg + '---' + res.data.code,
              icon: 'none'
            })
            return;
          }
          sucfn && sucfn(res);
        } else {
          wx.showToast({
            title: '系统繁忙，请稍后',
            icon: 'none'
          })
        }
      },
      fail: function (res){
        str == undefined ? str='请检查网络' : str=str;
        wx.showModal({
          title: '提示',
          content: str,
          showCancel: false
        })
      }
    })
  }
})