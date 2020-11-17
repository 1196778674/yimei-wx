const util = require('../../../utils/util.js')
Page({
  data: {
    current: 0,
    tabbar: [{
      icon: "home",
      text: "首页",
      size: 21
    }, {
      icon: "category",
      text: "分类",
      size: 24
    }, {
      icon: "cart",
      text: "购物车",
      size: 22
    }, {
      icon: "people",
      text: "我的",
      size: 24
    }],
    hotSearch: [
      "南半球",
      "Bordelle",
      "波兰美衣"
    ],
    banner: [
      "http://img.o2brashop.com/assets/uploads/blogs/3809212f125eecd5ee1ab2b18455b060.jpg",
      "http://img.o2brashop.com/assets/uploads/blogs/71b344d60e120e3a8ed62ec290ffc793.png",
      "http://img.o2brashop.com/assets/uploads/blogs/ca291302c2d00bee8af904f67139a552.jpg"
    ],
    category: [{
      img: "宠物.png",
      name: "宠物"
    }, {
      img: "宠物寄养.png",
      name: "宠物寄养"
    }, {
      img: "宠物训练.png",
      name: "宠物训练"
    }, {
      img: "宠物精粮.png",
      name: "宠物精粮"
    }, {
      img: "宠物服装.png",
      name: "宠物服装"
    }, {
      img: "宠物社交.png",
      name: "宠物社交"
    }, {
      img: "宠物梳理.png",
      name: "宠物梳理"
    }, {
      img: "宠物玩具.png",
      name: "宠物玩具"
    }, {
      img: "宠物洗漱.png",
      name: "宠物洗漱"
    }, {
      img: "宠物疫苗.png",
      name: "宠物疫苗"
    }],
    newProduct: [{
      name: "LOVE Stories VALENTINA 米白...",
      present: 198,
      original: 298,
      pic: "http://img.o2brashop.com/assets/uploads/products/10fd7e6667e20013d63978366b15e538.jpg",
      type: 1,
      isLabel: true
    }, {
      name: "LOVE Stories VALENTINA 米白...",
      present: 398,
      original: 598,
      pic: "http://img.o2brashop.com/assets/uploads/products/0a9389234440e06da96319c30efb2400.jpg",
      type: 2,
      isLabel: true
    }, {
      name: "LOVE Stories AMELIE 黑色缎感面...",
      present: 99,
      original: 199,
      pic: "http://img.o2brashop.com/assets/uploads/products/9a812cd453fac287cfd05bbeb4167688.jpg",
      type: 1,
      isLabel: true
    }, {
      name: "LOVE Stories MON AMI 黑金闪波...",
      present: 999,
      original: 1299,
      pic: "http://img.o2brashop.com/assets/uploads/products/a1672744b7b9aa27902fb54538ff66fe.jpg",
      type: 2,
      isLabel: true
    }],
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
    pullUpOn: true,
    height: "0px"
  },
  onLoad: function(options) {
    let height = wx.getSystemInfoSync().windowWidth
    this.setData({
      height: `${height-20}px`
    })
  },
  tabbarSwitch: function(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      current: index
    })
    if (index != 0) {
      if (index == 1) {
        this.classify();
      } else if (index == 2) {
        wx.navigateTo({
          url: '../car/index'
        })
      } else {
        wx.navigateTo({
          url: '../my/index'
        })
      }
    }
  },
  onPullDownRefresh: function() {
    let loadData = JSON.parse(JSON.stringify(this.data.productList));
    loadData = loadData.splice(0, 10)
    this.setData({
      productList: loadData,
      pageIndex: 1,
      pullUpOn: true,
      loadding: false
    })
    wx.stopPullDownRefresh()
  },
  onReachBottom: function() {
    if (!this.data.pullUpOn) return;
    this.setData({
      loadding: true
    }, () => {
      if (this.data.pageIndex == 4) {
        this.setData({
          loadding: false,
          pullUpOn: false
        })
      } else {
        let loadData = JSON.parse(JSON.stringify(this.data.productList));
        loadData = loadData.splice(0, 10)
        if (this.data.pageIndex == 1) {
          loadData = loadData.reverse();
        }
        this.setData({
          productList: this.data.productList.concat(loadData),
          pageIndex: this.data.pageIndex + 1,
          loadding: false
        })
      }
    })
  },
  detail: function() {
    wx.navigateTo({
      url: '../productDetail/productDetail'
    })
  },
  coupon: function () {
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },
  classify: function() {
    wx.navigateTo({
      url: '../navbar-2/navbar-2'
    })

  },
  more: function(e) {
    let key = e.currentTarget.dataset.key || "";
    wx.navigateTo({
      url: '../productList/productList?searchKey=' + key
    })

  },
  search: function() {
    wx.navigateTo({
      url: '../news-search/news-search'
    })
  }
})