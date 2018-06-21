//index.js
//获取应用实例
const app = getApp()
import util from '../../utils/util.js'
Page({
  data: {
    app:app,
    topmargin:0,
    steps:1,
    animm:'300ms',
    started:'',
    endd:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    autoplay: true,
    date: '2016-09-01',
    animationData: {},
    hiddendiv:'visible',
    news: [],
    navibars:[],
    bigimg:{},
    gdtt:{},
    name: '',
    order_time: '',
    phone: '',
    firstclick:true
  },
  //事件处理函数
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      order_time: e.detail.value
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: app.allconfig.title.one[0]
    })
    let nowdate = new Date();
    let ndate1 = nowdate.getFullYear();
    let ndate2 = nowdate.getMonth()+1;
    if (ndate2<10){
      ndate2 = '0' + ndate2
    }
    let ndate3 = nowdate.getDate();
    this.setData({
      date: ndate1 + '-' + ndate2 + '-' + ndate3
    });
    this.setData({
      started: ndate1 + '-' + ndate2 + '-' + ndate3
    });
    this.setData({
      endd: (ndate1+5) + '-' + ndate2 + '-' + ndate3
    });

    var that = this;
    app.ask('home/api/banner', { appid: app.appid }, function (res) {
      that.setData({
        imgUrls: res.data.data
      });
    });
    

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that=this;
    console.log(app.appid);
    app.ask('home/api/nav',{appid:app.appid},function (res){
      that.setData({
        navibars: res.data.data
      });
    });
    app.ask('home/api/ad', { appid: app.appid }, function (res) {
      that.setData({
        bigimg: res.data.data
      });
    });
    app.ask('home/api/offer_info', { appid: app.appid }, function (res) {
      var ns = res.data.data.offer_info
      ns.push(ns[0])
      that.setData({
        gdtt: res.data.data,
        news: ns
      });

      var hei = (that.data.news.length - 1) * 35;
      // var animation = wx.createAnimation({
      //   duration: 300,
      //   timingFunction: 'ease',
      // })
      // that.animation = animation
      // animation.translateY(0).step()
      // that.setData({
      //   animationData: animation.export()
      // })
      // var steps = 1;
      // animation.translateY(-(steps)).step()
      // that.setData({
      //   animationData: animation.export()
      // })
      // that.stopinterl = setInterval(function () {
      //   if (parseInt(hei) < Math.abs(steps)) {
      //     steps = 1;
      //     animation.translateY(0).step({ timingFunction: 'step-start' });
      //   }
      //   animation.translateY(-steps).step()
      //   steps += 1
      //   that.setData({
      //     animationData: animation.export()
      //   })
      // }.bind(that), 90)

      var s = 0;
      var gaifou=false;
      that.stopinterl = setInterval(function () {
        if (parseInt(hei) < Math.abs(that.data.steps)) {
          that.setData({
            animm: 0
          }); 
          that.setData({
            steps:0
          }); 
          gaifou=true;
        }
        if (gaifou) {
          setTimeout(function (){
            that.setData({
              animm: '300ms'
            });
          },300);
          gaifou=false;
        }
        s = that.data.steps+1;
        that.setData({
          steps:s
        });
        that.setData({
          topmargin: -(that.data.steps)
        })
      }.bind(that), 90)

    });
  },
  msfn:function (e){
    if (!this.data.firstclick){
      return;
    }
    let that = this
    that.setData({
      firstclick: false
    });
    let par = {}
    par.name = this.data.name;
    par.order_time = this.data.order_time;
    par.phone = this.data.phone;
    console.log(par.phone);
    if(!this.data.name){
      wx.showToast({
        title: '姓名不可空',
        icon: 'none'
      })
      return;
    }
    if (!util.rge.regphone(par.phone)){
      wx.showToast({
        title: '手机号不对',
        icon: 'none'
      })
      return;
    }
    app.ask('home/api/offer', { appid: app.appid,param:par }, function (res) {
      that.setData({
        gdtt: res.data.data
      });
      let stt=setTimeout(function (){
        that.setData({
          firstclick: true
        });
        clearTimeout(stt);
      },1000);
      wx.showToast({
        title: '约面成功',
        icon: 'success'
      })
    });
  },
  getinputval:function (e){
    if (e.currentTarget.dataset.type =='xming'){
      this.setData({
        name:e.detail.value
      });
    } else if (e.currentTarget.dataset.type == 'phone') {
      this.setData({
        phone: e.detail.value
      });
    }
  },
  bango:function (e){
    wx.navigateTo({
      url: e.currentTarget.dataset.link
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  gojump:function (e){//wx.getStorageSync('loginbool')判断是否登录状态
    if ((e.currentTarget.dataset.ind == 1 || e.currentTarget.dataset.ind == 2) && !wx.getStorageSync('loginbool')){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }else{
      wx.navigateTo({
        url: e.currentTarget.dataset.jump
      })
    }
  },
  gosearchys: function (e) {
    wx.navigateTo({
      url: '/pages/searchys/searchys',
    })
  },// url: '/pages/login/login',
  goxiadan: function (e) {
    wx.navigateTo({
      // url: '/pages/login/login',
      url: '/pages/dingdan/dingdan',
    })
  },
  gomydd: function (e) {
    wx.navigateTo({
      // url: '/pages/login/login',
      url: '/pages/mydd/mydd',
    })
  },
  gofwjs:function (){
    wx.navigateTo({
      url: '/pages/tcjs/tcjs',
    })
  },
  goabout: function () {
    wx.navigateTo({
      url: '/pages/aboutas/aboutas',
    })
  }
})
