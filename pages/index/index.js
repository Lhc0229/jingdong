//index.js
//获取应用实例
const app = getApp()
const Bmob = require('../../utils/bmob');
Page({
  data: {
    CurrentIndex:0,
    swipers:[],
    logostop:[],
    logosbottom:[],
    tapIndex:0,
    Arrow:true,
    seckill_goods:[],
    hour:0,
    count_down:'',
    goods_item:[],
    tuiJian:['../../image/index/tj1.jpg','../../image/index/tj2.jpg',
      '../../image/index/tj3.jpg','../../image/index/tj4.jpg'],
    min_nav:[
      '首页','美妆','女装','大家电','手机',
      '内衣配饰','男装','电脑办公','运动',
      '食品饮料','数码','玩具乐器','图书',
      '家居厨具','男鞋',' 爱车','小家电',
      '童装','女鞋','酒水']
  },
  //事件处理函数
  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
    })
    const that = this;
    // 数据初始化入口
    Bmob.initialize("c6dc8f901408aedd", "980229");
    // 请求数据表img
    const query = Bmob.Query("img");
    // 如果本地缓存没有,则请求数据
    if(!wx.getStorageSync('swipers')){
      query.find().then(function(res){
          const swipers = [];
          const logos = res.filter(function(item){
              return item['category']==='logo';
          });
          const goods_item = res.filter(function(item){
            return item['category']==='item';
          });
          const seckill_goods =  res.filter(function(item){
            return item['category']==='seckill';
          });
          res.forEach(function(item){
          if(item['category']==='swipers'){
            swipers.push(item['imgUrl'])
          }
        })
        const logostop = logos.slice(0,10);
        const logosbottom = logos.slice(10);
        // 给page里的data数据赋值
        that.setData({
          swipers:swipers,
          logostop:logostop,
          logosbottom:logosbottom,
          seckill_goods:seckill_goods,
          goods_item:goods_item
        });
        // 数据请求成功，设置缓存
        that.setCache('swipers',swipers);
        that.setCache('logostop',logostop);
        that.setCache('logosbottom',logosbottom);
        that.setCache('seckill_goods',seckill_goods);
        that.setCache('goods_item',goods_item);
      })
    }else{
      //获取缓存，并给page的data赋值
      wx.getStorage({
        key: 'swipers',
        success (res) {
          that.setData({
            swipers:res.data
          })
        }
      });
      wx.getStorage({
        key: 'logostop',
        success (res) {
          that.setData({
            logostop:res.data
          })
        }
      });
      wx.getStorage({
        key: 'logosbottom',
        success (res) {
          that.setData({
            logosbottom:res.data
          })
        }
      });
      wx.getStorage({
        key: 'seckill_goods',
        success (res) {
          that.setData({
            seckill_goods:res.data
          })
        }
      });
      wx.getStorage({
        key: 'goods_item',
        success (res) {
          that.setData({
            goods_item:res.data
          })
        }
      });
    }
    wx.hideLoading();
  },
  //封装设置缓存函数
  setCache(key,data){
    wx.setStorage({
      key: key,
      data: data
    });
  },
  //获取点击mini-nav的索引tapIndex
  getTapIndex(e){
    this.setData({
      tapIndex:e.currentTarget.dataset.index
    })
  },
  //获取图标分类的滚动的索引currentIndex
  getCurrentIndex(e){
    this.setData({
      CurrentIndex:e.detail.current
    })
  },
  // 禁止手动滑动
  stopTouchMove(){
    return false
  },
  tapArrow(){
    this.setData({
      Arrow:!this.data.Arrow
    })
  },
  getItem(e){
      const item = e.currentTarget.dataset.item
      wx.navigateTo({
          url: '/pages/detail/index?id=' + JSON.stringify(item),
      })
  }
})
