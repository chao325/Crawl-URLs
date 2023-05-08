import { Button, Table, Modal, Select, Space, message, Card } from 'antd';
import { useState, useEffect } from 'react';
import { GetUrlList } from '@/serverAPI/url';
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
const columns = [
  {
    title: '查站时间',
    dataIndex: 'create_time',
  },
  {
    title: '域名',
    dataIndex: 'domain',
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
    // filters: [
    //   {
    //     text: '1',
    //     value: '1',
    //   },
    //   {
    //     text: '2',
    //     value: '2',
    //   },
    //   {
    //     text: '3',
    //     value: '3',
    //   },
    //   {
    //     text: '4',
    //     value: '4',
    //   },
    //   {
    //     text: '5',
    //     value: '5',
    //   },
    //   {
    //     text: '6',
    //     value: '6',
    //   },
    // ],
    // filterSearch: false,
    // onFilter: (value, record) => record.aizhan_sm.startsWith(value),
    render: (text) => {
      return <img src={`https://statics.aizhan.com/images/sm/${text}.png`} />;
    },
  },
  {
    title: '权重时间',
    dataIndex: 'update_time',
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
    render: (text) => {
      return <span>{userId[text]}</span>;
    },
  },
  {
    title: '备注',
    dataIndex: 'other',
    render: (text) => {
      return <span>{userId[text]}</span>;
    },
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>编辑</a>
        <a>刷新权重</a>
      </Space>
    ),
  },
];

export default (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableListRow, setTableListRow] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ uid: 0, uid_2nd: 0 });
  const [wangzhanInfo, setWangzhanInfo] = useState();

  const getTableListInfo = (page, pagesize) => {
    setLoading(true);
    GetUrlList({
      write: 0,
      data: { create_time: { '>': 20230503, '<': 20230507 } },
      orderby: { create_time: -1 },
      page: page || 1,
      pagesize: pagesize || 30,
    })
      .then((result) => {
        // setSuccess_urlInfo(success);
        setTableListRow(result);
      })
      .catch(function (e) {
        console.log('fetch fail', e);
      })
      .finally((r) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getTableListInfo();
  }, []);
  const handleOk = () => {
    setIsModalOpen(false);
    console.log(selectedValue);

    GetUrlList({
      write: 1,
      data: { uid: selectedValue.uid, uid_2nd: selectedValue.uid_2nd },
      domain: wangzhanInfo?.domain,
    })
      .then((result) => {
        message.info(`跟踪人设置成功`);
        getTableListInfo();
      })
      .catch(function (e) {
        console.log('fetch fail', e);
      })
      .finally((r) => {
        setLoading(false);
      });
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const addUser = () => {
    setIsModalOpen(true);
    GetUrlList({
      write: 0,
      data: { tid: selectedRowKeys },
    })
      .then((result) => {
        // setSuccess_urlInfo(success);
        // console.log(result);
        const { site } = result;
        const UrlInfo = site[0];
        setWangzhanInfo(UrlInfo);
        setSelectedValue({ uid: UrlInfo.uid, uid_2nd: UrlInfo.uid_2nd });
      })
      .catch(function (e) {
        console.log('fetch fail', e);
      })
      .finally((r) => {
        console.log('fetch fail', r);
      });
  };

  const handePage = (pages, res) => {
    console.log(pages, res);
    const { current, pageSize } = pages;
    getTableListInfo(current, pageSize);
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <Card>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
        >
          <Space wrap>
            <p>第一跟踪人：</p>
            <Select
              value={Number(selectedValue.uid)}
              style={{ width: 160 }}
              onChange={(value) => setSelectedValue({ uid: value, uid_2nd: selectedValue.uid_2nd })}
              options={[
                { value: 2, label: '阿图' },
                { value: 3, label: 'uny' },
                { value: 4, label: '小雪' },
                { value: 5, label: '慧慧' },
                { value: 6, label: '黄硕' },
                { value: 7, label: 'stone' },
                { value: 8, label: '小铃铛' },
                { value: 9, label: 'jiang' },
              ]}
            />
          </Space>
          <Space wrap>
            <p>第二跟踪人：</p>
            <Select
              value={Number(selectedValue.uid_2nd)}
              style={{ width: 160 }}
              onChange={(value) => setSelectedValue({ uid: selectedValue.uid, uid_2nd: value })}
              options={[
                { value: 2, label: '阿图' },
                { value: 3, label: 'uny' },
                { value: 4, label: '小雪' },
                { value: 5, label: '慧慧' },
                { value: 6, label: '黄硕' },
                { value: 7, label: 'stone' },
                { value: 8, label: '小铃铛' },
                { value: 9, label: 'jiang' },
              ]}
            />
          </Space>
        </Modal>
        <div
          style={{
            marginBottom: 16,
          }}
        >
          <Button type="primary" onClick={addUser} disabled={!hasSelected} loading={loading}>
            添加跟踪人
          </Button>
        </div>
        <Table
          onChange={handePage}
          rowSelection={rowSelection}
          columns={columns}
          rowKey={'tid'}
          pagination={{ total: tableListRow?.total_pages * 30, pageSize: 30 }}
          dataSource={tableListRow?.site}
        />
      </Card>
    </div>
  );
};
