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