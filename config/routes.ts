export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/MyUrl',
    name: '我的域名',
    icon: 'UserOutlined',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/MyUrl/index.jsx',
        name: '百度',
        icon: 'smile',
        component: './MyUrl',
      },
    ],
  },
  {
    path: '/GetUrl',
    name: '采集管理',
    icon: 'IeOutlined',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/GetUrl/index.jsx',
        name: '数据处理',
        icon: 'smile',
        component: './GetUrl',
      },
      {
        path: '/GetUrl/Edit.jsx',
        name: '编辑',
        hideInMenu: true,
        component: './GetUrl/Edit.jsx',
      },
    ],
  },
  {
    path: '/MySQLdata',
    name: '数据汇总',
    icon: 'AntCloudOutlined',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/MySQLdata/index.jsx',
        name: '神马数据',
        icon: 'crown',
        component: './MySQLdata',
      },
    ],
  },
  {
    path: '/SystemSettings',
    name: '系统设置',
    icon: 'SettingOutlined',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/SystemSettings/CookieSettings/index.jsx',
        name: 'Cookie设置',
        icon: 'smile',
        component: './SystemSettings/CookieSettings/index.jsx',
      },
      {
        path: '/SystemSettings/UsersSettings/index.jsx',
        name: '其他设置',
        icon: 'smile',
        component: './SystemSettings/UsersSettings/index.jsx',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
