// pages/kp/kp.js
var app = getApp();
const DEFAULT_PAGE = 0;
Page({
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  /**
   * 页面的初始数据
   */
  data: {
    toView: `card_${DEFAULT_PAGE}`,
    images:[
      'https://i.jpg.dog/file/jpg-dog/6618ac83aa91d49976ae9faff9ecb6c0.jpg',
      'https://i.jpg.dog/file/jpg-dog/4d7c74eca568a64a80b67eb9768115b0.png',
      'https://i.jpg.dog/file/jpg-dog/b6a14580873fe502eba4b5c1271404af.png',
      'https://i.jpg.dog/file/jpg-dog/bc217dc180e2f7171441cece43fe1c76.jpg',
      'https://i.jpg.dog/file/jpg-dog/ea3858f48573aa863e850ca923241986.jpg',
      'https://i.jpg.dog/file/jpg-dog/e52fc4788ee48b7c97c22bab90e20918.png',
      'https://i.jpg.dog/file/jpg-dog/428cce645f22736d6d6e2f1b9e85ad96.png'
    ],
    list:[
      {
      id:1,
      img:"https://i.jpg.dog/file/jpg-dog/6618ac83aa91d49976ae9faff9ecb6c0.jpg",
      title:"Q1:你知道GIS最初的起源小故事吗？",
      content:"A：1854年，伦敦爆发严重的霍乱，在研究霍乱传播源的过程中，英国医生约翰冒着生命危险走进病情高发区，挨家挨户统计病亡人数，每死亡一人便标注一条横线，最终绘制了一张“霍乱”死亡地图。医生通过“死亡地图”分析发现，大多数病例的住所都围绕在水泵附近，由此判断瘟疫的传播源来自于水泵，于是移掉水泵，霍乱最终得到控制。这就是最早和GIS思想类似的利用地理位置等属性信息进行分析再应用的事件。",
    },
    {
      id:2,
      img:"https://i.jpg.dog/file/jpg-dog/4d7c74eca568a64a80b67eb9768115b0.png",
      title:"Q2：GIS就是学地理吗？都涉及什么学科呢？",
      content:"A:其实GIS是一门交叉学科，一名giser要“无所不能”。主要学习的科目有基 础地理知识、遥感图像处理、地图学、数据库等。",
    },
    {
      id:3,
      img:"https://i.jpg.dog/file/jpg-dog/b6a14580873fe502eba4b5c1271404af.png",
      title:"Q3:我们对坐标系都很熟悉那你知道GIS里常用的坐标系是什么吗？",
      content:"A:坐标系可以告诉我们地理事物在地球上的位置，是重要的属性信息。GIS中的坐标系分为地理坐标系和投影坐标系。但是你知道什么是火星坐标吗？火星坐标就出现在互联网地图上。例如百度、腾讯、谷歌等地图。出于保密等政治因素，地图的GCS坐标值，会被一种特殊的数学函数加密一次，会与真实坐标数偏离百米的距离，但我们使用电子地图时看到的位置是准确的。火星坐标系原名是国测局坐标系（GCJ-02）",
    },
    {
      id:4,
      img:"https://i.jpg.dog/file/jpg-dog/bc217dc180e2f7171441cece43fe1c76.jpg",
      title:"Q4：到底什么是GIS呢？",
      content:"A:GIS，全称：Geographic Information Science/System，地理信息科学/系统的缩写。它是在计算机硬、软件系统支持下，对有关地理分布数据进行采集、储存、管理、运算、分析、显示和描述的技术系统。",
    },
    {
      id:5,
      img:"https://i.jpg.dog/file/jpg-dog/ea3858f48573aa863e850ca923241986.md.jpg",
      title:"Q5:我们常说的3S技术指的是什么呢？",
      content:"A:3S技术是遥感技术(Remote sensing，RS)、地理信息系统(Geography information systems，GIS)和全球定位系统(Global positioning systems，GPS)的统称 。",
    },
    {
      id:6,
      img:"https://i.jpg.dog/file/jpg-dog/e52fc4788ee48b7c97c22bab90e20918.png",
      title:"Q6:GIS的应用离我们生活很遥远吗？和普通地图有什么区别呢？",
      content:"A:首先GIS和我们的生活息息相关，很多领域都有它的应用，如：资源调查、环境评估、城市规划、交通运输、军事公安、公共设施管理、统计、商业金融等等。我们生活中使用的手机导航、查询100米范围内的餐厅都是利用空间分析方法来实现的。",
    },
    {
      id:7,
      img:"https://i.jpg.dog/file/jpg-dog/428cce645f22736d6d6e2f1b9e85ad96.png",
      title:"Q7:GIS和普通地图有什么区别呢？",
      content:"A:地理信息系统（GIS）是一个技术系统，其中的一个重要功能是显示地图和其他关于地图的应用，来实现对地理数据的处理和分析，给我们提供帮助。我们的旅游数据就可以制成一个简单的直观的表达相应信息的地图",
    },
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var title=app.globalData.title;
    wx.setNavigationBarTitle({
　　　　title: title //页面切换，更换页面标题
　　})
  },
  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },

  touchEnd(e) {
    const moveX = e.changedTouches[0].pageX - this.startPageX;
    const maxPage = this.data.list.length - 1;
    if (Math.abs(moveX) >= 50){
      if (moveX > 0) {
        this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
      } else {
        this.currentView = this.currentView !== maxPage ? this.currentView + 1 : maxPage;
      }
    }
    this.setData({
      toView: `card_${this.currentView}`
    });
  },
  topic_preview(e){
    // console.log('点击',e.currentTarget.dataset.url)
    wx.previewImage({
      current:e.currentTarget.dataset.url,
      urls: this.data.images,
      showmenu:true,
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