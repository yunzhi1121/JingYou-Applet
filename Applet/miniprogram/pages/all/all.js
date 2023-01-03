var app = getApp()
const db=wx.cloud.database();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    img:"cloud://cloud1-2gllgk8g5733cd2d.636c-cloud1-2gllgk8g5733cd2d-1306048018/图标/zhaopian/",
    carts: "",
    tab:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tab = "all";
    wx.cloud.callFunction({
      name:"getData",
      data:{
        tab:tab,
        input:app.globalData.input,
      },
    })
    .then(res=>{
      // console.log(res)
      this.setData({
        'carts' : res.result.data,
      })
    })
    var that = this;
    /** * 获取系统信息  */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },
  //向详情页传递参数
  getname: function (e) {
    // console.log('点击', e.currentTarget.dataset.name)
    app.globalData.name = e.currentTarget.dataset.name,
    //跳转到详情页并携带商品id
      wx.navigateTo({ 
        url: '../detail/detail'
    })
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