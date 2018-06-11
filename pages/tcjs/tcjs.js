// pages/tcjs/tcjs.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selector:0,
    scrollx:true,
    yuesao:{},
    yuying:{},
    cuiru:{}
  },
  changesel:function (e){
    this.setData({
      selector:e.target.dataset.selnm
    });
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.allconfig.title.fore[0]
    })
    var that = this;
    app.ask('home/api/yuesao_info', { appid: app.appid }, function (res) {
      if(res.data.data){
        that.setData({
          yuesao: res.data.data
        });
      }
    });
    app.ask('home/api/yuying_info', { appid: app.appid }, function (res) {
      if (res.data.data) {
        that.setData({
          yuying: res.data.data
        });
      }
    });
    app.ask('home/api/cuiru_info', { appid: app.appid }, function (res) {
      if (res.data.data) {
        that.setData({
          cuiru: res.data.data
        });
      }
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