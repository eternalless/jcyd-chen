<!-- 航班动态Item 显示屏-->
<template>
  <div style="height: 100%">
    <el-row v-bind:class="getClass">
      <el-col :span="2"><div class="grid-content "><img v-if="depItem.airline" v-bind:src="depItem.airline | loadImageUrl('small')" /></div></el-col>
      <el-col :span="6"><div class="grid-content "><label>{{depItem.airline}}{{depItem.flightNo}}</label></div></el-col>
      <el-col :span="6"><div class="grid-content "><label  v-if="depItem.expectTime">{{depItem.expectTime | parseTime("HH:mm")}}</label></div></el-col>
      <el-col :span="5"><div class="grid-content "><label>{{depItem.destCityCn}}</label></div></el-col>
      <el-col :span="5"><div class="grid-content "><label v-html="showMarquee(depItem.status)"></label></div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    depItem: {
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
      return this.showLight ? "bg-blue-light": "bg-blue";
    }
  },
  methods: {
    showMarquee(status){
      if (!status) {
        return ""
      }
      if (status.length > 4) {
        return '<marquee scrollamount="5" style="width: 90%">' + status + '</marquee>'
      } else {
        return status
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
 .bg-blue {
   background: #225599;
 }
 .bg-blue-light {
   background: #113366;
 }
  .grid-content {
    border-radius: 0px;
    height: 84px;
  }
 .grid-content label {
   height: 84px;
   line-height: 84px;
   text-align: center;
   font-size: 2em;
   color: #FFFFFF ;
 }
 .grid-content img {
    margin-left: 10px;
    padding-top: 2px;
    padding-bottom: 1px;
    height: 80px;
    width: 80px;
    display: block;
  }
</style>
