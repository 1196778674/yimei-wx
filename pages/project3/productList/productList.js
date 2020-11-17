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
        name: "LA PERLA",
        selected: false
      }, {
        name: "羽心堂",
        selected: false
      }, {
        name: "E14",
        selected: false
      }, {
        name: "LOVE Stories",
        selected: false
      }, {
        name: "Bordelle",
        selected: false
      }, {
        name: "Estart",
        selected: false
      }, {
        name: "EMILY YU",
        selected: false
      }, {
        name: "UP CODE",
        selected: false
      }, {
        name: "A-Dom",
        selected: false
      }]
    }, {
      name: "分类",
      selectedName: "分类",
      isActive: false,
      list: [{
        name: "内衣",
        selected: false
      }, {
        name: "底裤",
        selected: false
      }, {
        name: "好物",
        selected: false
      }, {
        name: "情趣",
        selected: false
      }, {
        name: "睡衣",
        selected: false
      }, {
        name: "套装",
        selected: false
      }, {
        name: "居家服",
        selected: false
      }, {
        name: "情趣道具",
        selected: false
      }, {
        name: "束身衣",
        selected: false
      }, {
        name: "比基尼",
        selected: false
      }, {
        name: "情趣内衣",
        selected: false
      }, {
        name: "饰品",
        selected: false
      }, {
        name: "女性护理",
        selected: false
      }, {
        name: "胸贴",
        selected: false
      }]
    }, {
      name: "尺码",
      selectedName: "尺码",
      isActive: false,
      list: [{
        name: "A",
        selected: false
      }, {
        name: "B",
        selected: false
      }, {
        name: "C",
        selected: false
      }, {
        name: "CC",
        selected: false
      }, {
        name: "DD",
        selected: false
      }, {
        name: "E",
        selected: false
      }]
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
        img: 'http://img.o2brashop.com/assets/uploads/products/9a812cd453fac287cfd05bbeb4167688.jpg',
        name: "LOVE Stories ROSITA 黑金闪波点...",
        sale: 1599,
        factory: 2899,
        payNum: 236
      },
      {
        img: 'http://img.o2brashop.com/assets/uploads/products/6a42e12c586a2c9f0b5b764eff0afdf8.jpg',
        name: "LOVE Stories JOSEY 黑色棉织罗纹...",
        sale: 599,
        factory: 899,
        payNum: 2399
      },
      {
        img: 'http://img.o2brashop.com/assets/uploads/products/fbdfd34e40b6d754cce7022887888fee.jpg',
        name: "LOVE Stories DARLING LACE...",
        sale: 599,
        factory: 899,
        payNum: 2399
      },
      {
        img: 'http://img.o2brashop.com/assets/uploads/products/b575fcb48da6d936d5d97d77c53b5d56.jpg',
        name: "LOVE Stories REGGIPETTO 斑...",
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