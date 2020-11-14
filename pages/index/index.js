Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: 0,
      title: '生美垂直平台'
    },
    {
      id: 1,
      title: '医美产品电商'
    },
    {
      id: 2,
      title: '名贵宠物电商'
    },
    {
      id: 3,
      title: '内衣美妆电商'
    },
    {
      id: 4,
      title: '知识付费产品'
    }]
  },
  goProject (e) {
    let id = e.currentTarget.dataset.id;
    this.navigateTo(id)
  },
  navigateTo (id) {
    wx.showToast({
      title: `${id}模块的功能待完善~`,
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})