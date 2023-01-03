//获取应用实例
const app = getApp()
const db=wx.cloud.database();

Page({
    data: {
       canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hasUserInfo:false,
        canIUseGetUserProfile: false,
        userInfo: {},
    },

    onLoad: function() {
      app.globalData.hasUserInfo="false";
      app.globalData.canIUseGetUserProfile="false";
      if (wx.getUserProfile) {
        app.globalData.canIUseGetUserProfile="true";
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    },
    getUserProfile(e) {
        wx.getUserProfile({
          desc: '用于完善会员资料', 
          success: (res) => {
            var name=res.userInfo.nickName;
            app.globalData.userInfo=res.userInfo;
            app.globalData.hasUserInfo="true"
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
        // console.log(app.globalData.userInfo);
        wx.switchTab({ url: '../index/index' })
      },
    getUserInfo(e) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      var name=e.detail.userInfo.nickName;
      // console.log(res.userInfo)
      app.globalData.username=name;
      app.globalData.userInfo=res.userInfo;
      app.globalData.hasUserInfo="true"
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
      wx.switchTab({ url: '../index/index' })
    },

    bindGetUserInfo: function(e) {
        if (wx.getUserProfile) {
            // console.log(wx.getUserProfile)
            getUserProfile(e);
          }
        else{
            getUserInfo(e)
        }
    }
})
