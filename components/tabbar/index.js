// components/tabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabBar:{
      type:Array,
      value:[],
    },
    tabBar_select:{
      type:Array,
      value:[],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hu:456,
    tapIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTapIndex(e){
      this.setData({
        tapIndex:e.currentTarget.dataset.index
      })
    },
  },
  lifetimes: {
    created() {
      console.log("在组件实例刚刚被创建时执行1",this.data.tabBar)
    },
    attached() {
      console.log("在组件实例进入页面节点树时执行2",this.data.tabBar)
    },
    ready() {
      console.log("在组件在视图层布局完成后执行3",this.data.tabBar,this.properties.tabBar)
    },
    moved() {
      console.log("在组件实例被移动到节点树另一个位置时执行4",this.data.tabBar)
    },
    detached() {
      console.log("在组件实例被从页面节点树移除时执行5",this.data.tabBar)
    },
    error() {
      console.log("每当组件方法抛出错误时执行6",this.data.tabBar)
    },
    /*组件所在页面的生命周期 */
    pageLifetimes: {
      show: function () {
        // 页面被展示
        console.log("页面被展示",this.data.hu)
      },
      hide: function () {
        // 页面被隐藏
        console.log("页面被隐藏",this.data.hu)
      },
      resize: function (size) {
        // 页面尺寸变化
        console.log("页面尺寸变化",this.data.hu)
      }
    }

  }
})
