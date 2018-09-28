<!-- 行李转盘 显示屏-->
<template>
  <div style="background-color: white;height: 1080px;line-height: 1080px;text-align: center">欢迎光临！！！</div>
</template>
<script>
  import {getRedirectUrl} from '../api'

  export default {
    data() {
      return {}
    },
    methods: {
      selectRedirectUrl() {
        getRedirectUrl().then((res) => {
          if (res.data && res.data.beltNo) {
            console.log(222)
            this.$router.push({name: res.data.url, params: {beltNo: res.data.beltNo}})
          } else if (res.data && res.data.url) {
            console.log(3333)
            this.$router.push({name: res.data.url, params: {beltNo: 'aaa'}})
          } else {
            this.$router.push({path: '/login'})
          }
        })
      }
    },
    created() {
    },
    mounted() {
      console.log(111)
      this.selectRedirectUrl()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
    margin-bottom: 0px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    background-color: #ffff00;
    border-radius: 0px;
    min-height: 69px;
    font-size: 36px;
    color: #000000;
  }

  .grid-content label {
    position: absolute;
    padding-top: 15px;
  }

  .bottom-bar {
    font-size: 36px;
    color: #FFFFFF;
    width: 100%;
    height: 60px;
    display: block;
    overflow: hidden;
    bottom: 0;
    position: fixed;
  }
</style>
