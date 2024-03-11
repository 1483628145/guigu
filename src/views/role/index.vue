<template>
  <div>
    <div class="container">
      <div class="app-container">
        <el-button size="mini" type="primary" class="addrole-but" @click="showDiglog = true">
          添加角色
        </el-button>
        <!-- 添加角色按钮--dialog -->
        <el-dialog title="新增角色" :visible.sync="showDiglog" width="500px" @close="cancelAdd">
          <el-form ref="formRef" label-width="120px" :model="formData" :rules="formRules">
            <el-form-item prop="name" label="角色名称">
              <el-input v-model="formData.name" style="width: 300px;" size="mini" />
            </el-form-item>
            <el-form-item label="启用" prop="state">
              <el-switch v-model="formData.state" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item prop="description" label="角色描述">
              <el-input v-model="formData.description" style="width: 300px;" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="center">
                <el-col>
                  <el-button size="mini" type="primary" @click="addRole">确认</el-button>
                  <el-button size="mini" @click="cancelAdd">取消</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 表格 -->
        <el-table
          :data="list"
          border
          style="width: 100%"
          class="rol-table"
        >
          <el-table-column
            prop="id"
            label="序号"
            width="50"
            align="center"
          />
          <el-table-column
            prop="name"
            label="角色"
            width="200"
            align="center"
          />
          <el-table-column
            prop="state"
            label="启用"
            width="200"
            align="center"
          >
            <template v-slot="{row}">
              <span>{{ row.state === 1 ? "已启用" : "未启用" }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="description"
            label="描述"
            align="center"
          />
          <el-table-column
            label="操作"
            align="center"
          >
            <template>
              <el-button type="text" size="small">分配权限</el-button>
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="center">
          <!-- 分页器 -->
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="pageParams.total"
              :page-size="pageParams.pagesize"
              :current-page="pageParams.page"
              @current-change="changePage"
            />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getRoleInfo, addRole } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      list: {
      },
      pageParams: {
        page: 1,
        pagesize: 5,
        total: 50
      },
      showDiglog: false,
      // 修改角色表单
      formData: {
        name: '',
        description: '',
        state: 0
      },
      // 表单校验
      formRules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入角色描述',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  // 生命周期 mounted 挂载时
  mounted() {
    this.getRoleInfo()
  },
  methods: {
    async getRoleInfo() {
      const { rows, total } = await getRoleInfo(this.pageParams)
      this.list = rows
      // console.log(this.list)
      this.pageParams.total = total
    },
    //  切换当前页码时
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleInfo()
    },
    // 新增角色按钮
    addRole() {
      // 先表单校验
      this.$refs.formRef.validate(async(isOk) => {
        if (isOk) {
          // 发请求新增用户
          await addRole(this.formData)
          this.$message.success('添加成功')
          // 重新渲染表单
          this.getRoleInfo()
          // 重置表单
          this.$refs.formRef.resetFields()
          // 关闭弹窗
          this.showDiglog = false
        }
      })
    },
    // 取消按钮
    cancelAdd() {
      this.$refs.formRef.resetFields()
      this.showDiglog = false
    }
  }
}
</script>

<style scoped lang="scss">
  .app-container{
    padding: 20px;
  }

  .rol-table{
    margin-top: 10px;
  }

</style>
