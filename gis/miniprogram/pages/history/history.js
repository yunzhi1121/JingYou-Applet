var app = getApp()
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
    var tab = app.globalData.currentLocation;
    var title=app.globalData.title;
    var username=app.globalData.username;
    // console.log('历史',tab);
    wx.setNavigationBarTitle({
　　　　title: title //页面切换，更换页面标题
　　})
    wx.cloud.database().collection('history')
    .where({
        username:app.globalData.username
    })
    .orderBy('createTime','desc').get()
    .then(
      res=>{
      // console.log(res)
      this.setData({
        'carts' : res.data,
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
  /**点击删除列表历史订单 */
  del: function(e) {
    wx.showModal({
      title: '提示',
      content: '确认删除该订单吗?',
      success: (res) => {
        if(res.confirm) {
          // console.log("用户点击了确定")
          this.data.carts.splice(e.currentTarget.dataset.index, 1)
          this.setData({
            carts: this.data.carts
          })
        } else if(res.cancel) {
          // console.log("用户点击了取消")
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
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
 
  }
})