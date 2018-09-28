<!-- 行李转盘 显示屏-->
<template>
  <div class="bottom-bar">
    <el-row>
      <el-col :span="24">
        <div class="marquee">
          <div class="bg-blue">
            <span>{{msg}}</span>
            <span>{{msg}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
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
    font-size: 36px;
    color: #FFFFFF ;
    width: 100%;
    height: 60px;
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
    width: 200%;
    height: 90px;
    position: absolute;
    overflow: hidden;
    animation: marquee 10s linear infinite;
  }
  .marquee span {
    float: left;
    margin-top: 5px;
    width: 50%;
  }
  @keyframes marquee {
    0% { left: 0; }
    100% { left: -100%; }
  }
  .bg-blue {
    /*background: #107F6F;*/
    background: #113366;
  }
</style>
