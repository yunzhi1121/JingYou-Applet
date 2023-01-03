// pages/ditu/ditu.js
var QQMapWX = require('../../util/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: '4JGBZ-YVDLW-2JVR4-RGSUI-FLEGF-MGF5T' // 必填
});
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xmwzB_index: -1,   
    navigation: false,
    location: ['', '', '', '', ''],
    lon:'',
    lat:'',
    markers: "",
    tabs: [{
      // ico: '../../images/around/icon1.png',
      // ico_active: '../../images/around/icon1_1.png',
      name: '地铁'
    },
    {
      // ico: '../../images/around/icon2.png',
      // ico_active: '../../images/around/icon2_1.png',
      name: '医疗'
    },
    {
      // ico: '../../images/around/icon3.png',
      // ico_active: '../../images/around/icon3_1.png',
      name: '住宿'
    },
    {
      // ico: '../../images/around/icon4.png',
      // ico_active: '../../images/around/icon4_1.png',
      name: '购物'
    },
    {
      // ico: '../../images/around/icon5.png',
      // ico_active: '../../images/around/icon5_1.png',
      name: '餐饮'
    },
  ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var marks = [];
    that.setData({
      lon: app.globalData.lon,
      lat:app.globalData.lat
    });
    // 地图上的icon图标
    marks.push({ // 获取返回结果，放到mks数组中
      latitude: that.data.lat,
      longitude: that.data.lon,
      iconPath: 'https://s4.ax1x.com/2022/02/17/H4jB8g.png', //图标路径
      width: 40,
      height:40,
    });
    // 地图上的气泡点
    that.setData({
      markers: marks
    });
  },
  xmwzB_click(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      xmwzB_index: index
    }, () => {
      var name = that.data.tabs[index].name;
      that.nearby_search(name);
    });
  },

  nearby_search(key) {
    var that = this;
    var xmwzB_index = that.data.xmwzB_index;

      wx.showToast({
        title: '请稍后',
        icon: 'loading',
        duration: 2000
      })
      qqmapsdk.search({
        keyword: key, // 搜索关键词
        page_size: 15, // 一页展示几个
        location: that.data.lat + ',' + that.data.lon, //设置周边搜索中心点
        // boundary:"nearby(that.data.lat, that.data.lon,1000)",
        success: function (res) { //搜索成功后的回调
          wx.hideToast({});
          var marks = [];
          marks.push({ // 获取返回结果，放到mks数组中
            latitude: that.data.lat,
            longitude: that.data.lon,
            iconPath: 'https://s4.ax1x.com/2022/02/17/H4jB8g.png', //图标路径
            width: 40,
            height: 40,
          });
          for (var i = 0; i < res.data.length; i++) {
            marks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: Number(res.data[i].id),
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: 'https://s4.ax1x.com/2022/02/17/H4jrvj.png', //图标路径
              width: 35,
              height: 35,
              address: res.data[i].address,
              callout: {
                content: res.data[i].title,
                color: '#404040',
                bgColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#8a8a8a',
                fontSize: 13,
                padding: 10,
                borderRadius: 10,
                // display: 'ALWAYS'
              }
            });

          }
          // 只赋值当前tab下的内容，其他tab下的不用管
          var arrlist_key = 'arrlist[' + xmwzB_index + ']';
          that.setData({ //设置markers属性，将搜索结果显示在地图中
            [arrlist_key]: marks,
            markers: marks
          });
        },
        fail: function (res) {
          // console.log(res);
        },
        complete: function (res) {
          //console.log(res.data);
        }
      });

    
  },
  bindmarkertap(e) {
    var that = this;
    that.setData({
      navigation: true,
      ['location[' + that.data.xmwzB_index + ']']: that.data.markers[that.data.markers.findIndex((n) => n.id ==e.markerId)]
    })
  },

  show_big_map: function (){
    var that = this;
    var location_c = that.data.location[that.data.xmwzB_index];
    var lat_c = location_c.latitude ? location_c.latitude : '';
    var lng_c = location_c.longitude ? location_c.longitude : '';
    var name_c = location_c.title ? location_c.title : '';
    let plugin = requirePlugin('routePlan');
    let key = '5L5BZ-SUEYF-WP6J6-N3XMA-RYSY3-NVBFZ';  //使用在腾讯位置服务申请的key
    let referer = 'wx48d464678126606c';   //调用插件的app的名称
    // console.log(that.data.location)
    let endPoint = JSON.stringify({  //终点
    'name':name_c ,
    'latitude':  lat_c,
    'longitude': lng_c
    });
    wx.navigateTo({
    url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
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