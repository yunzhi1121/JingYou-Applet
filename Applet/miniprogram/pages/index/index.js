var app = getApp()
const db=wx.cloud.database();
// let show = 'true'
Page({
  data: {
    show : '',
    img:"cloud://cloud1-2gllgk8g5733cd2d.636c-cloud1-2gllgk8g5733cd2d-1306048018/图标/zhaopian/",
    season:"",
    M:'',
    city: '', // 省
    temperature:'',
    weather:'',
    winddirection:'',
    windpower:'',
    humidity:''
  },
  change0: function(e){
    this.setData({
      show:''
    })
  },
  change1: function(e){
    this.setData({
      show:'true'
    })
  },
  a5: function (e) {
    app.globalData.currentLocation = '5A',
    app.globalData.title =e.currentTarget.dataset.title ,
    wx.navigateTo({ url: '../list/list' })
  },
  a4: function (e) {
    app.globalData.currentLocation = '4A',
    app.globalData.title =e.currentTarget.dataset.title ,
      wx.navigateTo({ url: '../list/list' })
  },
  top: function (e) {
    app.globalData.currentLocation = "top",
    app.globalData.title =e.currentTarget.dataset.title ,
      wx.navigateTo({ url: '../list/list' })
  },
  a3: function (e) {
    app.globalData.currentLocation = '非45A',
    app.globalData.title =e.currentTarget.dataset.title ,
      wx.navigateTo({ url: '../list/list' })
  },
  jing: function (e) {
    app.globalData.name = e.currentTarget.dataset.name,
    //跳转到详情页并携带商品id
      wx.navigateTo({ 
        url: '../detail/detail'
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //登录
    app.globalData.img="cloud://cloud1-2gllgk8g5733cd2d.636c-cloud1-2gllgk8g5733cd2d-1306048018/图标/zhaopian/"

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取月份 
    var M = (date.getMonth() + 1);
    db.collection('a')
    .where({
      mon:M
    })
    .field({
      name:true,
      mon:true,
      en:true,
    })
    .get()
    .then(res => {
      // console.log(res)
      this.setData({
        season:res.data,
        M:M
    })
    })
    //天气
  var self = this;
  wx.request({
    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
    data:{
      'key': '5252644c2611c77faace945fc2859f97',//填入自己申请到的Key
      'city':'110000'
    },
    header:{
      'content-type': 'application/json'
    },
    success:function(res){
      // console.log(res.data,res.data.lives[0].temperature);
      self.setData({
        temperature : res.data.lives[0].temperature,
        weather : res.data.lives[0].weather,
        winddirection : res.data.lives[0].winddirection,
        windpower : res.data.lives[0].windpower,
        humidity : res.data.lives[0].humidity
      })
    }
  })
  },
  

  getname: function (e) {
    // console.log('点击', e.currentTarget.dataset.name)
    app.globalData.name = e.currentTarget.dataset.name,
    //跳转到详情页并携带商品id
      wx.navigateTo({ 
        url: '../detail/detail'
    })
  }
})