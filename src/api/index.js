const api = {
  SendCode: 'yard/wx/sendSmsVerCode',
  LoginSystem: 'yard/wx/verCodeLogin',
  Navigation: 'yard/wx/navigation',
  NavigationByOpenId: 'yard/wx/navigationByOpenId',
  WxApi: 'wx/jsapi/wx35b00a7e3d45b99c/getJsapiSignature',
  GetSafetyNotice: 'visitor/wx/getSafetyNotice',
  GetQuestionList: 'visitor/wx/questionList',
  Dictionary: 'blade-system/dict/dictionary',
  GetPerson: 'blade-user/list',
  Subscribe: 'visitor/wx/ap',
  ApStatusByOpenId: 'visitor/wx/apStatusByOpenId',
  EntourageSubmit: 'visitor/wx/entourageSubmit',
  PreloadApByApPersonId: 'visitor/wx/preloadApByApPersonId',
  GetDept: 'blade-system/dept/listByCategory?deptCategory=2',
  DeviceInfo: 'wechat/deviceInfo',
  Repair: 'wechat/deviceInfo'
  // GetDept: 'blade-system/dept/list'
}

export default api
