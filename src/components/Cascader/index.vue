<template>
  <div>
    <el-cascader
      :value="departmentId"
      size="mini"
      :options="options"
      :props="props"
      separator="-"
      style="width: 300px;"
      placeholder="请选择部门"
      @change="handleChange"
    />
  </div>

</template>

<script>
import { getDepartInfo } from '@/api/department'
import { TranListToTree } from '@/utils/index'
export default {
  name: 'Cascader',
  props: {
    departmentId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      // 选择的部门ID
      options: [],
      props: { expandTrigger: 'hover', value: 'id', label: 'name' }
    }
  },
  async mounted() {
    this.options = TranListToTree(await getDepartInfo(), 0)
  },
  methods: {
    handleChange(list) {
      if (list[list.length - 1 ] > 0) {
        this.$emit('input', list[list.length - 1 ])
      }
    }
  }
}
</script>

