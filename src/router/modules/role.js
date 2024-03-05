import Layout from '@/layout'
export default {
  path: '/role',
  component: Layout,
  children: [{
    path: '',
    name: 'dapartment',
    component: () => import('@/views/role/index'),
    meta: { title: '角色', icon: 'setting' }
  }]
}
