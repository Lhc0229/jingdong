// pages/detail/index.js
const Bmob = require('../../utils/bmob');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item:'',
    price:[],
    text:'【白条支付】首单享立减优惠',
    show:false,
    Index:0,
    count:1,
    temp:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const item = JSON.parse(options['id']);
    const price = item['newPrice'];
    var arr = [{ divide:'不分期',rate:'先用后付，0服务费',index:0,checked:true}];
    const san = price * ( 1 + 0.05 ) / 3;
    const S = price * 0.05 / 3;
    this.pushItem(san,S,arr,3,1)
    const liu = price * ( 1 + 0.05 ) / 6;
    const L = price * 0.05 / 6;
    this.pushItem(liu,L,arr,6,2);
    const nian = price * ( 1 + 0.05 ) / 12;
    const N = price *  0.05 / 12;
    this.pushItem(nian,N,arr,12,3);
    const lianNian = price * ( 1 + 0.05 ) / 24;
    const LN = price *  0.05 / 24;
    this.pushItem(lianNian,LN,arr,24,4);
    const app = getApp();
    app.globalData.item = item;
    this.setData({
      item:item,
      price:arr,
      show:false
    })
  },
  pushItem(a,b,c,d,e){
    var obj = {};
    obj.divide = d + '期  x  '+ parseInt(a).toFixed(2) + '元起';
    obj.rate = '含手续费，每期'+  parseInt(b).toFixed(2) +'元起，费率0.5%起';
    obj.index = e;
    c.push(obj)
  },
  show(){
    this.setData({
      show:!this.data.show,
      text:this.data.temp
    })
  },
  hide(){
    this.setData({
      show:!this.data.show,
    })
  },
  radioChange(e){
      this.setData({
        temp:e.detail.value
      })
    },
  Count(e){
    if(e.target.dataset.index==='+'){
      const  count = this.data.count+1;
      this.setData({
        count:count
      })
    }else{
      if(this.data.count===1){
        return;
      }else{
        const  count = this.data.count-1;
        this.setData({
          count:count
        })
      }
    }

  },
  join(){
    Bmob.initialize("c6dc8f901408aedd", "980229");
    const query = Bmob.Query('cart');
    const that = this;
    var exist = true;
    query.find().then(function(res){
      res.forEach((item)=>{
        if(item['goods_id']===that.data.item['objectId']){
          const count = item['count'] + that.data.count;
          query.set('id', item['objectId']);
          query.set("count",count);
          query.save();
          exist = false;
        }
      })
    }).then(()=>{
      if(exist){
        query.set("count",that.data.count);
        query.set("goods_id",that.data.item['objectId']);
        query.set("title",that.data.item['title'])
        query.set("price",that.data.item['newPrice'])
        query.set("imgUrl",that.data.item['imgUrl'])
        query.save();
      }
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

  }
})