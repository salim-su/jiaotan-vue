<template>
  <div class='content subscribe-info' id='content'>
    <div class='content-info'>
      <van-form @submit='onSubmit' ref='formData1'>

        <van-field
          readonly
          label-width='130px'
          clickable
          right-icon='arrow-down'
          name='apArea'
          :value='apArea["dictValue"]'
          label='区域'
          placeholder='请选择区域'
          @click='showApAreaPicker = true'
          :rules='[{ required: true}]'
          required
        />
        <van-popup v-model='showApAreaPicker' position='bottom'>
          <van-picker
            show-toolbar
            :columns='apAreaColumns'
            value-key='dictValue'
            @confirm='onApAreaConfirm'
            @cancel='showApAreaPicker = false'
          />
        </van-popup>

        <van-field
          label-width='130px'
          v-model='apContent'
          name='apContent'
          label='预约工作内容'
          placeholder='请输入预约工作内容	'
          :rules='[{ required: true}]'
          required
        />
        <van-field
          label-width='130px'
          v-model='apEnt'
          name='apEnt'
          label='预约单位名称'
          placeholder='请输入预约单位名称'
          :rules='[{ required: true}]'
          required
        />
        <van-field
          readonly
          label-width='130px'
          clickable
          name='apTimeIn'
          :value='apTimeIn'
          label='预约入场时间'
          placeholder='点击选择日期'
          @click='showCalendar = true'
          :rules='[{ required: true}]'
          required
        />
        <van-calendar v-model='showCalendar' @confirm='onConfirm' />

        <van-field
          readonly
          label-width='130px'
          clickable
          right-icon='arrow-down'
          name='apType'
          :value='apType["dictValue"]'
          label='预约类型'
          placeholder='请选择预约类型'
          @click='showApTypePicker = true'
          :rules='[{ required: true}]'
          required
        />
        <van-field
          label-width='130px'
          v-model='directorName'
          name='directorName'
          label='预约负责人'
          placeholder='请输入预约负责人'
          :rules='[{ required: true}]'
          required
        />
        <van-field
          label-width='130px'
          v-model='directorPhone'
          name='directorPhone'
          label='预约负责人联系方式'
          placeholder='请输入预约负责人联系方式'
          :rules='[{ required: true}]'
          required
        />
        <van-field
          label-width='130px'
          v-model='vrIdCard'
          name='vrIdCard'
          label='身份证号'
          placeholder='请输入身份证号'
          :rules="[{ required: true, message: '请填写身份证号!' },{pattern:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证号码格式错误！'}]"
          required
        />
        <van-field
          label-width='130px'
          v-model='vrName'
          name='vrName'
          label='姓名'
          placeholder='请输入姓名'
          :rules='[{ required: true}]'
          required
        />
        <van-field
          label-width='130px'
          v-model='vrPhone'
          name='vrPhone'
          label='电话'
          placeholder='请输入电话'
          :rules="[
              { required: true, message: '请填写您的手机号码！' },
              { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}
            ]"
          required
        />
        <van-popup v-model='showApTypePicker' position='bottom'>
          <van-picker
            show-toolbar
            :columns='apTypeColumns'
            value-key='dictValue'
            @confirm='onApTypeConfirm'
            @cancel='showApTypePicker = false'
          />
        </van-popup>

        <van-field
          readonly
          label-width='130px'
          clickable
          right-icon='arrow-down'
          name='auditDept'
          :value='auditDept["deptName"]'
          label='审核部门'
          placeholder='请选择审核部门'
          @click='showAuditDeptPicker = true'
          :rules='[{ required: true}]'
          required
        />
        <van-popup v-model='showAuditDeptPicker' position='bottom'>
          <van-picker
            show-toolbar
            :columns='auditDeptColumns'
            value-key='deptName'
            @confirm='onAuditDeptConfirm'
            @cancel='showAuditDeptPicker = false'
          />
        </van-popup>

        <van-field
          readonly
          label-width='130px'
          clickable
          right-icon='arrow-down'
          name='auditUser'
          :value='auditUser["realName"]'
          label='审核人'
          placeholder='请选择审核人'
          @click='go()'
          :rules='[{ required: true}]'
          required
        />
        <van-popup v-model='showAuditUserPicker' position='bottom'>
          <van-picker
            show-toolbar
            :columns='auditUserColumns'
            value-key='realName'
            @confirm='onAuditUserConfirm'
            @cancel='showAuditUserPicker = false'
          />
        </van-popup>


        <!--        <van-field-->
        <!--          label-width='130px'-->
        <!--          v-model='crName'-->
        <!--          name='crName'-->
        <!--          label='登记车辆型号'-->
        <!--          placeholder='请输入登记车辆型号'-->
        <!--          :rules='[{ required: true}]'-->
        <!--          required-->
        <!--        />-->
        <van-field
          label-width='130px'
          v-model='crNumber'
          name='crNumber'
          label='登记车辆牌照'
          placeholder='请输入登记车辆牌照'
          :rules='[{ required: true}]'
          required
        />


        <!--        <van-field
                  v-model='crNumber'
                  name='licenseNumber'
                  label='车牌号'
                  placeholder='车牌号'
                  :rules="[{ required: true, message: '请填写车牌号' }]"
                >
                  <template #button>
                    &lt;!&ndash;          <van-button size="small" type="primary">发送验证码</van-button>&ndash;&gt;
                    <div class='selLoc' @click='showLoc'>{{ province }}</div>
                  </template>
                </van-field>-->

      </van-form>
    </div>
    <div class='camera'>
      <h3>上传高清自拍照</h3>

      <van-field name='uploader' :rules="[{ required: true , message: '请上传照片' }]"
      >
        <template #input>
          <van-uploader v-model='photoPerson'
                        :max-count='2'
                        :after-read='uploadFilePerson'
                        :before-delete='deleteFilePerson'
                        :max-size='10*1024*1024'
          >
            <van-button class='upload'></van-button>
          </van-uploader>
        </template>
      </van-field>
    </div>

    <div class='camera'>
      <h3>上传车辆照片</h3>

      <van-field name='uploader' :rules="[{ required: true , message: '请上传照片' }]"
      >
        <template #input>
          <van-uploader v-model='photoCar'
                        :max-count='2'
                        :after-read='uploadFileCar'
                        :before-delete='deleteFileCar'
                        :max-size='10*1024*1024'
          >
            <van-button class='upload'></van-button>
          </van-uploader>
        </template>
      </van-field>
    </div>

    <div class='camera'>
      <h3>手写签名</h3>


      <div class='flex justify-content-center img-box'>
        <img class='img-size' v-if='this.img' :src='this.img' alt='' />
      </div>

      <van-button class='hand-write-button-1' v-if='!this.img'
                  round block
                  @click='handWriteSet'>手写签名
      </van-button>

      <van-button class='hand-write-button-2' v-if='this.img'
                  round block
                  @click='handWriteSet'>手写签名
      </van-button>
      <van-popup v-model='show' class='pop-style'>
        <div class='flex w h'>

          <div class='flex flex-column justify-content-around p5'>

            <div class='my-button '
                 style='background: linear-gradient(to right, rgb(21 143 204), rgb(215 228 240))' @click='back'>
              <span class='my-font'>返回</span>
            </div>

            <div class='my-button '
                 style='background: linear-gradient(to right, rgb(220 105 105), rgb(254 194 205 / 74%))'
                 @click='handleReset'>
              <span class='my-font'>清空</span>
            </div>

            <div class='my-button '
                 style='background: linear-gradient(to right, rgb(59 182 112), rgb(158 236 204))'
                 @click='handleGenerate'>
              <span class='my-font'>确认</span>

            </div>


          </div>
          <div class='flex-2 w h' style='border: 2px solid #eae1e1 ;background-color: rgba(210,203,203,0.2)'>

            <vue-esign ref='esign'
                       :width='width'
                       :height='height'
                       :isCrop='isCrop'
                       :lineWidth='lineWidth'
                       :lineColor='lineColor' :bgColor.sync='bgColor' />

          </div>
        </div>
      </van-popup>
    </div>


    <van-button color='linear-gradient(to bottom, #6FCAB3, #2085A8)' class='mt30 login-btn' round block
                @click='allsubmit'>
      <span class='cfff ls2'>提交申请</span>
    </van-button>

    <!--    <van-button color='#FEDA2A' class='mt30 login-btn' block native-type='submit'>-->
    <!--      <span class='c000 ls2'>提交申请</span>-->
    <!--    </van-button>-->

  </div>


</template>

<script>
import { dictionary, getDept, getPerson, subscribe, apStatusByOpenId, preloadApByApPersonId } from 'api/user'
import { Toast } from 'vant'

export default {
  name: 'subscribe-info',
  data() {
    return {
      showApAreaPicker: false,
      apAreaColumns: '',
      apArea: '',
      apAreaSel: '',
      apContent: '',
      apEnt: '',
      apTimeIn: '',
      showCalendar: false,
      showApTypePicker: false,
      apTypeColumns: '',
      apType: '',
      apTypeSel: '',
      directorName: '',
      directorPhone: '',
      vrIdCard: '',
      vrName: '',
      vrPhone: '',
      // crName: '',
      crNumber: '',


      showAuditDeptPicker: false,
      auditDeptColumns: '',
      auditDept: '',
      auditDeptId: '',

      showAuditUserPicker: false,
      auditUserColumns: '',
      auditUser: '',
      auditUserId: '',

      photoPerson: [],
      photoIDPerson: [],
      photoCar: [],
      photoIDCar: [],

      img: '',
      show: false,
      width: document.body.offsetWidth,
      height: 0,
      isCrop: false,
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: 'rgb(255,255,255)',

      apPersonId: '',
      apInfo: ''
    }
  },
  methods: {
    validatorCard(val) {
      const card15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/
      const card18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      return card15.test(val) || card18.test(val)
    },
    rotateBase64(data) {
      return new Promise((resolve, reject) => {
        const imgView = new Image()
        imgView.src = data
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const cutCoor = { sx: 0, sy: 0, ex: 0, ey: 0 } // 裁剪坐标
        imgView.onload = () => {
          const imgW = imgView.width
          const imgH = imgView.height
          const size = imgH
          canvas.width = size * 2
          canvas.height = size * 2
          cutCoor.sx = size
          cutCoor.sy = size - imgW
          cutCoor.ex = size + imgH
          cutCoor.ey = size + imgW
          context.translate(size, size)
          context.rotate(Math.PI / 2 * 3)
          context.drawImage(imgView, 0, 0)
          const imgData = context.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey)
          canvas.width = imgH
          canvas.height = imgW
          context.putImageData(imgData, 0, 0)
          resolve(canvas.toDataURL('image/png'))
        }
      })
    },
    go() {
      if (this.auditDeptId === '') {
        Toast({
          message: '请先选择部门'
        })
        return
      } else if (this.auditUserColumns.length == 0) {
        Toast({
          message: '加载中，请重试'
        })
        return
      } else {
        this.showAuditUserPicker = true
      }
    },
    back() {
      this.show = false
    },
    handleReset() {
      this.$refs.esign.reset()
    },
    handWriteSet() {
      if (this.img !== '') {
        this.handleReset()
      }
      this.show = true
    },
    handleGenerate() {
      this.$refs.esign.generate().then(res => {
        this.rotateBase64(res)
          .then((img) => {
            console.log(`旋转后的base64图片：${img}`)
            this.img = img
            this.show = false
          })
      }).catch(err => {
        console.log(err)
        Toast({
          message: '请手写签名',
          className: 'salimsu'
        })
      })
    },
    onSubmit(values) {

      if (this.photoIDPerson.length === 0) {
        Toast({
          message: '请上传自拍照'
        })
        return
      }

      if (this.photoIDCar.length === 0) {
        Toast({
          message: '请上传车辆照片'
        })
        return
      }
      //
      if (this.img === '') {
        Toast({
          message: '请手写签名'
        })
        return
      }
      // values['apArea'] = this.apAreaSel
      // values['apType'] = this.apTypeSel
      const ap = {
        apArea: this.apAreaSel,
        apContent: values['apContent'],
        apEnt: values['apEnt'],
        apTimeIn: values['apTimeIn'],
        apType: this.apTypeSel,
        directorName: values['directorName'],
        directorPhone: values['directorPhone'],
        auditDeptId: this.auditDeptId,
        auditUserId: this.auditUserId
      }

      const person = {
        vrIdCard: values['vrIdCard'],
        vrName: values['vrName'],
        vrPhone: values['vrPhone'],
        openId: this.$openId.openId,
        sign: this.img,
        photoOssIds: this.photoIDPerson.map((e) => e).join(',')
      }

      const vehicle = {
        // crName: values['crName'],
        crNumber: values['crNumber'],
        photoOssIds: this.photoIDCar.map((e) => e).join(',')
      }
      if (this.apInfo.ap?.id !== undefined) {
        ap['id'] = this.apInfo.ap.id
      }
      // if (this.$apPersonId.apPersonId) {
      //   ap['id'] = this.$apPersonId.apPersonId
      // }
      if (this.apInfo.person?.id !== undefined) {
        person['id'] = this.apInfo.person.id
      }
      if (this.apInfo.vehicle?.id !== undefined) {
        vehicle['id'] = this.apInfo.vehicle.id
      }

      const p = {
        ap, person, vehicle
      }
      console.log(p)
      subscribe(p).then(res => {
        Toast({
          message: '保存成功'
        })
        apStatusByOpenId(this.$openId.openId).then(res => {
          this.$router.replace({ path: '/audit', query: { apPersonId: res?.data?.apPersonId } })
        })
      })
    },
    allsubmit(values) {
      this.$refs.formData1.submit()

      this.$refs.formData1.validate().then((res) => {
        console.log(res)
      }).catch(e => {
        console.log(e)
        Toast('请完善信息')
      })
    },
    onAuditUserConfirm(value) {
      this.auditUser = value
      this.auditUserId = value['id']
      this.showAuditUserPicker = false

    },
    onAuditDeptConfirm(value) {
      console.log('打开')
      this.auditDept = value
      this.auditDeptId = value['id']
      getPerson(this.auditDeptId).then(res => {
        console.log(res)
        this.auditUserColumns = res?.data?.records
      })
      this.showAuditDeptPicker = false
    },
    onApAreaConfirm(value) {
      console.log(value)
      this.apArea = value
      this.apAreaSel = value['dictKey']
      this.showApAreaPicker = false
    },
    onApTypeConfirm(value) {
      this.apType = value
      this.apTypeSel = value['dictKey']
      this.showApTypePicker = false
    },
    onConfirm(date) {
      this.apTimeIn = this.$moment(date).format('YYYY-MM-DD')
      this.showCalendar = false
    },
    deleteFilePerson(file, index) {
      this.photoIDPerson.splice(index.index, 1)
      this.photoPerson.splice(index.index, 1)
    },
    uploadFilePerson(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      if (/\/(?:jpeg|png)/i.test(file.file.type)) {
        // 创建Canvas对象(画布)
        const canvas = document.createElement('canvas')
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        const context = canvas.getContext('2d')
        // 创建新的图片对象
        const img = new Image()
        // 指定图片的DataURL(图片的base64编码数据)
        img.src = file.content

        // 监听浏览器加载图片完成，然后进行进行绘制
        img.onload = () => {
          const square = 0.3
          // 指定canvas画布大小，该大小为最后生成图片的大小
          // canvas.width = 400
          // canvas.height = 300
          const imageWidth = Math.round(square * img.width)
          const imageHeight = Math.round(square * img.height)
          canvas.width = imageWidth
          canvas.height = imageHeight
          /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
        如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
          context.drawImage(img, 0, 0, imageWidth, imageHeight)
          // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
          file.content = canvas.toDataURL(file.file.type, 0.6)
          const name = file.file.name
          file.file = this.getFileFromBase64(file.content, name)
          // 最后将base64编码的图片保存到数组中，留待上传。
        }
      }
      setTimeout(() => {
        const param = new FormData()
        param.append('file', file.file)
        param.append('code', 'smartgate')
        this.$axios.post('/api/blade-resource/oss/endpoint/put-file-attach', param).then((res) => {
          if (res.status === 200) {
            file.status = 'done'
            file.message = '上传成功'
            this.photoIDPerson.push(res.data.data.attachId)
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
      }, 3000)
      console.log(this.photoPerson)
    },
    deleteFileCar(file, index) {
      this.photoIDCar.splice(index.index, 1)
      this.photoCar.splice(index.index, 1)
    },
    uploadFileCar(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      if (/\/(?:jpeg|png)/i.test(file.file.type)) {
        // 创建Canvas对象(画布)
        const canvas = document.createElement('canvas')
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        const context = canvas.getContext('2d')
        // 创建新的图片对象
        const img = new Image()
        // 指定图片的DataURL(图片的base64编码数据)
        img.src = file.content

        // 监听浏览器加载图片完成，然后进行进行绘制
        img.onload = () => {
          const square = 0.3
          // 指定canvas画布大小，该大小为最后生成图片的大小
          // canvas.width = 400
          // canvas.height = 300
          const imageWidth = Math.round(square * img.width)
          const imageHeight = Math.round(square * img.height)
          canvas.width = imageWidth
          canvas.height = imageHeight
          /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
        如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
          context.drawImage(img, 0, 0, imageWidth, imageHeight)
          // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
          file.content = canvas.toDataURL(file.file.type, 0.6)
          const name = file.file.name
          file.file = this.getFileFromBase64(file.content, name)
          // 最后将base64编码的图片保存到数组中，留待上传。
        }
      }
      setTimeout(() => {
        const param = new FormData()
        param.append('file', file.file)
        param.append('code', 'smartgate')
        this.$axios.post('/api/blade-resource/oss/endpoint/put-file-attach', param).then((res) => {
          if (res.status === 200) {
            file.status = 'done'
            file.message = '上传成功'
            this.photoIDCar.push(res.data.data.attachId)
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
      }, 3000)
    },
    getFileFromBase64(base64URL, filename) {
      var arr = base64URL.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }
  },
  async mounted() {
    // if (this.$apPersonId.apPersonId) {
    //
    // }

    await getDept().then(res => {
      console.log(res)
      if (res.success) {
        this.auditDeptColumns = res?.data
      } else {
        Toast.fail('未加载出部门，请刷新重试')
      }
    })

    await dictionary('ap_area').then(res => {
      console.log(res)
      if (res.success) {
        this.apAreaColumns = res.data
      } else {
        Toast.fail('未加载出区域，请刷新重试')
      }
    })
    await dictionary('ap_type').then(res => {
      console.log(res)
      if (res.success) {
        this.apTypeColumns = res.data
      } else {
        Toast.fail('未加载出预约类型，请刷新重试')
      }
    })

    console.log(11111)
    console.log(this.$apPersonId.apPersonId)
    // Toast(this.$apPersonId.apPersonId + 'apid')
    if (this.$apPersonId.apPersonId) {
      preloadApByApPersonId(this.$apPersonId.apPersonId).then(res => {
        console.log(res['data'])
        this.apInfo = res['data']
        const ap = res['data']['ap']
        const person = res['data']['person']
        const vehicle = res['data']['vehicle']

        // this.apArea = ap['apArea']

        const apArea = this.apAreaColumns.filter(function(p) {
          return p.dictKey === ap['apArea']
        })

        const apType = this.apTypeColumns.filter(function(p) {
          return p.dictKey === ap['apType']
        })

        const auditDept = this.auditDeptColumns.filter(function(p) {
          return p.id === ap['auditDeptId']
        })
        console.log(auditDept)
        getPerson(auditDept[0]['id']).then(res => {
          this.auditUserColumns = res?.data?.records
          // auditUser
          const auditUser = this.auditUserColumns.filter(function(p) {
            return p.id === ap['auditUserId']
          })
          this.auditUser = auditUser[0]
          this.auditUserId = auditUser[0]['id']
        })

        // this.apContent = ap['apContent']
        this.apEnt = ap['apEnt']
        // this.apTimeIn = ap['apTimeIn']
        this.directorName = ap['directorName']
        this.directorPhone = ap['directorPhone']
        this.apArea = apArea[0]
        this.apAreaSel = apArea[0]['dictKey']
        this.apType = apType[0]
        this.apTypeSel = apType[0]['dictKey']
        this.auditDept = auditDept[0]
        this.auditDeptId = auditDept[0]['id']
        this.vrIdCard = person['vrIdCard']
        this.vrName = person['vrName']
        this.vrPhone = person['vrPhone']
        this.crNumber = vehicle['crNumber']
        this.img = person['sign']
        if (person['photoOssLinks'].length) {
          person['photoOssLinks'].forEach(res => {
            this.photoPerson.push(
              {
                url: res
              }
            )
          })
        }
        if (vehicle['photoOssLinks'].length) {
          vehicle['photoOssLinks'].forEach(res => {
            this.photoCar.push(
              {
                url: res
              }
            )
          })
        }
        this.photoIDPerson = person['photoOssIds'].split(',')
        this.photoIDCar = vehicle['photoOssIds'].split(',')
      })
    }

    this.height = document.getElementById('content').offsetHeight * 1.3
    // this.apPersonId = this.$route.query.apPersonId


  }
}
</script>

<style scoped lang='scss'>
.content {
  width: 100%;
  height: 100vh;
  overflow: auto;
  padding: 20px;

}

.content-info {
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
}

.camera {
  margin-top: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
  padding: 5px 15px 15px;
  background-color: #ffffff;
}

.upload {
  width: 80px;
  height: 80px;
  background-color: #F5F5F5;
  border-color: white;
  background-image: url("../../../static/img/camera.png");
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}

.hand-write-button-1 {
  border-color: #44A4AD !important;
  color: #44A4AD;
  height: 40px;
  width: 180px;
  margin-left: 50%;
  transform: translate(-50%, 0);
  margin-top: 20px;
}

.hand-write-button-2 {
  border-color: #44A4AD !important;
  color: #44A4AD;
  height: 40px;
  width: 180px;
  margin-left: 50%;
  transform: translate(-50%, 0);
  //margin-top: -25px;
}

.hand-write-area {
  width: 90%;
  padding-bottom: 20px;
  padding-top: 1px;
  border-color: white;
  box-shadow: 0 0 9px 3px #F7F7F7;
  margin: 0 auto;
  text-align: center;
  border-radius: 5px;
}

.pop-style {
  height: calc(100% - 30px);
  width: calc(100% - 30px);
}

.img-box {
  //height: 150px;
  padding-bottom: 10px;
}

.img-size {
  //transform: rotate(270deg);
  //width: 130px;
  //height: 100%;
  //width: 100px;
  width: 100%;
  max-height: 120px;
  //margin-left: 0;
  //margin-top: -50px;
}

.my-font {
  -webkit-transform: rotate(
      90deg
  );
  display: block;
  position: absolute;
  line-height: 145px;
  font-size: 23px;
  color: #ffffff;
}

.my-button {
  width: 50px;
  height: 150px;
  border-radius: 5px;
  //margin: 50px 8px;
  text-align: center;
}

</style>
