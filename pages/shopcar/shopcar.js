// pages/shopcar/shopcar.js
const baseUrl = 'http://iwenwiki.com:3002/'
// 获取app.js的数据


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //select: false,  // 默认不选择
    // isTouchMove: false,
    X: 0,
    Y: 0,
    list: [
      // {
      //   id:1,
      //   pic: '../../images/item-1.jpg',
      //   title: '标题1',
      //   fuTitle: '副标题',
      //   price: 34
      // },
      // {
      //   id:2,
      //   pic: '../../images/item-1.jpg',
      //   title: '标题2',
      //   fuTitle: '副标题',
      //   price: 45
      // }
    ], // 购物车所有数据
    selectAllStatus: false,
    selectButton: false,
    totalPrice: '0.00', // 默认总价
    num: 0 // 用来控制全选
  },

  /**
   * 自定义事件
   */
  //计算总价格   购物车里的所有选择的商品价格  *  数量
  doTotalPrice: function () {
    const list = this.data.list
    var result = 0
    // 选中的商品才做计算 变量list 判断是否选中
    for (let i = 0; i < list.length; i++) {
      // 选中的商品
      if (list[i].select) {
        result += list[i].price * list[i].num
      }
      this.setData({
        totalPrice: result.toFixed(2)
      })
    }
  },

  // 点击当前选择框 商品被选中或取消
  selectList: function (e) {
    // console.log(e)
    const index = e.currentTarget.dataset.id
    const list = this.data.list
    var num = this.data.num
    // 状态取反
    list[index].select = !list[index].select
    // 如果当前选中一个商品  num+1
    if (list[index].select) {
      num++
    } else { // 取消一个商品 num-1
      num--
    }
    this.setData({
      list: list,
      num: num
    })
    // 如果num大于0  则说明至少有一个选中，结算高亮
    if (num > 0) {
      this.setData({
        selectButton: true
      })
    } else {
      this.setData({
        selectButton: false
      })
    }
    // 如果num的值等于该list的长度，意味着当前所有商品全选
    if (num == list.length) {
      this.setData({
        selectAllStatus: true
      })
    } else {
      this.setData({
        selectAllStatus: false
      })
    }

    // 计算总价
    this.doTotalPrice()
  },

  // 全选按钮事件
  selectedAll: function() {
    const list = this.data.list
    var num = this.data.num
    var selectButton = this.data.selectButton
    // 状态取反
    var selectAllStatus = !this.data.selectAllStatus
    // 变量list  让所有为true（选中）
    for (let i = 0; i < list.length; i++) {
      list[i].select = selectAllStatus
    }
    // 如果当前全选按钮是选中状态， 则所有商品都选中
    if (selectAllStatus) {
      // num 等于 list长度才是全选中
      num = list.length
      selectButton = true
    } else {  // 全选按钮没有选中
      // 让num=0  不选中商品
      num = 0
      // 结算不高亮
      selectButton = false
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list,
      num: num,
      selectButton: selectButton
    })

    this.doTotalPrice()
  },

  // 商品数量+
  add: function(e) {
    const id = e.currentTarget.dataset.id
    const list = this.data.list
    // 当前数量＋1
    const num = list[id].num ++
    this.setData({
      list: list
    })
    
    this.doTotalPrice()
  },

  // 商品数量-
  Reduc: function(e) {    
    const id = e.currentTarget.dataset.id
    const list = this.data.list
    // 当前-1
    list[id].num --
    if (list[id].num < 1) {
      list[id].num = 1
    }
    this.setData({
      list: list
    })

    this.doTotalPrice()
  },

  // 结算事件
  jumpPlay: function() {
    wx.showModal({
      title: '是否去支付',
      cancelColor: 'cancelColor',
      success: res => {
        wx.navigateTo({
          url: '../complete/complete',
        })
      }
    })
  },

  // 获取当前点击的坐标点
  touchstart: function (e) {
    this.setData({
      X: e.changedTouches[0].clientX,
      Y: e.changedTouches[0].clientY
    })
  },
  // 移动事件
  touchmove: function (e) {
    // console.log(e);
    // 获取滑动当前的id
    const id = e.currentTarget.dataset.id;
    // 获取当前滑动的坐标
    const startX = this.data.X
    const startY = this.data.Y
    const moveX = e.changedTouches[0].clientX
    const moveY = e.changedTouches[0].clientY
    // 获取购物车数据
    const list = this.data.list
    // 比较  左移还是右移
    // 左滑
    if (moveX < startX) {
      // 当前滑动的元素  添加动画
      list[id].isTouchMove = true
    } else {
      list[id].isTouchMove = false
    }
    this.setData({
      list: list
    })
  },
  // 删除商品
  removeShop: function (e) {
    // 获取当前商品的id
    const id = e.currentTarget.dataset.id
    wx.request({
      url: baseUrl + 'api/cart/delete?id=' + id,
      success: res => {
        // console.log(res);
        // 重新请求数据  更新
        this.getShopCar()
      }
    })
  },

  // 购物车请求数据封装
  getShopCar: function () {
    wx.request({
      url: baseUrl + 'api/cart/list',
      success: res => {
        // console.log(res.data);
        this.setData({
          list: res.data.data.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopCar()
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
    // 一旦跳转到购物车页面，重新加载数据
    this.getShopCar()
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