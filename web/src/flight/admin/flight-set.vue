<template>
  <div>
    <p-layout>
      <el-col :span="24" style="padding-bottom: 0px;">
        <el-form :inline="true" ref="addFrom">
          <el-form-item>
            <el-button type="primary" v-on:click="handleAdd()">新增航班信息</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table
        :data="flightInfoList"
        style="width: 100%">
        <el-table-column
          align="center"
          label="序号"
          inline-template
          width="100">
          <span>{{$index+1}}</span>
        </el-table-column>
        <el-table-column
          align="center"
          prop="airline"
          label="航司编码"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="flightNo"
          label="航班号"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="flag"
          label="国内国际"
          width="200">
          <template scope="scope">
            <span>
              {{flagEnum[scope.row.flag]}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="备注说明">
        </el-table-column>
        <el-table-column
          align="center"
          inline-template
          :context="_self"
          fixed="right"
          width="150"
          label="操作">
          <span>
            <el-button @click="handleEdit($index, row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDelete(row)" type="text" size="small">删除</el-button>
          </span>
        </el-table-column>
      </el-table>
    </p-layout>
    <el-dialog title="编辑航班信息" v-model="editFormVisible">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="航班信息：" label-width="100px" align="left">
          {{editForm.airline + editForm.flightNo}}
        </el-form-item>
        <el-form-item label="航班类型： " label-width="100px"  prop="flag"  align="left">
          <el-select v-model.number="editForm.flag" placeholder="请选择">
            <el-option
              v-for="item in flagSelectEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" label-width="100px" align="left">
          <el-input v-model="editForm.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增航班信息" v-model="addFormVisible">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm">
        <el-form-item label="航司编码：" label-width="100px" prop="airline" align="left">
          <el-input v-model="addForm.airline" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="航班号：" label-width="100px" prop="flightNo" align="left">
          <el-input v-model="addForm.flightNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="航班类型： " label-width="100px" prop="flag"  align="left">
          <el-select v-model="addForm.flag" placeholder="请选择">
            <el-option
              v-for="item in flagSelectEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" label-width="100px" align="left">
          <el-input v-model="addForm.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listAllFlightInfos, updateFlightInfo, deleteFlightInfo, addFlightInfo} from '../../api'
  import PSearch from '../../components/Search.vue'

  export default {
    name: 'FlighSet',
    components: {
      PSearch
    },
    data() {
      return {
        flightInfoList: [],
        editFormVisible: false,
        addFormVisible: false,
        editForm: {
          id: 0,
          airline: "",
          flightNo: "",
          flag: "",
          remark: ""
        },
        editFormRules: {
          flag:[
            { required: true, type: 'number', message: '航班类型', trigger: 'blur' }
          ]
        },
        addForm: {
          airline: "",
          flightNo: "",
          flag: "",
          remark: ""
        },
        addFormRules: {
          airline:[
            { required: true, message: '请输入航司编码', trigger: 'blur' }
          ],
          flightNo:[
            { required: true, message: '请输入航班号', trigger: 'blur' }
          ],
          flag:[
            { required: true, type: 'number', message: '航班类型', trigger: 'blur' }
          ]
        },
        flagEnum:{
          0:"国内",
          1:"国际"
        },
        flagSelectEnum:[
          {value:0,label:"国内"},
          {value:1,label:"国际"}
        ]
      }
    },
    methods: {
      handleEdit(index, row) {
        this.editFormVisible = true
        this.editForm = {
          id: row.id,
          airline: row.airline,
          flightNo: row.flightNo,
          flag: row.flag,
          remark: row.remark
        }
      },
      handleAdd() {
        this.addForm = {
          airline: "",
          flightNo: "",
          flag: "",
          remark: ""
        }
        this.addFormVisible = true
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(formName==='addForm') {
              const flightInfo = {
                remark: this.addForm.remark,
                airline: this.addForm.airline,
                flightNo: this.addForm.flightNo,
                flag: this.addForm.flag
              }
              addFlightInfo(flightInfo).then(() => {
                this.$message({
                  type: "success",
                  message: '保存成功'
                })
                this.selectAllFlightInfos()
                this.addFormVisible = false
              })
            } else {
              const flightInfo = {
                id: this.editForm.id,
                remark: this.editForm.remark,
                airline: this.editForm.airline,
                flightNo: this.editForm.flightNo,
                flag: this.editForm.flag
              }
              updateFlightInfo(flightInfo).then(() => {
                this.$message({
                  type: "success",
                  message: '修改成功'
                })
                this.selectAllFlightInfos()
                this.editFormVisible = false
              })
            }
          }
        });
      },
      handleDelete(row) {
        this.$confirm('确认删除该航班[' + row.airline + row.flightNo + ']吗?', '提示', {
          type: 'warning'
        }).then(() => {
          deleteFlightInfo(row.id).then(() => {
            this.$message({
              type: "success",
              message: '删除成功'
            })
            this.selectAllFlightInfos()
          })
        })
      },
      selectAllFlightInfos() {
        listAllFlightInfos().then((res) => {
          this.flightInfoList = res.data
        })
      }
    },
    mounted() {
      this.selectAllFlightInfos()
    }
  }
</script>
