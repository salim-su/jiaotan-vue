<template>
  <div id='app'>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang='scss'>
.van-nav-bar {
  //background: transparent !important;
  //color: #ffffff;
}

.van-hairline--bottom::after {
  visibility: hidden;
}

.van-nav-bar__title {
  color: #000 !important;
}

.van-nav-bar .van-icon {
  //color: #fff;
}

.van-nav-bar__text {
  color: #000 !important;
}

.tabbar {
  .van-icon__image {
    width: 28px;
    height: 28px;
    /*height: 45px;*/
    /*      position: relative;
          z-index: 999;
          background-color: #fff;
          padding: 5px;
          border: 1px solid #e3e3e3;
          border-radius: 50%;
          margin-top: -20px;*/
  }
}

.van-nav-bar .van-icon {
  color: #000 !important;
}

.login {
  .van-field__body {
    height: 100%;
  }
}

.order {
  .van-calendar__selected-day {
    background-color: #FEDA2A;
  }

  .van-button--danger {
    background-color: #FEDA2A;
    border-color: #FEDA2A !important;
  }

  .van-field__button {
    float: left;
  }

  .van-field__body {
    flex-direction: row-reverse;

    .van-field__button {
      padding-left: 2px;
      padding-right: 5px;
    }
  }

}

.safety-notify{
  .van-checkbox__icon .van-icon{
    border: 1px solid #257670;
  }
  .van-checkbox__icon--checked .van-icon {
    color: #fff;
    background-color: #257670;
    border-color: #257670;
  }
}
.subscribe-info{
  .van-field__label{
    //margin-right: 5px;
  }
}

//.salimsu{
//  transform: translate3d(-50%,-50%,0) rotate(
//      90deg
//  ) !important;
//}
.spec-field{
  .van-field__value{
    border: 1px solid #D6D6D6 !important;
    border-radius: 5px;
    padding: 5px;
  }
  &.van-cell::after{
    display: none !important;
  }

}
.camera{
  .van-field{
    padding-left: 0;
  }
}
.device-info-content{
  .van-hairline--top-bottom::after{
    border-width: 0 !important;
  }
}

</style>
