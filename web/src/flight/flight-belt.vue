<!-- 到港 显示屏-->
<template>
  <div style="height: 100%">
    <el-row>
      <el-col :span="15">
        <!-- 背景色填充 -->
        <div style="height: 1024px;width:50%;position: absolute;background-color:black;float: left"></div>
        <!-- 数据填充 -->
        <!--<el-row>-->
          <!--<el-col :span="24"><div class="grid-content bg-blue-yellow"><label> 出&nbsp;&nbsp;发&nbsp;&nbsp;航&nbsp;&nbsp;班&nbsp;&nbsp;信&nbsp;&nbsp;息<br/>Departure Flight Infos </label></div></el-col>-->
        <!--</el-row>-->
        <el-row>
          <el-col :span="4"><div class="sub-content bg-orange-header"></div></el-col>
          <el-col :span="6"><div class="sub-content bg-orange-header"><label>航班号</label></div></el-col>
          <el-col :span="10"><div class="sub-content bg-orange-header"><label>来自</label></div></el-col>
          <el-col :span="4"><div class="sub-content bg-orange-header right-border-2"><label>开始</label></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="sub-content bg-orange-header"></div></el-col>
          <el-col :span="6"><div class="sub-content bg-orange-header"><label>Flight</label></div></el-col>
          <el-col :span="10"><div class="sub-content bg-orange-header"><label>From</label></div></el-col>
          <el-col :span="4"><div class="sub-content bg-orange-header right-border-2"><label>Begin</label></div></el-col>
        </el-row><!-- 数据填充 -->
        <el-row>
          <div v-for="(item,index) in beltFlightListShow">
            <belt-item :beltItem="item" :showLight="index%2 == 1" ></belt-item>
          </div>
        </el-row>
      </el-col>
      <el-col :span="9">
        <!-- 背景色填充 -->
        <div style="height: 1024px;width:50%;position: absolute;background-color:black;float: left"></div>
        <!-- 数据填充 -->
        <!--<el-row>-->
          <!--<el-col :span="24"><div class="grid-content bg-blue-yellow"><label> 出&nbsp;&nbsp;发&nbsp;&nbsp;航&nbsp;&nbsp;班&nbsp;&nbsp;信&nbsp;&nbsp;息<br/>Departure Flight Infos </label></div></el-col>-->
        <!--</el-row>-->
        <el-row>
          <el-col :span="7"><div class="sub-content bg-orange-header"><label>航班号</label></div></el-col>
          <el-col :span="10"><div class="sub-content bg-orange-header"><label>来自</label></div></el-col>
          <el-col :span="7"><div class="sub-content bg-orange-header"><label>预计</label></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="7"><div class="sub-content bg-orange-header"><label>Flight</label></div></el-col>
          <el-col :span="10"><div class="sub-content bg-orange-header"><label>From</label></div></el-col>
          <el-col :span="7"><div class="sub-content bg-orange-header"><label>Estimate</label></div></el-col>
        </el-row>
        <el-row>
          <div v-for="(item,index) in arrFlightListShow">
            <belt-item-arr :arrItem="item" :showLight="index%2 == 1" ></belt-item-arr>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <flight-bottom :msg="showBottomMsg"></flight-bottom>
    {{showBeltFlightList }}
    {{showArrFlightList }}
  </div>
</template>
<script>
  import {listBeltFlightsBybeltNo, listArrFlights, getAlertMessage} from '../api'
  import BeltItemArr from '../components/belt-item-arr.vue'
  import BeltItem from '../components/belt-item-new.vue'
  import FlightBottom from '../components/flight-bottom-new.vue'
  export default {
    name: 'hello',
    components: {
      BeltItemArr,
      FlightBottom,
      BeltItem
    },
    data () {
      return {
        beltNo:"B1",
        arrIndex: 0,
        arrTimeIndex: 0,
        arrFlightListAll: [],
        arrFlightListShow: [],
        beltFlightListAll: [],
        beltFlightListShow: [],
        beltIndex: 0,
        beltTimeIndex: 0,
        pageTimeIndex: 0,
        showBottomMsg: ""
      }
    },
    computed: {
      showBeltFlightList() {
        this.beltFlightListAll = this.fillBeltArray(this.beltFlightListAll.filter(item => {
          return item.beltNo === this.beltNo
        }),3)
        if (this.beltFlightListAll.length > 3) {
          clearInterval(this.beltTimeIndex);
          this.beltTimeIndex = setInterval(this.changeBeltFlightList, 6000)
        } else {
          if (this.beltTimeIndex > 0) {
            clearInterval(this.beltTimeIndex);
            this.beltTimeIndex = 0;
          }
        }
        this.beltFlightListShow = this.beltFlightListAll
        return '';
      },
      showArrFlightList() {
        this.arrFlightListAll=this.fillArrArray(this.arrFlightListAll,9)
        if (this.arrFlightListAll.length > 9) {
          clearInterval(this.arrTimeIndex);
          this.arrTimeIndex = setInterval(this.changeArrFlightList, 8000)
        } else {
          if (this.arrTimeIndex > 0) {
            clearInterval(this.arrTimeIndex);
            this.arrTimeIndex = 0;
          }
        }
        this.arrFlightListShow=this.arrFlightListAll
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
      changeBeltFlightList() {
        if (this.beltIndex < this.beltFlightListAll.length) {
          this.beltFlightListShow = this.beltFlightListAll.slice(this.beltIndex, this.beltIndex + 3);
          this.beltIndex += 3
        } else if (this.beltIndex >= this.beltFlightListAll.length) {
          this.beltFlightListShow = this.beltFlightListAll.slice(0, 3);
          this.beltIndex = 3
        }
      },
      changeArrFlightList() {
        if (this.arrIndex < this.arrFlightListAll.length) {
          this.arrFlightListShow = this.arrFlightListAll.slice(this.arrIndex, this.arrIndex + 9);
          this.arrIndex = this.arrIndex + 9
        } else if (this.arrIndex >= this.arrFlightListAll.length) {
          this.arrFlightListShow = this.arrFlightListAll.slice(0, 9);
          this.arrIndex = 9
        }
      },
      selectBeltFlights(val) {
        listBeltFlightsBybeltNo(val).then((res) => {
          this.beltFlightListAll = res.data
        })
      },
      selectArrFlights(val) {
        listArrFlights().then((res) => {
          this.arrFlightListAll = res.data
        })
      },
      selectBottomMsg() {
        var pageValue = 10
        if (this.beltNo==='B3') {
          pageValue = 12
        }
        const param = {pageValue: pageValue}
        getAlertMessage(param).then((res) => {
          if (this.showBottomMsg !== res.data) {
            this.showBottomMsg = res.data
          }
        })
      }
    },
    mounted () {
      if(this.$route.params && this.$route.params.beltNo){
        this.beltNo = this.$route.params.beltNo
      } else if (this.$route.query && this.$route.query.beltNo) {
        this.beltNo = this.$route.query.beltNo
      }
      this.selectBeltFlights(this.beltNo)
      this.selectArrFlights();
      this.selectBottomMsg();
      this.$store.dispatch('cancelPageTimeIndex');
      const pageTimeIndex = setInterval(() => {
        this.selectBeltFlights(this.beltNo)
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
//        depCityCn: "北京",
//        depCity: "Beijing"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "北京",
//        depCity: "Beijing"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "北京1",
//        depCity: "Beijing"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "北京2",
//        depCity: "Beijing"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "上海虹桥",
//        depCity: "Shanghai"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "上海虹桥",
//        depCity: "Shanghai"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "上海虹桥",
//        depCity: "Shanghai"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "上海虹桥",
//        depCity: "Shanghai"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "上海虹桥",
//        depCity: "Shanghai"
//      }, {
//        airline: "CZ",
//        flightNo: "8896",
//        expectTime: "1234522222000",
//        depCityCn: "上海虹桥",
//        depCity: "Shanghai"
//      }];
//      this.beltFlightListAll = [{
//        airline: "CZ",
//        flightNo: "8896",
//        scheduleTime: "1234522222000",
//        depCityCn: "呼和浩特",
//        depCity: "Huhehaote",
//        overCityCn:"阿姆斯特丹",
//        overCity:"Amux",
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
//        depCityCn: "三亚",
//        depCity: "Sanya",
//        beltNo: "B1",
//        port: "T8"
//      }]
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-half div{
    position: absolute;
    display: block;
    top: 400px;
    left: 200px;
  }
  .el-row {
    margin-bottom: 0px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-blue-yellow {
    background: #ffff00;
  }
  .grid-content {
    border-radius: 0px;
    height: 69px;
    font-size: 27px;
    color: #000000 ;
  }
  .grid-content label {
    height: 34px;
    line-height: 34px;
    font-size: 2em;
  }
  .bg-blue-dark {
    background: #2F4EC3;
  }
  .bg-orange-header {
    background: #ff9a00
  }
  .sub-content {
    border-radius: 0px;
    height: 80px;
  }
  .sub-content label {
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-weight: bolder;
    font-size: 3em;
    color: #FFFFFF ;
  }
</style>
