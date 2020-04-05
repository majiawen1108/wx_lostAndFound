//index.js
//获取应用实例
const app = getApp()
const URL = require('../../utils/url.js');
Page({
  data: {
    motto: '欢迎进入失物招领系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: '',
    nickName: '',
    city: '',
    province: '',
    country: '',
    sex: '',
  },
  // //事件处理函数
  // bindViewTap: function () {
  //   wx.switchTab({
  //     url: '../homePage/homePage'
  //   })
  // },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,

    })
  },

  //登录获取code
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        console.log('code:' + res.code)
        //发送请求
        wx.request({
          url: URL.Login1, //改成自己的服务器地址
          data: {
            code: res.code, //上面wx.login()成功获取到的code
            operFlag: 'getOpenid',
          },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            console.log(res)
            that.setData({
              openid: res.data.openid,
            })
            app.globalData.openid = that.data.openid
          }
        })
        
      }
    })
  },

  bindViewTap: function () {
    var that = this;
    //获取用户的登录信息
    wx.getUserInfo({
      success: res => {
        console.log(res)
        var sexx = res.userInfo.gender
        if (sexx == '1') {
          that.setData({
            sex: '男'
          })
        } else {
          that.setData({
            sex: '女'
          })
        }
        that.setData({
          nickName: res.userInfo.nickName,
          city: res.userInfo.city,
          province: res.userInfo.province,
          country: res.userInfo.country,
        })
        wx.request({
          url: URL.Register,
          data: {
            openid: that.data.openid,
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
            wx.switchTab({
                 url: '../homePage/homePage'
               })
          },
          fail: function (res) {
            console.log("获取数据失败，请检查服务器连接是否正常！");
          }
        })
      }
    })
  }

})