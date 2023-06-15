import { Button, Card, Row, Col, Tabs, message, Input } from 'antd';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { GetUrlList } from '@/serverAPI/url';
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { DownloadOutlined } from '@ant-design/icons';
import { deviceDetect } from 'react-device-detect';
import { functi_exprot } from '@/utils/pack_functions';

import './style.less';

//拿到唯一性区分用户 PS：暂时用这种方法。
const userAgent = deviceDetect().userAgent;

const userList = [
  // { uid: 0, name: '' },
  { uid: 2, name: '阿图' },
  { uid: 3, name: 'uny' },
  { uid: 4, name: '小雪' },
  { uid: 5, name: '慧慧' },
  { uid: 6, name: '黄硕' },
  { uid: 7, name: 'stone' },
  { uid: 8, name: '小铃铛' },
  { uid: 9, name: 'jiang' },
];

// 获取当前时间
const now = new Date();
const none = [];
// 获取今天的起始时间（0点）
const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// 计算今天已经过去了多少毫秒
const elapsedMilliseconds = now.getTime() - todayStart.getTime();
// 将毫秒转换成小时数并输出结果
const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60);
//预计总量

export default (props) => {
  const [loadingB, setLoadingB] = useState(false);
  const [tableListRow, setTableListRow] = useState({}); // 初次获取list
  const [futureSum, setFutureSum] = useState({}); // 初次获取list
  const [udatem, setUpade] = useState({ updata_time: '' });
  const [handeUserGet, setHandeUserGet] = useState(); //指定导出搜索条件

  const sumAdd = ((futureSum?.total_pages * 10) / Math.round(elapsedHours)) * 24;

  // const request_Auto = (data, page, pagesize) => {
  //   return new Promise((resolve, reject) => {
  //     GetUrlList({
  //       write: 0,
  //       data: data,
  //       page: page,
  //       pagesize: pagesize,
  //     })
  //       .then((result) => {
  //         resolve(resolve);
  //       })
  //       .catch(function (e) {
  //         reject(e);
  //         console.log('fetch fail', e);
  //         message.error('前面错误 fetch fail');
  //       });
  //   });
  // };
  useEffect(() => {
    GetUrlList({
      write: 0,
      data: {
        create_time: {
          '>': dayjs().subtract(1, 'day').format('YYYYMMDD'),
          '<': dayjs().add(0, 'day').format('YYYYMMDD'),
        },
        site_type: 'bd',
      },
      page: 1,
      pagesize: 1,
    })
      .then((result) => {
        setTableListRow(result);
      })
      .catch(function (e) {
        console.log('fetch fail', e);
      });
    GetUrlList({
      write: 0,
      data: {
        create_time: {
          '>': dayjs().add(0, 'day').format('YYYYMMDD'),
          '<': dayjs().add(1, 'day').format('YYYYMMDD'),
        },
        // site_type: 'bd',
      },
      page: 1,
      pagesize: 10,
    })
      .then((result) => {
        setFutureSum(result);
      })
      .catch(function (e) {
        console.log('fetch fail', e);
      });
  }, []);
  //用户个人导出属于自己的数据
  const ExprotMyList = (res) => {
    setLoadingB(true);
    console.log(res);
    GetUrlList({
      write: 0,
      data: {
        create_time: {
          '>': dayjs().subtract(1, 'day').format('YYYYMMDD'),
          '<': dayjs().add(0, 'day').format('YYYYMMDD'),
        },
        site_type: 'bd',
        uid: res.uid,
      },
      // orderby: { create_time: -1 },
      page: 1,
      pagesize: 999999,
    })
      .then((result) => {
        if (result?.total_pages == 0) {
          message.warning('暂无数据，请重试！');
          return;
        }
        console.log(result, '------------');
        const titlelist = [
          [
            '域名',
            '百度PC',
            '百度移动',
            '神马权重',
            '360PC',
            '360移动',
            '入库时间',
            '权重查询时间',
          ],
          [
            'domain',
            'aizhan_pc',
            'aizhan_m',
            'aizhan_sm',
            'aizhan_360',
            'aizhan_m_360',
            'create_time',
            'update_time',
          ],
        ];
        functi_exprot(
          titlelist[0],
          result?.site,
          titlelist[1],
          `【百度】${res.name}导出${dayjs().subtract(1, 'day').format('YYYY年MM月DD日')}的数据`,
        );
        // setTableListRow(result);
      })
      .catch(function (e) {
        console.log('fetch fail', e);
      })
      .finally((r) => {
        setLoadingB(false);
      });
  };

  //指定特殊条件导出，后续可开放给用户是使用，暂时供开发者使用
  const onlyExport = () => {
    console.log(handeUserGet, 'handeUserGet');
    GetUrlList({
      write: 0,
      data: handeUserGet,
      // orderby: { create_time: -1 },
      page: 1,
      pagesize: 9999999,
    })
      .then((result) => {
        if (result?.total_pages == 0) {
          message.warning('暂无数据，请重试！');
          return;
        }
        console.log(result, '------------');
        const titlelist = [
          [
            '域名',
            '百度PC',
            '百度移动',
            '神马权重',
            '360PC',
            '360移动',
            '入库时间',
            '权重查询时间',
          ],
          [
            'domain',
            'aizhan_pc',
            'aizhan_m',
            'aizhan_sm',
            'aizhan_360',
            'aizhan_m_360',
            'create_time',
            'update_time',
          ],
        ];
        functi_exprot(titlelist[0], result?.site, titlelist[1], `特殊的，自定义导出数据`);
        // setTableListRow(result);
      })
      .catch(function (e) {
        console.log('fetch fail', e);
      })
      .finally((r) => {
        setLoadingB(false);
      });
  };

  return (
    <>
      <Card style={{ margin: '0 0 3vh 0' }}>
        <Row>
          <Col span={8}>
            <div className="UserCard">
              <span>我的域名数量（昨日）</span>
              <p>无</p>
              <em />
            </div>
          </Col>
          <Col span={8}>
            <div className="UserCard">
              <span>共计百度域名数量（昨日）</span>
              <p>{tableListRow?.total_pages} 个</p>
              <em />
            </div>
          </Col>
          <Col span={8}>
            <div className="UserCard">
              <span>预计今日域名总数量</span>
              <p>{Math.round(sumAdd) || 0} 个</p>
            </div>
          </Col>
        </Row>
      </Card>
      <Card title="默认导出为每天的前一天的数据（0:00~23:59）">
        <Tabs
          // onChange={onChange}
          type="card"
          items={userList.map((res) => {
            return {
              label: `${res.name}`,
              key: res.uid,
              children: (
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  size="large"
                  loading={loadingB}
                  onClick={() => {
                    ExprotMyList(res);
                  }}
                >
                  {res.name} Download
                </Button>
                // <Button
                //   loading={loading}
                //   onClick={() => {
                //     ExprotMyList(res);
                //   }}
                // >
                //   导出我的数据
                // </Button>
              ),
            };
          })}
        />
        {userAgent ==
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' ? (
          <>
            <Input onChange={(res) => setHandeUserGet(res.target.value)} />
            <Button style={{ margin: '5vh auto' }} type="primary" size="large" onClick={onlyExport}>
              导出特定数据
            </Button>
          </>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
};
