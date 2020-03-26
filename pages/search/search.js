// pages/push/push.js
import WxValidate from '../../utils/WxValidate.js'
//获取应用实例
const app = getApp()
const URL = require("../../utils/url.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //图片
    tempFilePaths: [],
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    //初始数据
    image: '',
    search_title: '',
    search_category: '',
    search_state: '未找到',
    search_date: '',
    search_address: '未填写',
    paid: '',
    money: '',
    search_det_address: '未填写',
    search_details: '未填写',
    search_name: '未填写',
    search_tel: '',
    search_wx: '',
    search_QQ: '',
    def1: '',
    //类别
    pickList: [
      '卡类',
      '生活',
      '金钱',
      '小物件',
      '大物件',
    ],
    pickValue: '',
    //详情中字数
    length: 0,
    //详情中的内容
    note: '',
    switch: false,
    //省市联动
    customItem: [],
    detailed: '',
    //表单验证
    form: {
      search_title: '',
      search_tel: '',
      search_category: '',
      search_date: '',
      search_address: '',
      search_det_address: '',
      search_name: '',
      search_QQ: '',
      search_wx: ''
    }
  },
  // picker
  picker: function (e) {
    this.setData({
      pickValue: this.data.pickList[e.detail.value]
    })
  },
  //textarea
  note: function (e) {
    this.setData({
      note: e.detail.value,
      length: e.detail.value.length
    })
  },
  // switch
  switchChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      switch: !this.data.switch
    })
  },
  //省市联动
  bindRegionChange: function (e) {
    var that = this
    //为了让选择框有个默认值，    
    that.setData({
      clas: ''
    }) //下拉框所选择的值
    console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      //拼的字符串传后台
      detailed: e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2],
      //下拉框选中的值
      region: e.detail.value
    })

    this.setData({
      "AddSite.area": e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2]
    })
    console.log(this.data.AddSite)
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
  subPush: function (e) {
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
      search_title: e.detail.value.search_title,
      image: e.detail.value.image,
      search_category: e.detail.value.search_category,
      search_state: e.detail.value.search_state == null ? '未找到' : e.detail.value.search_state,
      search_date: e.detail.value.search_date,
      search_address: e.detail.value.search_address == '' ? '未填写' : e.detail.value.search_address,
      search_det_address: e.detail.value.search_det_address == '' ? '未填写' : e.detail.value.search_det_address,
      money: e.detail.value.money == null ? '0' : e.detail.value.money,
      search_details: e.detail.value.search_details == '' ? '未填写' : e.detail.value.search_details,
      search_name: e.detail.value.search_name == '' ? '未填写' : e.detail.value.search_name,
      search_tel: e.detail.value.search_tel == '' ? '未填写' : e.detail.value.search_tel,
      search_wx: e.detail.value.search_wx == '' ? '未填写' : e.detail.value.search_wx,
      search_QQ: e.detail.value.search_QQ == '' ? '未填写' : e.detail.value.search_QQ,

    })
    wx.request({
      url: URL.Search,
      data: {
        image: this.data.tempFilePaths,
        search_title: this.data.search_title,
        search_category: this.data.pickValue,
        search_state: this.data.search_state,
        search_date: this.data.search_date,
        search_address: this.data.search_address,
        paid: this.data.switch,
        search_det_address: this.data.search_det_address,
        money: this.data.money,
        search_details: this.data.note,
        search_name: this.data.search_name,
        search_tel: this.data.search_tel,
        search_wx: this.data.search_wx,
        search_QQ: this.data.search_QQ,
        //目前获取不到openid，暂时就是用123代替下
        def1: '123'

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '发布成功！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 1500 // 提示窗停留时间，默认1500ms
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../homePage/homePage?search_barindex=' + "1",
          })
        }, 1500)
      }
    })
  },
  bindDateChange: function (e) {
    this.setData({
      search_date: e.detail.value
    })
  },
  // 删除图片
  clearImg: function (e) {
    var nowList = []; //新数据
    var uploaderList = this.data.uploaderList; //原数据

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
      count: 3 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 3) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          tempFilePaths: tempFilePaths,
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
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
      search_title: {
        required: true,
        maxlength:8
      },
      search_tel: {
        required: true,
        tel: true
      },
      search_category: {
        required: true
      },
      search_date: {
        required: true
      },
      search_address: {
        required: true
      },
      search_det_address: {
        required: true
      },
      search_name: {
        required: true
      },
      search_QQ: {
        required: true,
        digits:true
      },
      search_wx: {
        required: true
      }
    }
    const messages = {
      search_title: {
        required: '请填写标题',
        maxlength:'标题最多8个字'
      },
      search_tel: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      search_category: {
        required: '请选择类别',
      },
      search_date: {
        required: '请选择拾获日期',
      },
      search_address: {
        required: '请选择拾获地址'
      },
      search_det_address: {
        required: '请输入详细地址'
      },
      search_name: {
        required: '请输入您的姓名'
      },
      search_QQ: {
        required: '请输入您的QQ',
        digits:'QQ只能是数字'
      },
      search_wx: {
        required: '请输入您的微信'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },


})