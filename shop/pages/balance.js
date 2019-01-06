// pages/balance.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyList: [],
    address: {},
    payInfo: {
      total: 0,
      goods: 0,
      exp: 0,
    },
  },
  changeAddress: function(){
    wx.navigateTo({
      url: '/pages/user/address',
    })
  },
  payThis: function(){
      wx.showModal({
          title: '提示',
          content: '支付还未接入，暂时无法进行结算',
          success(res) {
              if (res.confirm) {
                  console.log('用户点击确定')
              } else if (res.cancel) {
                  console.log('用户点击取消')
              }
          }
      })
  },
  getAddress: function() {
    let _this = this;
    wx.request({
        url: app.globalData.baseApi + "user/currentAddress",
        method: "GET",
        data: {session: app.globalData.session},
        success(res){
          if (res.data.code == 200){
            _this.setData({
               address: res.data.data,
            });
          }
        }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (JSON.stringify(options) !== "{}") {
      let goods = options;
      goods.number = 1;
      goods.img = "http://192.168.0.105:8000/images/" + goods.img;
      let buyList = this.data.buyList;
      buyList.push(goods);
      this.setData({
          buyList: buyList
      })
    }else{
      this.setData({
          buyList: app.globalData.cartList
      })
    }
    let goodsPrices = 0;
    this.data.buyList.forEach(function(item){
      goodsPrices = goodsPrices + item.price * item.number;
    });
    this.setData({
        payInfo: {
          total: goodsPrices,
          goods: goodsPrices,
          exp: 0,
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
    this.getAddress();
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