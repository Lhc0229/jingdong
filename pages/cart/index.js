// pages/cart/index.js
const Bmob = require('../../utils/bmob');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
    checked:false,
    price:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  handle(e){
    var that =this;
    var objectId = e.target.dataset.item['objectId'];
    var query = Bmob.Query('cart');
    if(e.target.dataset.index==='+'){
     var  count = e.target.dataset.item['count'] +1;
      query.set('id', objectId);
      query.set("count",count);
      query.save();
      query.find().then((res)=>{
        that.setData({
          data:res
        })
      }).then(()=>{
        that.total();
      })
    }else{
      if(e.target.dataset.item['count']===1){
        query.destroy(objectId).then(res => {
          query.find().then((res)=>{
            that.setData({
              data:res
            })
          }).then(()=>{
            that.total();
          })
        }).catch(err => {
          console.log(err)
        })
        return;
      }else{
        const  count = e.target.dataset.item['count']  - 1;
        query.set('id', objectId);
        query.set("count",count);
        query.save();
        query.find().then((res)=>{
          that.setData({
            data:res
          })
        }).then(()=>{
          that.total();
        })
      }
    }

  },
  checkboxChange(e){
    // this.handle();
    var data = e.detail.value;
    var arr = [];
    var goods_list = [];
    const that = this;
    var query = Bmob.Query('cart');
    arr.push(data);
    var arrs;
    query.find().then((res)=>{
      data.forEach((item)=>{
        arrs = res.find((items)=>{
          return items.objectId === item
        });
        goods_list.push(arrs);
      })
    }).then(()=>{
      var t = [];
      goods_list.forEach((item)=>{
       t.push(item.count * item['price'])
      })
      var sum = t.reduce((sum,number)=>{
        return sum + number;
      },0);
      that.setData({
        price:sum
      })
    })
  },
  change(){
    this.setData({
      checked:!this.data.checked
    })
    if(this.data.checked){
      this.total();
    }else{
      this.setData({
        price:0
      })
    }

  },
  total(){
    var query = Bmob.Query('cart');
    var arr = [];
    var that = this;
    var price;
    query.find().then((res)=>{
      res.forEach((item)=>{
        arr.push(item['count'] * item['price'])
      });
      price = arr.reduce((sum,item)=>{
        return sum+item;
      })
    }).then(()=>{
      that.setData({
        price:price
      })
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
    const query = Bmob.Query("cart");
    const that = this;
    query.find().then((res)=>{
      that.setData({
        data:res
      })
    }).then(()=>{
      // that.total()
    })
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

  }
})