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
    //获取用户的登录信息
    wx.getUserInfo({
      success: res => {
        console.log(res)
        that.setData({
          hasUserInfo: true,
        })
        var sexx = res.userInfo.gender
        if (sexx = '1') {
          sexx = '男'
        } else {
          sexx = '女'
        }
        wx.request({
          url: URL.QueryOne,
          data: {
            id: options.id,
            def1: '123',
            nickName: res.userInfo.nickName,
            sex: sexx,
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

  }
})