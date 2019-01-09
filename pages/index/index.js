//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  


  },

  goNews:function(){
    wx.navigateTo({
      url: '../news/news'
    })
  },
  onLoad: function () {
   
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
