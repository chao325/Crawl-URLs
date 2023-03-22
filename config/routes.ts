import BasicLayout from '@/layouts/BasicLayout';

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
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/GetUrl',
    name: '采集管理',
    icon: 'IdcardOutlined',
    access: 'GetUrl',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/GetUrl/index.jsx',
        name: '百度采集',
        access: 'GetUrlList',
        icon: 'smile',
        component: './GetUrl',
      },
    ],
  },
  {
    path: '/SystemSettings',
    name: '系统设置',
    icon: 'IdcardOutlined',
    access: 'System',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/SystemSettings/CookieSettings/index.jsx',
        name: 'Cookie设置',
        access: 'Systemset',
        icon: 'smile',
        component: './SystemSettings/CookieSettings/index.jsx',
      },
      {
        path: '/SystemSettings/UsersSettings/index.jsx',
        name: '其他设置',
        access: 'Systemuser',
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
