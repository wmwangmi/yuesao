// pages/aboutas/aboutas.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app:app,
    aboutob:{},
    content:{},
    danmuList: [
      {
        text: '',
        color: '#ff0000',
        time: 1
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.allconfig.title.five[0]
    })
    var that = this;
    app.ask('home/api/about', { appid: app.appid }, function (res) {
      that.setData({
        aboutob: res.data.data
      });
    });
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