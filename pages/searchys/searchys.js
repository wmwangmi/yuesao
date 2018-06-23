// pages/searchys/searchys.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app:app,
    showafter0: '',
    showafter1: '',
    showafter2: '',
    showafter3: '',
    showSX: false,
    date: '请选择预约时间',
    array: ['美国', '中国', '巴西', '日本'],
    area: ['深圳', '上海', '南乡', '北京', '深圳', '上海', '南乡', '北京'],
    index: 0,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    xingji: ['不限', '一星', '二星', '三星', '四星', '五星', '六星', '金牌'],
    age: ['不限', '30以下', '30~40', '40以上'],
    checkwitch: 0,
    checkagewitch: 0,
    yslist:[],
    xxnum:[1,2,3,4,5]
  },
  checkxj: function (e){
   this.setData({
     checkwitch:e.target.dataset.ind
   });
  },
  checkagexj: function (e) {
    this.setData({
      checkagewitch: e.target.dataset.ind
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.allconfig.title.one[1]
    })
    this.setData({
      showafter0: 'showafter',
      showafter1: '',
      showafter2: '',
      showafter3: ''
    });

    wx.showLoading({});

    var that = this;
    app.ask('home/api/searchys', { appid: app.appid }, function (res) {
      for (let i = 0; i < res.data.data.length;i++){
        res.data.data[i].goods_content=res.data.data[i].goods_content.replace(/&lt;p&gt;/, '').replace(/&lt;\/p&gt;/, '');
      }
      that.setData({
        yslist: res.data.data
      });
    });

  },
  addClass:function (e){
    let ind = e.target.dataset.ind;
    this.setData({
      showafter0: '',
      showafter1: '',
      showafter2: '',
      showafter3: ''
    });
    if(ind == '0'){
      this.setData({
        showafter0: 'showafter'
      });
    } else if (ind == '1'){
      this.setData({
        showafter1: 'showafter'
      });
    } else if (ind == '2') {
      this.setData({
        showafter2: 'showafter'
      });
    } else if (ind == '3') {
      this.setData({
        showafter3: 'showafter'
      });
    }
    this.showSXfun(ind);
  },
  showSXfun : function (ind){
    if (ind == 3 || ind == '3'){
      this.setData({
        showSX: true
      });
    }
  },
  showXCfun: function (){
    this.setData({
      showSX: false
    });
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  gonext: function (e){
    wx.navigateTo({
      url: '/pages/ysdetail/ysdetail?yid='+e.currentTarget.dataset.yid,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  pushData:function (){
    var that = this;
    let addData
    addData = that.data.yslist;
    app.ask('home/api/searchys', { appid: app.appid }, function (res) {
      for (var i = 0; i < res.data.data.length; i++) {
        addData.push(res.data.data[i]);
      }
      that.setData({
        yslist: addData
      });
      wx.stopPullDownRefresh();
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
    let settime= setTimeout(function () { wx.hideLoading(); clearTimeout(settime)},600);
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
    this.pushData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.pushData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})