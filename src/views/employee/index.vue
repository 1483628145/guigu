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
        <!-- 分页 -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
        pagesize: 1,
        keyword: '',
        departmentId: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'departmentInfo'
    ])
  },
  created() {
    this.getdefInfo()
  },
  methods: {
    //  获取组织结构数据
    async getdefInfo() {
      //  发请求 拿到数据
      await this.$store.dispatch('department/getDepartInfo')
      // 将id赋值给查询参数的departmentId
      this.queryParams.departmentId = this.departmentInfo[0].id
      // 拿到当前节点 然后选中第一行的数据
      this.$refs.deptree.setCurrentKey(this.queryParams.departmentId)
    },
    // 选中节点
    selectNode(node) {
      this.queryParams.id = node.id
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
