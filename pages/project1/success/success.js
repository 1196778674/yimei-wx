Page({
  data: {

  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '支付成功'
    })
  },
  go(e) {
    let page = e.currentTarget.dataset.page
    if (page == 1) {
      wx.switchTab({
        url: "/pages/index/index"
      })
    } else {
      wx.navigateTo({
        url: '../myOrder/myOrder'
      })
    }
  }
})