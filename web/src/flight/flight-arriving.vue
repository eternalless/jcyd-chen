<!-- 到港 显示屏-->
<template>
  <div style="height: 100%">
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="4">
            <div class="belt-no-header bg-orange-color"><label>B2</label></div>
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="8"><div class="sub-content bg-orange-color"><label>航班号</label></div></el-col>
              <el-col :span="12"><div class="sub-content bg-orange-color"><label>来自</label></div></el-col>
              <el-col :span="4"><div class="sub-content bg-orange-color right-border-2"><label>开始</label></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="sub-content bg-orange-color"><label>Flight</label></div></el-col>
              <el-col :span="12"><div class="sub-content bg-orange-color"><label>From</label></div></el-col>
              <el-col :span="4"><div class="sub-content bg-orange-color right-border-2"><label>Begin</label></div></el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 数据填充 -->
        <div v-if="beltFlightLeftListAll.length >0" style="height: 100%;">
          <div v-for="(item,index) in beltFlightLeftListShow">
            <pickup-belt-item :beltItem="item" :showLight="index%2 == 1"></pickup-belt-item>
          </div>
        </div>
        <div v-else>&nbsp;&nbsp;</div>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="4">
            <div class="belt-no-header bg-orange-color"><label>B1</label></div>
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="8"><div class="sub-content bg-orange-color"><label>航班号</label></div></el-col>
              <el-col :span="12"><div class="sub-content bg-orange-color"><label>来自</label></div></el-col>
              <el-col :span="4"><div class="sub-content bg-orange-color right-border-2"><label>开始</label></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="sub-content bg-orange-color"><label>Flight</label></div></el-col>
              <el-col :span="12"><div class="sub-content bg-orange-color"><label>From</label></div></el-col>
              <el-col :span="4"><div class="sub-content bg-orange-color right-border-2"><label>Begin</label></div></el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 数据填充 -->
        <div v-if="beltFlightRightListAll.length >0" style="height: 100%;">
          <div v-for="(item,index) in beltFlightRightListShow">
            <pickup-belt-item :beltItem="item" :showLight="index%2 == 1"></pickup-belt-item>
          </div>
        </div>
        <div v-else>&nbsp;&nbsp;</div>
      </el-col>
    </el-row>

    <div class="bottom-bar-60">
      <!-- 数据填充 -->
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-orange-color"><label>
            到&nbsp;&nbsp;达&nbsp;&nbsp;航&nbsp;&nbsp;班&nbsp;&nbsp;信&nbsp;&nbsp;息 </label></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="1">
          <div class="sub-content bg-blue-dark"></div>
        </el-col>
        <el-col :span="4">
          <div class="sub-content bg-blue-dark"><label>航班号</label></div>
        </el-col>
        <el-col :span="4">
          <div class="sub-content bg-blue-dark"><label>计划到达</label></div>
        </el-col>
        <el-col :span="4">
          <div class="sub-content bg-blue-dark"><label>预计到达</label></div>
        </el-col>
        <el-col :span="7">
          <div class="sub-content bg-blue-dark"><label>起飞城市</label></div>
        </el-col>
        <el-col :span="4">
          <div class="sub-content bg-blue-dark"><label>状态</label></div>
        </el-col>
      </el-row>
      <el-row>
        <div v-for="(item,index) in arrFlightList">
          <arriving-item :arrItem="item" :showLight="index%2 == 1"></arriving-item>
        </div>
      </el-row>
    </div>
    <div class="bottom-bar">
      <flight-bottom :msg="showBottomMsg"></flight-bottom>
    </div>
    {{showBeltFlightList }}
    {{showArrFlightList }}
  </div>
</template>
<script>
  import {listBeltFlights, listArrFlights, getAlertMessage} from '../api'
  import PickupBeltItem from '../components/pickup-belt-item.vue'
  import ArrivingItem from '../components/arriving-item.vue'
  import FlightBottom from '../components/flight-bottom.vue'

  export default {
    components: {
      PickupBeltItem,
      ArrivingItem,
      FlightBottom
    },
    data() {
      return {
        arrFlightList: [],
        arrIndex: 0,
        arrTimeIndex: 0,
        arrFlightListAll: [],
        beltFlightLeftListAll: [],
        beltFlightLeftListShow: [],
        leftBeltIndex: 0,
        leftBeltTimeIndex: 0,
        beltFlightRightListAll: [],
        beltFlightRightListShow: [],
        rightBeltIndex: 0,
        rightBeltTimeIndex: 0,
        beltFlightListAll: [],
        pageTimeIndex: 0,
        showBottomMsg: ""
      }
    },
    computed: {
      showBeltFlightList() {
        this.beltFlightLeftListAll = this.fillBeltArray(this.beltFlightListAll.filter(item => {
          return item.beltNo === "B2"
        }),2)
        this.beltFlightRightListAll = this.fillBeltArray(this.beltFlightListAll.filter(item => {
          return item.beltNo === "B1"
        }),2)
        if (this.beltFlightLeftListAll.length > 2) {
          clearInterval(this.leftBeltTimeIndex);
          this.leftBeltTimeIndex = setInterval(this.changeBeltFlightLeftList, 6000)
        } else {
          if (this.leftBeltTimeIndex > 0) {
            clearInterval(this.leftBeltTimeIndex);
            this.leftBeltTimeIndex = 0;
          }
          this.beltFlightLeftListShow = this.beltFlightLeftListAll
        }
        if (this.beltFlightRightListAll.length > 2) {
          clearInterval(this.rightTimeIndex);
          this.rightTimeIndex = setInterval(this.changeBeltFlightRightList, 6000)
        } else {
          if (this.rightTimeIndex > 0) {
            clearInterval(this.rightTimeIndex);
            this.rightTimeIndex = 0;
          }
          this.beltFlightRightListShow = this.beltFlightRightListAll
        }
        return '';
      },
      showArrFlightList() {
        this.arrFlightListAll=this.fillArrArray(this.arrFlightListAll,4)
        if (this.arrFlightListAll.length > 4) {
          clearInterval(this.arrTimeIndex);
          this.arrTimeIndex = setInterval(this.changeArrFlightList, 8000)
        } else {
          if (this.arrTimeIndex > 0) {
            clearInterval(this.arrTimeIndex);
            this.arrTimeIndex = 0;
          }
          this.arrFlightList = this.arrFlightListAll
        }
        return '';
      }
    },
    methods: {
      fillBeltArray(beltFlightList, maxLength) {
        if (beltFlightList.length === 0) {
          return beltFlightList.concat(this.getBeltListFiller(maxLength))
        }if (beltFlightList.length % maxLength !== 0) {
          return beltFlightList.concat(this.getBeltListFiller(maxLength - beltFlightList.length % maxLength))
        }
        return beltFlightList
      },
      getBeltListFiller(length) {
        const filler = []
        if (length > 0) {
          for (let i = 1; i <= length; i++) {
            filler.push({
              airline: "",
              flightNo: "",
              scheduleTime: "",
              depCityCn: "",
              depCity: "",
              overCityCn:"",
              overCity:"",
              beltNo: "",
              port: ""
            })
          }
        }
        return filler
      },
      fillArrArray(arrFlightList, maxLength) {
        if (arrFlightList.length === 0) {
          return arrFlightList.concat(this.getArrListFiller(maxLength))
        }if (arrFlightList.length % maxLength !== 0) {
          return arrFlightList.concat(this.getArrListFiller(maxLength - arrFlightList.length % maxLength))
        }
        return arrFlightList
      },
      getArrListFiller(length) {
        const filler = []
        if (length > 0) {
          for (let i = 1; i <= length; i++) {
            filler.push({
              airline: "",
              flightNo: "",
              expectTime: "",
              depCityCn: ""
            })
          }
        }
        return filler
      },
      changeBeltFlightLeftList() {
        if (this.leftBeltIndex < this.beltFlightLeftListAll.length) {
          this.beltFlightLeftListShow = this.beltFlightLeftListAll.slice(this.leftBeltIndex, this.leftBeltIndex + 2);
          this.leftBeltIndex += 2
        } else if (this.leftBeltIndex >= this.beltFlightLeftListAll.length) {
          this.beltFlightLeftListShow = this.beltFlightLeftListAll.slice(0, 2);
          this.leftBeltIndex = 2
        }
      },
      changeBeltFlightRightList() {
        if (this.rightBeltIndex < this.beltFlightRightListAll.length) {
          this.beltFlightRightListShow = this.beltFlightRightListAll.slice(this.rightBeltIndex, this.rightBeltIndex + 2);
          this.rightBeltIndex += 2
        } else if (this.rightBeltIndex >= this.beltFlightRightListAll.length) {
          this.beltFlightRightListShow = this.beltFlightRightListAll.slice(0, 2);
          this.rightBeltIndex = 2
        }
      },
      changeArrFlightList() {
        if (this.arrIndex < this.arrFlightListAll.length) {
          this.arrFlightList = this.arrFlightListAll.slice(this.arrIndex, this.arrIndex + 4);
          this.arrIndex = this.arrIndex + 4
        } else if (this.arrIndex >= this.arrFlightListAll.length) {
          this.arrFlightList = this.arrFlightListAll.slice(0, 4);
          this.arrIndex = 4
        }
      },
      selectBeltFlights(val) {
        listBeltFlights(val).then((res) => {
          this.beltFlightListAll = res.data
        })
      },
      selectArrFlights(val) {
        listArrFlights().then((res) => {
          this.arrFlightListAll = res.data
        })
      },
      selectBottomMsg() {
        const param = {pageValue: 2}
        getAlertMessage(param).then((res) => {
          if (this.showBottomMsg !== res.data) {
            this.showBottomMsg = res.data
          }
        })
      }
    },
    mounted() {
      this.selectBeltFlights()
      this.selectArrFlights();
      this.selectBottomMsg();
      this.$store.dispatch('cancelPageTimeIndex');
      const pageTimeIndex = setInterval(() => {
        this.selectBeltFlights()
        this.selectArrFlights();
        this.selectBottomMsg();
      }, 1000 * 30)
      this.$store.dispatch("setPageTimeIndex", pageTimeIndex)
      //模拟数据
//      this.showBottomMsg = '各位旅客请注意，由于台风"天鸽"的破坏，部分航班有所延误，敬请谅解！'
//      this.arrFlightListAll = [{
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "北京"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        scheduleTime: "1234522222000",
//        depCityCn: "北京",
//        status: '已起飞'
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        scheduleTime: "1234522222000",
//        depCityCn: "北京1",
//        overCityCn:"北京",
//        overCity:"Beijing"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "北京2"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "北京3"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "北京4"
//      }];
//      this.beltFlightListAll = [{
//        airline: "CZ",
//        flightNo: "8896",
//        scheduleTime: "1234522222000",
//        depCityCn: "呼和浩特",
//        depCity: "Huhehaote",
//        overCityCn:"阿姆斯特丹",
//        overCity:"Amuxxxx",
//        beltNo: "B1",
//        port: "T8"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        scheduleTime: "1234522222000",
//        depCityCn: "长春",
//        depCity: "Changchun",
//        overCityCn:"北京",
//        overCity:"Beijing",
//        beltNo: "B1",
//        port: "T8"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        scheduleTime: "1234522222000",
//        depCityCn: "北京",
//        depCity: "beijing",
//        beltNo: "B2",
//        port: "T8"
//      }]
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-blue-dark {
    background: #113366;
  }

  .bg-blue-wathet {
    background: #225599
  }

  .belt-no-header {
    border-radius: 0px;
    height: 130px;
  }

  .belt-no-header label {
    height: 130px;
    line-height: 130px;
    text-align: center;
    font-size: 70px;
    font-family: "Arial Black";
    font-weight: bolder;
    color: #FFFFFF;
  }

  .grid-content {
    border-radius: 0px;
    height: 71px;
  }

  .grid-content label {
    height: 71px;
    line-height: 71px;
    text-align: center;
    color: black;
  }

  .top-content {
    background-color: #ff9a00;
    border-radius: 0px;
    min-height: 69px;
    font-size: 36px;
    color: #000000;
  }

  .bg-orange-color {
    background: #ff9a00
  }

  .top-content label {
    height: 69px;
    line-height: 69px;
    text-align: center;
    font-size: 1.5em;
    color: black;
  }

  .sub-content {
    border-radius: 0px;
    min-height: 65px;
    font-size: 28px;
    color: #FFFFFF;
  }

  .sub-content label {
    position: absolute;
    margin-top: 15px;
    margin-left: -50px;
  }

  .bottom-bar-60 {
    background-color: black;
    font-size: 36px;
    color: #FFFFFF;
    width: 100%;
    height: 468px;
    display: block;
    overflow: hidden;
    bottom: 60px;
    position: fixed;
  }

  .bottom-bar {
    font-size: 36px;
    color: #FFFFFF;
    width: 100%;
    height: 62px;
    display: block;
    overflow: hidden;
    bottom: 0;
    position: fixed;
  }
</style>
