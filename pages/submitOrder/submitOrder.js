Page({
  data: {
    hasCoupon: true,
    insufficient: false
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '支付'
    })
  },
  chooseAddr() {
    wx.navigateTo({
      url: "../address/address"
    })
  },
  btnPay() {
    wx.navigateTo({
      url: "../success/success"
    })
  }
})