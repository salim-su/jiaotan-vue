/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    meta: { title: '登录', keepAlive: false, requireAuth: false }
  },
  {
    path: '/subscribe',
    component: () => import('@/views/subscribe/subscribe'),
    meta: { title: '预约类型', keepAlive: false, requireAuth: false }
  },
  {
    path: '/subscribe-companion',
    component: () => import('@/views/subscribe-companion/subscribe-companion'),
    meta: { title: '随行人员登记', keepAlive: false, requireAuth: false }
  },
  {
    path: '/audit',
    component: () => import('@/views/audit/audit'),
    meta: { title: '预约审核', keepAlive: false, requireAuth: false }

  },
  {
    path: '/subscribe-info',
    component: () => import('@/views/subscribe-info/subscribe-info'),
    meta: { title: '预约信息', keepAlive: false, requireAuth: false }

  },
  {
    path: '/safety-notify',
    component: () => import('@/views/safety-notify/safety-notify'),
    meta: { title: '安全告知', keepAlive: false, requireAuth: false }
  },
  {
    path: '/answer',
    component: () => import('@/views/answer/answer'),
    meta: { title: '答题', keepAlive: false, requireAuth: false }
  },
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
    path: '/index',
    component: () => import('@/views/show-card/show-card')
  }
]
