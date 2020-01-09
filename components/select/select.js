// （1） 组件的 properties 属性是对外属性，我理解的是可以当做 data 数据来使用，它是一个含有三个属性的对象，分别是 type 表示属性类型、 value 表示属性初始值、 observer 表示属性值被更改时的响应函数。type 是必填的，其它的可选。如果只有 type，可以写成：属性名：type类型。

// （2） 组件的 data 和普通页面的data一样，是组件的内部数据，和 properties 一同用于组件的模版渲染。

// （3） 组件的 method 是专门用于 事件响应函数 和 任意的自定义方法。在这里面获取数据有两种方法：一种是获取data里的数据： this.data.属性名；一种是获取 properties 中的属性值： this.properties.属性名

// （4） 创建animation动画，作用在通过 true 和 false 切换显示状态的内容上没有过渡、没有过渡、没有过渡。


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propArray: {
      type: Array,
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false,//初始option不显示
    nowText: "请选择",//初始内容
    animationData: {}//右边箭头的动画
  },
  /**
   * 组件的方法列表
   */
  methods: {
    　　　//option的显示与否
    selectToggle: function () {
      var nowShow = this.data.selectShow;//获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },
    //设置内容
    setText: function (e) {
      var nowData = this.properties.propArray;//当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIdx = e.target.dataset.index;//当前点击的索引
      var nowText = nowData[nowIdx].text;//当前点击的内容
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      this.setData({
        selectShow: false,
        nowText: nowText,
        animationData: this.animation.export()
      })
    }
  }
})