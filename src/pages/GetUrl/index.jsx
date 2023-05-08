import { GetUrlList } from '@/serverAPI/url';
import { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Space, Modal, Select, message, Table, Divider, Tag } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { history } from 'umi';
const { RangePicker } = DatePicker;
//用户对应

const userId = {
  0: '',
  2: '阿图',
  3: 'uny',
  4: '小雪',
  5: '慧慧',
  6: '黄硕',
  7: 'stone',
  8: '小铃铛',
  9: 'jiang',
};
//域名状态
const url_state = {
  0: { text: '正常', color: 'default' },
  1: { text: '已售', color: 'success' },
  2: { text: '不出', color: 'error' },
  3: { text: '跟进', color: 'processing' },
};
const getUrlDetail = (tid, domain) => {
  history.push(`./edit.jsx?tid=${tid}&domain=${domain}`);
};

const columns = [
  {
    title: '查站时间',
    dataIndex: 'create_time',
    search: false,
  },
  {
    title: '域名 / 状态',
    dataIndex: 'domain',
    search: false,
    width: 160,
    render: (_, record) => {
      return (
        <Space size={[0, 8]} wrap>
          <span style={{ marginRight: '5px' }}>{record.domain}</span>
          <Tag
            color={record?.status == null ? url_state[0].color : url_state[record?.status].color}
          >
            {record?.status == null ? url_state[0].text : url_state[record?.status].text}
          </Tag>
        </Space>
      );
    },
  },
  {
    title: '日期范围',
    dataIndex: 'startTime',
    valueType: 'dateRange',
    hideInTable: true,
    initialValue: [dayjs(), dayjs().add(1, 'day')],
  },
  {
    title: '百度PC',
    dataIndex: 'aizhan_pc',
    width: 100,
    render: (text) => {
      return <img src={`https://statics.aizhan.com/images/br/${text}.png`} />;
    },
  },
  {
    title: '百度移动',
    dataIndex: 'aizhan_m',
    width: 100,
    render: (text) => {
      return <img src={`https://statics.aizhan.com/images/mbr/${text}.png`} />;
    },
  },
  {
    title: '神马',
    dataIndex: 'aizhan_sm',
    width: 100,
    render: (text) => {
      return <img src={`https://statics.aizhan.com/images/sm/${text}.png`} />;
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: false,
  },
  {
    title: '联系方式',
    dataIndex: 'update_time',
    search: false,
    render: (_, record) => {
      return (
        <div>
          <div>
            手机号：<span>{record.phone}</span>
          </div>
          <div>
            QQ：<span>{record.qq}</span>
          </div>
          <div>
            微信：<span>{record.weixin}</span>
          </div>
          <div>
            其他联系方式：<span>{record.other_contact}</span>
          </div>
        </div>
      );
    },
  },
  {
    title: '权重时间',
    dataIndex: 'update_time',
    search: false,
  },
  {
    title: '第一跟踪人',
    dataIndex: 'uid',
    render: (text) => {
      return <span>{userId[text]}</span>;
    },
  },
  {
    title: '第一跟踪人',
    dataIndex: 'uid_2nd',
    search: false,

    render: (text) => {
      return <span>{userId[text]}</span>;
    },
  },
  {
    title: '备注',
    dataIndex: 'other',
    search: false,

    render: (text) => {
      return <span>{userId[text]}</span>;
    },
  },
  {
    title: '操作',
    key: 'action',
    search: false,

    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => getUrlDetail(record.tid, record.domain)}> 编辑</a>
        <a>刷新权重</a>
      </Space>
    ),
  },
];

export default () => {
  const [loading, setLoading] = useState(false);
  const [tableListRow, setTableListRow] = useState({}); // 初次获取list
  const [selectedValue, setSelectedValue] = useState({ uid: 0, uid_2nd: 0 }); //跟踪人数据
  const [isModalOpen, setIsModalOpen] = useState(false); // 模态框开启关闭
  const [selectedRowInfo, setSelectedRowInfo] = useState([]); //多选的表项详细数据
  const ref = useRef();

  const getTableListInfo = (page) => {
    setLoading(true);
    return GetUrlList({
      write: 0,
      data: { create_time: { '>': 20230503, '<': 20230507 } },
      orderby: { create_time: -1 },
      page: page?.current || 1,
      pagesize: page?.pageSize || 30,
    })
      .then((result) => {
        // setSuccess_urlInfo(success);
        setTableListRow(result);
        return {
          data: result.site,
          success: true,
          total: result.total_pages,
        };
      })
      .catch(function (e) {
        console.log('fetch fail', e);
      })
      .finally((r) => {
        setLoading(false);
      });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    GetUrlList({
      write: 1,
      data: { uid: selectedValue.uid, uid_2nd: selectedValue.uid_2nd },
      domain: selectedRowInfo[0]?.domain,
    })
      .then((result) => {
        message.info(`跟踪人设置成功`);
        // 刷新
        ref.current.reload();
      })
      .catch(function (e) {
        console.log('fetch fail', e);
      })
      .finally((r) => {
        setLoading(false);
      });
  };
  const onSelectChange = (_, selectedRows) => {
    setSelectedRowInfo(selectedRows);
  };
  const rowSelection = {
    selectedRowInfo,
    onChange: onSelectChange,
  };
  const addUser = () => {
    setSelectedValue({ uid: selectedRowInfo[0]?.uid, uid_2nd: selectedRowInfo[0]?.uid_2nd });
    setIsModalOpen(true);
    // GetUrlList({
    //   write: 0,
    //   data: { tid: selectedRowInfo[0]?.tid },
    // })
    //   .then((result) => {
    //     // setSuccess_urlInfo(success);
    //     // console.log(result);
    //     const { site } = result;
    //     const UrlInfo = site[0];
    //     setWangzhanInfo(UrlInfo);
    //     setSelectedValue({ uid: selectedRowInfo[0]?.uid, uid_2nd: selectedRowInfo[0]?.uid_2nd });
    //   })
    //   .catch(function (e) {
    //     console.log('fetch fail', e);
    //   })
    //   .finally((r) => {
    //     console.log('fetch fail', r);
    //   });
  };

  return (
    <>
      <Modal
        title="设置跟踪人"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Space wrap>
          <p>第一跟踪人：</p>
          <Select
            value={selectedValue.uid}
            style={{ width: 160 }}
            onChange={(value) => setSelectedValue({ uid: value, uid_2nd: selectedValue.uid_2nd })}
            options={[
              { value: '2', label: '阿图' },
              { value: '3', label: 'uny' },
              { value: '4', label: '小雪' },
              { value: '5', label: '慧慧' },
              { value: '6', label: '黄硕' },
              { value: '7', label: 'stone' },
              { value: '8', label: '小铃铛' },
              { value: '9', label: 'jiang' },
            ]}
          />
        </Space>
        <Space wrap>
          <p>第二跟踪人：</p>
          <Select
            value={selectedValue.uid_2nd}
            style={{ width: 160 }}
            onChange={(value) => setSelectedValue({ uid: selectedValue.uid, uid_2nd: value })}
            options={[
              { value: '2', label: '阿图' },
              { value: '3', label: 'uny' },
              { value: '4', label: '小雪' },
              { value: '5', label: '慧慧' },
              { value: '6', label: '黄硕' },
              { value: '7', label: 'stone' },
              { value: '8', label: '小铃铛' },
              { value: '9', label: 'jiang' },
            ]}
          />
        </Space>
      </Modal>

      <ProTable
        actionRef={ref}
        loading={loading}
        columns={columns}
        rowSelection={rowSelection}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
          // console.log(selectedRowKeys, selectedRows);
          // setSelectedRowInfo(selectedRows);
          return (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <Button type="primary" onClick={addUser} loading={loading}>
                添加跟踪人
              </Button>
            </Space>
          );
        }}
        scroll={{ x: 1300 }}
        options={false}
        search={{
          filterType: 'light',
        }}
        // dateFormatter="string"
        pagination={{
          pageSize: 30,
        }}
        rowKey="tid"
        headerTitle="批量操作"
        // defaultData={tableListRow?.site}
        // toolBarRender={() => [<Button key="show">查看日志</Button>]}
        request={getTableListInfo}
      />
    </>
  );
};
