Page({
  data: {
    height: 64, //header高度
    top: 0, //标题图标距离顶部距离
    scrollH: 0, //滚动总高度
    opcity: 0,
    iconOpcity: 0.5,
    productList: [{
      img: 'http://img.o2brashop.com/assets/uploads/products/ab842b7e6f7f87088bca956639b1424a.jpg',
      name: "Fleur of England ADORE 黑色...",
      sale: 599,
      factory: 899,
      payNum: 2342
    },
    {
      img: 'http://img.o2brashop.com/assets/uploads/products/541113f8cd83f0c34b5b286cb9078578.jpg',
      name: "Fleur of England ADORE 黑色...",
      sale: 29,
      factory: 69,
      payNum: 999
    },
    {
      img: 'http://img.o2brashop.com/assets/uploads/products/3e7e1b39d318d3cb6fafbfef33143dd2.jpg',
      name: "Fleur of England ADORE 黑色...",
      sale: 299,
      factory: 699,
      payNum: 666
    },
    {
      img: 'http://img.o2brashop.com/assets/uploads/products/a04df12692eab9edf2d7ffb51dccf56f.jpg',
      name: "Fleur of England BISOU 烟玫...",
      sale: 1599,
      factory: 2899,
      payNum: 236
    },
    {
      img: 'http://img.o2brashop.com/assets/uploads/products/197d2e977d3fc21701adb985e561309a.jpg',
      name: "Fleur of England BISOU 烟玫...",
      sale: 599,
      factory: 899,
      payNum: 2399
    },
    {
      img: 'http://img.o2brashop.com/assets/uploads/products/9abf60c4590110ce9472dfe40f242f6b.jpg',
      name: "LOVE Stories AMELIE 黑色缎感面...",
      sale: 599,
      factory: 899,
      payNum: 2399
    },
    {
      img: 'http://img.o2brashop.com/assets/uploads/products/9a812cd453fac287cfd05bbeb4167688.jpg',
      name: "LOVE Stories ROSITA 黑金闪波点...",
      sale: 599,
      factory: 899,
      payNum: 2342
    }
  ],
    pageIndex: 1,
    loadding: false,
    pullUpOn: true
  },
  onLoad: function(options) {
    let obj = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          width: obj.left || res.windowWidth,
          height: obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44),
          top: obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6),
          scrollH: res.windowWidth * 0.6
        })
      }
    })
  },
  href(e) {
    let page = Number(e.currentTarget.dataset.type)
    let url = "";
    switch (page) {
      case 1:
        break;
      case 2:
        url = "../set/set"
        break;
      case 3:
        url = "../userInfo/userInfo"
        break;
      case 4:
        url = "../myOrder/myOrder"
        break;
      default:
        break;
    }
    if (url) {
      wx.navigateTo({
        url: url
      })
    } else {
      wx.showToast({
        title: "功能尚未完善~",
        icon:"none"
      })
    }
  },
  detail: function() {
    wx.navigateTo({
      url: '../productDetail/productDetail'
    })
  },
  onPageScroll(e) {
    let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
    let opcity = scroll / this.data.scrollH;
    if (this.data.opcity >= 1 && opcity >= 1) {
      return;
    }
    this.setData({
      opcity: opcity,
      iconOpcity: 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity)
    })
  },
  onPullDownRefresh() {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 200)
  },
  onReachBottom: function() {
    if (!this.data.pullUpOn) return;
    this.setData({
      loadding:true
    })
    if (this.data.pageIndex == 4) {
      this.setData({
        loadding: false,
        pullUpOn:false
      })
    } else {
      let loadData = JSON.parse(JSON.stringify(this.data.productList));
      loadData = loadData.splice(0, 10)
      if (this.data.pageIndex == 1) {
        loadData = loadData.reverse();
      }
      this.setData({
        loadding: false,
        pageIndex: this.data.pageIndex + 1,
        productList: this.data.productList.concat(loadData)
      })
    }
  }
})