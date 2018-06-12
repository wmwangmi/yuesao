// pages/xdan/xdan.js
const app = getApp()
var QQMapWX = require('../../maptool/qqmap-wx-jssdk.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['26'],
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    select: 0,
    select2: 0,
    xingarr: [{ level: '二星', levelnum: '2' }, { level: '三星', levelnum: '3' }, { level: '四星', levelnum: '4' }, { level: '五星', levelnum: '5' }, { level: '六星', levelnum: '6' }, { level: '八星', levelnum: '8' }, { level: '金牌', levelnum: '7' }],
    xingarr2: [{ bb_num: 1, bb_type: '单胞胎' }, { bb_num: 2, bb_type: '双胞胎' }],
    levelnumsel: '2',
    bb_numsel: '1',
    consignee: '',
    mobile: '',
    address: '',
    order_time: '',
    fw_t_num: 0,
    user_note: '',
    startdata: '',
    enddata: '',
    payfor: '',
    zilen: 0,
    maxzilen: 200,
    yid: '',
    ysspu: '',
    nameer: ''
  },
  ongetval: function (e) {
    let inpname = e.target.dataset.inpname;
    if (inpname == 'consignee') {
      this.setData({
        consignee: e.detail.value
      });
    } else if (inpname == 'mobile') {
      this.setData({
        mobile: e.detail.value
      });
    } else if (inpname == 'address') {
      this.setData({
        address: e.detail.value
      });
    } else if (inpname == 'order_time') {
      this.setData({
        order_time: e.detail.value
      });
    } else if (inpname == 'fw_t_num') {
      this.setData({
        fw_t_num: this.data.array[this.data.fw_t_num]
      });
    } else if (inpname == 'user_note') {
      this.setData({
        user_note: e.detail.value
      });
      this.setData({
        zilen: e.detail.value.length
      });
    }

    console.log(e.detail.value);
  },
  getzilen: function (e) {
    if (e.detail.value.length > this.data.maxzilen) {
      console.log(e.detail.value.length > this.data.maxzilen, e.detail.value.length, this.data.maxzilen);
      return;
    }
    this.setData({
      zilen: e.detail.value.length
    });
    console.log(this.data.zilen);
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      order_time: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  selxing: function (e) {
    this.setData({
      select: e.target.dataset.ind
    });
    this.getjw(e);
  },
  selxing2: function (e) {
    this.setData({
      select2: e.target.dataset.ind
    });
    this.getbb(e);
  },
  getjw: function (e) {
    let a, b;
    b = this.data.bb_numsel
    a = e.currentTarget.dataset.levelnum;
    this.setData({
      levelnumsel: a
    });
    this.getmoneynum(a, b)
  },
  getbb: function (e) {
    let a, b;
    a = this.data.levelnumsel
    b = e.currentTarget.dataset.bb_num;
    this.setData({
      bb_numsel: b
    });
    this.getmoneynum(a, b)
  },
  getmoneynum: function (le, bn) {
    var that = this;
    let bb_num = bn, level = le;
    console.log(app.appid);
    app.ask('home/api/level_num_price', { appid: app.appid, level: level, bb_num: bb_num }, function (res) {
      console.log(res);
      if (res.data.data.ys_price) {
        that.setData({
          payfor: res.data.data.ys_price
        });
      }
      // that.setData({
      //   navibars: res.data.data
      // });
    });
  },
  payaction: function (e) {
    var that = this;
    if (!that.data.consignee || !that.data.address) {
      wx.showModal({ title: '提示：', content: '联系人或者地址不为空', showCancel: false })
    }
    let paramdata = { address: that.data.address, bb_num: that.data.bb_numsel, consignee: that.data.consignee, fw_t_num: that.data.array[that.data.fw_t_num], level: that.data.levelnumsel, mobile: that.data.mobile, order_time: that.data.order_time, user_id: wx.getStorageSync('loginbool'), user_note: that.data.user_note };
    paramdata = JSON.stringify(paramdata);
    console.log(paramdata);
    app.ask('home/api/order', { appid: app.appid, param: paramdata, yuesao_id: this.data.yid }, function (res) {
      console.log(res);
      wx.navigateTo({
        url: '/pages/mydd/mydd',
      })
    });
  },
  getaddr: function () {
    var that = this;
    var qqmapsdk = new QQMapWX({
      key: app.allconfig.mapAppSecret // 必填
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            // var address = addressRes.result.formatted_addresses.recommend;
            var address = addressRes.result.address;
            that.setData({
              address: address
            });
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      yid: options.yid
    });
    this.setData({
      ysspu: options.spu
    });
    this.setData({
      nameer: options.nameer
    }); 
    wx.setNavigationBarTitle({
      title: app.allconfig.title.one[6]
    })
    if (wx.getStorageSync('uphone')) {
      let uphone = wx.getStorageSync('uphone');
      this.setData({
        mobile: uphone
      });
    }
    this.getmoneynum(2, 1);
    let dateer = new Date();
    let nowdate = dateer.getFullYear() + '-' + (dateer.getMonth() + 1) + '-' + dateer.getDate();
    let moredate = (dateer.getFullYear() + 5) + '-' + (dateer.getMonth() + 1) + '-' + dateer.getDate();
    this.setData({
      order_time: nowdate
    });
    this.setData({
      startdata: nowdate
    });
    this.setData({
      enddata: moredate
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