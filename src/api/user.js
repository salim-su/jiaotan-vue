import api from './index'
// axios
import request from '@/utils/request'

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
    method: 'post',
    data,
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
}// 获取字典
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
