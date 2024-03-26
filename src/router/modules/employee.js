import Layout from '@/layout'
export default {
  path: '/employee',
  component: Layout,
  children: [{
    path: '',
    name: 'employee',
    component: () => import('@/views/employee/index'),
    meta: { title: '员工', icon: 'people' }
  },
  {
    path: '/employee/detail/:id?',
    component: () => import('@/views/employee/views/detail'),
    hidden: true,
    meta: { title: '员工详情' }

  }
  ]
}
