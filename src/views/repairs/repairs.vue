<template>
  <div class='content subscribe-info' id='content'>
    <van-nav-bar
      title='报修问题'
      left-text='返回'
      left-arrow
      @click-left='onClickLeft'
      :fixed='true'
      style='background-color: #F6F6F6'
    />
    <div class='content-info'>
      <van-form @submit='onSubmit' ref='formData1'>
        <div class='pl15 fs14'>问题描述</div>
        <van-field
          class='flex-column spec-field'
          label-width='130px'
          v-model='describe'
          name='describe'
          rows='3'
          autosize
          type='textarea'
          placeholder='请输入问题描述'
          :rules='[{ required: true}]'
        />

        <div class='camera'>
          <div class='fs14'>问题图片</div>

          <van-field name='uploader'>
            <!--          <van-field name='uploader' :rules="[{ required: true , message: '请上传照片' }]">-->
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
          label-width='130px'
          v-model='applicant'
          name='applicant'
          label='申请人'
          placeholder='请输入申请人'
          :rules='[{ required: true}]'
        />


        <div></div>


      </van-form>
      <div class='flex justify-content-between pl20 pr20'>


        <van-button class='mt30 login-btn ml10 mr10' color='linear-gradient(to bottom, #C8C8C8, #C8C8C8)'
                    round
                    block
                    @click='cancel'>
          <span class='cfff ls2'>取消</span>
        </van-button>


        <van-button class='mt30 login-btn ml10 mr10' color='linear-gradient(to bottom, #9e9be9, #7A76E4)'
                    round
                    block
                    @click='allsubmit'>
          <span class='cfff ls2'>提交</span>
        </van-button>


      </div>
    </div>


  </div>
</template>
<script>
import { Toast } from 'vant'
import { getDept, repair } from 'api/user'

export default {
  name: 'repairs',
  data() {
    return {
      describe: '',
      photoPerson: [],
      photoIDPerson: [],
      auditDeptColumns: '',
      auditDept: '',
      auditDeptId: '',
      applicant: '',
      showAuditDeptPicker: false,
      showAuditUserPicker: false,
      deviceId: ''
    }
  },
  methods: {
    cancel() {
      this.$router.replace({ path: '/scan' })
    },
    onClickLeft() {
      this.$router.replace({ path: '/device-info', query: { deviceId: this.deviceId } })
    },
    onAuditDeptConfirm(value) {
      console.log('打开')
      this.auditDept = value
      this.auditDeptId = value['id']
      this.showAuditDeptPicker = false
    },
    onSubmit(values) {
      const psotData = {
        openId: this.$openId.openId,
        applicant: values?.applicant,
        ossIds: this.photoIDPerson.map((e) => e).join(','),
        describe: values?.describe,
        deviceId: this.deviceId,
        applyDeptId: this.auditDeptId
      }
      console.log(psotData)
      /* 提交 */
      repair(psotData).then(res => {
        Toast('提交成功')
        setTimeout(res => {
          this.$router.replace({ path: '/scan' })
        }, 100)
      })
    },
    allsubmit() {
      this.$refs.formData1.submit()
      this.$refs.formData1.validate().then((res) => {
      }).catch(e => {
        console.log(e)
        Toast('请完善信息')
      })
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
    deleteFilePerson(file, index) {
      this.photoIDPerson.splice(index.index, 1)
      this.photoPerson.splice(index.index, 1)
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
    if (this.$route.query.deviceId) {
      this.deviceId = this.$route.query.deviceId
    }

    await getDept().then(res => {
      console.log(res)
      if (res.success) {
        this.auditDeptColumns = res?.data
      } else {
        Toast.fail('未加载出部门，请刷新重试')
      }
    })
  }
}
</script>

<style scoped lang='scss'>
.spec-field {
  background-color: unset !important;

  .van-field__value {
    border: 1px solid #D6D6D6 !important;
  }
}

.content {
  width: 100%;
  height: 100vh;
  overflow: auto;
  padding: 60px 5px 10px 5px;
  background-color: #ffffff !important;

}

.content-info {
  //box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
}

.camera {
  margin-top: 20px;
  //box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
  padding: 5px 15px 15px;
  //background-color: #ffffff;
}

.upload {
  width: 80px;
  height: 80px;
  border: 1px dashed #C5C4D5 !important;
  background-color: #F7F7FF;
  //border-color: white;
  background-image: url("../../../static/img/camera.svg");
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

