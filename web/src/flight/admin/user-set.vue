<template>
  <div>
    <p-layout>
      <el-col :span="24" style="padding-bottom: 0px;">
        <el-form :inline="true" ref="addFrom">
          <el-form-item>
            <el-button type="primary" v-on:click="handleAdd()">新增用户</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table
        :data="userList"
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
          prop="name"
          label="名字"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="account"
          label="工号"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态"
          width="100">
          <template scope="scope">
            <span>
              {{statusEnum[scope.row.status]}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          align="center"
          inline-template
          :context="_self"
          fixed="right"
          width="250"
          label="操作">
          <span>
            <el-button @click="handleEdit($index, row)" type="text" size="small">编辑</el-button>
            <el-button v-if="row.status===1" @click="updateStatus(row,false)" type="text" size="small">禁用</el-button>
            <el-button v-if="row.status===0" @click="updateStatus(row,true)" type="text" size="small">启用</el-button>
            <el-button @click="handleDelete(row)" type="text" size="small">删除</el-button>
            <el-button @click="handleReset(row)" type="text" size="small">重置密码</el-button>
          </span>
        </el-table-column>
      </el-table>
    </p-layout>
    <el-dialog title="编辑用户信息" v-model="editFormVisible">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="工号：" label-width="100px" prop="account" align="left">
          <el-input v-model="editForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名： " label-width="100px" prop="name"  align="left">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
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
    <el-dialog title="新增用户" v-model="addFormVisible">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm">
        <el-form-item label="工号：" label-width="100px" prop="account" align="left">
          <el-input v-model="addForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" label-width="100px" prop="name" align="left">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码： " label-width="100px" prop="password" align="left">
          <el-input type="password" v-model="addForm.password" auto-complete="off"></el-input>
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
    <el-dialog title="重置密码" v-model="dialogResetPWVisible">
      <el-form ref="resetPWForm" :model="resetPWForm" :rules="resetPWFormRule" label-width="120px">
        <el-form-item label="新密码" prop="password">
          <el-col :span="13">
            <el-input type="password" v-model="resetPWForm.password"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('resetPWForm')">保 存</el-button>
        <el-button type="warning" @click="dialogResetPWVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listAllUsers, updateUser, updateUserStatus, addUser, resetPassword, deleteUser} from '../../api'
  import PSearch from '../../components/Search.vue'
  import md5 from 'md5'

  export default {
    name: 'UserSet',
    components: {
      PSearch
    },
    data() {
      return {
        userList: [],
        editFormVisible: false,
        addFormVisible: false,
        editForm: {
          id: 0,
          name: "",
          account: "",
          remark: ""
        },
        editFormRules: {
          name:[
            { required: true, message: '请输入名字', trigger: 'blur' }
          ],
          account:[
            { required: true, message: '请输入工号', trigger: 'blur' }
          ]
        },
        addForm: {
          name: "",
          account: "",
          password: "",
          remark: ""
        },
        addFormRules: {
          name:[
            { required: true, message: '请输入名字', trigger: 'blur' }
          ],
          account:[
            { required: true, message: '请输入工号', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        statusEnum:{
          "0":"无效",
          "1":"有效"
        },
        statusSelectEnum:[
          {value:"0",label:"无效"},
          {value:"1",label:"有效"}
        ],
        dialogResetPWVisible: false,
        resetPWForm: {
          password: '',
          id:0
        },
        resetPWFormRule: {
          password: [
            {required: true, message: '请输新密码', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        this.editFormVisible = true
        this.editForm = {
          id: row.id,
          account: row.account,
          name: row.name,
          remark: row.remark
        }
      },
      handleReset(row) {
        this.dialogResetPWVisible = true
        this.resetPWForm = {
          id: row.id,
          password: ''
        }
      },
      handleAdd() {
        this.addForm = {
          account: "",
          name: "",
          password: "",
          remark: ""
        }
        this.addFormVisible = true
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(formName==='addForm') {
              const userInfo = {
                remark: this.addForm.remark,
                account: this.addForm.account,
                name: this.addForm.name,
                password: this.addForm.password
              }
              addUser(userInfo).then(() => {
                this.$message({
                  type: "success",
                  message: '保存成功'
                })
                this.selectAllUsers()
                this.addFormVisible = false
              })
            } else if (formName==='editForm') {
              const userInfo = {
                id: this.editForm.id,
                remark: this.editForm.remark,
                name: this.editForm.name,
                account: this.editForm.account
              }
              updateUser(userInfo).then(() => {
                this.$message({
                  type: "success",
                  message: '修改成功'
                })
                this.selectAllUsers()
                this.editFormVisible = false
              })
            } else {
              const userInfo = {
                id: this.resetPWForm.id,
                password: md5(this.resetPWForm.password)
              }
              resetPassword(userInfo).then(() => {
                this.$message({
                  type: "success",
                  message: '修改成功'
                })
                this.selectAllUsers()
                this.dialogResetPWVisible = false
              })
            }
          }
        })
      },
      updateStatus(row, status) {
        const action = status?'启用':'禁用'
        this.$confirm('确认' + action + '该用户[' + row.name + ']吗?', '提示', {
          type: 'warning'
        }).then(() => {
          const param = {id:row.id,status:status}
          updateUserStatus(param).then(() => {
            this.$message({
              type: "success",
              message: action + '成功'
            })
            this.selectAllUsers()
          })
        })
      },
      handleDelete(row) {
        this.$confirm('确认删除该用户[' + row.name + ']吗?', '提示', {
          type: 'warning'
        }).then(() => {
          deleteUser(row.id).then(() => {
            this.$message({
              type: "success",
              message: '删除成功'
            })
            this.selectAllUsers()
          })
        })
      },
      selectAllUsers() {
        listAllUsers().then((res) => {
          this.userList = res.data
        })
      }
    },
    mounted() {
      this.selectAllUsers()
    }
  }
</script>
