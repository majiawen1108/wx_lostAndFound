//获取应用实例
const app = getApp()
const URL = require('../../utils/url.js');
Page({
  data: {
    id: '',
    num: 0,
    list: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },

  onLoad: function () {
    this.queryMine()
  },
  /**
   * 删除
   */
  handleDeleteProduct: function (e) {
    var that = this
    console.log("删除选中的" + this.data.id)
    wx.request({
      url: URL.Delete,
      data: {
        def1: '123',
        id: this.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showLoading({
          title: '删除中',
        })
        that.onLoad()
        wx.hideLoading()
        wx.showToast({
          title: '删除成功！',
          icon: 'success',
          duration: 1000
        })
        console.log("删除成功！");
      },
      fail: function (res) {
        console.log("获取数据失败，请检查服务器连接是否正常！");
      }
    })
  },

  /**查询单条将当前条的id带给详情页 */
  toOrder: function (e) {
    this.setData({
      num: e.currentTarget.dataset.num
    })
    var i = this.data.num
    console.log(i)
    var queryone = this.data.list[i].id
    console.log("###" + queryone)
    wx.navigateTo({
      url: '../details/details?id=' + queryone,
    })
  },
  /**
   * 显示删除按钮
   */
  showDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex
    this.setXmove(productIndex, -65)
  },

  /**
   * 隐藏删除按钮
   */
  hideDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex

    this.setXmove(productIndex, 0)
  },

  /**
   * 设置movable-view位移
   */
  setXmove: function (productIndex, xmove) {
    let list = this.data.list
    list[productIndex].xmove = xmove

    this.setData({
      'list': list
    })
  },

  /**
   * 处理movable-view移动事件
   */
  handleMovableChange: function (e) {
    if (e.detail.source === 'friction') {
      if (e.detail.x < -30) {
        this.showDeleteButton(e)
      } else {
        this.hideDeleteButton(e)
      }
    } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
      this.hideDeleteButton(e)
    }
  },

  /**
   * 处理touchstart事件
   */
  handleTouchStart(e) {
    this.startX = e.touches[0].pageX
    console.log(e)
    this.setData({
      num: e.currentTarget.dataset.productindex
    })
    var i = this.data.num
    console.log(i)
    var queryone = this.data.list[i].id
    console.log("###" + queryone)
    this.setData({
      id: queryone
    })
  },
  queryMine: function () {
    var that = this;
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
          url: URL.MinePush,
          data: {
            def1: '123',
            nickName: res.userInfo.nickName,
            sex: sexx,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            res = res.data
            console.log(res)

            that.setData({
              'list': res,
              check: 'true'
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