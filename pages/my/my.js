// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  minepush: function () {
    wx.navigateTo({
      url: '../mine-push/mine-push',
    })
  },
  minesearch: function () {
    wx.navigateTo({
      url: '../mine-search/mine-search',
    })
  },
  exit:function(){
    wx.reLaunch({
      url: '../loginOn/loginOn',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: res => {
        console.log(res) //获取的用户信息还有很多，都在res中，看打印结果
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })

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

  },

})