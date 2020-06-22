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
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // let a=this.getList()
    // console.log(a)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        // console.log(res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getList:function(e){
    wx.request({
      url: baseurl+'/zabbixusers',
      method:'GET',
      header:{
        "Content-Type": " application/json",
        "Authorization": "Basic " + common.base64_encode('root:Xia990722')
      },
      success(res){
        // console.log(res.data)
        // return res.data
        wx.setStorage({
          data: res.data,
          key: 'regions',
        })
      },
      fail(e){
        console.log(e)
        wx.setStorage({
          data: [],
          key: 'regions',
        })
        // return []
      }
    })
    // let a=common.base64_encode('root:Xia990722')
    // console.log(a)
  }
})
