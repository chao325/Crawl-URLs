import { GetUrlList } from '@/serverAPI/url';
import { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  Button,
  DatePicker,
  Space,
  Modal,
  Select,
  message,
  Table,
  Divider,
  Tag,
  Input,
} from 'antd';
import { useState, useEffect, useRef } from 'react';
import { history, KeepAlive } from 'umi';
import dayjs from 'dayjs';
import SelectInput from '@/components/SelectInput/index.jsx';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

import Edit from './Edit.jsx';

const { RangePicker } = DatePicker;
const { Search } = Input;
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
  4: { text: '已经群发邮件', color: 'processing' },
};

const options = [
  {
    value: '=',
    label: '等于 =',
  },
  {
    value: '>',
    label: '大于 >',
  },
  {
    value: '<',
    label: '小于 <',
  },
];
export default (props) => {
  // const { location } = props;
  // const { tid, domain } = location.query;
  const [loading, setLoading] = useState(false);
  const [tableListRow, setTableListRow] = useState({}); // 初次获取list
  const [selectedValue, setSelectedValue] = useState({ uid: 0, uid_2nd: 0 }); //跟踪人数据
  const [isModalOpen, setIsModalOpen] = useState(false); // 模态框开启关闭
  const [funcitonAdd, setFuncitonAdd] = useState(); // 取消多选
  const [selectedRowInfo, setSelectedRowInfo] = useState([]); //多选的表项详细数据
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 编辑模态框开启关闭
  const [editValue, setEditValue] = useState({}); // 编辑模态框开启关闭
  const [selectType, setSelectType] = useState('='); // 编辑模态框开启关闭

  const ref = useRef();

  const exportToExcel = () => {
    const data = [
      ['域名', '百度PC', '百度移动', '神马权重', '360PC', '360移动', '入库时间'],
      ...tableListRow?.site.map((obj) => [
        obj.domain,
        obj.aizhan_pc,
        obj.aizhan_m,
        obj.aizhan_sm,
        obj.aizhan_360,
        obj.aizhan_m_360,
        obj.create_time,
      ]),
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const now = new Date();
    const month = now.getMonth() + 1; // 月份从0开始计数，所以需要加1
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 使用 padStart() 方法在小时、分钟和秒钟数字前面添加零以确保它们始终有两个数字
    const formattedTime = `${month.toString().padStart(2, '0')} ${day
      .toString()
      .padStart(2, '0')} ${hours.toString().padStart(2, '0')}${minutes
      .toString()
      .padStart(2, '0')}${seconds.toString().padStart(2, '0')}`;

    XLSX.writeFile(wb, `${formattedTime}导出第${tableListRow?.page}页面数据.xlsx`);
  };

  const getUrlDetail = (res) => {
    setIsEditModalOpen(true);
    setEditValue(res);
    // history.push(`./Edit.jsx?tid=${tid}&domain=${domain}`);
  };

  const columns = [
    {
      title: '查站时间',
      dataIndex: 'create_time',
      search: false,
      width: 160,
    },
    {
      title: '域名 / 状态',
      dataIndex: 'domain',
      search: false,
      width: 200,
      render: (_, record) => {
        return (
          <Space size={[0, 8]} wrap>
            <Button
              style={{ color: '#1890ff' }}
              type="text"
              onClick={() => {
                addUser(record);
              }}
              key={record?.tid}
            >
              {record.domain}
            </Button>
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
      initialValue: [
        dayjs().subtract(1, 'day').format('YYYYMMDD'),
        dayjs().add(1, 'day').format('YYYYMMDD'),
      ],
    },
    {
      title: '常用权重',
      dataIndex: 'aizhan_sm',
      width: 100,
      search: false,
      render: (text, record) => {
        return (
          <>
            <a
              target="_blank"
              href={`https://www.aizhan.com/cha/${record?.domain}`}
              rel="noreferrer"
            >
              <img src={`https://statics.aizhan.com/images/br/${record?.aizhan_pc}.png`} />
            </a>

            <a
              target="_blank"
              href={`https://www.aizhan.com/cha/${record?.domain}`}
              rel="noreferrer"
            >
              <img src={`https://statics.aizhan.com/images/mbr/${record?.aizhan_m}.png`} />
            </a>
            <a
              target="_blank"
              href={`https://smrank.aizhan.com/mobile/${record?.domain}/`}
              rel="noreferrer"
            >
              <img src={`https://statics.aizhan.com/images/sm/${record?.aizhan_sm}.png`} />
            </a>
          </>
        );
      },
    },
    {
      title: '百度PC',
      dataIndex: 'aizhan_pc',
      hideInTable: true,
      search: {
        transform: (value, key) => ({
          [key]: { [selectType]: value },
        }),
      },
      renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        const status = form.getFieldValue('state');

        if (status !== 'open') {
          return (
            // value 和 onchange 会通过 form 自动注入。
            <Space.Compact>
              <Select
                defaultValue="="
                onChange={(res) => {
                  setSelectType(res);
                }}
                options={options}
              />
              <Input />
            </Space.Compact>
          );
        }
        return defaultRender(_);
      },
    },
    {
      title: '百度移动',
      dataIndex: 'aizhan_m',
      hideInTable: true,
      search: {
        transform: (value, key) => ({
          [key]: { [selectType]: value },
        }),
      },
      renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        const status = form.getFieldValue('state');

        if (status !== 'open') {
          return (
            // value 和 onchange 会通过 form 自动注入。
            <Space.Compact>
              <Select
                defaultValue="="
                onChange={(res) => {
                  setSelectType(res);
                }}
                options={options}
              />
              <Input />
            </Space.Compact>
          );
        }
        return defaultRender(_);
      },
    },
    // {
    //   title: '神马',
    //   dataIndex: 'aizhan_sm',
    //   width: 100,
    //   render: (text, record) => {
    //     return (
    //       <a
    //         target="_blank"
    //         href={`https://smrank.aizhan.com/mobile/${record?.domain}/`}
    //         rel="noreferrer"
    //       >
    //         <img src={`https://statics.aizhan.com/images/sm/${text}.png`} />
    //       </a>
    //     );
    //   },
    // },
    {
      title: '神马移动',
      dataIndex: 'aizhan_sm',
      hideInTable: true,
      search: {
        transform: (value, key) => ({
          [key]: { [selectType]: value },
        }),
      },
      renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        const status = form.getFieldValue('state');

        if (status !== 'open') {
          return (
            // value 和 onchange 会通过 form 自动注入。
            <Space.Compact>
              <Select
                defaultValue="="
                onChange={(res) => {
                  setSelectType(res);
                }}
                options={options}
              />
              <Input />
            </Space.Compact>
          );
        }
        return defaultRender(_);
      },
    },
    {
      title: '360权重',
      dataIndex: 'aizhan_360',
      width: 100,
      render: (text, record) => {
        return (
          <>
            <a
              target="_blank"
              href={`https://sorank.aizhan.com/mobile/${record?.domain}/`}
              rel="noreferrer"
              title="360PC"
            >
              <img src={`https://statics.aizhan.com/images/360/${record?.aizhan_360}.png`} />
            </a>
            <a
              target="_blank"
              href={`https://sorank.aizhan.com/mobile/${record?.domain}/`}
              rel="noreferrer"
              title="360移动"
            >
              <img src={`https://statics.aizhan.com/images/m360/${record?.aizhan_m_360}.png`} />
            </a>
          </>
        );
      },
      search: {
        transform: (value, key) => ({
          [key]: { [selectType]: value },
        }),
      },
      renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        const status = form.getFieldValue('state');

        if (status !== 'open') {
          return (
            // value 和 onchange 会通过 form 自动注入。
            // <SelectInput {...fieldProps} />
            <Space.Compact>
              <Select
                defaultValue="="
                onChange={(res) => {
                  setSelectType(res);
                }}
                options={options}
              />
              <Input />
            </Space.Compact>
          );
        }
        return defaultRender(_);
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      search: false,
      width: 160,
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
      title: '跟踪人',
      dataIndex: 'uid',
      render: (text) => {
        return <span>{userId[text]}</span>;
      },
    },
    // {
    //   title: '跟踪人',
    //   dataIndex: 'uid_2nd',
    //   search: false,

    //   render: (text) => {
    //     return <span>{userId[text]}</span>;
    //   },
    // },
    {
      title: '备注',
      dataIndex: 'other',
      search: false,
    },
    {
      title: '操作',
      key: 'action',
      search: false,

      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => getUrlDetail(record)}>编辑</a>
          {/* <a onClick={addUser}>设置跟踪人</a> */}
        </Space>
      ),
    },
  ];

  const getTableListInfo = (params, sorter) => {
    console.log(params, sorter);
    const { current, pageSize, startTime, ...res_data } = params;
    setLoading(true);
    return GetUrlList({
      write: 0,
      data: {
        create_time: {
          '>': dayjs(startTime[0]).format('YYYYMMDD'),
          '<': dayjs(startTime[1]).format('YYYYMMDD'),
        },
        ...res_data,
      },
      // orderby: { create_time: -1 },
      page: current || 1,
      pagesize: pageSize || 30,
    })
      .then((result) => {
        // setSuccess_urlInfo(success);
        setTableListRow(result);
        return {
          data: result.site,
          success: true,
          total: result.total_pages * 30,
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

    if (selectedRowInfo.length > 0) {
      for (let i = 0; i < selectedRowInfo.length; i++) {
        GetUrlList({
          write: 1,
          data: { uid: selectedValue.uid, uid_2nd: selectedValue.uid_2nd },
          domain: selectedRowInfo[i]?.domain,
        })
          .catch(function (e) {
            console.log('fetch fail', e);
          })
          .finally((r) => {
            setLoading(false);
          });
        // 使用 url 去调用接口
      }
      message.info(`跟踪人设置成功`);
      ref.current.reload();
      setSelectedRowInfo([]);
    } else {
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
    }
  };
  const onSelectChange = (_, selectedRows) => {
    setSelectedRowInfo(selectedRows);
    console.log(selectedRows);
  };
  const rowSelection = {
    selectedRowInfo,
    onChange: onSelectChange,
  };

  const addUser = (res) => {
    setSelectedRowInfo([res]);
    setSelectedValue({ uid: res?.uid, uid_2nd: res?.uid_2nd });
    setIsModalOpen(true);
  };

  const IsEditModalOpen = () => {
    setIsEditModalOpen(false);
    ref.current.reload();
  };

  return (
    <>
      <Modal footer={null} title="设置网站信息" open={isEditModalOpen} onCancel={IsEditModalOpen}>
        <Edit editValue={editValue} funEven={IsEditModalOpen} />
      </Modal>
      <Modal
        title="设置跟踪人"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Space wrap>
          <p style={{ margin: '0 auto' }}>跟踪人：</p>
          <Select
            value={selectedValue.uid}
            style={{ width: 160 }}
            onChange={(value) => setSelectedValue({ uid: value, uid_2nd: selectedValue.uid_2nd })}
            options={[
              { value: '0', label: '取消跟踪人' },
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
        {/* <Space wrap>
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
        </Space> */}
      </Modal>
      <Button onClick={exportToExcel}>导出表格</Button>
      <ProTable
        onRow={(res, prs) => {
          if (res?.uid != 0) {
            return {
              style: {
                background: '#DDF6E8',
              },
            };
          }
        }}
        keepAlive
        actionRef={ref}
        loading={loading}
        revalidateOnFocus={false}
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
        tableAlertOptionRender={({ res, e, onCleanSelected }) => {
          return (
            <Space size={16}>
              <Button
                type="primary"
                onClick={() => {
                  setIsModalOpen(true);
                  setFuncitonAdd(() => {
                    onCleanSelected;
                  });
                  console.log(onCleanSelected);
                }}
                loading={loading}
              >
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
