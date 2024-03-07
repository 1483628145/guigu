<template>
  <div>
    <div class="container">
      <div class="app-container">
        <el-tree class="tree" :data="departmentInfo" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <el-row style="width: 100%; height: 40px;" type="flex" justify="space-between" align="middle">
              <el-col>
                {{ data.name }}
              </el-col>
              <el-col :span="3">
                <span class="tree-manger">{{ data.managerName }}</span>
              </el-col>
              <el-col :span="1">
                <!-- 下拉菜单 -->
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                    <el-dropdown-item>编辑部门</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!-- 弹框 -->
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Department',
  data() {
    return {
      // 默认属性名
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    // 获取组织结构数据
    ...mapGetters(
      [
        'departmentInfo'
      ]
    )
  },
  created() {
    this.$store.dispatch('department/getDepartInfo')
  }
}
</script>

<style scoped lang="scss">
  .tree{
    padding: 30px 140px;
    font-size: 14px;
    margin-top: 15px;
    margin-left: 15px;
  }
</style>
