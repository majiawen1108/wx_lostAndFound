// pages/push/push.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    image: '',
    found_title: '',
    found_category: '',
    found_state: '未认领',
    found_date: '',
    found_address: '未填写',
    found_id: '',
    found_lost_name: '未填写',
    found_tag: '无',
    found_det_address: '未填写',
    id_address: '未填写',
    found_details: '未填写',
    found_name: '未填写',
    found_tel: '',
    found_wx: '',
    found_QQ: '',
    def1: '',
    select: false,
    pickList: [
      '卡类',
      '生活',
      '金钱',
      '小物件',
      '大物件',
    ],
    pickValue: '',
    length: 0,
    note: '',
    time: 60,
    showCode: false
  },
  // picker
  picker: function(e) {
    this.setData({
      pickValue: this.data.pickList[e.detail.value]
    })
  },
  //textarea
  note: function(e) {
    this.setData({
      note: e.detail.value,
      length: e.detail.value.length
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  subPush: function(e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      found_title: e.detail.value.found_title,
      image: e.detail.value.image,
      found_category: e.detail.value.found_category,
      found_state: e.detail.value.found_state == null ? '未认领' : e.detail.value.found_state,
      found_date: e.detail.value.found_date,
      found_address: e.detail.value.found_address == '' ? '未填写' : e.detail.value.found_address,
      found_id: e.detail.value.found_id == '' ? '未填写' : e.detail.value.found_address,
      found_lost_name: e.detail.value.found_lost_name == null ? '未填写' : e.detail.value.found_lost_name,
      found_tag: e.detail.value.found_tag == '' ? '未填写' : e.detail.value.found_tag,
      found_det_address: e.detail.value.found_det_address == '' ? '未填写' : e.detail.value.found_det_address,
      id_address: e.detail.value.id_address == '' ? '未填写' : e.detail.value.id_address,
      found_details: e.detail.value.found_details == '' ? '未填写' : e.detail.value.found_details,
      found_name: e.detail.value.found_name == '' ? '未填写' : e.detail.value.found_name,
      found_tel: e.detail.value.found_tel,
      found_wx: e.detail.value.found_wx == '' ? '未填写' : e.detail.value.found_wx,
      found_QQ: e.detail.value.found_QQ == '' ? '未填写' : e.detail.value.found_QQ,
      def1: e.detail.value.def1,
    })
    wx.request({
      url: 'http://172.20.10.3/laf/push.do',
      data: {
        image: '../../images/lost.jpg',
        found_title: this.data.found_title,
        found_category: this.data.pickValue,
        found_state: this.data.found_state,
        found_date: this.data.found_date,
        found_address: this.data.found_address,
        found_id: this.data.found_id,
        found_lost_name: this.data.found_lost_name,
        found_tag: this.data.found_tag,
        found_det_address: this.data.found_det_address,
        id_address: this.data.id_address,
        found_details: this.data.note,
        found_name: this.data.found_name,
        found_tel: this.data.found_tel,
        found_wx: this.data.found_wx,
        found_QQ: this.data.found_QQ,
        //目前获取不到openid，暂时就是用123代替下
        def1: '123'

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
      }
    })
  },
  bindDateChange: function(e) {
    this.setData({
      found_date: e.detail.value
    })
  },
  // 删除图片
  clearImg: function (e) {
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 9) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
      }
    })
  },
})