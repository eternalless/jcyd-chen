<!-- 行李转盘 显示屏 deprecated-->
<template>
  <div style="height: 100%">
    <div style="height: 100%">
      <el-row class=" bg-purple-more" style="width: 100%;overflow: hidden">
        <div class="top-left left-border">
          <img v-if="beltItem.airline" v-bind:src="beltItem.airline | loadImageUrl">
        </div>
        <div class="top-right">
          <div class="large-content bg-purple-more" ><label>{{beltItem.airline}}{{beltItem.flightNo}}</label ></div>
          <div v-if="beltItem.scheduleTime" class="large-content bg-purple-more left-border" >
            <label>{{beltItem.scheduleTime | parseTime("HH:mm")}}</label >
          </div>
          <div   class="large-content bg-purple-more" v-else>
            <label></label >
          </div>
          <div class="bg-purple-more" ></div>
        </div>
      </el-row>
      <el-row v-if="beltItem.depCityCn">
        <el-col :span="12"><div class="grid-content bg-purple-light level-border"> <label v-html="showDepCityCn(beltItem)"></label></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light left-border"> <label v-html="showDepCity(beltItem)" ></label></div></el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="24"><div class="grid-content bg-purple-light level-border"> <label>&nbsp;&nbsp;</label></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
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
      if(!item.depCityCn){
        return ""
      }
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
      if(!item.depCity){
        return ""
      }
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
    height: 91px;
  }
 .grid-content label{
   height: 91px;
   line-height: 91px;
   text-align: center;
   color: #FFFFFF ;
   font-size: 2em;
 }
 .large-content {
    border-radius: 0px;
    height: 135px;
  }
 .large-content label{
   height: 135px;
   line-height: 135px;
   text-align: center;
   color: #FFFFFF ;
   font-size: 4em;
 }
  .top-left{
    background-color: white;
    display: inline-block;
    overflow: hidden;
    float: left;
  }
 .top-left img{
   height: 135px;
   width: 373px;
   display: block;
 }
  .top-right{
    margin-left: 374px;
  }
 .top-right .large-content{
   width: 49%;
   float: left;
 }
 .top-right .div{
   width: 100%;
   float: left;
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
