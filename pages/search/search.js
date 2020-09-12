// pages/search/search.js
const baseUrl = 'http://iwenwiki.com:3002/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  // 跳转详情页
  jumpDetail: function(e) {
    // 获取到页面当前点击列表的id
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + id,
    })
  },
  // 搜索
  search: function(e) {
    // 获取要搜索的值
    const inpValue = e.detail.value
    // 如果有值  请求数据
    if (inpValue) {
      wx.request({
        url: baseUrl + 'api/foods/select',
        data: {
          name: inpValue
        },
        success: res => {
          // console.log(res.data);
          this.setData({
            list: res.data.data
          })
        }
      })
    } else {    // 搜索没值的话清空列表
      this.setData({
        list: []
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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