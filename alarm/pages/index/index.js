//index.js
//获取应用实例
const app = getApp()
var common = require('../../libs/common.js')
var baseurl = app.globalData.baseurl
console.log(app)
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag:false
  },
  onLoad: function () {
  
  },
  getList:function(e){
    let _this = this
    // console.log(this)
    wx.request({
      url: baseurl+'/zabbixusers',
      method:'GET',
      header:{
        "Content-Type": " application/json",
        "Authorization": "Basic " + common.base64_encode('root:Xia990722')
      },
      
      success(res){
        wx.setStorage({
          data: res.data,
          key: 'regions',
        })
        // console.log(this)
        _this.setData({flag:true})
      },
      fail(e){
        console.log(e)
        wx.setStorage({
          data: [],
          key: 'regions',
        })
        return []
      }
    })
  }
})
