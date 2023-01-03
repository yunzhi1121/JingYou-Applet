// pages/ditu/ditu.js
var QQMapWX = require('../../util/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: '4JGBZ-YVDLW-2JVR4-RGSUI-FLEGF-MGF5T' // 必填
});
var app=getApp();
var layerid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xmwzB_index: 0,   
    navigation: false,
    location: ['', '', ''],
    lon:'116.3972',
    lat:'39.9172',
    markers: "",
    navigation: false,
    tabs: [
      {
        ico: 'https://s4.ax1x.com/2022/02/21/HX7QRx.png',
        ico_active: 'https://s4.ax1x.com/2022/02/21/HX7MJ1.png',
        name: '景区地图'
      },
      {
      ico: 'https://s3.bmp.ovh/imgs/2022/02/86396cce17964dee.png',
      ico_active: 'https://s3.bmp.ovh/imgs/2022/02/532b5b37e12c0668.png',
      name: '景区客流量'
    },
    {
      ico: 'https://s3.bmp.ovh/imgs/2022/02/b619dbe0652ab582.png',
      ico_active: 'https://s3.bmp.ovh/imgs/2022/02/fa02f135bbaa99a8.png',
      name: '舒适度指数'
    },
    {
      ico: 'https://s3.bmp.ovh/imgs/2022/02/a7d2c5c49f05a5d4.png',
      ico_active: 'https://s3.bmp.ovh/imgs/2022/02/e32add7839e8472d.png',
      name: '饱和指数'
    },
  ],
  subkey:[
    "JDPBZ-6EOEQ-YCA52-G56RE-M6ZMO-2ABZZ",
    "5L5BZ-SUEYF-WP6J6-N3XMA-RYSY3-NVBFZ",
    "ZEGBZ-SCHLG-LL3QJ-IG63G-SCMJ7-K3FO4",
    "PUYBZ-2A7LK-IBTJ3-A3WPT-LVKFH-XFFEA"
  ],
    mapid2:[
      [
        "","4a6446a034bf","b6de55c0d373","af8b542d5fa7"
      ],
      //第一季度
      [
        "","4a6446a034bf","b6de55c0d373","af8b542d5fa7"
      ],
      // 第二季度
      [
        "","6d12c933540c","5fbd345986a0","23a0c104acfd"
      ],
      // 第三季度
      [
        "","8dc9170f8814","a283f695c6d8","8b932f37cb85"
      ],
      // 第四季度
      [
        "","6d12c933540c","6d12c933540c2","6d12c933540c"
      ],
  ],
  key:'',
  markerid:"",
  img:[
    "",
    "https://i.bmp.ovh/imgs/2022/02/c4a70e15f01ed343.png",
    "https://s3.bmp.ovh/imgs/2022/02/c03a93f3eaa22a7c.png",
    "https://s3.bmp.ovh/imgs/2022/02/a1c7d92bbba4c761.png",
    "https://s3.bmp.ovh/imgs/2022/02/5fdc3d93fe2dd233.png",
    "https://s3.bmp.ovh/imgs/2022/02/b4786a5411b2425d.png",
    "https://s3.bmp.ovh/imgs/2022/02/46a4d62edb72fb22.png",
    "https://s3.bmp.ovh/imgs/2022/02/ac13f078e876406f.png"
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取月份 
    var M = parseInt(date.getMonth()/3)+1;
    var index = 0;
    var subkey=that.data.subkey[M-1];
    layerid=that.data.mapid2[M-1][index];
    that.setData({
      key:subkey
    });
    const mapCtx = wx.createMapContext('map', that);
    console.log(subkey)
    var marks = [];

    var res=app.globalData.res
    var markerid=[];
    var id;
    console.log(res.result.data)
      for(var i=0;i<res.result.data.length;i++)
      {
        markerid[i]=Number(i)
        id=res.result.data[i].id
          marks.push({ // 获取返回结果，放到mks数组中
            joinCluster: true,
            title: res.result.data[i].name,
            id: Number(i),
            latitude: res.result.data[i].Y,
            longitude: res.result.data[i].X,
            iconPath: that.data.img[id], //图标路径
            width: 30,
            height: 30,
            address: res.result.data[i].address,
            callout: {
              content: res.result.data[i].name,
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
      that.setData({ 
        markers: marks,
        markerid:markerid
       }); 

    mapCtx.initMarkerCluster({
      enableDefaultStyle: true,
      zoomOnClick: true,
      gridSize: 40,
    })

    mapCtx.addMarkers({
      markers:that.data.markers,
      clear: false,
    })
  },
  
  xmwzB_click(e) {
    var that = this;
    //获取月份 
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var M = parseInt(date.getMonth()/3)+1;
    var index = e.currentTarget.dataset.index;
    var subkey=that.data.subkey[M-1];
    const mapCtx = wx.createMapContext('map',that);
    mapCtx.removeMarkers({
      markerIds:that.data.markerid,
      success:res=>{
        console.log(res)
      },
      fail:res=>{
        console.log(res)
      },
    });
    mapCtx.removeVisualLayer({
      layerId:layerid,
      success:res=>{
        console.log(res)
      },
      fail:res=>{
        console.log(res)
      },
    });

    layerid=that.data.mapid2[M-1][index];
    console.log(mapCtx)
    mapCtx.addVisualLayer({
      layerId:layerid,
      success:res=>{
        console.log(1)
      },
      fail:res=>{
        console.log(0)
      },
    });
    that.setData({
      xmwzB_index: index,
      key:subkey
    });
  if(index==0)
  {
    console.log(that.data.markers)
    mapCtx.initMarkerCluster({
      enableDefaultStyle: true,
      zoomOnClick: true,
      gridSize: 40,
    })
    mapCtx.addMarkers({
      markers:that.data.markers,
      clear: false,
    })
  }
  },

  bindmarkertap(e) {
    var that = this;
    var id=e.markerId
    console.log(e)
    that.setData({
      navigation: true,
      location: that.data.markers[id]
    })
  },

  show_big_map: function (){
    var that = this;
    var name_c = that.data.location.title;
    app.globalData.name = name_c,
    //跳转到详情页并携带商品id
      wx.navigateTo({ 
        url: '../detail/detail'
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
    wx.stopPullDownRefresh();
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

  },


})