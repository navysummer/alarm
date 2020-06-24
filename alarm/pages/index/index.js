//index.js
//获取应用实例
const app = getApp()
var common = require('../../libs/common.js')
var baseurl = app.globalData.baseurl
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag:false,
    regions:[],
    index:0
  },
  onLoad: function () {
    let flag = common.authenticate(app)
    if(!flag){
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }

  },
  getList:function(e){
    let basicAuth = app.globalData.basicAuth
    console.log(basicAuth)
    let _this = this
    wx.request({
      url: baseurl+'/regions',
      method:'GET',
      header:{
        "Content-Type": " application/json",
        "Authorization": basicAuth
      },
      
      success(res){
        wx.setStorage({
          data: res.data,
          key: 'regions',
        })
        _this.setData({flag:true,regions:res.data})
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
  },
  bindPickerChange:function(e){
    this.setData({index:e.detail.value})
  },
  get_events:function(e){
    console.log(this)
  }
})
