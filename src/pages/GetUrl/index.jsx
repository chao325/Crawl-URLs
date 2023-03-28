import React, { useState, useEffect, useRef } from 'react';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag, Modal, Select, message } from 'antd';
import { GetUrlList } from '@/serverAPI/url';

export default (props) => {
  const actionRef = useRef();
  const [openShowHtml, setOpenShowHtml] = useState({ isShow: false, urls: '' });

  const handeGetUrl = () => {
    GetUrlList()
      .then((res) => {
        console.log(res);
        console.log(props);
      })
      .catch((resss) => {
        console.log(resss);
        console.log(props);
      });
  };

  const defaultData = [
    {
      id: 1,
      title: '汽车之家',
      state: 'https://www.qqzj.com/',
      labels:
        '在路由守卫中，直接将用户认证状态设置为已认证，跳过登录流程。例如，在 app.tsx 文件中添加以下代码 ',
      showTime: '2023-03-27 15:14',
    },
    {
      id: 2,
      title: '阿萨的金额为',
      state: 'www.21211312.com/',
      labels:
        '在路由守卫中，直接将用户认证状态设置为已认证，跳过登录流程。例如，在 app.tsx 文件中添加以下代码 ',
      showTime: '2022-10-02 15:14',
    },
    {
      id: 3,
      title: 'SFDFDF',
      state: 'https://qwwdw55884.com/',
      labels: 'text_layout_tag = img_flex_tag.find(',
      showTime: '2023-04-27 15:14',
    },
  ];

  const columns = [
    // {
    //   dataIndex: 'index',
    //   valueType: 'indexBorder',
    //   width: 48,
    // },
    {
      title: '关键词',
      hideInTable: true,
      key: 'keyWord',
      dataIndex: 'keyWord',
      placeholder: '请勿带有不必要的符号',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '关键词为必填项',
          },
        ],
      },
    },
    {
      title: '爬取范围',
      key: 'KeyPage',
      dataIndex: 'KeyPage',
      hideInTable: true,
      valueType: 'select',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '爬取范围为必填项',
          },
        ],
      },
      fieldProps: {
        placeholder: '本机网络环境及数据重复度可能会影响到数据量',
        options: [
          {
            label: '200页',
            value: 200,
          },
          {
            label: '500页',
            value: 500,
          },
          {
            label: '自动',
            value: 412,
          },
        ],
      },
    },
    {
      title: '网站标题',
      dataIndex: 'title',
      hideInSearch: true,
      key: 'title',
    },
    {
      disable: true,
      title: 'URL',
      dataIndex: 'state',
      key: 'state',

      filters: true,
      copyable: true,
      onFilter: true,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      disable: true,
      title: '网站简介',
      dataIndex: 'labels',
      key: 'labels',
      ellipsis: true,
      tip: '标题过长会自动收缩',
      hideInSearch: true,
    },
    {
      title: '搜索时间',
      key: 'showTime',
      dataIndex: 'showTime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      width: 200,
      title: '操作',
      valueType: 'option',

      key: 'option',

      render: (text, record, _, action) => [
        <a key={record.id} onClick={() => openHtml(record.state)}>
          爱站查询
        </a>,
      ],
    },
  ];
  const openHtml = (url) => {
    //暂时性处理
    const new_ruls = url.replace(/^https?:\/\//, '');
    window.open(`https://www.aizhan.com/cha/${new_ruls}`);
  };
  return (
    <div>
      <ProTable
        // loading={true}
        options={false}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        // request={handeGetUrl}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          const { current, pageSize, keyWord, KeyPage } = params;
          if (!keyWord || !KeyPage) {
            return;
          } else {
            return {
              data: defaultData,
              success: true,
              total: defaultData.length,
            };
          }
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          // <Button key="button" icon={<PlusOutlined />} type="primary">
          //   新建
          // </Button>,
        ]}
      />
    </div>
  );
};
