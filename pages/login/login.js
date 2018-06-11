// pages/login/login.js
const app = getApp()
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneval:'',
    codeval:'',
    yzm:'获取验证码',
    firsttap:false
  },
  yzmfn: function () {
    let that = this;
    if (!that.data.phoneval || !util.rge.regphone(this.data.phoneval)) {
      wx.showToast({
        title: '手机号不对',
        icon: 'none'
      })
      return;
    }
    if (that.data.firsttap) {
      wx.showToast({
        title: '发送中...',
        icon: 'none'
      })
      return;
    }
    app.ask('sms/api/Sms.php', { phone: that.data.phoneval }, function (res) {
      wx.showToast({
        title: '发送成功',
        icon: 'success'
      })

      that.setData({
        firsttap: true
      });
      let s = 60;
      that.setData({
        yzm: s + 's'
      });
      let setval = setInterval(function () {
        if (s == 1) {
          that.setData({
            firsttap: false
          });
          that.setData({
            yzm: '重获验证码'
          });
          clearInterval(setval);
          return;
        }
        s--
        that.setData({
          yzm: s + 's'
        });

      }, 1000);

    });
    
  },
  phonevalfn: function(e){
    this.setData({
      phoneval:e.detail.value
    });
  },
  codevalfn: function (e){
    this.setData({
      codeval: e.detail.value
    });
  },
  geton: function (){
    if (!util.rge.regphone(this.data.phoneval)) {
      wx.showModal({ title: '提示', content: '手机号有误', showCancel: false, confirmColor:'#333' })
      return;
    } else if (!util.rge.regcode(this.data.codeval)) {
      wx.showModal({ title: '提示', content: '验证码有误', showCancel: false, confirmColor: '#333' })
      return;
    }
    let that=this
    console.log(that.data.codeval, that.data.phoneval);
    app.ask('home/api/login', { app: app.appid, phone: that.data.phoneval, vcode: that.data.codeval }, function (res) {
      wx.setStorageSync('loginbool', res.data.data.user_id);
      wx.setStorageSync('uphone', res.data.data.mobile);
      wx.showToast({
        title:'登陆成功',
        success: function (){
          let st=setTimeout(function (){
            wx.navigateTo({
              url: '/pages/index/index',
            })
            clearTimeout(st);
          },1000);
        }
      })
     
      // wx.clearStorageSync();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.allconfig.title.six[0]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})