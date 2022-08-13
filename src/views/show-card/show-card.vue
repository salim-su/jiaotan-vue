<template>
  <div>
    <h1 @click='go1()'>salimsu</h1>
    <h1>第{{ index }}次调用</h1>
    <h1>{{ msgg }}</h1>

    <div class='baidumap mt20' id='allmap'></div>

    <div :style="{width:'100%',height:'300px'}">
      <el-amap vid='amap' :plugin='plugin' class='amap-demo' :center='center'>
      </el-amap>
    </div>

  </div>
</template>

<script>
// import { getgridarealist } from '../../api/user'
import BMap from 'BMap'

export default {
  name: 'show-card',
  data() {
    return {
      info: '',
      map: '',
      marker: '',
      msgg: '',
      index: 0,
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [{
        enableHighAccuracy: true,// 是否使用高精度定位，默认:true
        timeout: 100,// 超过10秒后停止定位，默认：无穷大
        maximumAge: 0,// 定位结果缓存0毫秒，默认：0
        convert: true,// 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,// 显示定位按钮，默认：true
        buttonPosition: 'RB',// 定位按钮停靠位置，默认：'LB'，左下角
        showMarker: true,// 定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,// 定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,// 定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true,// 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
        extensions: 'all',
        pName: 'Geolocation',
        events: {
          init(o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              console.log(result)
              if (result && result.position) {
                self.lng = result.position.lng
                self.lat = result.position.lat
                self.center = [self.lng, self.lat]
                self.loaded = true
                self.$nextTick()
              }
            })
          }
        }
      }]
    }
  },
  mounted() {
    window.test = this.test
    this.baiduMap()
    // this.zhuanhuan(117.75399533333335,38.98887883333333)
  },
  destroyed() {
  },
  methods: {
    go1() {
      console.log(11111)
      // this.goCenter(117.76690311313139, 38.995896672070644)

      // 38= 84b 117=84l
      this.zhuanhuan(117.75399533333335, 38.98887883333333)
    },
    test(param) {
      // eslint-disable-next-line no-eval
      var loc = eval('(' + param + ')')
      this.msgg = loc.wgs84l + '---' + loc.wgs84b
      this.index += 1
      if (loc.wgs84b !== 0 && loc.wgs84l !== 0) {
        this.zhuanhuan(loc.wgs84l, loc.wgs84b)
      }

      // this.msgg = param.wgs84b + '---' + param.wgs84l
    },
    baiduMap() {
      this.map = new BMap.Map('allmap')
      this.map.enableScrollWheelZoom(true)
      var pointI = new BMap.Point(117.75399533333335, 38.98887883333333)
      this.marker = new BMap.Marker(pointI)
      this.map.centerAndZoom(pointI, 19)
      this.map.addOverlay(this.marker)

      this.map.addEventListener('click', e => {
        console.log(e)
      })
    },
    goCenter(x, y) {
      console.log(x)
      console.log(y)
      var pointI = new BMap.Point(x, y)
      this.map.removeOverlay(this.marker)
      this.marker = new BMap.Marker(pointI)
      this.map.centerAndZoom(pointI, 19)
      this.map.addOverlay(this.marker)
    },
    zhuanhuan(x, y) {
      var convertor = new BMap.Convertor()
      var pointArr = []
      var ggPoint = new BMap.Point(x, y)
      pointArr.push(ggPoint)
      convertor.translate(pointArr, 1, 5, this.translateCallback)
    },
    translateCallback(data) {
      console.log(data)
      if (data.status === 0) {
        this.goCenter(data.points[0]['lng'], data.points[0]['lat'])
      }
    }
  },
  watch: {
    $route(to, from) {
    }
  }
}
</script>

<style lang='scss' scoped>
.baidumap {
  width: 100vw;
  height: 400px;
  //margin: 0 auto;
}

.amap-demo {
  height: 300px;
  width: 300px;
}
</style>
