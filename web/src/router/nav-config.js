const nav = [
  {
    name: 'System',
    text: '系统管理',
    icon: 'gear',
    children: [
      {
        name: 'user-set',
        path: '/userSet',
        icon: 'user',
        text: '用户管理',
        role: 'admin'
      },
      {
        name: 'system-set',
        path: '/set',
        icon: 'user',
        text: '参数设置',
        role: 'common'
      },
      {
        name: 'arr-list',
        path: '/arr-list',
        icon: 'user',
        text: '到达航班',
        role: 'common'
      },
      {
        name: 'flight-set',
        path: '/flightSet',
        icon: 'user',
        text: '航班维护',
        role: 'common'
      },
      {
        name: 'route-set',
        path: '/route-set',
        icon: 'user',
        text: '屏显控制',
        role: 'common'
      },
      {
        name: 'log-list',
        path: '/logList',
        icon: 'user',
        text: '审计日志',
        role: 'admin'
      }
    ]
  }
]
export default nav
