const app = getApp()
var common = require('../../libs/common.js')
var baseurl = app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alarms:[],
    table_header:['时间','严重性','状态','主机','问题','确认'],
    priority:[{
      value:'0',
      desc:'未分类'
    },{
      value:'1',
      desc:'信息'
    },{
      value:'2',
      desc:'警告'
    },
    {
      value:'3',
      desc:'一般严重'
    },
    {
      value:'4',
      desc:'严重'
    },{
      value:'5',
      desc:'灾难'
    }],
    priority_index:0
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
              "output": [
                  "triggerid",
                  "description",
                  "priority",
                  "lastchange",
                  "value"
              ],
              "sortfield": "priority",
              "sortorder": "DESC",
              "selectLastEvent": "extend",
              "only_true": 1,
              "min_severity": 0,
              "monitored": 1,
              "skipDependent": 1,
              "expandDescription":1,
              "selectHosts":["hostid","host"]
            }
          }
          if(typeof(alarm_params.params)!='undefined'){
            params.params=alarm_params.params
          }
          let _this = this
          wx.request({
            url: baseurl+'/triggers',
            method:'POST',
            header:{
              "Content-Type": " application/json",
              "Authorization": basicAuth
            },
            data:params,
            success(res){
              console.log(res)
              if(res.statusCode==200){
                _this.setData({alarms:res.data})
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
        content: '获取event_params失败'
      })
    }
  },
  get_groups:function(e){
    console.log(e)
  },
  get_hosts:function(e){
    console.log(e)
  },
  get_triggers:function(e){
    console.log(e)
  },
  bindPickerChange:function(e){
    this.setData({priority_index:e.detail.value})
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