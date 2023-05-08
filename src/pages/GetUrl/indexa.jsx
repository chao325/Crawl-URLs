import React, { useState, useEffect, useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, message, InputNumber, DatePicker, Table, Spin, Input } from 'antd';
import { GetUrlList } from '@/serverAPI/url';
import GetUrlInfo from '../GetUrlInfo';

const { RangePicker } = DatePicker;

export default (props) => {
  const actionRef = useRef();
  const [tableLoading, setTableLoading] = useState(false);
  const [urls_value, setUrls_value] = useState({ isShow: false, urls_value: '' });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: '域名',
      dataIndex: 'domain',
    },
    {
      title: '百度',
      dataIndex: 'baidu',
    },
    {
      title: '神马',
      dataIndex: 'shenma',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '电话/微信',
      dataIndex: 'phone_wechat',
    },
    {
      title: 'QQ',
      dataIndex: 'qq',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  const data = [
    {
      key: '1',
      domain: 'www.example.com',
      baidu: '1',
      shenma: '2',
      email: 'example@gmail.com',
      phone_wechat: '12345678901',
      qq: '12345678',
    },
    {
      key: '2',
      domain: 'www.test.com',
      baidu: '3',
      shenma: '4',
      email: 'test@gmail.com',
      phone_wechat: '12345678901',
      qq: '87654321',
    },
  ];

  const handleRowSelection = (selectedKeys, params, sort, filter) => {
    console.log(selectedKeys);
    setSelectedRowKeys(selectedKeys, params, sort, filter);
  };

  const openGetUrlInfo = (res_url) => {
    // setUrls_value({ isShow: true, urls_value: 'www.aizhan.com' });
  };
  const openHtml = (url) => {
    //暂时性处理
    // const new_ruls = url.replace(/^https?:\/\//, '');
    window.open(`https://www.aizhan.com/cha/${url}`);
  };

  const getPython = (res, cookie) => {
    setTableLoading(true);
    let time = 2.1 * res.page;
    message.success(`正在爬取预计大约需要: ${(time < 60 ? 60 : time) / 60} 分钟`);
    return GetUrlList({
      something: res.something,
      getPage: res.page,
      pageNo: 1,
      pageSize: 999,
      cookie: cookie ? cookie : null,
    })
      .then((res) => {
        setTableLoading(false);
        console.log('JSON.parse(new_json) ', res);
        if (res == 'ul') {
          message.error('ul出错，请重试。');
          return;
        } else {
          // setDdefa1n(JSON.parse(new_json));
          return {
            data: res,
            success: true,
          };
        }
      })
      .catch((resss) => {
        console.log('失败', resss);
        setTableLoading(false);
      });
  };

  return (
    <ProTable
      rowKey="key"
      columns={columns}
      dataSource={data}
      rowSelection={{
        selectedRowKeys: selectedRowKeys,
        onChange: handleRowSelection,
      }}
      toolBarRender={() => [
        <Button key="1" type="primary">
          导出数据
        </Button>,
      ]}
      search={{
        labelWidth: 'auto',
        defaultCollapsed: false,
        filterType: 'light',
        optionRender: () => (
          <>
            <RangePicker />
            <Input placeholder="权重" />
          </>
        ),
      }}
    />
  );
};
