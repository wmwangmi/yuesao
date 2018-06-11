// pages/ysdetail/ysdetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app:app,
    phonenum: '123456',
    xguanzhu:false,
    identxx:{},
    zheng: ['身份证', '月嫂证', '健康证', '母婴护理证'],
    biaoqian: ['擅长早教', '擅长月子餐', '擅长心理疏导', '机智耐心'],
    fengcaiimg: ['../images/fengcai.jpg', '../images/fengcai.jpg', '../images/fengcai.jpg', '../images/fengcai.jpg', '../images/fengcai.jpg', '../images/fengcai.jpg'],
    fwimgs: [{ 'imgsrc': 'https://www.bodylive.cn/images/muying1.jpg', 'tet': '基本护理' }, { 'imgsrc': 'https://www.bodylive.cn/images/muying3.jpg', 'tet': '科学喂养' }, { 'imgsrc': 'https://www.bodylive.cn/images/muying5.jpg', 'tet': '宝宝早教' }, { 'imgsrc': 'https://www.bodylive.cn/images/muying2.jpg', 'tet': '产后恢复' }, { 'imgsrc': 'https://www.bodylive.cn/images/muying4.jpg', 'tet': '月子餐' }, { 'imgsrc': 'https://www.bodylive.cn/images/muying6.jpg', 'tet': '母婴护理' }],
    pjdata:{},
    yuesao_id:''
  },
  callfor: function (){
    if(wx.getStorageSync('loginbool')){
      wx.navigateTo({
        url: '/pages/xdan/xdan?yid=' + this.data.yuesao_id + '&spu=' + this.data.identxx.spu + '&nameer=' + this.data.identxx.goods_name,
      })
    }
    // wx.showModal({
    //   title:'提示',
    //   content: '是否拨打电话',
    //   success: function (res) {
    //     if (res.confirm) {
    //       wx.makePhoneCall({
    //         phoneNumber: this.phonenum,
    //         fail: function () {
    //           wx.showToast({
    //             title: '线路繁忙'
    //           })
    //         }
    //       })
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // });
    
  },
  showxx:function(){
    this.setData({
      xguanzhu:!this.data.xguanzhu
    });
  }, 
  YSmts: function () {
    wx.navigateTo({
      url: '/pages/getdate/getdate?yid=' + this.data.identxx.goods_id,
    })
  },
  goauth: function () {
    let obj = JSON.stringify(this.data.identxx);
    wx.navigateTo({
      url: '/pages/auth/auth?obj=' + obj,
    })
  },
  goworkfc: function () {
    wx.navigateTo({
      url: '/pages/workfc/workfc',
    })
  },
  gofwnr: function () {
    wx.navigateTo({
      url: '/pages/fwnr/fwnr',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.allconfig.title.one[2]
    })
    this.setData({
      yuesao_id: options.yid
    });
    var that = this;
    app.ask('home/api/yuesaoxq', { appid: app.appid, yuesao_id: options.yid }, function (res) {
      that.setData({
        identxx: res.data.data
      });
    });
    app.ask('home/api/pingjia', { appid: app.appid, param: '', yuesid: options.yid}, function (res) {
      that.setData({
        pjdata:res.data.data
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