<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input
          v-model="queryParams.keyword"
          style="margin-bottom:10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
          @input="changeValue"
        />
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
          <el-button size="mini" @click="exportEx">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="empolyInfo">
          <el-table-column label="头像" prop="staffPhoto">
            <template v-slot="{row}">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" />
              <el-avatar v-else icon="el-icon-user-solid" />
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" sortable />
          <el-table-column label="工号" prop="workNumber" sortable />
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="{row}">
              <span v-if="row.formOfEmployment === 1 ">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
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
            :total="total"
            :page-size="queryParams.pagesize"
            :current-page="queryParams.page"
            @current-change="changePage"
          />
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getEmployInfo, exportExcel } from '@/api/employ'
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
      empolyInfo: [],
      // 员工表格总数
      total: 0
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
      const { rows, total } = await getEmployInfo(this.queryParams)
      this.empolyInfo = rows
      this.total = total
    },

    // 分页器
    changePage(page) {
      this.queryParams.page = page
      this.getEmployInfo()
    },

    // 输入框值变化
    changeValue() {
      /* 先清除后查询 */
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getEmployInfo()
      }, 300)
    },

    // 导出excel
    async exportEx() {
      const res = await exportExcel()
      console.log(res)
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
