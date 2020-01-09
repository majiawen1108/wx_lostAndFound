// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    // pageInfo: [{
    //   image: '../../images/lost.jpg',
    //   found_title: '钱包失物招领',
    //   found_category: '金钱',
    //   found_id: '48280',
    //   found_state: '待认领',
    //   found_lost_name: '无',
    //   idCard: '223010',
    //   found_create_date: '2019-12-21',
    //   found_tag: '金钱',
    //   found_address: '山东省济南市市辖区',
    //   found_det_address: '南沙小区对面',
    //   id_address: '无',
    //   found_details: '在济南的高架的下方，南沙小区对面，南城饺子馆门口见到的，请尽快联系我！',
    //   found_date: '2019-12-21',
    //   found_name: '羞涩大叔叔',
    //   found_tel: '18634287663',
    //   found_wx: 'mjw1997118',
    //   found_QQ: '1115639862'
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
          url: 'http://172.20.10.3/laf/queryone.do',
          data: {
            id:options.id,
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