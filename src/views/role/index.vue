<template>
  <div>
    <div class="container">
      <div class="app-container">
        <el-button size="mini" type="primary" class="addrole-but" @click="showDiglog = true">
          添加角色
        </el-button>
        <!-- 添加角色按钮--dialog -->
        <el-dialog title="新增角色" :visible.sync="showDiglog" width="500px" @close="cancelAdd">
          <el-form ref="formRef" label-width="120px" :model="addRoleFormData" :rules="formRules">
            <el-form-item prop="name" label="角色名称">
              <el-input v-model="addRoleFormData.name" style="width: 300px;" size="mini" />
            </el-form-item>
            <el-form-item label="启用" prop="state">
              <el-switch v-model="addRoleFormData.state" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item prop="description" label="角色描述">
              <el-input v-model="addRoleFormData.description" style="width: 300px;" type="textarea" />
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
          >

            <template v-slot="{row}">
              <!-- 编辑角色名称 -->
              <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
              <span v-else>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            label="启用"
            width="200"
            align="center"
          >
            <template v-slot="{row}">
              <!-- 编辑角色状态 -->
              <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
              <span v-else>{{ row.state === 1 ? "已启用" : "未启用" }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="description"
            label="描述"
            align="center"
          >
            <template v-slot="{row}">
              <!-- 编辑角色描述 -->
              <el-input v-if="row.isEdit" v-model="row.editRow.description" size="mini" type="textarea" />
              <span v-else>{{ row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template v-slot="{row}">
              <!-- 编辑状态 -->
              <div v-if="row.isEdit">
                <el-button type="primary" size="mini" @click="editRole(row)">确认</el-button>
                <el-button size="mini" @click="cancleEdit(row)">取消</el-button></div>
              <div v-else>
                <!-- 非编辑状态 -->
                <el-button type="text" size="small">分配权限</el-button>
                <el-button type="text" size="small" @click="edit(row)">编辑</el-button>
                <el-popconfirm
                  title="确定删除该角色吗？"
                  @onConfirm="deleteRole(row)"
                  @cancel="cancleEdit(row)"
                >
                  <el-button slot="reference" style="margin-left: 10px;" type="text" size="small">删除</el-button>
                </el-popconfirm>
              </div>

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
import { getRoleInfo, addRole, updateRole, deleteRole } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      // 表格数据
      list: {
      },
      // 分页器参数
      pageParams: {
        page: 1,
        pagesize: 5,
        total: 50
      },
      // 是否展现弹窗
      showDiglog: false,
      // 修改角色表单
      addRoleFormData: {
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
    // 获取角色列表
    async getRoleInfo() {
      const { rows, total } = await getRoleInfo(this.pageParams)
      this.list = rows
      // console.log(this.list)
      this.pageParams.total = total
      // 设置初始值 给定一个初始的编辑状态
      this.list.forEach(item => {
        // 注意这样添加的属性不是响应式的数据
        // item.isEdit = false
        // 要添加响应式的数据 需要使用 this.$set(对象，"初始属性名",初始属性值)
        // 只有使用 $set 方法创建的属性才具备响应式
        this.$set(item, 'isEdit', false)
        // 缓存数据 将需要修改的数据加在 editRow中 不影响外部数据
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description,
          id: item.id
        })
      })
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
          await addRole(this.addRoleFormData)
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
    // 取消新增角色按钮
    cancelAdd() {
      this.$refs.formRef.resetFields()
      this.showDiglog = false
    },
    // 编辑角色按钮
    edit(row) {
      row.isEdit = true
      // console.log(row)
      // 重新获取新的行内数据
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    // 编辑用户信息按钮
    async editRole(row) {
      // 验证必填项目
      if (row.editRow.name && row.editRow.description) {
        // 发请求
        await updateRole(row.editRow)
        // 提示
        this.$message.success('修改用户信息成功')
        // 重新获取角色数据
        this.getRoleInfo()
        // 关闭编辑框
        this.$nextTick(() => {
          row.isEdit = true
        })
      } else {
        this.$message.warning('角色名称和角色描述不能为空')
      }
    },
    // 取消用户编辑按钮
    cancleEdit(row) {
      row.isEdit = false
      // console.log(row)
      // 重新获取新的行内数据
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    // 删除角色
    async deleteRole(row) {
      await deleteRole(row)
      this.$message.success('删除成功')
      this.getRoleInfo()
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
