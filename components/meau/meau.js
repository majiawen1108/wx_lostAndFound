// components/meau/meau.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 设置一个被点击的时候导航栏菜单的索引
    currentIndexNav:0,
    // 首页导航数据
    navList: [
      {
        code:0,
        text:"首页"
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
      ]
  },
  


  /**
   * 组件的方法列表
   */
  methods: {
    activeNav(e) {
      // console.log(123);
      this.setData({
        currentIndexNav:e.target.dataset.index
      })
    }
  }
})
