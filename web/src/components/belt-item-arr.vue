<!-- 航班动态Item 行李转盘上到达航班-->
<template>
  <div style="height: 100%">
    <el-row v-bind:class="getClass">
      <el-col :span="7"><div class="grid-content-center "><label>{{arrItem.airline}}{{arrItem.flightNo}}</label></div></el-col>
      <el-col :span="11"><div class="grid-content "><label v-html="showMarquee(arrItem.depCityCn,arrItem.depCity)"></label></div></el-col>
      <el-col :span="6"><div class="grid-content-center "><label  v-if="arrItem.expectTime">{{arrItem.expectTime | parseTime("HH:mm")}}</label></div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    arrItem: {
      type:Object,
      required: true
    },
    showLight:{
      type:Boolean
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    getClass(){
      return this.showLight ? "bg-black": "bg-blue-light"
    }
  },
  methods: {
    showMarquee(cityCn, city){
      if (!cityCn) {
        return ""
      }
      if (cityCn.length*2 + city.length >= 18) {
        return '<marquee scrollamount="5" style="width: 98%">' + cityCn + city + '</marquee>'
      } else {
        return cityCn + city
      }
    }
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
 .grid-content-center {
   border-radius: 0px;
   height: 88px;
   text-align: center;
 }
 .grid-content-center label {
   height: 88px;
   line-height: 88px;
   font-family: "Arial Black";
   font-weight: bolder;
   font-size: 2em;
   color: #FFFFFF ;
 }
  .grid-content {
    border-radius: 0px;
    height: 88px;
    text-align: left;
  }
 .grid-content label {
   height: 88px;
   line-height: 88px;
   font-family: "Arial Black";
   font-weight: bolder;
   font-size: 2em;
   color: #FFFFFF ;
 }
</style>
