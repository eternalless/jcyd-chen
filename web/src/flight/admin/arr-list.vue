<template>
  <div>
    <p-layout>
      <el-col :span="24" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="arrSearch" ref="patientFrom">
          <el-form-item label="计划到达时间范围" prop="timeRange">
            <el-date-picker
              v-model="arrSearch.timeRange"
              type="daterange"
              placeholder="计划到达时间范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="航班状态" prop="status">
            <el-select v-model="arrSearch.status" placeholder="请选择航班状态">
              <el-option
                v-for="item in fltStatusEnum"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行李转盘" prop="patientPhone">
            <el-select v-model="arrSearch.beltNo" placeholder="请选择行李转盘">
              <el-option
                v-for="item in beltEnum"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="selectArrFlightsList">查询</el-button>
            <el-button type="primary" v-on:click="resetSearch('patientFrom')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table
        :data="arrFlightsList"
        style="width: 100%">
        <el-table-column align="center" label="航班号">
          <template scope="scope">
            <span>
              {{scope.row.airline+scope.row.flightNo}}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="scheduleTime" label="计划到达">
          <template scope="scope">
            <span>
              {{scope.row.scheduleTime | parseTime("MM-dd HH:mm") }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="expectTime" label="预计到达">
          <template scope="scope">
            <span>
              {{scope.row.expectTime | parseTime("MM-dd HH:mm") }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="actTime" label="实际到达">
          <template scope="scope">
            <span>
              {{scope.row.actTime | parseTime("MM-dd HH:mm") }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="抵达状态">
        </el-table-column>
        <el-table-column align="center" prop="port" label="停机位">
        </el-table-column>
        <el-table-column align="center" prop="beltNo" label="行李带">
        </el-table-column>
        <el-table-column align="center" prop="displayStatus" label="屏显状态">
          <template scope="scope">
            <el-tag :type="scope.row.displayStatus | formatIsDisplayTag">{{scope.row.displayStatus  | formatDisplayStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" width="150" label="操作">
          <template scope="scope">
            <el-button v-if="!scope.row.status || scope.row.status == 'ONR' || !scope.row.displayStatus" @click="showEditForm(scope.row,true)" type="text" size="small">强制显示</el-button>
            <el-button v-if="scope.row.displayStatus===1" @click="unDisplay(scope.row)" type="text" size="small">取消显示</el-button>
          </template>
        </el-table-column>
      </el-table>
    </p-layout>
    <el-dialog title="选择行李转盘" v-model="editFormVisible">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="行李转盘：" label-width="100px" align="left">
          <el-select v-model="editForm.beltNo" placeholder="请选择行李转盘">
            <el-option
              v-for="item in belt1Enum"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDisplay()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listArrFlightsByStatus,updateDisplay} from '../../api'
  import * as util from '../../utils/util'
  import PSearch from '../../components/Search.vue'

  export default {
    name: 'SystemSet',
    components: {
      PSearch
    },
    data() {
      return {
        arrFlightsList: [],
        arrSearch: {
          timeRange: "",
          status: 22,
          beltNo: 11
        },
        fltStatusEnum: [
          {label: '所有情况', value: 22},
          {label: '值机', value: 1},
          {label: '值机截止', value: 2},
          {label: '登机', value: 3},
          {label: '已起飞', value: 4},
          {label: '快抵达', value: 10},
          {label: '已抵达', value: 11},
          {label: '已取消', value: 20},
          {label: 'NONE', value: 21}

        ],
        beltEnum: [
          {label: '所有情况', value: 11},
          {label: 'B1', value: 1},
          {label: 'B2', value: 2},
          {label: 'B3', value: 3},
          {label: '没分配', value: 10}
        ],
        belt1Enum: [
          {label: 'B1', value: 1},
          {label: 'B2', value: 2},
          {label: 'B3', value: 3}
        ],
        editFormVisible: false,
        editForm: {
          id: 0,
          isDisplay: false,
          beltNo: '',
          flightInfo: ''
        },
        editFormRules: {}
      }
    },
    methods: {
      showEditForm(row, isDisplay) {
        this.editFormVisible = true
        this.editForm = {
          id: row.id,
          isDisplay: isDisplay,
          beltNo: '',
          flightInfo: row.airline+row.flightNo
        }
      },
      handleDisplay() {
        const msg = "[ "+ this.editForm.flightInfo+" ]" + (this.editForm.isDisplay?'显示':'不显示')
        this.$confirm('确认航班' + msg + '吗?', '提示', {
          type: 'warning'
        }).then(() => {
          const param = {
            id:this.editForm.id,
            isDisplay:this.editForm.isDisplay,
            beltNo:this.editForm.beltNo
          }
          updateDisplay(param).then((res) => {
            this.$message({
              type: "success",
              message: '修改成功'
            })
            this.editFormVisible = false
            this.selectArrFlightsList()
          })
        }).catch(() => {
        });
      },
      unDisplay(row) {
        this.$confirm('确认马上取消航班' + row.airline+row.flightNo + '的显示吗?', '提示', {
          type: 'warning'
        }).then(() => {
          const param = {
            id:row.id,
            isDisplay:false,
            beltNo:0
          }
          updateDisplay(param).then((res) => {
            this.$message({
              type: "success",
              message: '修改成功'
            })
            this.editFormVisible = false
            this.selectArrFlightsList()
          })
        }).catch(() => {
        });
      },
      selectArrFlightsList() {
        if (!this.arrSearch.timeRange) {
          this.$message({
            message: '请选择查询时间范围',
            type: 'warning'
          })
          return
        }
        const param = {
          statusValue: this.arrSearch.status,
          beginScheduleTime: util.getStartTimeLong(this.arrSearch.timeRange[0]),
          endScheduleTime: util.getEndTimeLong(this.arrSearch.timeRange[1]),
          beltNoValue: this.arrSearch.beltNo
        }
        listArrFlightsByStatus(param).then((res) => {
          this.arrFlightsList = res.data
        })
      },
      //重置查询条件
      resetSearch(formName) {
        this.$refs[formName].resetFields();
        this.arrSearch.timeRange = [new Date(),new Date()];
        this.selectArrFlightsList();
      }
    },
    mounted() {
      this.arrSearch.timeRange = [new Date(), new Date()];
      this.selectArrFlightsList()
    }
  }
</script>
