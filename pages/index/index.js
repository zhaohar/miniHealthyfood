// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,    // 默认第一张轮播图
    bannerLists: [],  // banner数据
    homeList: []    // 首页的商品列表
  },

  /**
   * 自定义事件
   */
  // 轮播图轮播时自动触发
  swiperChange: function(e) {
    // console.log(e)
    this.setData({
      // 赋值   当前轮播图的下标
      current: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求banner数据
    wx.request({
      url: 'http://iwenwiki.com:3002/api/banner',
      success: (res) => {
        // console.log(res.data.data)
        this.setData({
          bannerLists: res.data.data
        })
      }
    })

    // 首页列表数据的请求
    wx.request({
      url: 'http://iwenwiki.com:3002/api/indexlist',
      success: res => {
        // console.log(res)
        this.setData({
          homeList: res.data.data
        })
      }
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