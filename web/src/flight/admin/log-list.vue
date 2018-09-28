<template>
  <div>
    <p-layout>
      <el-col :span="24" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="logSearch" ref="patientFrom">
          <el-form-item label="开始时间" prop="timeRange">
            <el-date-picker
              v-model="logSearch.timeRange"
              type="daterange"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作人工号">
            <el-input v-model="logSearch.opAccount" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="操作表">
            <el-select v-model="logSearch.opTable" placeholder="请选择操作表">
              <el-option
                v-for="item in tableEnum"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="selectLogList">查询</el-button>
            <el-button type="primary" v-on:click="resetSearch('patientFrom')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table
        :data="logList"
        style="width: 100%">
        <el-table-column align="center" width="100" prop="flightInfo" label="航班">
        </el-table-column>
        <el-table-column align="center" width="200"  prop="opTable" label="表">
        </el-table-column>
        <el-table-column align="center" width="80"  prop="flag" label="类型">
          <template scope="scope">
            <el-tag :type="scope.row.flag | formatIsDisplayTag">{{scope.row.flag  | formatOpFlag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="desc" label="内容">
        </el-table-column>
        <el-table-column align="center" width="100"  prop="opName" label="姓名">
        </el-table-column>
        <el-table-column align="center" width="100"  prop="opAccount" label="工号">
        </el-table-column>
        <el-table-column align="center" width="100"  prop="entityId" label="记录Id">
        </el-table-column>
        <el-table-column align="center" width="150"  prop="opTime" label="操作时间">
          <template scope="scope">
            <span>
              {{scope.row.opTime | parseTime("MM-dd HH:mm") }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </p-layout>
  </div>
</template>

<script>
  import {listAllLogs} from '../../api'
  import * as util from '../../utils/util'
  import PSearch from '../../components/Search.vue'

  export default {
    name: 'LogList',
    components: {
      PSearch
    },
    data() {
      return {
        logList: [],
        logSearch: {
          timeRange: "",
          opAccount: '',
          opTable: ''
        },
        tableEnum:[
          {value:"t_user",label:"用户信息表"},
          {value:"t_arr_flight_info",label:"到达航班表"},
          {value:"t_dep_flight_info",label:"出发航班表"},
          {value:"t_flight_info",label:"航班信息维护表"},
          {value:"t_parameter",label:"系统参数表"},
          {value:"t_route_info",label:"屏显路由表"}
        ]
      }
    },
    methods: {
      selectLogList() {
        if (!this.logSearch.timeRange) {
          this.$message({
            message: '请选择查询时间范围',
            type: 'warning'
          })
          return
        }
        const param = {
          opAccount: this.logSearch.opAccount,
          beginTime: util.getStartTimeLong(this.logSearch.timeRange[0]),
          endTime: util.getEndTimeLong(this.logSearch.timeRange[1]),
          opTable: this.logSearch.opTable
        }
        listAllLogs(param).then((res) => {
          this.logList = res.data
        })
      },
      //重置查询条件
      resetSearch(formName) {
        this.$refs[formName].resetFields();
        this.logSearch.timeRange = [new Date(),new Date()];
        this.logSearch.opTable = ""
        this.selectLogList();
      }
    },
    mounted() {
      this.logSearch.timeRange = [new Date(), new Date()];
      this.selectLogList()
    }
  }
</script>
