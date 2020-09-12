// pages/indexDetail/indexDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    // 提示加载
    wx.showLoading({
      title: '加载中',
    })
    // 请求详情页数据
    wx.request({
      url: 'http://iwenwiki.com:3002/api/indexlist/detail?id='+options.id,
      success: res => {
        // console.log(res)
        this.setData({
          list: res.data
        })
        // 设置当前页面标题栏内容
        wx.setNavigationBarTitle({
          title: res.data[0].title,
        })
      },
      // 数据不管请求成功或者失败都会执行
      complete: () => {
        // 隐藏加载提示
        wx.hideLoading()
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