Page({
  data: {
    tabbar: ["狗狗主食", "狗狗零食", "狗狗窝点", "狗狗玩具", "狗狗清洁", "狗狗保健", "狗狗护理", "狗狗生活", "狗狗牵引", "狗狗洗澡", "狗狗辅食", "狗狗服饰", "狗狗美容", "狗狗手术", "狗狗绝育", "狗狗特色", "保养馆"],
    menuHeight: "", //菜单高度
    currentTab: 0, //预设当前项的值
    scrollTop: 0 //tab标题的滚动条位置
  },
  onLoad: function(options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          menuHeight: res.windowHeight - res.windowWidth / 750 * 92
        });
      }
    });

  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    let cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      wx.pageScrollTo({
        scrollTop: 0
      })
      this.setData({
        currentTab: cur
      })
      this.checkCor();
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
    let that = this;
    //这里计算按照实际情况进行修改，动态数据要进行动态分析
    //思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
    //数据很多可以多次if判断然后进行滚动距离计算即可
    if (that.data.currentTab > 7) {
      that.setData({
        scrollTop: 500
      })
    } else {
      that.setData({
        scrollTop: 0
      })
    }
  },
  detail(e) {
    wx.navigateTo({
      url: '../productDetail/productDetail'
    })
  },
  productList(e) {
    let key = e.currentTarget.dataset.key;
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