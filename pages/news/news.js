// pages/news/news.js

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
    imageWidth:0,
    imageHeight: 0,
    news: [
      // {
      //   uniquekey: "9dcdafe023c8135d60413da251f16cdf",
      //   title: "王者荣耀》：一楼李白，四楼：不打野就送，看完战绩四楼闭嘴了",
      //   date: "2019-01-09 13:25",
      //   category: "头条",
      //   author_name: "糖糖游戏解说",
      //   url: "http:\/\/mini.eastday.com\/mobile\/190109132504117.html",
      //   thumbnail_pic_s: "http:\/\/03imgmini.eastday.com\/mobile\/20190109\/20190109132504_fc757783fdac2024437d926e66c4e683_1_mwpm_03200403.jpg",
      //   thumbnail_pic_s02: "http:\/\/03imgmini.eastday.com\/mobile\/20190109\/20190109132504_fc757783fdac2024437d926e66c4e683_3_mwpm_03200403.jpg",
      //   thumbnail_pic_s03: "http:\/\/03imgmini.eastday.com\/mobile\/20190109\/20190109132504_fc757783fdac2024437d926e66c4e683_2_mwpm_03200403.jpg"
      // }
      ]
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
          imageWidth: (res.windowWidth -40-10)/3,
        });
        that.setData({
         
          imageHeight: that.data.imageWidth*3/4,
        });
        console.log(that.data.imageWidth)
        console.log(that.data.imageHeight)
      }
    });
    this.getNews();
  },
  getNews:function(){
    api.get(newUrl.news, {
      type: this.data.tabs[this.data.activeIndex].type
    }).then(res => {
      console.log(res);
      this.setData({
        news: res.result.data
      })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})