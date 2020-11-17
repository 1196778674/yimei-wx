Page({
  data: {
    height: 64, //header高度
    top: 0, //标题图标距离顶部距离
    scrollH: 0, //滚动总高度
    opcity: 0,
    iconOpcity: 0.5,
    productList: [{
      img: 1,
      name: "伯纳天纯 中大型犬幼犬粮 15kg",
      sale: 599,
      factory: 899,
      payNum: 2342
    },
    {
      img: 2,
      name: "雷米高 澳丽得 牛肉深海鱼油成犬粮 500g",
      sale: 29,
      factory: 69,
      payNum: 999
    },
    {
      img: 3,
      name: "美国原装进口牛油果AVODerm 鸡肉糙米配方成犬粮 30磅/13.6kg",
      sale: 299,
      factory: 699,
      payNum: 666
    },
    {
      img: 4,
      name: "美国原装进口 Instinct生鲜本能 生鲜系列 无谷鸡肉配方全犬粮 21磅(9.5kg)",
      sale: 1599,
      factory: 2899,
      payNum: 236
    },
    {
      img: 5,
      name: "美国原装进口卡比 全犬期原味配方狗粮 44磅(19.9kg) ",
      sale: 599,
      factory: 899,
      payNum: 2399
    },
    {
      img: 6,
      name: "雷米高 澳宝 牛肉肝蔬菜营养全价成犬粮 20kg",
      sale: 599,
      factory: 899,
      payNum: 2399
    },
    {
      img: 1,
      name: "伯纳天纯 低敏中大型犬成犬粮 15kg",
      sale: 599,
      factory: 899,
      payNum: 2342
    },
    {
      img: 2,
      name: "雷米高 澳丽得 牛肉深海鱼油全价幼犬粮 500g ",
      sale: 29,
      factory: 69,
      payNum: 999
    },
    {
      img: 3,
      name: "美国原装进口 Instinct生鲜本能 无谷系列 鸡肉配方全犬粮 22.5磅(10.2kg)",
      sale: 299,
      factory: 699,
      payNum: 666
    },
    {
      img: 4,
      name: "醇粹Purich  金标无麸系列 全价大型成犬粮 15kg",
      sale: 1599,
      factory: 2899,
      payNum: 236
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