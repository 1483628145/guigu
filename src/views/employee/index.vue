<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索" />
        <!-- 树形组件 -->
        <el-tree
          ref="deptree"
          node-key="id"
          style="font-size: 14px;"
          :data="departmentInfo"
          :props="defaultProps"
          highlight-current
          @current-change="selectNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="empolyInfo">
          <el-table-column label="头像" prop="staffPhoto" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" sortable />
          <el-table-column label="工号" prop="workNumber" sortable />
          <el-table-column label="聘用形式" prop="formOfEmployment" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable />
          <el-table-column label="操作">
            <template>
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end">
          <el-pagination
            layout="total,prev, pager, next"
            :total="50"
          />
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getEmployInfo } from '@/api/employ'
export default {
  name: 'Employee',
  data() {
    return {
      // tree结构默认属性名
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 查询参数
      queryParams: {
        page: 1,
        pagesize: 10,
        keyword: '',
        departmentId: 0
      },
      // 员工表格数据
      empolyInfo: []
    }
  },
  computed: {
    ...mapGetters([
      'departmentInfo'
    ])
  },
  created() {
    this.getdefInfo()
    // this.getEmployInfo()
  },
  methods: {
    //  获取组织结构数据
    async getdefInfo() {
      //  发请求 拿到数据
      await this.$store.dispatch('department/getDepartInfo')
      // 将id赋值给查询参数的departmentId 默认第一行
      this.queryParams.departmentId = this.departmentInfo[0].id
      // 拿到当前节点 然后选中第一行的数据
      this.$nextTick(() => {
        this.$refs.deptree.setCurrentKey(this.queryParams.departmentId)
      })
      // 调用接口展现表格数据
      this.getEmployInfo()
    },

    // 选中节点
    selectNode(node) {
      this.queryParams.departmentId = node.id
      this.getEmployInfo()
    },

    // 获取员工信息
    async getEmployInfo() {
      const { rows } = await getEmployInfo(this.queryParams)
      this.empolyInfo = rows
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>
