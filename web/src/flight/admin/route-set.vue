<template>
  <div>
    <p-layout>
      <el-col :span="24" style="padding-bottom: 0px;">
        <el-form :inline="true" ref="addFrom">
          <el-form-item>
            <el-button type="primary" v-on:click="handleAdd()">新增屏显信息</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table
        :data="routeList"
        style="width: 100%">
        <el-table-column
          align="center"
          inline-template
          label="序号"
          width="100">
          <span>{{$index+1}}</span>
        </el-table-column>
        <el-table-column
          align="center"
          prop="clientIp"
          label="客户端Ip"
          width="300">
        </el-table-column>
        <el-table-column align="center"  prop="page" label="显示屏"  width="400" >
          <template scope="scope">
            <span>
              {{pageEnum[scope.row.page]}}
            </span>
          </template>
        </el-table-column>
        <!--<el-table-column align="center"  prop="status" label="状态"  width="100" >-->
          <!--<template scope="scope">-->
            <!--<el-tag :type="scope.row.status | formatStatusTag">{{scope.row.status | formatStatus }}</el-tag>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          align="center"
          prop="remark"
          label="参数说明">
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
            <el-button @click="handleDelete(row.id)" type="text" size="small">删除</el-button>
          </span>
        </el-table-column>
      </el-table>
    </p-layout>
    <el-dialog title="新增屏显" v-model="addFormVisible">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm">
        <el-form-item label="显示屏： " label-width="100px"  prop="page"  align="left">
          <el-select v-model="addForm.page" placeholder="请选择显示屏">
            <el-option
              v-for="item in pageSelectEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户端IP：" label-width="100px" prop="clientIp" align="left">
          <el-input v-model="addForm.clientIp" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数说明：" label-width="100px" align="left">
          <el-input v-model="addForm.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
      <el-dialog title="屏显编辑" v-model="editFormVisible">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="显示屏： " label-width="100px"  prop="page"  align="left">
          <el-select v-model="editForm.page" placeholder="请选择显示屏">
            <el-option
              v-for="item in pageSelectEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户端IP：" label-width="100px" prop="clientIp" align="left">
          <el-input v-model="editForm.clientIp" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数说明：" label-width="100px" align="left">
          <el-input v-model="editForm.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listAllRoutes, updateRoute, deleteRouteInfo, addRouteInfo} from '../../api'
  import PSearch from '../../components/Search.vue'

  export default {
    name: 'SystemSet',
    components: {
      PSearch
    },
    data() {
      return {
        routeList: [],
        editFormVisible: false,
        addFormVisible: false,
        editForm: {
          id: 0,
          clientIp: "",
          page: "",
          remark: ""
        },
        editFormRules: {
          clientIp:[
            { required: true, message: '请输入客户端IP', trigger: 'blur' }
          ],
          page:[
            { required: true, message: '请选择显示屏', trigger: 'blur' }
          ]
        },
        addForm: {
          clientIp: "",
          page: "",
          remark: ""
        },
        addFormRules: {
          clientIp:[
            { required: true, message: '请输入客户端IP', trigger: 'blur' }
          ],
          page:[
            { required: true, message: '请选择显示屏', trigger: 'blur' }
          ]
        },
        pageEnum:{
          "1":"登机屏显",
          "2":"分拣处屏显",
          "10":"行李转盘B1",
          "11":"行李转盘B2",
          "12":"行李转盘B3",
          "20":"并排行李转盘"
        },
        pageSelectEnum:[
          {value:"1",label:"登机屏显"},
          {value:"2",label:"分拣处屏显"},
          {value:"10",label:"行李转盘B1"},
          {value:"11",label:"行李转盘B2"},
          {value:"12",label:"行李转盘B3"},
          {value:"20",label:"并排行李转盘"}
        ]
      }
    },
    methods: {
      handleEdit(index, row) {
        this.editFormVisible = true
        this.editForm = {
          id: row.id,
          clientIp: row.clientIp,
          page: row.page,
          remark: row.remark
        }
      },
      handleAdd(row) {
        this.addFormVisible = true
        this.addForm = {
          clientIp: row.clientIp,
          page: row.page,
          remark: row.remark
        }
      },
      handleDelete(id) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          deleteRouteInfo(id).then(() => {
            this.$message({
              type: "success",
              message: '删除成功'
            })
            this.selectAllRoutes()
          })
        })
      },
      submitForm(formName) {
        if (formName==="addForm") {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              const param = {
                clientIp: this.addForm.clientIp,
                page: this.addForm.page,
                remark: this.addForm.remark
              }
              addRouteInfo(param).then(() => {
                this.$message({
                  type: "success",
                  message: '保存成功'
                })
                this.selectAllRoutes()
                this.addFormVisible = false
              })
            }
          })
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              const param = {
                routeId: this.editForm.id,
                clientIp: this.editForm.clientIp,
                page: this.editForm.page,
                remark: this.editForm.remark
              }
              updateRoute(param).then(() => {
                this.$message({
                  type: "success",
                  message: '修改成功'
                })
                this.selectAllRoutes()
                this.editFormVisible = false
              })
            }
          })
        }
      },
      selectAllRoutes() {
        listAllRoutes().then((res) => {
          this.routeList = res.data
        })
      }
    },
    mounted() {
      this.selectAllRoutes()
    }
  }
</script>
