const app = getApp()

const request = (url, options) => {
  options.data.key = 'd7803471edbe23bbd41cbced3dd3e033';
  wx.showLoading({
    title: '加载中...'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.host}${url}`,
      method: options.method,
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      success(res) {
        wx.hideLoading();
        if (res.data.error_code === 0) {
          resolve(res.data)
        } else {
          wx.showToast({
            title: res.data.reason,
            icon:'none'
          })
          reject(res.data)
        }
      },
      fail(error) {
        wx.showToast({
          title:'请求失败',
          icon: 'none'
        })
        reject(error.data)
      }
    })
  })
}

const get = (url, options = {}) => {
  return request(url, { method: 'GET', data: options })
}

const post = (url, options) => {
  return request(url, { method: 'POST', data: options })
}

const put = (url, options) => {
  return request(url, { method: 'PUT', data: options })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
  return request(url, { method: 'DELETE', data: options })
}

module.exports = {
  get,
  post,
  put,
  remove
}