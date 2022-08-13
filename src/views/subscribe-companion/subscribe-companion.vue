<template>
  <div class='content' id='content'>
    <div class='content-info'>
      <van-form @submit='onSubmit' ref='formData1'>
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
          :rules='[{ required: true}]'
          required
        />
        <van-field
          label-width='130px'
          v-model='vrIdCard'
          name='vrIdCard'
          label='身份证号'
          placeholder='请输入身份证号'
          :rules='[{ required: true}]'
          required
        />
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
<!--    <h1>{{qrApPersonId}}</h1>-->
    <van-button color='linear-gradient(to bottom, #6FCAB3, #2085A8)' class='mt30 login-btn' round block
                @click='allsubmit'>
      <span class='cfff ls2'>提交申请</span>
    </van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { entourageSubmit,apStatusByOpenId } from '../../api/user'

export default {
  name: 'subscribe-companion',
  data() {
    return {
      vrPhone: '',
      vrName: '',
      vrIdCard: '',
      photoPerson: [],
      photoIDPerson: [],
      show: false,
      width: document.body.offsetWidth,
      height: 0,
      isCrop: false,
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: 'rgb(255,255,255)',
      qrApPersonId: '',
      img: ''
    }
  },
  mounted() {
    this.height = document.getElementById('content').offsetHeight * 1.28
    this.qrApPersonId = this.$route.query.qrApPersonId
  },
  methods: {
    onSubmit(values) {
      if (this.photoIDPerson.length === 0) {
        Toast({
          message: '请上传自拍照'
        })
        return
      }
      const postData = {
        openId: this.$openId.openId,
        photoOssIds: this.photoIDPerson.map((e) => e).join(','),
        qrApPersonId: this.qrApPersonId,
        sign: this.img,
        vrIdCard: values['vrIdCard'],
        vrName: values['vrName'],
        vrPhone: values['vrPhone']
      }
      console.log(postData)
      entourageSubmit(postData).then(res => {
        Toast({
          message: '保存成功'
        })

        apStatusByOpenId(this.$openId.openId).then(res => {
          this.$router.replace({ path: '/audit', query: { apPersonId: res?.data?.apPersonId } })
        })
        // this.$router.replace('/result')
      })
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
          const square = 0.5
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
        this.img = res
        this.show = false
      }).catch(err => {
        console.log(err)
        Toast({
          message: '请手写签名',
          className: 'salimsu'
        })
      })
    },
    allsubmit(values) {
      this.$refs.formData1.submit()
    }
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
  margin-top: -25px;
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
}

.img-size {
  transform: rotate(270deg);
  width: 130px;
  height: 240px;
  margin-left: 0;
  margin-top: -50px;
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
