var app = getApp()
let shoucang = false
let words
let descp
var util = require('../../util/WSCoordinate.js')  
Page({
    data: {
        img:"cloud://cloud1-2gllgk8g5733cd2d.636c-cloud1-2gllgk8g5733cd2d-1306048018/图标/zhaopian/"
    },
     // 获取滚动条当前位置
  onPageScroll: function (e) {
    // console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

    onLoad() {
        //查询单条数据 doc
        wx.cloud.database().collection('scenery')
        .where({
            name:app.globalData.name
        })
        .get()
        .then(res =>{
            this.setData({
                scen:res.data[0],
            })
            // console.log('景点详情请求成功',res)
            wx.cloud.database().collection('collection')
            .where({
                scenery:app.globalData.name,
                username:app.globalData.username
            }).get()
            .then(res=>{
                if(res.data.length!=0){
                    // console.log('该景点该用户已收藏',res,app.globalData.username,app.globalData.name,shoucang)
                    this.setData({
                        imgsc : "https://s4.ax1x.com/2022/02/14/H6mMqA.png",
                        txtsc : "取消收藏"
                    })
                    shoucang = true
                }else{
                    // console.log('该景点该用户未收藏',res)
                    this.setData({
                        imgsc:"https://s4.ax1x.com/2022/02/14/H6mVPK.png",
                        txtsc:"收藏"
                    })
                    shoucang = false
                }
            })
            .catch(res=>{
                // console.log('查询失败',res)
            })
        })
        .catch(res =>{
            // console.log('景点详情请求失败',res)
        })
        //添加浏览记录
      //查询是否有浏览记录
      wx.cloud.database().collection('history')
      .where({
          scenery:app.globalData.name,
          username:app.globalData.username
      }).get()
      .then(res=>{
          if(res.data.length!=0){
            // console.log('该景点该用户已浏览',res,app.globalData.username,app.globalData.name)
            //删除原数据
            wx.cloud.database().collection('history')
            .where({
                scenery:app.globalData.name,
                username:app.globalData.username
            }).update({
                data:{
                    createTime:wx.cloud.database().serverDate()
                }
            }).then(res=>{
                // console.log('修改数据成功',res.scenery)
            }).catch(res=>{
                // console.log('修改数据失败',res.scenery)
            })
          }else{
            // console.log('该景点该用户未浏览，直接添加数据',res)
            //添加数据
            wx.cloud.database().collection('history')
            .add({
                data:{
                    scenery:app.globalData.name,
                    username:app.globalData.username,
                    createTime:wx.cloud.database().serverDate()
                }
            })
            .then(res=>{
                // console.log('插入数据成功',res.scenery)
            }).catch(res=>{
                // console.log('插入数据失败',res.scenery)
            })
          }
      })
    },
    go: function (e){
        // console.log('到这去',e.currentTarget.dataset.name,e.currentTarget.dataset.x,e.currentTarget.dataset.y)
         let plugin = requirePlugin('routePlan');
        let key = '5L5BZ-SUEYF-WP6J6-N3XMA-RYSY3-NVBFZ';  //使用在腾讯位置服务申请的key
        let referer = 'wx48d464678126606c';   //调用插件的app的名称
        let endPoint = JSON.stringify({  //终点
        'name': e.currentTarget.dataset.name,
        'latitude': e.currentTarget.dataset.y,
        'longitude': e.currentTarget.dataset.x
        });
        wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
        });
    },
    //分享
    onShareAppMessage(res){
        //判断触发的方式是否为按钮
        if(res.from=="button"){
        //参数
        let name = app.globalData.name;
        // console.log('name',name)
        return{
            title:" 🏞 快来看看这个景点吧 😃",
            path:"/pages/detail/detail?name="+name
        }
        }
    },
    //跳转到周围
    around: function (e) {
        
        app.globalData.lon = e.currentTarget.dataset.x,
        app.globalData.lat = e.currentTarget.dataset.y,
        // console.log(app.globalData.name,app.globalData.lon,app.globalData.lat)
        wx.navigateTo({ 
            url: '../around/around'
        })
    },
    //添加、取消收藏
    sc(){
        if(shoucang){
            wx.cloud.database().collection('collection')
            .where({
                scenery:app.globalData.name,
                username:app.globalData.username
            }).remove().then(res=>{
                // console.log('删除数据成功',res)
                this.setData({
                    imgsc:"https://s4.ax1x.com/2022/02/14/H6mVPK.png",
                    txtsc:"收藏"
                })
                shoucang = false
            }).catch(res=>{
                // console.log('删除数据失败',res)
            })
        }else{
            wx.cloud.database().collection('collection')
            .add({
                data:{
                    scenery:app.globalData.name,
                    username:app.globalData.username
                }
            })
            .then(res=>{
                // console.log('插入数据成功',res)
                this.setData({
                    imgsc:"https://s4.ax1x.com/2022/02/14/H6mMqA.png",
                    txtsc:"取消收藏"
                })
                shoucang = true
            }).catch(res=>{
                // console.log('插入数据失败',res)
            })
        }
        
    },
    //我的收藏
    mysc(){
        // console.log('我的收藏')
        app.globalData.currentLocation = 'collection',
        app.globalData.title ="我的收藏" 
        wx.navigateTo({ 
            url: '../sc/sc'
        })
    },
    //携程
    xc(){
        wx.navigateToMiniProgram({
          appId: 'wx0e6ed4f51db9d078',
        })
    }
})