<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="edit-form">
        <el-form ref="userForm" :model="addEmployForm" label-width="220px" :rules="addEmployRules">
          <!-- 姓名 部门 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="addEmployForm.username" size="mini" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 工号 入职时间 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="工号" prop="workNumber">
                <el-input :disabled="true" size="mini" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机 聘用形式  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机" prop="mobile">
                <el-input
                  v-model="addEmployForm.mobile"
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="departmentId">
                <!-- 放置及联部门组件 -->
                <!-- 使用自定义属性将父组件传递给子组件 -->
                <Cascader :department-id="addEmployForm.departmentId" @input="getNewDepartmentId" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="addEmployForm.formOfEmployment" placeholder="请选择聘用形式" size="mini" class="inputW">
                  <el-option
                    v-for="item in options"
                    :key="item.formOfEmployment"
                    :label="item.label"
                    :value="item.formOfEmployment"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker
                  v-model="addEmployForm.timeOfEntry"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker
                  v-model="addEmployForm.correctionTime"
                  size="mini"
                  type="date"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 员工照片 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工头像">
                <!-- 放置上传图片 -->
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 保存个人信息 -->
          <el-row type="flex">
            <el-col :span="12" style="margin-left:220px">
              <el-button size="mini" type="primary" @click="saveInfo">保存</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { addEmploy, getUserInfo, updateUserInfo } from '@/api/employ'
import { TranListToTree } from '@/utils/index'

export default {
  name: 'Detail',
  data() {
    return {
      addEmployForm: {
        username: '',
        mobile: '',
        formOfEmployment: null,
        workNumber: '',
        departmentId: null,
        timeOfEntry: '',
        correctionTime: '',
        staffPhoto: ''
      },
      // 表单验证规则
      addEmployRules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          {
            min: 2, max: 6,
            message: '请输入2-6长度的用户名',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入格式正确的手机号', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '请选择聘用形式', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请输入员工部门', trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择用户入职时间', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '请选择用户转正时间', trigger: 'blur' }
        ]
      },
      // 聘用形式
      options: [
        {
          label: '正式',
          formOfEmployment: 1
        },
        {
          label: '非正式',
          formOfEmployment: 2
        }
      ]
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取员工信息
    async getUserInfo() {
      if (this.$route.params.id) {
        this.addEmployForm = await getUserInfo(this.$route.params.id)
      }
    },
    // 当联动组件变化
    handleChange() {
      TranListToTree()
    },
    // 拿到新的子组件的 getNewDepartmentId
    getNewDepartmentId(newId) {
      this.addEmployForm.departmentId = newId
    },
    // 保存员工信息
    saveInfo() {
      // 修改员工
      if (this.$route.params.id != null) {
        // 表单验证
        this.$refs.userForm.validate(async(isok) => {
          if (isok) {
          // 通过验证发请求
            const res = await updateUserInfo(this.addEmployForm)
            // 提示添加员工成功
            if (res.id) {
              this.$message.success('修改成功')
            }
            // 重置表单
            this.$refs.userForm.resetFields()
            // 返回员工页面
            this.$router.push('/employee')
          }
        })
      } else {
        // 新增员工
        this.$refs.userForm.validate(async(isok) => {
          if (isok) {
          // 通过验证发请求
            const res = await addEmploy(this.addEmployForm)
            // 提示添加员工成功
            if (res.id) {
              this.$message.success('成功')
            }
            // 重置表单
            this.$refs.userForm.resetFields()
            // 返回员工页面
            this.$router.push('/employee')
          }
        })
      }
    }

  }
}
</script>

<style scoped lang="scss">
    .edit-form {
      background: #fff;
      padding: 20px;
      .inputW {
        width: 380px
      }
    }

</style>
