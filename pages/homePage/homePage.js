// pages/homePage/homePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    // mark 是指原点x轴坐标
    mark: 0,
    // newmark 是指移动的最新点的x轴坐标 
    newmark: 0,
    istoright: true,
    what: 'push',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    num: 0,
    nickName: '',
    sex: '',
    city: '',
    province: '',
    country: '',

    list: [],
    // 设置一个被点击的时候导航栏菜单的索引
    currentIndexNav: 0,
    // 首页导航数据
    navList: [{
        code: 0,
        text: "首页"
      },
      {
        code: 1,
        text: "卡类"
      },
      {
        code: 2,
        text: "生活"
      },
      {
        code: 3,
        text: "金钱"
      },
      {
        code: 4,
        text: "小物件"
      },
      {
        code: 5,
        text: "大物件"
      },
    ],
    queryone: {}
  },

  tap_start: function (e) {
    // touchstart事件
    // 把手指触摸屏幕的那一个点的 x 轴坐标赋值给 mark 和 newmark
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },

  tap_drag: function (e) {
    // touchmove事件
    this.data.newmark = e.touches[0].pageX;

    // 手指从左向右移动
    if (this.data.mark < this.data.newmark) {
      this.istoright = true;
    }

    // 手指从右向左移动
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;
    }
    this.data.mark = this.data.newmark;
  },

  tap_end: function (e) {
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    // 通过改变 opne 的值，让主页加上滑动的样式
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }
  },

  search: function () {
    this.setData({
      what: 'search'
    })
  },
  push: function () {
    this.setData({
      what: 'push'
    })
  },


  activeNav(e) {
    var that = this
    console.log(e)
    var i = e.target.dataset.index
    var found_category = this.data.navList[i].text
    console.log("found_tag" + found_category)
    wx.request({
      url: 'http://172.20.10.3/laf/indexbytag.do',
      data: {
        found_category: found_category
      },
      header: {
        'content-type': 'application/json'
      },
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
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },

  toOrder: function(e) {
    this.setData({
      num: e.currentTarget.dataset.num
    })
    var i = this.data.num
    console.log(i)
    var queryone = this.data.list[i].id
    console.log("###id##" + queryone)
    wx.navigateTo({
      url: '../details/details?id=' + queryone,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
          url: 'http://172.20.10.3/laf/index.do',
          data: {
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
          success: function(res) {
            res = res.data
            console.log(res)

            that.setData({
              'list': res
            })

          },
          fail: function(res) {
            console.log("获取数据失败，请检查服务器连接是否正常！");
          }
        })

      }
    })


  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})