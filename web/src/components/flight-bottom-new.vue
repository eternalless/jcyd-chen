<!-- 行李转盘 显示屏-->
<template>
  <div class="bottom-bar">
    <!--<el-row>-->
      <!--<el-col :span="24">-->
        <!--<div class="marquee">-->
          <!--<div class="bg-blue">-->
            <!--<span>{{msg}}</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <marquee class="bg-blue marquee" behavior="scroll" contenteditable="true" scrollamount="20">{{msg}}</marquee>
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      type:String
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bottom-bar{
    font-size: 72px;
    font-weight: bolder;
    font-family: "Arial Black";
    color: #FFFFFF ;
    width: 100%;
    height: 128px;
    display: block;
    overflow: hidden;
    bottom: 0;
    position: fixed;
  }
  .marquee {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .marquee div {
    display: block;
    width: 100%;
    height: 128px;
    position: absolute;
    overflow: hidden;
    animation: marquee 10s linear infinite;
  }
  .marquee span {
    float: left;
    margin-top: 30px;
    width: 100%;
  }
  @keyframes marquee {
    0% { left: 0; }
    100% { left: -100%; }
  }
  .bg-blue {
    /*background: #107F6F;*/
    background: #000000;
  }
</style>
