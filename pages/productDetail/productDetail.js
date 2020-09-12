// pages/productDetail/productDetail.js
const baseUrl = 'http://iwenwiki.com:3002/'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: {}
  },
  // 加入购物车
  addShopcar: function() {
    const productInfo = this.data.productInfo
    wx.request({
      url: baseUrl + 'api/cart/add',
      data: {
        name: productInfo.name,
        pic: productInfo.pic,
        num: 1,
        info: productInfo.description,
        price: productInfo.price,
      },
      success: res => {
        console.log(res.data);
        if (res.data.status == 200) {
          wx.showToast({
            title: '添加成功',
          })
        }
      }
    })
  },
  // 进入购物车页面
  jumpShopcar: function() {
    wx.switchTab({
      url: '../shopcar/shopcar',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: baseUrl + 'api/foods/list/detail?id=' + options.id,
      success: res => {
        // console.log(res.data.data);
        this.setData({
          productInfo: res.data.data[0]
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