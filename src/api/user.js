import api from './index'
// axios
import request from '@/utils/request'


// 发送验证码
export function sendCode(params) {
  return request({
    url: api.SendCode,
    method: 'get',
    params,
    hideloading: true
  })
}

// 登录
export function loginSystem(params) {
  return request({
    url: api.LoginSystem,
    method: 'get',
    params,
    hideloading: true
  })
}


// 获取微信SDK权限
export function getWX(url) {
  return request({
    url: api.WxApi,
    method: 'get',
    params: {
      url: url
    },
    hideloading: true
  })
}


// 获取安全告知
export function getSafetyNotice() {
  return request({
    url: api.GetSafetyNotice,
    method: 'get',
    hideloading: true
  })
}

// 获取试题
export function getQuestionList() {
  return request({
    url: api.GetQuestionList,
    method: 'get',
    hideloading: true
  })
}

// 获取字典
export function dictionary(code) {
  return request({
    url: api.Dictionary,
    method: 'get',
    params: {
      code: code
    },
    hideloading: true
  })
}

// 获取部门
export function getDept() {
  return request({
    url: api.GetDept,
    method: 'get',
    hideloading: true
  })
}

// 获取部门下的人员
export function getPerson(deptId) {
  return request({
    url: api.GetPerson,
    method: 'get',
    params: {
      deptId: deptId,
      size: 999
    },
    hideloading: true
  })
}

// 预约申请
export function subscribe(data) {
  return request({
    url: api.Subscribe,
    method: 'post',
    data,
    hideloading: true
  })
}

// 随行人员填报
export function entourageSubmit(data) {
  return request({
    url: api.EntourageSubmit,
    method: 'post',
    data,
    hideloading: true
  })
}

// 通过openId获取预约状态信息
export function apStatusByOpenId(openId) {
  return request({
    url: api.ApStatusByOpenId,
    method: 'get',
    params: {
      openId: openId
    },
    hideloading: true
  })
}

// 通过apPersonId获取预约预加载信息
export function preloadApByApPersonId(apPersonId) {
  return request({
    url: api.PreloadApByApPersonId,
    method: 'get',
    params: {
      apPersonId: apPersonId
    },
    hideloading: true
  })
}
/* ====================== */
export function deviceInfo(deviceId) {
  return request({
    url: api.DeviceInfo,
    method: 'get',
    params: {
      deviceId: deviceId
    },
    hideloading: true
  })
}
export function repair(data) {
  return request({
    url: api.Repair,
    method: 'get',
    data,
    hideloading: true
  })
}
