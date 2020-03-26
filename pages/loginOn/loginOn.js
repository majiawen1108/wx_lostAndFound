// pages/loginOn/loginOn.js
import WxValidate from '../../utils/WxValidate.js'
const URL = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    //表单验证
    form: {
      username: '',
      password: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate() //验证规则函数
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
  loginOn: function (e) {
    var that = this
    console.log(e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!that.WxValidate.checkForm(params)) {
      const error = that.WxValidate.errorList[0]
      that.showModal(error)
      return false
    }
    that.setData({
      username: e.detail.value.username,
      password: e.detail.value.password
    })
    wx.request({
      url: URL.LoginOn,
      data: {
        username: that.data.username,
        password: that.data.password
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        res = res.data
        console.log(res + "1111")
        if (res !== '') {
          wx.switchTab({
            url: '../homePage/homePage',
          })
        } else {
          wx.showToast({
            title: '账号或密码错误',
            icon: 'none',
            duration: 1500 //持续的时间
          })
        }

      },
      fail: function (res) {
        console.log("获取数据失败，请检查服务器连接是否正常！");
      }
    })

  },
  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      username: {
        required: true,
        maxlength: 11
      },
      password: {
        required: true,
      },
    }
    const messages = {
      username: {
        required: '请填写用户名',
        maxlength: '用户名最多11个字符'
      },
      password: {
        required: '请填密码',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  toRegister: function () {
    wx.redirectTo({
      url: '../register/register',
    })
  }
})