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
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.clearStorage()
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit:function(e){
    let user = e.detail.value
    let username = user.username
    let password = user.passwd
    wx.request({
      url: baseurl+'/login',
      method:'POST',
      header:{
        "Content-Type": " application/json",
      },
      data:{
        username:username,
        password:password
      },
      success(res){
        let status = res.data.status
        if(status==1){
            wx.setStorage({
              data: user,
              key: 'user',
            })
          app.globalData.basicAuth = "Basic " + common.base64_encode(username+':'+password)
          wx.redirectTo({
            url: '/pages/index/index'
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '账号或者密码不正确'
          })
        }
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
  formReset:function(e){
    console.log(e)
  }
})
