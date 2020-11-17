const util = require('../../../utils/util.js')
Page({
  data: {
    history: [
      "Fleur of England",
      "LOVE Stories LOVE",
      "斑纹",
      "黄绿色针织棉",
      "LACE 姜黄",
      "米粉色无钢圈",
      "雾紫色缎"
    ],
    hot: [
      "Muse by Coco",
      "de Mer SIENN",
      "E14",
      " 冰澜系列x",
      " 冰澜系列 姜黄",
      " 灰蓝色进口蕾丝",
      "网纱不对称"
    ],
    key: "",
    showActionSheet: false,
    tips: "确认清空搜索历史吗？"
  },
  onLoad: function(options) {

  },
  back: function() {
    wx.navigateBack();
  },
  input: function(e) {
    let key = util.trim(e.detail.value);
    this.setData({
      key: key
    })
  },
  cleanKey: function() {
    this.setData({
      key: ''
    });
  },
  closeActionSheet: function() {
    this.setData({
      showActionSheet: false
    })
  },
  openActionSheet: function() {
    this.setData({
      showActionSheet:true
    })
  },
  itemClick: function(e) {
    let index = e.detail.index;
    if (index == 0) {
      this.setData({
        showActionSheet: false,
        history: []
      })
    }
  }
})