import Layout from '@/layout'
export default {
  path: '/approval',
  component: Layout,
  children: [{
    path: '',
    name: 'approval',
    component: () => import('@/views/approval/index'),
    meta: { title: '审核', icon: 'tree-table' }
  }]
}
