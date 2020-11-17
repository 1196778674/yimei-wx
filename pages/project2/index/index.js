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
      "贵妇人",
      "泰迪",
      "金毛"
    ],
    banner: [
      "1.jpeg",
      "2.jpeg",
      "3.jpeg"
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
      name: "金冠精品狗粮",
      present: 198,
      original: 298,
      pic: "1.jpg",
      type: 1,
      isLabel: true
    }, {
      name: "海洋之星狗粮",
      present: 398,
      original: 598,
      pic: "2.jpg",
      type: 2,
      isLabel: true
    }, {
      name: "爱宠精品奶砖狗粮一包",
      present: 99,
      original: 199,
      pic: "3.jpg",
      type: 1,
      isLabel: true
    }, {
      name: "集爱宠物狗粮爱吃执行",
      present: 999,
      original: 1299,
      pic: "4.jpg",
      type: 2,
      isLabel: true
    }],
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
      url: '/pages/project2/navbar-2/navbar-2'
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