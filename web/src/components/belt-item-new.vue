<!--行李转盘航班信息-->
<template>
  <div style="height: 100%">
    <el-row v-bind:class="getClass">
      <el-col :span="4"><div class="grid-content "><img v-if="beltItem.airline" v-bind:src="beltItem.airline | loadImageUrl('small')" /></div></el-col>
      <el-col :span="6"><div class="grid-content "><label>{{beltItem.airline}}{{beltItem.flightNo}}</label></div></el-col>
      <el-col :span="10">
        <div class="grid-content ">
          <div v-if="beltItem.overCity">
            <span class="fix-div"><span>&nbsp;&nbsp;</span> </span>
            <span class="top-div"><span v-html="showMarquee(beltItem.depCityCn,beltItem.depCity)"></span> </span>
            <span class="bottom-div"><span v-html="showMarquee(beltItem.overCityCn,beltItem.overCity)"></span></span>
          </div>

          <div v-if="!beltItem.overCity">
            <span class="fix-div"><span>&nbsp;&nbsp;</span> </span>
            <span class="top-div"><span v-html="showMarquee(beltItem.depCityCn,'')"></span> </span>
            <span class="bottom-div"><span v-html="showMarquee(beltItem.depCity,'')"></span></span>
          </div>


          <!--<label v-else v-html="showMarquee(beltItem.depCityCn,beltItem.depCity)"></label>-->
        </div>
      </el-col>
      <el-col :span="4"><div class="grid-content right-border-2"><label  v-if="beltItem.actTime">{{beltItem.actTime | parseTime("HH:mm")}}</label></div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    beltItem: {
      type:Object,
      required: true
    },
    showLight:{
      type:Boolean
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      maxCityLength: 0
    }
  },
  computed: {
    getClass(){
      return this.showLight ? "bg-black": "bg-blue-light";
    }
  },
  methods: {
    showMarquee(cityCn,city){
      if (!cityCn) {
        return ""
      }
      var cityStr = cityCn + city
      let cityLength = this.strlen(cityStr)
      if (cityLength >= 12) {
        if (cityLength < this.maxCityLength) { // 补齐空格
          let diffLength = this.maxCityLength - cityLength
          for (var i = 0; i < diffLength; i++) {
            cityStr += '&nbsp;'
          }
        }
        return '<marquee scrollamount="15" style="width: 100%">' + cityStr + '</marquee>'
      } else {
        return cityStr
      }
    },
    strlen(str) {
      var len = 0
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i)
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
          len++
        } else {
          len += 2
        }
      }
      return len
    }
  },
  created: function () {
    let depCityLength = this.strlen(this.beltItem.depCityCn + this.beltItem.depCity)
    let overCityLength = this.strlen(this.beltItem.overCityCn + this.beltItem.overCity)

    this.maxCityLength = depCityLength > overCityLength ? depCityLength : overCityLength
    console.log('maxLength' + this.maxCityLength)
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
 .bg-black {
   background: #000000;
 }
 .bg-blue-light {
   background: #113366;
 }
  .grid-content {
    border-radius: 0px;
    height: 264px;
    text-align: left;
  }
  .grid-content label{
    line-height: 264px;
    font-weight: bolder;
    font-family: "Arial Black";
    font-size: 5em;
    color: #FFFFFF ;
  }
 .grid-content div {
   line-height: 264px;
   font-weight: bolder;
   font-family: "Arial Black";
   font-size: 4em;
   color: #FFFFFF ;
 }
 .fix-div{
   display: block;
   line-height: 40px;
 }
 .top-div{
   display: block;
   line-height: 80px;
 }
 .bottom-div{
   display: block;
   line-height: 80px;
 }
 .grid-content img {
    margin-left: 8px;
    padding-top: 38px;
    padding-bottom: 38px;
    height: 190px;
    width: 190px;
    display: block;
  }
</style>
