<template>
  <div>
    <div class="container">
      <div class="app-container">
        <el-button size="mini" type="primary" class="addrole-but">
          添加角色
        </el-button>
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
            <template slot-scope="scope">
              <el-button type="text" size="small">分配权限</el-button>
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
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
import { getRoleInfo } from '@/api/role'
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
      }

    }
  },
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
