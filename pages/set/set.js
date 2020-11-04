Page({
  data: {

  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '设置'
    })
  },
  href(e) {
    let page = Number(e.currentTarget.dataset.type)
    let url = "";
    switch (page) {
      case 1:
        url = "../userInfo/userInfo"
        break;
      case 2:
        url = "../address/address"
        break;
      default:
        break;
    }
    wx.navigateTo({
      url: url
    })
  }
})