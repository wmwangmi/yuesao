// pages/getdate/getdate.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09',
    databanls:[],
    sanliedata:[],
    yid:''
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  prevdata: function () {
    var that=this;
    this.getdangq(this.data.sanliedata[0].y, this.data.sanliedata[0].m,function (d){
      that.setData({
        databanls: that.chongzhuang(that.data.sanliedata[0].y, that.data.sanliedata[0].m, '', d)
      });
    });
    
    // this.setData({
    //   sanliedata: this.getDaye(this.data.sanliedata[0].y, this.data.sanliedata[0].m)
    // });
  },
  nextdata: function () {
    var that = this;
    this.getdangq(this.data.sanliedata[2].y, this.data.sanliedata[2].m, function (d) {
      that.setData({
        databanls: that.chongzhuang(that.data.sanliedata[2].y, that.data.sanliedata[2].m,'',d)
      });
    });
  },
  datablock: function (e){
    let typ=e.target.dataset.type;
    if(typ == 'prev'){
      this.prevdata();
    } else if(typ == 'next'){
      this.nextdata();
    }
  },
  getDaye: function (year, month) {//获取上，本，下月年月总共的天数
    var a, b, c, year1, year2, year3, month1, month2, month3;
    year1 = year; year2 = year; year3=year;
    month1 = month-1; month2 = month; month3 = month+1;
    if(month1==0){
      month1=12;
      year1=year-1;
    }else if(month3==13){
      month3=1;
      year3=year+1;
    }
     a = new Date(year1, month1, 0);
     b = new Date(year2, month2, 0);
     c = new Date(year3, month3, 0);
     var d = [{ y: year1, m: month1, d: a.getDate() }, { y: year2, m: month2, d: b.getDate() }, { y: year3, m: month3, d: c.getDate() }];
     this.setData({
       date: year2 + '-' + month2
     });
     return d;
  },
  chongzhuang: function (year, month, date, nowdaysban){
    return this.getDataArr(year, month, date, nowdaysban);
  },
  getDataArr: function (year, month, date, nowdaysban){
    let Dates=new Date();
    let nyear,nmonth,ndate;
    if (date) {
      ndate = date;
    } else {
      ndate = Dates.getDate();
    }
    if (month){
      nmonth = month;
    }else{
      nmonth = Dates.getMonth() + 1;
    }
    if(year){
      nyear = year;
    }else {
      nyear = Dates.getFullYear();
    }
    let mst = nowdaysban||[];//已站的档期
    let daarr=[];
    let dateban=this.getDaye(nyear, nmonth);
    this.setData({
      sanliedata: dateban
    });
    let str = '"' + nyear + ',' + nmonth + ',' + ndate + '"';
    let str2 = '"' + dateban[1].y + ',' + dateban[1].m + ', ' + dateban[1].d + ' "';
    let nweekd = new Date(str).getDay();
    let nweekd2 = new Date(str2).getDay();
    let darr = [];
    for (let i = (dateban[0].d - nweekd + 1); i <= (dateban[0].d); i++) {
      let objdarr = {};
      objdarr.dt = i;
      objdarr.tp = 'prev';
      darr.push(objdarr);
    }
    for (let i = 1; i <= dateban[1].d; i++) {
      let objdarr = {};
      objdarr.dt = i;
      objdarr.tp = 'now';
      objdarr.defaulcla = 'classnow';
      for (let j = 0; j < mst.length;j++){
        if (i == mst[j]){
          objdarr.nicecla = 'classnic';
        }
      }
      darr.push(objdarr);
    }
    let nextGS = 42 - darr.length;
    for (let i = 1; i <= nextGS; i++) {
      let objdarr = {};
      objdarr.dt = i;
      objdarr.tp = 'next';
      darr.push(objdarr);
    }
    return darr;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.allconfig.title.one[4]
    })
    this.setData({
      databanls:this.getDataArr(),
      yid: options.yid
    });
    
    let getd=new Date();
    this.setData({
      data: getd.getFullYear+'-'+(getd.getMonth+1)
    });
    var that = this;
    let param = JSON.stringify({ 'goods_id': that.data.yid, 'month': (getd.getMonth+1), 'year': getd.getFullYear});
    app.ask('home/api/dangq', { appid: app.appid, param: param }, function (res) {
      let dats;
      if (res.data && res.data.data){
        dats=res.data.data.tian.split(',');
      }else{
        dats=[]
      }
      that.setData({
        databanls: that.getDataArr('', '', '', dats)
      });
    });

  },
  getdangq: function (y,m,fn){
    var that = this;
    let param = JSON.stringify({ 'goods_id': that.data.yid, 'month': (m), 'year': y });
    app.ask('home/api/dangq', { appid: app.appid, param: param }, function (res) {
      let dats;
      if (res.data && res.data.data){
        dats = res.data.data.tian.split(',');
      }else{
        dats = [];
      }
      fn && fn(dats);
      // that.setData({
      //   databanls: that.getDataArr()
      // });
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