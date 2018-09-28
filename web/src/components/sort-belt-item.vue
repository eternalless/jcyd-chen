<!-- 行李转盘 显示屏-->
<template>
  <div style="height: 100%">
    <!--<el-row>-->
      <!--<el-col :span="24"><div class="grid-content bg-purple-dark"><label style="margin-left: -150px">正&nbsp;&nbsp;在&nbsp;&nbsp;分&nbsp;&nbsp;拣</label></div></el-col>-->
    <!--</el-row>-->
    <el-row class=" bg-purple-more" style="width: 100%;overflow: hidden">
      <div class="top-left"><img v-if="beltItem.airline" v-bind:src="beltItem.airline | loadImageUrl"></div>
      <div class="top-right">
        <div class="large-content bg-purple-more" ><label>{{beltItem.airline}}{{beltItem.flightNo}}</label ></div>
        <div class="large-content bg-purple-more right-border-black" ><label style="margin-left: 0px">{{beltItem.port}}</label ></div>
      </div>
    </el-row>
    <el-row v-if="beltItem.depCityCn">
      <el-col :span="12"><div class="grid-content bg-purple-light" ><label v-html="showDepCityCn(beltItem)"></label></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light right-border"><label  v-html="showDepCity(beltItem)"></label></div></el-col>
    </el-row>
    <el-row v-else>
      <el-col :span="24"><div class="grid-content bg-purple-light" ><label >&nbsp;&nbsp;</label></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    beltItem: {
      required: true
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    showDepCityCn(item){
      let showCityCn = item.depCityCn;
      let length = item.depCityCn.length;
      if(item.overCityCn){
        showCityCn = showCityCn+'&nbsp;&nbsp;&nbsp;&nbsp;'+item.overCityCn
        length = length + item.overCityCn.length
      }
      if(length === 2 ){
        return showCityCn.split("").join('&nbsp;&nbsp;&nbsp;&nbsp;');
      }else if (length > 8) {
        return'<marquee scrollamount="15" style="width: 80%">' + showCityCn + '</marquee>'
      }else{
        return showCityCn;
      }
    },
    showDepCity(item){
      let showCity = item.depCity;
      let length = item.depCity.length;
      if(item.overCity){
        showCity = showCity+'&nbsp;&nbsp;&nbsp;&nbsp;'+item.overCity
        length = length + item.overCity.length
      }
      if (length > 20) {
        return'<marquee scrollamount="15" style="width: 80%">' + showCity + '</marquee>'
      }else{
        return showCity;
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
 .bg-purple-more {
   background: #19444A;
 }
 .bg-purple-dark {
   background: #016D5D;
 }
 .bg-purple {
   background: #107F6F;
 }
 .bg-purple-light {
   background: #00B7A5;
 }
 .grid-content {
   border-radius: 0px;
   height: 69px;
 }
 .grid-content label{
   height: 69px;
   line-height: 69px;
   text-align: center;
   font-size: 2em;
   color: #FFFFFF ;
 }
 .large-content {
   margin: 0 auto;
   text-align: center;
   border-radius: 0px;
   height: 135px;
 }
 .large-content label{
   height: 135px;
   line-height: 135px;
   text-align: center;
   font-size: 3em;
   color: #FFFFFF ;
 }
 .top-left{
   background-color: white;
   display: inline-block;
   overflow: hidden;
   float: left;
 }
 .top-left img{
   height: 135px;
   width: 400px;
   display: block;
 }
  .top-right{
    margin-left: 400px;
  }
 .top-right div{
   width: 49.87%;
   float: left;
 }
 .top-right div label{
   font-size: 48px;
 }
</style>
