<!-- 行李转盘 显示屏-->
<template>
  <div style="height: 100%">
    <div style="height: 100%">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"><label v-if="bordItem.airline">正&nbsp;&nbsp;在&nbsp;&nbsp;登&nbsp;&nbsp;机<br/>Bording</label></div></el-col>
      </el-row>
      <el-row class="bg-purple-more" style="width: 100%;overflow: hidden">
        <div class="top-left"><img v-if="bordItem.airline" v-bind:src="bordItem.airline | loadImageUrl"></div>
        <div class="top-right">
          <div class="large-content bg-purple-more" ><label>{{bordItem.airline}}{{bordItem.flightNo}}</label ></div>
        </div>
      </el-row>
      <el-row v-if="bordItem.destCityCn">
        <el-col :span="12"><div class="large-content bg-purple-light right-border"><label v-html="showDestCityCn(bordItem)"></label></div></el-col>
        <el-col :span="12"><div class="large-content bg-purple-light left-border"><label v-html="showDestCity(bordItem)"></label></div></el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="24"><div class="large-content bg-purple-light right-border"><label>&nbsp;</label></div></el-col>
      </el-row>
      <el-row v-if="bordItem.expectTime">
        <el-col :span="12">
          <el-row>
            <el-col :span="12">
              <div class="bord-content-double bg-purple-dark level-border"><label>预计起飞<br/>Expect</label></div>
            </el-col>
            <el-col :span="12">
              <div class="bord-content bg-purple-dark"><label>{{bordItem.expectTime | parseTime("HH:mm")}}</label></div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="12">
              <div class="bord-content-double bg-purple-dark level-border"><label>登机口<br/>Gate</label></div>
            </el-col>
            <el-col :span="12">
              <div class="bord-content bg-purple-dark"><label>{{bordItem.gate}}</label></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="24"><div class="bord-content bg-purple-dark"><label>&nbsp;&nbsp;</label></div></el-col>
      </el-row>
      <el-row v-if="bordItem.airline">
        <el-col :span="12">
          <el-row>
            <el-col :span="12">
              <div class="bord-content bg-purple-light-more"><label>登&nbsp;&nbsp;&nbsp;&nbsp;机</label></div>
            </el-col>
            <el-col :span="12">
              <div class="bord-content bg-purple-light-more"><label>Boarding</label></div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12"><div class="bord-content bg-purple-light-more"></div></el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="24">
          <div class="bord-content bg-purple-light"><label>&nbsp;&nbsp;&nbsp;&nbsp;</label></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple bottom-border"></div></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bordItem: {
      required: true
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    showDestCityCn(item){
      if(!item.destCityCn){
        return ""
      }
      let showCityCn = item.destCityCn;
      let length = item.destCityCn.length;
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
    showDestCity(item){
      if(!item.destCity){
        return ""
      }
      let showCity = item.destCity;
      let length = item.destCity.length;
      if(item.overCity){
        showCity = showCity+'&nbsp;&nbsp;&nbsp;&nbsp;'+item.overCity
        length = length + item.overCity.length
      }
      if (length > 15) {
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
  .bg-purple-light-more {
    background: #00AF4A;
  }
  .grid-content {
    border-radius: 0px;
    min-height: 69px;
  }
 .grid-content label {
   height: 34px;
   line-height: 34px;
   text-align: center;
   font-size: 2em;
   color: #FFFFFF ;
 }
 .bord-content-double {
   border-radius: 0px;
   height: 72px;

 }
 .bord-content-double label{
   height: 36px ;
   line-height: 36px;
   text-align: center;
   font-size: 2em;
   color: #FFFFFF ;
 }
  .bord-content {
    border-radius: 0px;
    height: 72px;

  }
 .bord-content label{
    height: 72px ;
   line-height: 72px;
   text-align: center;
   font-size: 2em;
   color: #FFFFFF ;
 }
 .large-content {
    border-radius: 0px;
    height: 120px;

  }
 .large-content label {
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 3em;
    color: #FFFFFF ;
 }
  .top-left{
    display: inline-block;
    background-color: white;
    overflow: hidden;
    float: left;
  }
 .top-left img{
   height: 120px;
   width: 480px;
   display: block;
 }
  .top-right{
    margin-left: 480px;
  }
 .top-right div{
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
