// components/searchBar/searchBar.js
Component({
  /**
   * 组件的属性列表
   * 
   */
  properties: {
    

  },

  /**
   * 组件的初始数据
   */
  data: {
    focus: false,
    inputValue: ''

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindButtonTap: function () {
      this.setData({
        focus: true
      })
    }
  }
})

