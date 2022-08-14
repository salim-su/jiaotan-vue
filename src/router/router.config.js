/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/loading',
    component: () => import('views/loading/loading')
  },
  {
    path: '/',
    redirect: '/loading',
    meta: { title: 'loading', keepAlive: false, requireAuth: false }
  },
  {
    path: '/device-info',
    component: () => import('@/views/device-info/device-info'),
    meta: { title: '设备信息', keepAlive: false, requireAuth: false }
  },
  {
    path: '/scan',
    component: () => import('@/views/scan/scan'),
    meta: { title: '设备报修', keepAlive: false, requireAuth: false }
  },
  {
    path: '/repairs',
    component: () => import('@/views/repairs/repairs'),
    meta: { title: '报修问题', keepAlive: false, requireAuth: false }
  }
]
