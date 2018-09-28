<template>
  <div>
    <p-layout>
      <el-table
        :data="parameterList"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="code"
          label="CODE"
          width="300">
        </el-table-column>
        <el-table-column
          align="center"
          prop="value"
          label="值"
          width="300">
        </el-table-column>
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
          </span>
        </el-table-column>
      </el-table>
    </p-layout>
    <el-dialog title="编辑系统参数" v-model="editFormVisible">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="code：" label-width="100px" align="left">
          {{editForm.code}}
        </el-form-item>
        <el-form-item label="值： " label-width="100px" prop="value" align="left">
          <el-input v-model="editForm.value" auto-complete="off"></el-input>
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
  import {listAllParameters, updateParameter} from '../../api'
  import PSearch from '../../components/Search.vue'

  export default {
    name: 'SystemSet',
    components: {
      PSearch
    },
    data() {
      return {
        parameterList: [],
        editFormVisible: false,
        editForm: {
          id: 0,
          code: "",
          value: "",
          remark: "",
          newValue: ""
        },
        editFormRules: {
          value:[
            { required: true, message: '请输入参数值', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        this.editFormVisible = true
        this.editForm = {
          id: row.id,
          code: row.code,
          value: row.value,
          remark: row.remark
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const param = {
              parameterId: this.editForm.id,
              remark: this.editForm.remark,
              value: this.editForm.value,
              code: this.editForm.code
            }
            updateParameter(param).then(() => {
              this.$message({
                type: "success",
                message: '修改成功'
              })
              this.selectAllParameters()
              this.editFormVisible = false
            })
          }
        });
      },
      selectAllParameters() {
        listAllParameters().then((res) => {
          this.parameterList = res.data
        })
      }
    },
    mounted() {
      this.selectAllParameters()
    }
  }
</script>
