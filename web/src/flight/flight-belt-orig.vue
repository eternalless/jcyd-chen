<!-- 行李转盘 显示屏 已废弃-->
<template>
  <div style="height: 100%;overflow: hidden;">
    <el-row>
      <el-col :span="12">
        <el-row><el-col :span="24"><div class="grid-content right-border"  ><label>B1</label></div></el-col></el-row>
        <div v-for="item in beltFlightLeftListShow">
          <belt-item :beltItem="item"></belt-item>
        </div>
        <div class="bottom-bar">
          <flight-bottom></flight-bottom>
        </div>
      </el-col>
      <el-col :span="12">
        <el-row><el-col :span="24"><div class="grid-content" ><label>B2</label></div></el-col></el-row>
        <div v-for="item in beltFlightRightListShow">
          <belt-item :beltItem="item"></belt-item>
        </div>
      </el-col>
    </el-row>
    <div class="bottom-bar">
      <flight-bottom :msg="showBottomMsg"></flight-bottom>
    </div>
    {{showBeltFlightList}}
  </div>
</template>
<script>
  import BeltItem from '../components/belt-item.vue'
  import FlightBottom from '../components/flight-bottom.vue'
  import { listBeltFlights,getAlertMessage } from '../api'
  export default {
    components: {
      BeltItem,
      FlightBottom
    },
    data () {
      return {
        beltFlightLeftListAll: [],
        beltFlightLeftListShow: [],
        leftIndex:0,
        leftTimeIndex:0,
        beltFlightRightListAll: [],
        beltFlightRightListShow: [],
        rightIndex:0,
        rightTimeIndex:0,
        beltFlightListAll:[],
        showBottomMsg:""
      }
    },
    computed: {
      showBeltFlightList(){
        this.beltFlightLeftListAll = this.fillBeltArray(this.beltFlightListAll.filter(item => { return item.beltNo === "B1" }),3)
        this.beltFlightRightListAll = this.fillBeltArray(this.beltFlightListAll.filter(item => { return item.beltNo === "B2" }),3)
        if(this.beltFlightLeftListAll.length >3 ){
          clearInterval(this.leftTimeIndex);
          this.leftTimeIndex = setInterval(this.changeLeftList,5000)
        }else{
          if( this.leftTimeIndex >0 ){
            clearInterval(this.leftTimeIndex);
            this.leftTimeIndex = 0;
          }
          this.beltFlightLeftListShow = this.beltFlightLeftListAll
        }
        if(this.beltFlightRightListAll.length >3 ){
          clearInterval(this.rightTimeIndex);
          this.rightTimeIndex = setInterval(this.changeRightList,5000)
        }else{
          if( this.rightTimeIndex >0 ){
            clearInterval(this.rightTimeIndex);
            this.rightTimeIndex = 0;
          }
          this.beltFlightRightListShow = this.beltFlightRightListAll
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
              airline:"",
              flightNo:"",
              scheduleTime:"",
              depCityCn:"",
              depCity:"",
              overCityCn:"",
              overCity:"",
              beltNo:""
            })
          }
        }
        return filler
      },
      changeLeftList(){
        if(this.leftIndex < this.beltFlightLeftListAll.length){
          this.beltFlightLeftListShow = this.beltFlightLeftListAll.slice(this.leftIndex,this.leftIndex+3);
          this.leftIndex += 3
        }else if(this.leftIndex >= this.beltFlightLeftListAll.length) {
          this.beltFlightLeftListShow = this.beltFlightLeftListAll.slice(0,3);
          this.leftIndex = 3
        }
      },
      changeRightList(){
        if(this.rightIndex < this.beltFlightRightListAll.length){
          this.beltFlightRightListShow = this.beltFlightRightListAll.slice(this.rightIndex,this.rightIndex+3);
          this.rightIndex += 3
        }else if(this.rightIndex >= this.beltFlightRightListAll.length) {
          this.beltFlightRightListShow = this.beltFlightRightListAll.slice(0,3);
          this.rightIndex = 3
        }
      },
      selectBeltFlights (val) {
        listBeltFlights().then((res) => {
          this.beltFlightListAll = res.data
        })
      },
      selectBottomMsg() {
        const param = {pageValue : 10}
        getAlertMessage(param).then((res) => {
          if(this.showBottomMsg !== res.data){
            this.showBottomMsg = res.data
          }
        })
      }
    },
    mounted () {
      this.selectBeltFlights();
      this.selectBottomMsg();
      this.$store.dispatch('cancelPageTimeIndex');
      const pageTimeIndex = setInterval(() => {
        this.selectBeltFlights();
        this.selectBottomMsg();
      },1000 * 30)
      this.$store.dispatch("setPageTimeIndex",pageTimeIndex)
      //模拟数据
//      this.showBottomMsg = '各位旅客请注意，由于台风"天鸽"的破坏，部分航班有所延误，敬请谅解！'
//      this.beltFlightListAll = [{
//        airline:"CZ",
//        flightNo:"8896",
//        scheduleTime:"1234522272000",
//        depCityCn:"乌鲁木齐",
//        depCity:"Wulumuqi",
//        overCityCn:"呼和浩特",
//        overCity:"Huhehaote",
//        beltNo:"B1"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        scheduleTime:"1234522222000",
//        depCityCn:"北京",
//        depCity:"Beijing",
//        overCityCn:"广州",
//        overCity:"Guangzhou",
//        beltNo:"B1"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        scheduleTime:"1234522222000",
//        depCityCn:"北京",
//        overCityCn:"广州",
//        depCity:"beijing",
//        beltNo:"B1"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        scheduleTime:"1234522222000",
//        depCityCn:"北京",
//        depCity:"beijing",
//        beltNo:"B1"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        scheduleTime:"1234522222000",
//        depCityCn:"北京",
//        depCity:"beijing",
//        beltNo:"B2"
//      },{
//        airline:"CZ",
//        flightNo:"8896",
//        scheduleTime:"1234522222000",
//        depCityCn:"北京",
//        depCity:"beijing",
//        beltNo:"B2"
//      }]
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .el-row {
    margin-bottom: 0px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
 .grid-content {
   background-color: #ffff00;
   border-radius: 0px;
   min-height: 69px;
   font-size: 36px;
   color: #000000 ;
 }
 .grid-content label{
   position: absolute;
   padding-top: 15px;
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
