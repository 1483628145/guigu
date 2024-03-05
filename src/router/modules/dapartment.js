import Layout from '@/layout'
export default {
  path: '/dapartment',
  component: Layout,
  children: [{
    path: '',
    name: 'dapartment',
    component: () => import('@/views/dapartment/index'),
    meta: { title: '组织', icon: 'tree' }
  }]
}
