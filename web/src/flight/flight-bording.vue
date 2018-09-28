<!-- 到港 显示屏-->
<template>
  <div style="height: 100%">
    <el-row>
      <el-col :span="12">
        <!-- 背景色填充 -->
        <div class="bg-half"><div v-if="bordFlightList.length === 0">暂无登机航班<br/>No Bordings</div></div>
        <!-- 数据填充 -->
        <div v-if="bordFlightListAll.length >1" style="height: 100%;">
          <div v-for="item in bordFlightList">
            <bord-more-item :bordItem="item"></bord-more-item>
          </div>
        </div>
        <div v-else-if="bordFlightListAll.length === 1">
          <div v-for="item in bordFlightList">
            <bord-one :bordItem="item"></bord-one>
          </div>
        </div>
        <div v-if="bordFlightList.length === 0">&nbsp;&nbsp;</div>
      </el-col>
      <el-col :span="12">
        <!-- 背景色填充 -->
        <div style="height: 1024px;width:50%;position: absolute;background-color:black;float: left"></div>
        <!-- 数据填充 -->
        <el-row>
          <el-col :span="24"><div class="grid-content bg-blue-yellow"><label> 出&nbsp;&nbsp;发&nbsp;&nbsp;航&nbsp;&nbsp;班&nbsp;&nbsp;信&nbsp;&nbsp;息<br/>Departure Flight Infos </label></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"><div class="sub-content bg-blue-dark"></div></el-col>
          <el-col :span="6"><div class="sub-content bg-blue-dark"><label>航班号</label></div></el-col>
          <el-col :span="6"><div class="sub-content bg-blue-dark"><label>预计起飞</label></div></el-col>
          <el-col :span="5"><div class="sub-content bg-blue-dark"><label>到达城市</label></div></el-col>
          <el-col :span="5"><div class="sub-content bg-blue-dark"><label>状态</label></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"><div class="sub-content bg-blue-dark"></div></el-col>
          <el-col :span="6"><div class="sub-content bg-blue-dark"><label>Flight</label></div></el-col>
          <el-col :span="6"><div class="sub-content bg-blue-dark"><label>Estimate</label></div></el-col>
          <el-col :span="5"><div class="sub-content bg-blue-dark"><label>Destination</label></div></el-col>
          <el-col :span="5"><div class="sub-content bg-blue-dark"><label>Status</label></div></el-col>
        </el-row>
        <el-row>
          <div v-for="(item,index) in depFlightList">
            <bord-flt-item :depItem="item" :showLight="index%2 == 1" ></bord-flt-item>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <div class="bottom-bar">
      <flight-bottom :msg="showBottomMsg"></flight-bottom>
    </div>
    {{showBordFlightList }}
    {{showDepFlightList }}
  </div>
</template>
<script>
  import { listDepFlights,listBorFlights,getAlertMessage } from '../api'
  import BordFltItem from '../components/bord-flt-item.vue'
  import BordMoreItem from '../components/bord-more-item.vue'
  import BordOne from '../components/bord-one.vue'
  import FlightBottom from '../components/flight-bottom.vue'
  export default {
    name: 'hello',
    components: {
      BordMoreItem,
      BordFltItem,
      FlightBottom,
      BordOne
    },
    data () {
      return {
        depFlightList:[],
        depFlightListAll:[],
        bordFlightList: [],
        bordFlightListAll:[],
        bordIndex:0,
        bordTimeIndex:0,
        arrIndex:0,
        arrTimeIndex:0,
        showBottomMsg:""
      }
    },
    computed: {
      showBordFlightList(){
        if(this.bordFlightListAll.length >1){
          this.bordFlightListAll = this.fillBordArray(this.bordFlightListAll,2)
        }
        if(this.bordFlightListAll.length >2 ){
          clearInterval(this.bordTimeIndex);
          this.bordTimeIndex = setInterval(this.changeBordFlightList,3000)
        }else{
          if( this.bordTimeIndex >0 ){
            clearInterval(this.bordTimeIndex);
            this.bordTimeIndex = 0;
          }
          this.bordFlightList = this.bordFlightListAll
        }
        return '';
      },
      showDepFlightList(){
        this.depFlightListAll = this.fillBordArrArray(this.depFlightListAll,10)
        if(this.depFlightListAll.length >10 ){
          clearInterval(this.arrTimeIndex);
          this.arrTimeIndex = setInterval(this.changeDepFlightList,5000)
        }else{
          if( this.arrTimeIndex >0 ){
            clearInterval(this.arrTimeIndex);
            this.arrTimeIndex = 0;
          }
          this.depFlightList = this.depFlightListAll
        }
        return '';
      }
    },
    methods: {
      fillBordArray(bordFlightList, maxLength) {
        if (bordFlightList.length === 0) {
          return bordFlightList.concat(this.getBordListFiller(maxLength))
        }if (bordFlightList.length % maxLength !== 0) {
          return bordFlightList.concat(this.getBordListFiller(maxLength - bordFlightList.length % maxLength))
        }
        return bordFlightList
      },
      getBordListFiller(length) {
        const filler = []
        if (length > 0) {
          for (let i = 1; i <= length; i++) {
            filler.push({
              airline:"",
              flightNo:"",
              expectTime:"",
              destCityCn:"",
              destCity:"",
              overCityCn:"",
              overCity:"",
              gate:""
            })
          }
        }
        return filler
      },
      fillBordArrArray(bordArrFlightList, maxLength) {
        if (bordArrFlightList.length === 0) {
          return bordArrFlightList.concat(this.getBordArrListFiller(maxLength))
        }if (bordArrFlightList.length % maxLength !== 0) {
          return bordArrFlightList.concat(this.getBordArrListFiller(maxLength - bordArrFlightList.length % maxLength))
        }
        return bordArrFlightList
      },
      getBordArrListFiller(length) {
        const filler = []
        if (length > 0) {
          for (let i = 1; i <= length; i++) {
            filler.push({
              airline:"",
              flightNo:"",
              expectTime:"",
              destCityCn:"",
              status:""
            })
          }
        }
        return filler
      },
      changeBordFlightList(){
        if(this.bordIndex < this.bordFlightListAll.length){
          this.bordFlightList = this.bordFlightListAll.slice(this.bordIndex,this.bordIndex+2);
          this.bordIndex += 2
        }else if(this.bordIndex >= this.bordFlightListAll.length) {
          this.bordFlightList = this.bordFlightListAll.slice(0,2);
          this.bordIndex = 2
        }
      },
      changeDepFlightList(){
        if(this.arrIndex < this.depFlightListAll.length){
          this.depFlightList = this.depFlightListAll.slice(this.arrIndex,this.arrIndex+10);
          this.arrIndex = this.arrIndex + 10
        }else if(this.arrIndex >= this.depFlightListAll.length) {
          this.depFlightList = this.depFlightListAll.slice(0,10);
          this.arrIndex = 10
        }
      },
      selectBordFlights (val) {
        listBorFlights().then((res) => {
          this.bordFlightListAll = res.data
        })
      },
      selectArrFlights (val) {
        listDepFlights().then((res) => {
          this.depFlightListAll = res.data
        })
      },
      selectBottomMsg() {
        const param = {pageValue : 1}
        getAlertMessage(param).then((res) => {
          if(this.showBottomMsg !== res.data){
            this.showBottomMsg = res.data
          }
        })
      }
    },
    mounted () {
      this.selectBordFlights()
      this.selectArrFlights()
      this.selectBottomMsg();
      this.$store.dispatch('cancelPageTimeIndex');
      const pageTimeIndex = setInterval(() => {
        this.selectBordFlights()
        this.selectArrFlights();
        this.selectBottomMsg()
      },1000 * 30)
      this.$store.dispatch("setPageTimeIndex",pageTimeIndex)
//      this.showBottomMsg = '各位旅客请注意，由于台风"天鸽"的破坏，部分航班有所延误，敬请谅解！'
//      this.depFlightListAll =[{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京1",
//        status:"bording"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京2",
//        status:"正在起飞"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京3"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京4"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京5"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京6"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京7"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京8"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京1"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京2"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京3"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京4"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京2"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"北京2"
//      }];
//      this.bordFlightListAll = [{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"乌鲁木齐",
//        destCity:"Wulumuqi",
//        overCityCn:"呼和浩特",
//        overCity:"Huhehaote",
//        gate:"T8"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//
//        destCityCn:"北京",
//        destCity:"Beijing",
//        gate:"T8"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        expectTime:"1234522222000",
//        destCityCn:"阿姆斯特丹",
//        destCity:"Amuxxxxx",
//        gate:"T8"
//      }
//      ]
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-half{
    height: 1024px;
    width: 50%;
    position: absolute;
    background-color:#107F6F;
    float: left;
    font-weight: 900;
    font-size: 75px;
    color: white;
  }
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
    font-size: 1em;
  }
  .bg-blue-dark {
    background: #2F4EC3;
  }
  .bg-blue-wathet {
    background: #00ABFB
  }
  .sub-content {
    border-radius: 0px;
    height: 55px;
  }
  .sub-content label {
    height: 55px;
    line-height: 55px;
    text-align: center;
    font-size: 2em;
    color: #FFFFFF ;
  }

  .bottom-bar{
    font-size: 36px;
    color: #FFFFFF ;
    width: 100%;
    height: 60px;
    display: block;
    overflow: hidden;
    bottom: 0;
    position: fixed;
  }
</style>
