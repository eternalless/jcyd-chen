<!-- 候机厅 单屏-->
<template>
  <div style="height: 100%">
    <div style="height: 2000px;width: 50%;position: absolute;background-color:darkblue;float: left"></div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-blue"><label>正&nbsp;&nbsp;在&nbsp;&nbsp;登&nbsp;&nbsp;机<br/>Bording</label></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="bg-white ml20 mr20"><img v-bind:src="bordItem.airline | loadImageUrl"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="bord-content bg-blue-dark"><label>{{bordItem.airline}}{{bordItem.flightNo}}</label></div>
      </el-col>
      <el-col :span="12">
        <div class="bord-content bg-blue-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="bord-content bg-blue-dark right-border-2"><label
          v-html="showDestCityCn(bordItem.destCityCn)"></label></div>
      </el-col>
      <el-col :span="12">
        <div class="bord-content bg-blue-dark left-border-1">
          <label v-html="showDestCity(bordItem.destCity)"></label>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="bord-expect-content bg-blue-dark"><label>预计起飞<br/>Expect</label></div>
      </el-col>
      <el-col :span="12">
        <div class="bord-small-content bg-blue-dark"><label>{{bordItem.expectTime | parseTime("HH:mm")}}</label></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="bord-expect-content bg-blue-dark mt25 mb25"><label>登机口<br/>Gate</label></div>
      </el-col>
      <el-col :span="12">
        <div class="bord-small-content bg-blue-dark mt20 mb25"><label>{{bordItem.gate}}</label></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple-light-more ml25"><label>登机</label></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light-more mr25"><label>Boarding</label></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    props: {
      bordItem: {
        required: true
      }
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      showDestCityCn(destCityCn) {
        if (destCityCn.length === 2) {
          return destCityCn.split("").join('&nbsp;&nbsp;&nbsp;&nbsp;');
        } else if (destCityCn.length > 5) {
          return '<marquee scrollamount="5"  style="width: 80%">' + destCityCn + '</marquee>'
        } else {
          return destCityCn;
        }
      },
      showDestCity(destCity) {
        if (destCity.length > 10) {
          return '<marquee style="width: 80%">' + destCity + '</marquee>'
        } else {
          return destCity;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-purple-light-more {
    background: #00AF4A;
  }

  .grid-content {
    border-radius: 0px;
    height: 70px;
  }

  .grid-content label {
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 2em;
    font-weight: 600;
    color: #FFFFFF;
  }

  .bord-content {
    border-radius: 0px;
    height: 180px;
  }

  .bord-content label {
    height: 180px;
    line-height: 180px;
    font-size: 5em;
    font-weight: 800;
    color: #FFFFFF;
  }
  .bord-expect-content {
    border-radius: 0px;
    height: 145px;
  }

  .bord-expect-content label {
    height: 72px;
    line-height: 72px;
    text-align: center;
    font-size: 2em;
    font-weight: 600;
    color: #FFFFFF;
  }
  .bord-small-content {
    border-radius: 0px;
    height: 145px;
  }

  .bord-small-content label {
    height: 145px;
    line-height: 145px;
    text-align: center;
    font-size: 3em;
    font-weight: 600;
    color: #FFFFFF;
  }
</style>
