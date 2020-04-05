// pages/details/details.js
const URL = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    wx.request({
      url: URL.QueryOne,
      data: {
        id: options.id,
      },
      header: {
        'content-type': 'application/json'
      },
      //一般的POST是这个
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      success: function (res) {
        res = res.data
        console.log(res)
        that.setData({
          'list': res
        })
      },
      fail: function (res) {
        console.log("获取数据失败，请检查服务器连接是否正常！");
      }
    })
  },
  telPhone: function () {
    console.log(this.data.list[0].found_tel)
    wx.makePhoneCall({
      phoneNumber: this.data.list[0].found_tel,
    })
  },
  copy_wx: function () {
    console.log(this.data.list[0].found_wx)
    wx.setClipboardData({
      data: this.data.list[0].found_wx,
      // success: function (res) {
      //   wx.showModal({
      //     title: '提示',
      //     content: '复制成功',
      //     showCancel: false
      //   });
      // }
    })
  },
  copy_QQ: function () {
    console.log(this.data.list[0].found_QQ)
    wx.setClipboardData({
      data: this.data.list[0].found_QQ,
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

  }
})