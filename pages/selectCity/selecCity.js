// pages/selectCity/selecCity.js
const baseUrl = 'http://iwenwiki.com:3002/'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCity: [],
    locationCity: '',
    page: 1
  },

  /**
  * 自定义事件 
  */
  // 获取当前定位信息
  positioning: function() {
    wx.showLoading({
      title: '定位中',
    })
    // 获取当前位置信息
    wx.getLocation({
      success: res => {
        // console.log(res);
        // 获取当前经纬度
        const {latitude, longitude} = res
        // 请求当前城市的详情数据
        wx.request({
          url: baseUrl+'api/lbs/location',
          data: {
            latitude,
            longitude
          },
          success: res => {
            // console.log(res.data.result.ad_info.city);
            const city = res.data.result.ad_info.city.slice(0,2)
            // console.log(city);
            // 定位之后返回食疗坊页面  默认城市变化成当前定位的城市
            wx.reLaunch({
              // 传递参数(city)到food页面
              url: '../../pages/food/food?lactionCity=' + city,
            })
            wx.hideLoading()
          }
        })
      }
    })
  },
  // 选择热门城市
  selectHotCity: function(e) {
    // 获取当前点击的城市名称
    const lactionCity = e.currentTarget.dataset.id
    // console.log(currentCity)
    // 请求当前城市的数据
    wx.request({
      url: baseUrl + 'api/foods/list',
      data: {
        city: lactionCity,
        page: this.data.page
      },
      success: res => {
        // console.log(res.data.data.result)
        // 跳转页面，并加载当前城市的数据
        wx.reLaunch({
          url: '../../pages/food/food?lactionCity=' + lactionCity
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    // 请求城市数据
    wx.request({
      url: baseUrl + 'api/hot/city',
      success: res => {
        // console.log(res.data);
        this.setData({
          hotCity: res.data.data
        })
        // 隐藏提示
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