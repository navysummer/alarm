// pages/hosts/hosts.js
const app = getApp()
var common = require('../../libs/common.js')
var baseurl = app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hosts:[],
    groups:[],
    hiddenhostgroupsmodal:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let basicAuth = app.globalData.basicAuth
    let flag = common.authenticate(app)
    if(!flag){
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
    try {
      var alarm_params = wx.getStorageSync('alarm_params')
      if(typeof(alarm_params)=='undefined'){
        wx.showModal({
          title: '提示',
          content: '获取alarm_params失败,即将返回前一页'
        })
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }else{
        if(typeof(alarm_params.id)!='undefined' && typeof(alarm_params.region_name)!='undefined'){
          let params = {
            'config':{
              'id':alarm_params.id,
              'region_name':alarm_params.region_name
            },
            'params':{
              "output": ['hostid','host','name','status'],
              "selectGroups": "extend",
            }
          }

          if(typeof(alarm_params.params)!='undefined'){
            params.params=alarm_params.params
          }
          if(typeof(options.hostid)!='undefined'){
          	params.params.hostids = options.hostid
          }
          let _this = this
          wx.request({
            url: baseurl+'/hosts',
            method:'POST',
            header:{
              "Content-Type": " application/json",
              "Authorization": basicAuth
            },
            data:params,
            success(res){
              if(res.statusCode==200){
                _this.setData({hosts:res.data})
              }else{
                console.log(res)
                wx.showModal({
                  title: '提示',
                  content: res.data.error
                })
              }
            },
            fail(e){
              console.log(e)
              wx.showModal({
                title: '提示',
                content: '获取告警失败'
              })
            }
          })
        }
      }
    } catch (e) {
      console.log(e)
      wx.showModal({
        title: '提示',
        content: '获取alarm_params失败'
      })
    }
  },
  showhostgroups:function(e){
    this.setData({groups:e.currentTarget.dataset.hostgroups,hiddenhostgroupsmodal:false})
  },
  hide:function(e){
    this.setData({acknowledges:[],hiddenhostgroupsmodal:true})
  },
  formSubmit:function(e){
    this.setData({hosts:[]})
    let formData = e.detail.value
    let hosts = this.trimArray(formData.hosts.split(','))
    let basicAuth = app.globalData.basicAuth
    let flag = common.authenticate(app)
    if(!flag){
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
    try {
      var alarm_params = wx.getStorageSync('alarm_params')
      if(typeof(alarm_params)=='undefined'){
        wx.showModal({
          title: '提示',
          content: '获取alarm_params失败,即将返回前一页'
        })
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }else{
        if(typeof(alarm_params.id)!='undefined' && typeof(alarm_params.region_name)!='undefined'){
          let params = {
            'config':{
              'id':alarm_params.id,
              'region_name':alarm_params.region_name
            },
            'params':{
              "output": ['hostid','host','name','status'],
              "selectGroups": "extend",
            }
          }

          if(typeof(alarm_params.params)!='undefined'){
            params.params=alarm_params.params
          }
          if(hosts.length){
          	params.params.filter = {'host':hosts}
          }
          let _this = this
          wx.request({
            url: baseurl+'/hosts',
            method:'POST',
            header:{
              "Content-Type": " application/json",
              "Authorization": basicAuth
            },
            data:params,
            success(res){
              if(res.statusCode==200){
                _this.setData({hosts:res.data})
              }else{
                console.log(res)
                wx.showModal({
                  title: '提示',
                  content: res.data.error
                })
              }
            },
            fail(e){
              console.log(e)
              wx.showModal({
                title: '提示',
                content: '获取告警失败'
              })
            }
          })
        }
      }
    } catch (e) {
      console.log(e)
      wx.showModal({
        title: '提示',
        content: '获取alarm_params失败'
      })
    }
  },
  formReset:function(e){
    console.log(e)
  },
  trimArray:function(arr){
    let newarr=[]
    let len = arr.length
    for(let i=0;i<len;i++){
      if(arr[i]){
        newarr.push(arr[i])
      }
    }
    return newarr
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