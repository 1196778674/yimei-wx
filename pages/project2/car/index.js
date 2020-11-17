Page({
  data: {
    dataList: [{
      id: 1,
      buyNum: 2
    }, {
      id: 2,
      buyNum: 1
    }],
    actions: [{
        name: '收藏',
        width: 64,
        color: '#fff',
        fontsize: 28,
        background: '#FFC600'
      },
      {
        name: '看相似',
        color: '#fff',
        fontsize: 28,
        width: 64,
        background: '#FF7035'
      },
      {
        name: '删除',
        color: '#fff',
        fontsize: 28,
        width: 64,
        background: '#F82400'
      }
    ],
    actions2: [{
        name: '看相似',
        color: '#fff',
        fontsize: 28,
        width: 64,
        background: '#FF7035'
      },
      {
        name: '删除',
        color: '#fff',
        fontsize: 28,
        width: 64,
        background: '#F82400'
      }
    ],
    isEdit: false,
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

  },
  changeNum: function(e) {
    console.log(e)
    let value = `dataList[${e.detail.index}].buyNum`
    this.setData({
      [value]: e.detail.value
    })
  },
  handlerButton: function(e) {
    console.log(e)
    let index = e.detail.index;
    let item = e.detail.item;

    wx.showToast({
      title: `商品id：${item.id}，按钮index：${index}`,
      icon:"none"
    })
  },
  editGoods: function() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  detail: function() {
    wx.navigateTo({
      url: '../../productDetail/productDetail'
    })
  },
  btnPay() {
    wx.navigateTo({
      url: '../submitOrder/submitOrder'
    })
  },
  onPullDownRefresh() {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 200)
  },
  onPullDownRefresh: function() {
    let loadData = JSON.parse(JSON.stringify(this.data.productList));
    loadData = loadData.splice(0, 10)
    this.setData({
      productList: loadData,
      pageIndex:1,
      pullUpOn: true,
      loadding: false
    })
    wx.stopPullDownRefresh()
  },
  onReachBottom: function() {
    if (!this.data.pullUpOn) return;
    this.setData({
      loadding:true
    })
    if (this.data.pageIndex == 4) {
      this.setData({
        loadding:false,
        pullUpOn:false
      })
    } else {
      let loadData = JSON.parse(JSON.stringify(this.data.productList));
      loadData = loadData.splice(0, 10)
      if (this.data.pageIndex == 1) {
        loadData = loadData.reverse();
      }
      this.setData({
        pageIndex: this.data.pageIndex + 1,
        loadding: false,
        productList: this.data.productList.concat(loadData)
      })
    }
  }
})