// pages/sort/index.js
const Bmob = require('../../utils/bmob');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems:['热门推荐','生菜果蔬','个护清洁','男装内衣','家用电器','鞋靴箱包','运动户外',
      '电脑办公','美妆护肤','女装内衣','生活充值','家用建材','家居家纺','汽车生活','医药保健',
      '图书影像','钟表珠宝','奢侈品','京东国际','啪啪二手','房产'],
    tapIndex:0,
    scroll_top:0,
    goods_sort:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    Bmob.initialize("c6dc8f901408aedd", "980229");
    const  query = Bmob.Query("sort");
    if(!wx.getStorageSync('goods_sort')){
      query.find().then(function(res){
        const hot_sale = res.filter(function(item){
          return item['sort']==='当季热销'&&item['category']==='生菜果蔬';
        });
        const fresh_fruit = res.filter(function(item){
          return item['sort']==='新鲜水果'&&item['category']==='生菜果蔬';
        });
        const seafood = res.filter(function(item){
          return item['sort']==='海鲜水产'&&item['category']==='生菜果蔬';
        });
        const meat = res.filter(function(item){
          return item['sort']==='精选肉类'&&item['category']==='生菜果蔬';
        });

        const best_seller = res.filter(function(item){
          return item['sort']==='畅销推荐'&&item['category']==='个人护理';
        });
        const brand = res.filter(function(item){
          return item['sort']==='明星品牌'&&item['category']==='个人护理';
        });
        const paper_products = res.filter(function(item){
          return item['sort']==='纸品湿巾'&&item['category']==='个人护理';
        });
        const clothing = res.filter(function(item){
          return item['sort']==='衣物清洁'&&item['category']==='个人护理';
        });
        const home_cleaning= res.filter(function(item){
          return item['sort']==='家庭清洁'&&item['category']==='个人护理';
        });
        var goods_sort = [],nursing = [],vegetables = [],blend = [];
        vegetables.push(hot_sale,fresh_fruit,seafood,meat);
        nursing.push(best_seller,brand,paper_products,clothing,home_cleaning);
        blend.push(fresh_fruit,paper_products,home_cleaning,hot_sale)
        goods_sort.push(blend,vegetables,nursing);
        wx.setStorage({
          key: 'goods_sort',
          data: goods_sort
        });
        that.setData({
          goods_sort:goods_sort
        })
      });
    }else{
      wx.getStorage({
        key: 'goods_sort',
        success (res) {
          that.setData({
            goods_sort:res.data
          })
        }
      });
    }

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
  getTapIndex(e){
    this.setData({
      tapIndex:e.currentTarget.dataset.index,
      scroll_top:0
    })
  },
})