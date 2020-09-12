/**
 * 网络请求封装
 * 
 * 参数1：method  请求类型
 * 参数2：url
 * 参数3：params  传递的参数
 * 参数4: msg    提示信息  
 * 参数5：success： 成功函数
 * 参数6：fail    失败
 */

function http(method, url, params, message, success, fail) {
  // 如果不等于空
  if (message != '') {
    wx.showLoading({
      title: message,
    })
  }
  // 开始请求
  wx.request({
    url: 'http://iwenwiki.com:3002/' + url,
    method: method,
    data: params,
    success: res => {
      // 如果请求成功
      if (res.data.status === 200) {
        success(res.data)
      } else {
        fail(res.data)
      }
    },
    fail: res => {
      fail(res.data)
    },
    complete: res => {
      if (message != '') {
        wx.hideLoading()
      }
    }
  })
}

module.exports = http