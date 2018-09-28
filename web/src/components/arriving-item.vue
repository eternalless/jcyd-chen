<!-- 航班动态Item 显示屏-->
<template>
  <div style="height: 100%">
    <el-row v-bind:class="getClass">
      <el-col :span="1"><div class="grid-content "><img v-if="arrItem.airline" v-bind:src="arrItem.airline | loadImageUrl('small')" /></div></el-col>
      <el-col :span="4"><div class="grid-content "><label>{{arrItem.airline}}{{arrItem.flightNo}}</label></div></el-col>
      <el-col :span="4">
        <div class="grid-content ">
          <label v-if="arrItem.scheduleTime">{{arrItem.scheduleTime | parseTime("HH:mm")}}</label>
          <label v-else>&nbsp;&nbsp;</label>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content ">
          <label v-if="arrItem.expectTime">{{arrItem.expectTime | parseTime("HH:mm")}}</label>
          <label v-else>&nbsp;&nbsp;</label>
        </div>
      </el-col>
      <el-col :span="7"><div class="grid-content "><label v-html="showMarquee(arrItem.depCityCn,arrItem.overCityCn)"></label></div></el-col>
      <el-col :span="4"><div class="grid-content "><label>{{arrItem.status}}</label></div></el-col>
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
    showMarquee(depCityCn, overCityCn){
      if(!depCityCn){
        return ""
      }
      let city = depCityCn + ((!overCityCn)?'':'&nbsp;' + overCityCn)
      if((depCityCn + !overCityCn?'':overCityCn).length * 2 > 16){
        return'<marquee scrollamount="5" style="width: 100%">' + city + '</marquee>'
      }else{
        return city
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
  .grid-content {
    border-radius: 0px;
    height: 83px;
  }
  .grid-content label {
    color: #FFFFFF ;
    height: 83px;
    font-weight: bolder;
    font-family: "Arial Black";
    font-size: 1em;
    line-height: 83px;
    text-align: center;
  }
  .grid-content img {
    margin-left: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    height: 78px;
    width: 78px;
    display: block;
  }
</style>
