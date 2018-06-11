// pages/surepay/surepay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectpay: true,
    selectpay2: false,
    heji: 2000,
    dingjin:2000,
    quankuan:2200,
    zonge:2200
  },
  selectpayfn: function (){
    this.setData({
      selectpay: true,
      selectpay2: false
    });
    this.setData({
      zonge: this.data.dingjin
    });
  },
  selectpayfn2: function () {
    this.setData({
      selectpay: false,
      selectpay2: true
    });
    this.setData({
      zonge: this.data.quankuan
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.allconfig.title.two[1]
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