// pages/productType/productType.js
const baseUrl = 'http://iwenwiki.com:3002/'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    title: ['美容养颜','保健调养','补养','减肥','母婴','节气','常见食疗','维生素']
  },
  // 跳转详情页
  jumpDetail: function(e) {
    // 获取到页面当前点击列表的id
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    // 请求数据
    wx.request({
      url: baseUrl + 'api/foods/list/type?type=' + options.id,
      success: res => {
        // console.log(res.data.data);
        this.setData({
          list: res.data.data
        })
      }
    })
    // 设置当前页面的标题栏
    wx.setNavigationBarTitle({
      title: this.data.title[Number(options.id)],
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