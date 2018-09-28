<!--行李转盘航班信息 deprecated-->
<template>
  <div style="height: 100%">
    <el-row v-bind:class="getClass">
      <el-col :span="4"><div class="grid-content "><img v-if="beltItem.airline" v-bind:src="beltItem.airline | loadImageUrl('small')" /></div></el-col>
      <el-col :span="6"><div class="grid-content "><label>{{beltItem.airline}}{{beltItem.flightNo}}</label></div></el-col>
      <el-col :span="10"><div class="grid-content "><label v-html="showMarquee(beltItem.depCityCn,beltItem.depCity)"></label></div></el-col>
      <el-col :span="4"><div class="grid-content right-border"><label  v-if="beltItem.actTime">{{beltItem.actTime | parseTime("HH:mm")}}</label></div></el-col>
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
      msg: 'Welcome to Your Vue.js App'
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
      if (cityCn.length*2 + city.length >= 14) {
        return '<marquee scrollamount="15" style="width: 100%">' + cityCn + '&nbsp;&nbsp;' + city + '</marquee>'
      } else {
        return cityCn + '&nbsp;&nbsp;' + city
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
    height: 200px;
    text-align: left;
  }
 .grid-content label {
   height: 200px;
   line-height: 200px;
   font-size: 4em;
   color: #FFFFFF ;
 }
 .grid-content img {
    margin-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    height: 180px;
    width: 180px;
    display: block;
  }
</style>
