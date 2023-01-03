// pages/gr/gr.js
var app = getApp();
const db=wx.cloud.database();
Page({
  data: {
    userInfo:{},
    hasUserInfo:false,
    canIUseGetUserProfile: app.globalData.canIUseGetUserProfile,
    img:"cloud://cloud1-2gllgk8g5733cd2d.636c-cloud1-2gllgk8g5733cd2d-1306048018/图标/zhaopian/"
  },
  onLoad() {
    // console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  history:function(e){
    app.globalData.currentLocation = 'history',
    app.globalData.title ="历史足迹" 
  },
  collection:function(e){
    app.globalData.currentLocation = 'collection',
    app.globalData.title ="我的收藏" 
  },
  kp:function(e){
    app.globalData.currentLocation = 'kp',
    app.globalData.title ="科普GIS" 
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        var name=res.userInfo.nickName;
        app.globalData.username=name;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.cloud.callFunction({
          name:"adduser",
        }).then(res=>{
          var users=res.result.data;
          var flag=false;
          for(var i=0;i<users.length;i++)
          {
            if(users[i].name==name)
            {
              flag=true;
              break;
            }
          }
          if(flag==false){
            // console.log(name);
            db.collection("user").add({
              data:{name:name},
              success:res => {
                // console.log(res)
              },
            })
          }
        })
      }
    })
  },
  getUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    var name=e.detail.userInfo.nickName;
    app.globalData.username=name;
    wx.cloud.callFunction({
      name:"adduser",
    }).then(res=>{
      var users=res.result.data;
      var flag=false;
      for(var i=0;i<users.length;i++)
      {
        if(users[i].name==name)
        {
          flag=true;
          break;
        }
      }
      if(flag==false){
        // console.log(name);
        db.collection("user").add({
          data:{name:name},
          success:res => {
            // console.log(res)
          },
        })
      }
    })
    
  },

  loginout(){
    wx.showModal({
      title: '提示',
      content: '确认退出登录吗?',
      success: (res) => {
        if(res.confirm) {
          // console.log("用户点击了确定")
          wx.clearStorage,
          this.setData({
            hasUserInfo: false,
            userInfo:''
          })
          if (wx.getUserProfile) {
            this.setData({
              canIUseGetUserProfile: true
            })
          }
        } else if(res.cancel) {
          // console.log("用户点击了取消")
        }
      }
    })
    
  }

})
