// pages/mydd/mydd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app:app,
    list:{}
  },
  canceldd: function (e){
    var that = this;
    app.ask('home/api/quxiaoorder', { appid: app.appid, order_id: e.target.dataset.oid }, function (res) {
      console.log(res);
      if(res.data.data==1){
        wx.showToast({
          title:'取消成功',
          icon:'success'
        })

        that.getlist();
      }else{
        wx.showToast({
          title: '取消失败',
          icon: 'none'
        })
      }
    });
  },
  payaction: function (e) {
    wx.navigateTo({
      url: '/pages/paysuccuss/paysuccuss',
    })
  },
  payaction2: function (e) {
    wx.navigateTo({
      url: '/pages/fwpj/fwpj?yid=' + e.target.dataset.yid + '&yname=' + e.target.dataset.yname,
    })
  },
  gonext:function (e){
    wx.navigateTo({
      url: '/pages/ddxqing/ddxqing?oid=' + e.currentTarget.dataset.oid,
    })
  },
  getlist: function (){
    var that = this;
    app.ask('home/api/myorder', { appid: app.appid, user_id: wx.getStorageSync('loginbool') }, function (res) {
      that.setData({
        list: res.data.data
      });
      console.log(res.data.data);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否登录
    wx.setNavigationBarTitle({
      title: app.allconfig.title.three[0]
    })
    this.getlist();
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