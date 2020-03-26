// pages/register/register.js
import WxValidate from '../../utils/WxValidate.js'
const URL = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    nickName: '',
    city: '',
    province: '',
    country: '',
    sex: '',
    //表单验证
    form: {
      username: '',
      password: '',
      passwordTwice: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate() //验证规则函数
    var that = this;
    //获取用户的登录信息
    wx.getUserInfo({
      success: res => {
        console.log(res)
        var sexx= res.userInfo.gender
        if (sexx == '1') {
          that.setData({
            sex:'男'
          })
        } else {
          that.setData({
            sex:'女'
          })
        }
        that.setData({
          nickName: res.userInfo.nickName,
          city: res.userInfo.city,
          province: res.userInfo.province,
          country: res.userInfo.country,
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
  registerIn: function (e) {
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
      password: e.detail.value.password,
      passwordTwice:e.detail.value.passwordTwice
    })
    if(that.data.password !==  that.data.passwordTwice){
      wx.showToast({
        title: '两次输入的密码不一样，请重新输入',
        icon: 'none',
        duration: 1500 //持续的时间
      })
      return false
    }
    wx.request({
      url: URL.Register,
      data: {
        username: that.data.username,
        password: that.data.password,
        nickName: that.data.nickName,
        city: that.data.city,
        province: that.data.province,
        country: that.data.country,
        sex: that.data.sex
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        res = res.data
        console.log(res + "1111")
        if (res !== '') {
          wx.redirectTo({
            url: '../loginOn/loginOn',
          })
        } else {
          wx.showToast({
            title: '注册失败',
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
      passwordTwice: {
        required: true,
      }
    }
    const messages = {
      username: {
        required: '请填写用户名',
        maxlength: '用户名最多11个字符'
      },
      password: {
        required: '请填密码',
      },
      passwordTwice: {
        required: '请再次填密码',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  toLogin: function () {
    wx.reLaunch({
      url: '../loginOn/loginOn',
    })
  }
})