// pages/news/login.js

var sliderWidth = 10; // 需要设置slider的宽度，用于计算中间位置
import api from '../../http/juheApi.js'
import newUrl from '../../http/juheUrls.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        title: '头条',
        type: 'top'
      },
      {
        title: '社会',
        type: 'shehui'
      },
      {
        title: '国际',
        type: 'guonei'
      },
      {
        title: '国内',
        type: 'guoji'
      },
      {
        title: '娱乐',
        type: 'yule'
      },
      {
        title: '体育',
        type: 'tiyu'

      },
      {
        title: '军事',
        type: 'junshi'
      },
      {
        title: '科技',
        type: 'keji'
      },
      {
        title: '财经',
        type: 'caijing'
      },
      {
        title: '时尚',
        type: 'shishang'
      }
    ],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    avgWidth: 0,
    imageWidth: 0,
    imageHeight: 0,
    isPullDown: false,
    news: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          avgWidth: res.windowWidth / that.data.tabs.length,
          imageWidth: (res.windowWidth - 40 - 10) / 3,
        });
        that.setData({
          imageHeight: that.data.imageWidth * 3 / 4,
        });
        console.log(that.data.imageWidth)
        console.log(that.data.imageHeight)
      }
    });
    this.getNews();
  },
  getNews: function() {
    api.get(newUrl.news, {
      type: this.data.tabs[this.data.activeIndex].type
    }).then(res => {
      console.log(res);
      if (this.data.isPullDown) {
        wx.stopPullDownRefresh();
        this.setData({
          isPullDown: false,
          news: res.result.data
        })
      } else {
        this.setData({
          news: this.data.news.concat(res.result.data)
        })
      }


    });
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    this.getNews();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

    this.setData({
      isPullDown: true
    })

    this.getNews();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("到达底部了");
    this.getNews();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
