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
    priority_index:0,
    priorityclass:['gray','green','yellow','orange','red','blue'],
    hiddenhostgroupmodal: true,
    hiddenhostmodal:true,
    hostgroups:[],
    hostgroups_input:[],
    hostgroupschecked:[],
    host_hostgroups:[],
    hostgroups_host:[],
    host_hostgroup_index:0,
    hosts:[],
    hosts_input:[],
    hostschecked:[],
    triggers:[],
    triggers_input:[],
    triggerschecked:[]
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
        content: '获取alarm_params失败'
      })
    }
  },
  get_groups:function(e){
    this.setData({hostgroups:[]})
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
              "output": 'extend'
            }
          }
          if(typeof(alarm_params.params)!='undefined'){
            params.params=alarm_params.params
          }
          let _this = this
          wx.request({
            url: baseurl+'/hostgroups',
            method:'POST',
            header:{
              "Content-Type": " application/json",
              "Authorization": basicAuth
            },
            data:params,
            success(res){
              if(res.statusCode==200){
                _this.setData({hostgroups:res.data})
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
    this.setData({hiddenhostgroupmodal:false})
  },
  hostgroupcancel:function(e){
    this.setData({hiddenhostgroupmodal:true})
  },
  hostgroupconfirm:function(e){
    let hostgroupschecked = this.data.hostgroupschecked
    this.setData({hostgroups_input:hostgroupschecked})
    this.setData({hiddenhostgroupmodal:true})
  },
  hostgroupcheckboxChange:function(e){
    this.setData({hostgroupschecked:e.detail.value})
  },
  get_hosts:function(e){
    // this.setData({host_hostgroups:[]})
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
              "output": 'extend'
            }
          }
          if(typeof(alarm_params.params)!='undefined'){
            params.params=alarm_params.params
          }
          let _this = this
          wx.request({
            url: baseurl+'/hostgroups',
            method:'POST',
            header:{
              "Content-Type": " application/json",
              "Authorization": basicAuth
            },
            data:params,
            success(res){
              if(res.statusCode==200){
                _this.setData({host_hostgroups:res.data})
                if(_this.data.host_hostgroups.length){
                  let host_hostgroup_index = _this.data.host_hostgroup_index
                  let groupid = _this.data.host_hostgroups[host_hostgroup_index].groupid
                  let host_params={
                    'config':{
                      'id':alarm_params.id,
                      'region_name':alarm_params.region_name
                    },
                    'params':{
                      "output": ['hostid','host'],
                      "groupids": groupid
                    }
                  }
                  wx.request({
                    url: baseurl+'/hosts',
                    method:'POST',
                    header:{
                      "Content-Type": " application/json",
                      "Authorization": basicAuth
                    },
                    data:host_params,
                    success(res){
                      if(res.statusCode==200){
                        _this.setData({hostgroups_host:res.data})
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
    this.setData({hiddenhostmodal:false})
  },
  hostconfirm:function(e){
    let hostschecked = this.data.hostschecked
    this.setData({hosts_input:hostschecked})
    this.setData({hiddenhostmodal:true})
  },
  hostcancel:function(e){
    this.setData({hiddenhostmodal:true})
  },
  host_hostgroups_bindPickerChange:function(e){
    this.setData({host_hostgroup_index:e.detail.value})
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
          let groupid = this.data.host_hostgroups[e.detail.value].groupid
          let params = {
            'config':{
              'id':alarm_params.id,
              'region_name':alarm_params.region_name
            },
            'params':{
              "output": 'extend',
              "groupids": groupid
            }
          }
          if(typeof(alarm_params.params)!='undefined'){
            params.params=alarm_params.params
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
                _this.setData({hostgroups_host:res.data})
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
  hostcheckboxChange:function(e){
    this.setData({hostschecked:e.detail.value})
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