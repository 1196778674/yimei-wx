Page({
  data: {
    addressList: []
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '地址管理'
    })
  },
  editAddr(index, addressType) {
    wx.navigateTo({
      url: "../editAddress/editAddress"
    })
  }
})