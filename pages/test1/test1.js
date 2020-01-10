

var calls = require("../../utils/city.js")

Page({
  data: {

    customItem: [],
    detailed: '',
  },

  onLoad: function (options) {
  },
 
  //省市联动
  bindRegionChange: function (e) {
    var that = this
    //为了让选择框有个默认值，    
    that.setData({
      clas: ''
    })　　　//下拉框所选择的值
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

  

})
