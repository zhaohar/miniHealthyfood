// pages/foot/foot.js
// 引入产品菜单数据
const menuList = require('../../utils/menuData')
// 
// const http = require('../../utils/http')
const baseUrl = 'http://iwenwiki.com:3002/'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '上海',
    menuList: menuList,
    footList: [],  // 列表数据
    isShow: false,  // 加载按钮默认隐藏
    pageNum: 1
  },

  /**
   * 自定义事件
   */
  // 跳转到菜单详情页
  jumpMenu: function(e) {
    // console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      // 传参给productType页面  
      url: '../../pages/productType/productType?id='+e.currentTarget.dataset.id,
    })
  },
  // 跳转到详情页
  jumpDetail: function(e) {
    // 获取到页面当前点击列表的id
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + id,
    })
  },
  // 加载更多   
  getMore: function() {
    this.data.pageNum ++  
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data:{
        city: this.data.city,
        page: this.data.pageNum   // page一直 + 1  
      },
      success: res => {
        // console.log(res.data)
        if (res.data.status === 200) {
          const newData = res.data.data.result
          // 老数据 + 新数据
          this.setData({
            footList: this.data.footList.concat(newData)
          })
        } else {  // 数据请求完时
          wx.showModal({
            title: '暂无新数据'
          })
        }
      }
    })
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // 如果里面有值  就赋值给city    定位
    if (options.lactionCity) {
      this.setData({
        city: options.lactionCity
      })
    }
    // 请求食疗坊页面的数据
    wx.request({
      url: baseUrl + 'api/foods/list',
      // 请求参数
      data: {
        city: this.data.city,
        page: this.data.pageNum
      },
      success: res => {
        // console.log(res);
        this.setData({
          footList: res.data.data.result,
          isShow: true
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
    // 下拉加载更多数据
    this.data.pageNum ++
    wx.request({
      url: baseUrl + 'api/foods/list',
      data: {
        city: this.data.city,
        page: this.data.pageNum
        
      },
      success: (res) => {
        // console.log(res.data)
        if (res.data.status == 200) {
          const newData = res.data.data.result
          this.setData({
            // 老数据 + 新数据
            footList: this.data.footList.concat(newData)
          })
        } else {  // 没有新数据时
          wx.showModal({
            title: '暂无新数据'
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})