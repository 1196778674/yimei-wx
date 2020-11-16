const util = require('../../../utils/util.js')
Page({
  data: {
    searchKey: "", //搜索关键词
    width: 200, //header宽度
    height: 64, //header高度
    inputTop: 0, //搜索框距离顶部距离
    arrowTop: 0, //箭头距离顶部距离
    dropScreenH: 0, //下拉筛选框距顶部距离
    attrData: [],
    attrIndex: -1,
    dropScreenShow: false,
    scrollTop: 0,
    tabIndex: 0, //顶部筛选索引
    isList: false, //是否以列表展示  | 列表或大图
    drawer: false,
    drawerH: 0, //抽屉内部scrollview高度
    selectedName: "综合",
    selectH: 0,
    dropdownList: [{
      name: "综合",
      selected: true
    }, {
      name: "价格升序",
      selected: false,
    }, {
      name: "价格降序",
      selected: false,
    }],
    attrArr: [{
      name: "新品",
      selectedName: "新品",
      isActive: false,
      list: []
    }, {
      name: "品牌",
      selectedName: "品牌",
      isActive: false,
      list: [{
        name: "trendsetter",
        selected: false
      }, {
        name: "天衡宝Natural Balance",
        selected: false
      }, {
        name: "比瑞吉Nature Bridge",
        selected: false
      }, {
        name: "牛油果AVODerm",
        selected: false
      }, {
        name: "枫树大道Maples",
        selected: false
      }, {
        name: "原始猎食渴望Orijen",
        selected: false
      }, {
        name: "伯纳天纯Pure&Natural",
        selected: false
      }, {
        name: "冠能PRO PLAN",
        selected: false
      }, {
        name: "雷米高",
        selected: false
      }]
    }, {
      name: "类型",
      selectedName: "类型",
      isActive: false,
      list: [{
        name: "进口狗粮",
        selected: false
      }, {
        name: "国产狗粮",
        selected: false
      }, {
        name: "冻干狗粮",
        selected: false
      }, {
        name: "磨牙洁齿",
        selected: false
      }, {
        name: "肉制零食",
        selected: false
      }, {
        name: "点心饮料",
        selected: false
      }, {
        name: "罐头湿粮",
        selected: false
      }, {
        name: "冻干零食",
        selected: false
      }, {
        name: "深睡眠窝",
        selected: false
      }, {
        name: "柔软睡垫",
        selected: false
      }, {
        name: "睡床沙发",
        selected: false
      }, {
        name: "棉制玩具",
        selected: false
      }, {
        name: "橡胶玩具",
        selected: false
      }, {
        name: "塑料玩具",
        selected: false
      }]
    }, {
      name: "适用品种",
      selectedName: "适用品种",
      isActive: false,
      list: [{
        name: "犬类",
        selected: false
      }, {
        name: "金毛",
        selected: false
      }, {
        name: "拉布拉多",
        selected: false
      }, {
        name: "泰迪",
        selected: false
      }, {
        name: "狼狗",
        selected: false
      }, {
        name: "贵妇人",
        selected: false
      }, {
        name: "棕熊",
        selected: false
      }, {
        name: "秋田犬",
        selected: false
      }, {
        name: "斗牛梗",
        selected: false
      }, {
        name: "边牧",
        selected: false
      }, {
        name: "藏獒",
        selected: false
      }]
    }],
    productList: [{
        img: 1,
        name: "美国原装进口牛油果AVODerm 鸡肉糙米配方成犬粮 30磅/13.6kg",
        sale: 599,
        factory: 899,
        payNum: 2342
      },
      {
        img: 2,
        name: "加拿大原装进口 爱肯拿Acana 无谷鸭肉巴特利梨配方全犬粮 6kg",
        sale: 29,
        factory: 69,
        payNum: 999
      },
      {
        img: 3,
        name: "雷米高 澳丽得 牛肉深海鱼油成犬粮 500g",
        sale: 299,
        factory: 699,
        payNum: 666
      },
      {
        img: 4,
        name: "冠能 小型犬挑食及美毛配方成犬全价狗粮 2.5kg",
        sale: 1599,
        factory: 2899,
        payNum: 236
      },
      {
        img: 5,
        name: "加拿大原装进口 爱肯拿Acana 小型犬成犬配方粮(鸡肉+鱼) 2kg",
        sale: 599,
        factory: 899,
        payNum: 2399
      },
      {
        img: 6,
        name: "美国原装进口 Instinct生鲜本能 无谷系列 鸡肉配方全犬粮 22.5磅(10.2kg)",
        sale: 599,
        factory: 899,
        payNum: 2399
      },
      {
        img: 1,
        name: "加拿大原装进口纽顿 均衡低敏系列 鸡肉&糙米配方 小型成犬粮 6kg",
        sale: 599,
        factory: 899,
        payNum: 2342
      },
      {
        img: 2,
        name: "海洋之星 臻越系列 加强配方成犬粮 小颗粒 1.5kg",
        sale: 29,
        factory: 69,
        payNum: 999
      },
      {
        img: 3,
        name: "加拿大原装进口 原始猎食渴望 无谷配方 成犬粮 2kg",
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
    this.setData({
      width: obj.left,
      height: obj.top + obj.height - 25,
      inputTop: obj.top + (obj.height - 30) / 2,
      arrowTop: obj.top + (obj.height - 32) / 2,
      searchKey: options.searchKey || ""
    }, () => {
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            //略小，避免误差带来的影响
            dropScreenH: this.data.height * 750 / res.windowWidth + 186,
            drawerH: res.windowHeight - res.windowWidth / 750 * 100 - this.data.height
          })
        }
      })
    });
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
  btnDropChange: function(e) {
    let index = e.currentTarget.dataset.index;
    let arr = JSON.parse(JSON.stringify(this.data.attrArr[index].list));
    if (arr.length === 0) {
      let isActive = `attrArr[${index}].isActive`;
      this.setData({
        [isActive]: !this.data.attrArr[index].isActive
      })
    } else {
      let isActive = `attrArr[${index}].isActive`;
      this.setData({
        attrData: arr,
        attrIndex: index,
        dropScreenShow: true,
        [isActive]: false
      }, () => {
        this.setData({
          scrollTop: 0
        })
      })
    }
  },
  btnSelected: function(e) {
    let index = e.currentTarget.dataset.index;
    let selected = `attrData[${index}].selected`;
    this.setData({
      [selected]: !this.data.attrData[index].selected
    })
  },
  reset() {
    let arr = this.data.attrData;
    for (let item of arr) {
      item.selected = false;
    }
    this.setData({
      attrData: arr
    })
  },
  btnCloseDrop() {
    this.setData({
      scrollTop: 0,
      dropScreenShow: false,
      attrIndex: -1
    })
  },
  btnSure: function() {
    let index = this.data.attrIndex;
    let arr = this.data.attrData;
    let active = false;
    let attrName = "";
    //这里只是为了展示选中效果,并非实际场景
    for (let item of arr) {
      if (item.selected) {
        active = true;
        attrName += attrName ? ";" + item.name : item.name
      }
    }
    let isActive = `attrArr[${index}].isActive`;
    let selectedName = `attrArr[${index}].selectedName`;
    this.btnCloseDrop();
    this.setData({
      [isActive]: active,
      [selectedName]: attrName
    })
  },
  showDropdownList: function() {
    this.setData({
      selectH: 246,
      tabIndex: 0
    })
  },
  hideDropdownList: function() {
    this.setData({
      selectH: 0
    })
  },
  dropdownItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let arr = this.data.dropdownList;
    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        arr[i].selected = true;
      } else {
        arr[i].selected = false;
      }
    }
    this.setData({
      dropdownList: arr,
      selectedName: index == 0 ? '综合' : '价格',
      selectH: 0
    })
  },
  screen: function(e) {
    let index = e.currentTarget.dataset.index;
    if (index == 0) {
      this.showDropdownList();
    } else if (index == 1) {
      this.setData({
        tabIndex: 1
      })
    } else if (index == 2) {
      this.setData({
        isList: !this.data.isList
      })
    } else if (index == 3) {
      this.setData({
        drawer: true
      })
    }
  },
  closeDrawer: function() {
    this.setData({
      drawer: false
    })
  },
  back: function() {
    if (this.data.drawer) {
      this.closeDrawer()
    } else {
      wx.navigateBack()
    }
  },
  search: function() {
    wx.navigateTo({
      url: '../news-search/news-search'
    })
  },
  detail: function() {
    wx.navigateTo({
      url: '../productDetail/productDetail'
    })
  }
})