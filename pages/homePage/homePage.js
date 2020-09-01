// pages/homePage/homePage.js
const URL = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInput: '',
    barList: ['拾金不昧', '丢三落四'],
    barIndex: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    num: 0,
    nickName: '',
    sex: '',
    city: '',
    province: '',
    country: '',

    list: [],
    searchList: [],
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
  clickBar: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var clickBarURL = null;
    if (e.currentTarget.dataset.index == 1) {
      clickBarURL = URL.Search_indexQuery
    } else {
      clickBarURL = URL.indexQuery
    }
    var that = this;

    wx.request({
      url: clickBarURL,
      data: {
        def1: '123',
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
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("获取数据失败，请检查服务器连接是否正常！");
      }
    })
    this.setData({
      barIndex: e.currentTarget.dataset.index
    })
  },

  activeNav(e) {
    var that = this
    console.log(e)
    var i = e.target.dataset.index
    var found_category = this.data.navList[i].text
    console.log("found_tag" + found_category)
    wx.request({
      url: URL.indexByTag,
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

  activeNav_search(e) {
    var that = this
    console.log(e)
    var i = e.target.dataset.index
    var search_category = this.data.navList[i].text
    console.log("found_tag" + search_category)
    wx.request({
      url: URL.Search_indexByTag,
      data: {
        search_category: search_category
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

  toOrder: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
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
    wx.hideLoading();
  },
  search_toOrder: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      num: e.currentTarget.dataset.num
    })
    var i = this.data.num
    console.log(i)
    var queryone = this.data.list[i].id
    console.log("###id##" + queryone)
    wx.navigateTo({
      url: '../search_details/search_details?id=' + queryone,
    })
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var search_barIndex = options.search_barindex;
    // if (search_barIndex != null) {
    //   this.setData({
    //     barIndex: 1
    //   })
    // } 
    var that = this;
  
        wx.request({
          url: URL.indexQuery,
         
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
  search: function (e) {
    var that = this
    console.log(e.detail.value)
    var InputMsg = e.detail.value
    var url = null
    if(that.data.barIndex == 1){
      url = URL.Search_indexByInput
    }else{
      url = URL.indexByInput
    }
    wx.request({
      url: url,
      data:{
        InputMsg: InputMsg
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
      searchInput: e.detail.value
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
  onPullDownRefresh: function () {
    this.onLoad()
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})