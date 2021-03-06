// pages/push/push.js
import WxValidate from '../../utils/WxValidate.js'
//获取应用实例
var calls = require("../../utils/city.js")
const app = getApp()
const URL = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //图片
    base64Img: [],
    tempFilePaths: [],
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    //初始数据
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
    def1: '123',
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
    //省市联动
    customItem: [],
    detailed: '',
    //表单验证
    form: {
      found_title: '',
      found_tel: '',
      found_category: '',
      found_date: '',
      found_address: '',
      found_det_address: '',
      found_name: '',
      found_QQ: '',
      found_wx: ''
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
    console.log(app.globalData)
    var openid = app.globalData.openid
    this.setData({
      def1:openid
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
  //提交按钮函数
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
      found_title: e.detail.value.found_title,
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
      found_tel: e.detail.value.found_tel == '' ? '未填写' : e.detail.value.found_tel,
      found_wx: e.detail.value.found_wx == '' ? '未填写' : e.detail.value.found_wx,
      found_QQ: e.detail.value.found_QQ == '' ? '未填写' : e.detail.value.found_QQ,
    })
    wx.request({
      url: URL.Push,
      data: {
        def2: this.data.base64Img,
        image: this.data.tempFilePaths,
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
        found_details: this.data.found_details,
        found_name: this.data.found_name,
        found_tel: this.data.found_tel,
        found_wx: this.data.found_wx,
        found_QQ: this.data.found_QQ,
        //目前获取不到openid，暂时就是用123代替下
        def1: this.data.def1
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
            url: '../homePage/homePage',
          })
        }, 1500)

      }
    })
  },
  //日期显示
  bindDateChange: function (e) {
    this.setData({
      found_date: e.detail.value
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
        // that.urlTobase64(res.tempFilePaths[0])     
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
      found_title: {
        required: true,
        maxlength:8
      },
      found_tel: {
        required: true,
        tel: true
      },
      found_category: {
        required: true
      },
      found_date: {
        required: true
      },
      found_address: {
        required: true
      },
      found_det_address: {
        required: true
      },
      found_name: {
        required: true
      },
      found_QQ: {
        required: true,
        digits:true
      },
      found_wx: {
        required: true
      }
    }
    const messages = {
      found_title: {
        required: '请填写标题',
        maxlength:'标题最多8个字'
      },
      found_tel: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      found_category: {
        required: '请选择类别',
      },
      found_date: {
        required: '请选择拾获日期',
      },
      found_address: {
        required: '请选择拾获地址'
      },
      found_det_address: {
        required: '请输入详细地址'
      },
      found_name: {
        required: '请输入您的姓名'
      },
      found_QQ: {
        required: '请输入您的QQ',
        digits:'QQ只能是数字'
      },
      found_wx: {
        required: '请输入您的微信'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },


})