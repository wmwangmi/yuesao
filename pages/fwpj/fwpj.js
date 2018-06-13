// pages/fwpj/fwpj.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: app,
    showimgurl:[],
    select:false,
    yid:'',
    yname:'',
    pfen:0,
    pj:'',
    xingls: ['https://www.bodylive.cn/images/xin2.png', 'https://www.bodylive.cn/images/xin2.png', 'https://www.bodylive.cn/images/xin2.png', 'https://www.bodylive.cn/images/xin2.png','https://www.bodylive.cn/images/xin2.png']
  },
  liangxing: function(e){
    console.log(e.currentTarget.dataset.xlnum);
    this.setData({
      pfen: e.currentTarget.dataset.xlnum+1
    });
    if (e.currentTarget.dataset.xlnum==0){
      this.setData({
        xingls: ['https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin2.png', 'https://www.bodylive.cn/images/xin2.png', 'https://www.bodylive.cn/images/xin2.png', 'https://www.bodylive.cn/images/xin2.png']
      });
    } else if (e.currentTarget.dataset.xlnum == 1) {
      this.setData({
        xingls: ['https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin2.png', 'https://www.bodylive.cn/images/xin2.png', 'https://www.bodylive.cn/images/xin2.png']
      });
    } else if (e.currentTarget.dataset.xlnum == 2) {
      this.setData({
        xingls: ['https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin2.png', 'https://www.bodylive.cn/images/xin2.png']
      });
    } else if (e.currentTarget.dataset.xlnum == 3) {
      this.setData({
        xingls: ['https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin2.png']
      });
    } else if (e.currentTarget.dataset.xlnum == 4) {
      this.setData({
        xingls: ['https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin.png', 'https://www.bodylive.cn/images/xin.png']
      });
    }
    
  },
  getpj: function (e){
    this.setData({
      pj:e.detail.value
    });
  },
  subpj: function (e){
    var that = this;
    let paramdata = { p_fen: this.data.pfen, p_jia_content: this.data.pj, user_id: wx.getStorageSync('loginbool')}
    app.ask('home/api/pingjia', { appid: app.appid, param: paramdata , yuesid:that.data.yid }, function (res) {
      wx.showToast({
        title: '取消成功',
        icon: 'success'
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.allconfig.title.three[2]
    })
    this.setData({
      yid: options.yid,
      yname: options.yname
    });
  },
  selectchange:function (){
    this.setData({
      select:!this.data.select
    });
  },
  choseimg:function (){
    let that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        that.setData({
          showimgurl: tempFilePaths
        });
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: tempFilePaths // 需要预览的图片http链接列表
        })

        wx.uploadFile({
          url: that.data.app.originurl, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
        
      }
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