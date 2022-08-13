<template>
  <div class='content'>
    <div class='answer'>
      <div class='answer-tips'></div>
      <div v-for='(item,i) in questionList' :key='i' :id='item.id'>
        <div class='frame'>
          <van-row>
            <van-col span='4'>
              <span class='question-title1'>{{ i + 1 }}</span>
              <span class='question-title2'>/{{ questionNumber }}</span>
            </van-col>
            <van-col span='20'>
              <van-cell class='question-content'>{{ item.title }}
              </van-cell>
            </van-col>
          </van-row>
          <van-row class='answer pl10 pr10' v-show='(!answerState)'>
            <van-col span='11'>
              <van-button class='answer-button' :class="result[i].value===1 ? 'answer-button-select' : 'answer-button'"
                          plain @click='buttonClickT(i)'>
                A.正确
              </van-button>
            </van-col>
            <van-col span='11' offset='2'>
              <van-button class='answer-button' :class="result[i].value===0 ? 'answer-button-select' : 'answer-button'"
                          plain @click='buttonClickF(i)'>
                B.错误
              </van-button>
            </van-col>
          </van-row>
          <van-row class='answer pl10 pr10' v-show='answerState'>
            <div class='before' v-if='result[i].value !== item.answer'>
              <van-col span='11' v-if='item.answer ===1'>
                <van-button icon-position='right' class='answer-button-true' plain @click='buttonClickT(i)'>A.正确
                </van-button>
              </van-col>
              <van-col span='11' v-if='item.answer !==1'>
                <van-button icon-position='right' class='answer-button-false' plain @click='buttonClickT(i)'>A.正确
                </van-button>
              </van-col>
              <van-col span='11' offset='2' v-if='item.answer ===1'>
                <van-button icon-position='right' class='answer-button-false' plain @click='buttonClickF(i)'>B.错误
                </van-button>
              </van-col>
              <van-col span='11' offset='2' v-if='item.answer !==1'>
                <van-button icon-position='right' class='answer-button-true' plain @click='buttonClickF(i)'>B.错误
                </van-button>
              </van-col>
            </div>
            <div class='after' v-if='result[i].value === item.answer'>
              <van-col span='11'>
                <van-button class='answer-button'
                            :class="result[i].value===1 ? 'answer-button-select' : 'answer-button'" plain
                            @click='buttonClickT(i)'>
                  A.正确
                </van-button>
              </van-col>
              <van-col span='11' offset='2'>
                <van-button class='answer-button'
                            :class="result[i].value===0 ? 'answer-button-select' : 'answer-button'" plain
                            @click='buttonClickF(i)'>
                  B.错误
                </van-button>
              </van-col>
            </div>
          </van-row>

          <van-row class='analysis' v-show='(result[i].value !== item.answer )&&answerState'>
            <van-col><span class='font-size=14px'>题目解析:</span></van-col>
            <van-col v-if='item.answer===1'><span class='analysis-answer'>正确答案: A</span></van-col>
            <van-col v-if='item.answer===0'><span class='analysis-answer'>正确答案: B</span></van-col>
          </van-row>
        </div>
        <br>
      </div>
    </div>
    <div class='btn mt30' @click='submit()'>

      <span class='fs16'>提交答案</span>
    </div>
  </div>


</template>

<script>
import { getQuestionList } from '../../api/user'
import { Toast } from 'vant'

export default {
  name: 'answer',
  data() {
    return {
      questionList: null,
      questionNumber: null,
      answerState: false,
      result: [], // list:用户问题回答结果
      resultCheck: [], // list:回答结果判断
      buttonState: true,
      scrollIndex: 0
    }
  },
  mounted() {
    getQuestionList().then(res => {
      this.questionList = res.data
      this.questionNumber = res.data.length
      console.log(res.data)
      let result = []
      if (!this.questionList.length) {
        result = [{}]
      } else {
        for (let i = 0; i < this.questionList.length; i++) {
          result.push({ index: i, value: '' })
        }
      }
      this.result = result
    })
  },
  methods: {
    buttonClickT(i) {
      this.result[i].value = 1
    },
    buttonClickF(i) {
      this.result[i].value = 0
    },
    submit() {
      let resState = true
      for (let i = 0; i < this.result.length; i++) {
        if ((this.result[i].value !== 0) && (this.result[i].value !== 1)) {
          console.log('tttt')
          resState &&= false
        }
      }
      if (!resState) {
        Toast.fail('请完成所有安全试题')
        return
      } else {
        this.answerState = true// 是否回答
        const questionA = []
        const questionI = []
        let answerCheck = true// 检查所有结果正误标志位
        for (let i = 0; i < this.result.length; i++) {
          questionA[i] = this.result[i].value
          questionI[i] = this.questionList[i].id
          this.resultCheck[i] = (this.result[i].value === (this.questionList[i].answer))
          answerCheck &&= (this.result[i].value === (this.questionList[i].answer))
        }
        if (answerCheck) {
          this.$router.replace('/subscribe')
        } else {
          for (var i = 0; i < this.resultCheck.length; i++) {
            if (!this.resultCheck[i]) {
              this.scrollIndex = i
              break
            }
          }
          document.getElementById(this.questionList[this.scrollIndex].id).scrollIntoView()
          Toast.fail('回答错误，请重新回答')
          return
        }
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.answer-tips {
  background-image: url('../../../static/img/answer-tips.png');
  width: 81px;
  height: 67px;
  background-size: cover;
  position: absolute;
  bottom: -30px;
  left: -30px;
}

.btn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 2px 4px #75B9C7;
  color: #314F4D;
}

.answer {
  //overflow: auto;
  width: 100%;
  height: auto;
  background-color: #ffffff;
  position: relative;
  border-radius: 5px;
  padding-bottom: 20px;

  .answer-t {
    height: calc(100% - 50px);
  }

  .answer-b {
    height: 50px;
    background-color: #5626B8;
  }
}

.content {
  height: 100vh;
  width: 100%;
  background-image: url('../../../static/img/answer-bg.png');
  background-size: 100% 100%;
  padding: 30px;
  overflow: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
}

/*============*/
.question-title1 {
  font-weight: bold;
  font-size: 16px;
}

.question-title2 {
  color: gray;
}

.question-content {
  font-size: 15px;
  padding: 0px 0px 25px 0px;
}

.bg {
  //background-image: url("../../../static/img/exam-background (1).png");
  //background-repeat: no-repeat;
}

.button {
  border-radius: 25px;
  width: 100%;
}

.answer-button {
  border-radius: 12px;
  width: 100%;
  height: 45px;
  background-color: #FAFAFA;

}

.topbar {
  height: 46px;
}

.answer-button-select {
  border-radius: 12px;
  width: 100%;
  height: 45px;
  color: #077CA5;
  border-color: #077CA5;
  background-color: #EDFAFD;
}

.answer-button-true {
  border-radius: 12px;
  width: 100%;
  height: 45px;
  color: #57D1A2;
  border-color: #6ADAAB;
  background-color: #F4FFFB;
  background-image: url("../../../static/img/yes.png");
  background-repeat: no-repeat;
  background-position: 90px 15px;
  background-size: 15%;
}

.answer-button-false {
  border-radius: 12px;
  width: 100%;
  height: 45px;
  color: #E94048;
  border-color: #FB292B;
  background-color: #FEF3ED;
  background-image: url("../../../static/img/no.png");
  background-repeat: no-repeat;
  background-position: 90px 15px;
  background-size: 15%;
}

.analysis {
  font-size: 14px;
  top: 5px;
  display: block;
  position: relative;
}

.analysis-answer {
  color: #20A94D;

}

.answer {
  //padding-left: 10px;
  //padding-right: 10px;
}

.frame {
  padding: 14px;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px dashed #DDDDDD;
}
</style>
