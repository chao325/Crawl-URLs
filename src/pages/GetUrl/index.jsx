import React, { useState, useEffect, useRef } from 'react';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  Button,
  Dropdown,
  Space,
  Tag,
  Modal,
  Select,
  message,
  Table,
  Card,
  Form,
  Col,
  Input,
  Row,
} from 'antd';
import { GetUrlList } from '@/serverAPI/url';
import GetUrlInfo from '../GetUrlInfo';

const { Option } = Select;
export default (props) => {
  const [form] = Form.useForm();
  const actionRef = useRef();
  const [openShowHtml, setOpenShowHtml] = useState({ isShow: false, urls: '' });
  const [tableLoading, setTableLoading] = useState(false);
  const [Ddefa1n, setDdefa1n] = useState([]);
  const [urls_value, setUrls_value] = useState({ isShow: false, urls_value: '' });

  const defanDAATA = [
    {
      id: '5efe56b2-8a7f-4b6a-a0b1-3b223ea802aa',
      title: " '权威的解释|权威的意思|汉典“权威”词语的解释'",
      urlname: " 'URL': 'zdic.net'",
      url: " 'UrlDesc': '权威网络解释 百度百科 权威(词语) 权威就是对权力的一种自愿的服从和支持。人们对权力安排的服从可能有被迫的成分",
      createDate: '2023-03-30 22:16:35',
      rulDesc: '但是对权威的安排的服从',
    },
    {
      id: '584b1fa4-78ed-41ca-8643-9928a8dce065',
      title: " '权威的的英文_权威的翻译_权威的英语怎么说_海词词典'",
      urlname: " 'URL': 'dict.cn'",
      url: " 'UrlDesc': '权威的 权威的的英文翻译 基本释义 authoritative canonical doctoral doctorial ex cathedra 权威的的用法和样例: 例句 圣言或睿智的话权威的或明智的话或预言 An authorita...'",
      createDate: '2023-03-30 22:16:35',
      rulDesc: " 'UrlName': '海词'",
    },
    {
      id: 'af22ca24-7a0a-4705-98db-d27e43b549dc',
      title: " '在我国",
      urlname: "最权威的“官媒”有哪些?'",
      url: "  'baidu.com'",
      createDate: '2023-03-30 22:16:35',
      rulDesc:
        ' \'八、中国日报社 中宣部代管的副部级事业单位。旗下的《中国日报》是唯一的全国性英文日报，是海外了解中国政治、经济、社会、文化的主要信息来源，是"中国的声音"和"认识中国的窗口"...\'',
    },
    {
      id: '2dbbe7e3-02f1-4f63-ad3a-3a25bd849325',
      title: " '领导权威在组织中的作用'",
      urlname: " 'URL': 'baidu.com'",
      url: " 'UrlDesc': '这就是组织中领导权威的作用。我们今天就来聊聊权威这个话题！一、正确认识权威 西蒙在《管理行为》中指出，权威是指导他人行动的决策制定权力，简单来说，就是能够指导他人做出符...'",
      createDate: '2023-03-30 22:16:35',
      rulDesc: " 'UrlName': 'HR进化岛'",
    },
    {
      id: 'd096ce7c-6b4f-4acd-b76b-ef83f7c272b5',
      title: " '罗尔斯:人类理性是所能承认的唯一权威'",
      urlname: " 'URL': 'baidu.com'",
      url: " 'UrlDesc': '以下是“《哈佛哲学评论》对罗尔斯的访谈:人类理性是所能承认的唯一权威”。 受访者:约翰·罗尔斯(John Bordley Rawls  来源:再建巴别塔  罗尔斯在自己的著作和文章中",
      createDate: '2023-03-30 22:16:35',
      rulDesc: "以保持个人生...'",
    },
    {
      id: 'eb34de52-0cf5-468a-8c56-5101b872f736',
      title: " '“权威”是什么意思? - 百度知道'",
      urlname: " 'URL': 'baidu.com'",
      url: " 'UrlDesc': '权威的意思：1、使人信服的力量和威望：～著作。维护政府～。2、在某种范围里最有威望、地位的人或事物：他是医学～。这部著作是物理学界的～。拼音：[ quán wēi...'",
      createDate: '2023-03-30 22:16:35',
      rulDesc: " 'UrlName': '百度知道'",
    },
    {
      id: 'd1454e77-9488-4f53-80eb-79fc42fb538b',
      title: " '北京亲子鉴定合法权威机构哪几家(内附机构名单)_腾讯新闻'",
      urlname: " 'URL': 'qq.com'",
      url: " 'UrlDesc': '北京亲子鉴定合法机构有10家",
      createDate: '2023-03-30 22:16:35',
      rulDesc: '北京市正规持有鉴定资质的基因生物公司、司法鉴定中心可以做亲子鉴定',
    },
    {
      id: '81268957-1b6d-4886-8488-e900945d1a72',
      title: " '权威的第三方检测机构有哪些 - 哔哩哔哩'",
      urlname: " 'URL': 'bilibili.com'",
      url: " 'UrlDesc': '1.深圳安车昇辉检测环境实验室是一个从事电工电子产品与军用设备、轨道交通、核电站设备、电力(含风力发电)设备、汽车、家电、运输包装件等领域产品的环境适应...'",
      createDate: '2023-03-30 22:16:35',
      rulDesc: " 'UrlName': '哔哩哔哩'",
    },
    {
      id: '2070bab3-a799-430a-b308-39b0986dbdfc',
      title: " '权威媒体有哪些?'",
      urlname: " 'URL': 'baidu.com'",
      url: " 'UrlDesc': '国内权威的新闻发布网站 随着互联网的快速发展，越来越多的人开始依赖网络新闻获取信息。然而，由于信息过载和虚假信息的泛滥，人们往往很难判断哪些内容是可信的。以下是国内权威的...'",
      createDate: '2023-03-30 22:16:35',
      rulDesc: " 'UrlName': '本地直邀'",
    },
    {
      id: '22473910-a30d-4966-a247-bc0a82c58398',
      title: " '哪些具体情形适用六不罚?什么条件符合五便利?沈阳公安交警...'",
      urlname: " 'URL': 'baidu.com'",
      url: " 'UrlDesc': '3月29日",
      createDate: '2023-03-30 22:16:35',
      rulDesc:
        '沈阳公安交警专门对此进行了权威解读。 一、交通违法“六不罚” (一)对货运车辆在允许通行的时段和路段确需占用道路装卸货物停车的',
    },
    {
      id: 'b0a8ff51-1352-40bb-abe3-d8637abc7113',
      title: " '权威是什么意思_权威的解释_汉语词典_词典网'",
      urlname: " 'URL': 'cidianwang.com'",
      url: " 'UrlDesc': '权的解释权 (權) á 职责范围内支配和指挥的力量:政权。权力。权威。权贵。权柄。权势。生杀予夺之权。 有利的形势:主动权。 变通",
      createDate: '2023-03-30 22:16:35',
      rulDesc: "不依常规:权变。权谋(随机应变的计谋)。权...'",
    },
    {
      id: 'b3c8024c-7248-48e3-93d7-60e66f70dfd9',
      title: " '权威的意思|权威是什么意思 - 查字典'",
      urlname: " 'URL': 'chazidian.com'",
      url: " 'UrlDesc': '(1) (名)使人信从的力量和威望。权威著作|权威的动物学家。(作定语) (2) (名)在某种范围里最有地位的人或事物。他是医学界的权威。(作宾语) [构成] 并列式:权+威 [例句] 〈外...'",
      createDate: '2023-03-30 22:16:35',
      rulDesc: " 'UrlName': '查字典'",
    },
    {
      id: '1186aa2b-4a53-465a-84db-77ef5c94e30b',
      title: " '最权威的世界大学排名是什么?泰晤士报、U.S. News、交大学...'",
      urlname: " 'URL': 'zhihu.com'",
      url: " 'UrlDesc': '2021 April 20: 更新一下2021的百强榜，喜欢记得点赞哦。壹光学长：综合四大世界大学排名的百强大学榜单...'",
      createDate: '2023-03-30 22:16:35',
      rulDesc: " 'UrlName': '知乎'",
    },
    {
      id: '46604e62-e6ec-4e27-b3ff-335e32c545fc',
      title: " '北京最权威的十大律师事务所(无血缘关系继承案)|女儿|遗产...'",
      urlname: " 'URL': '163.com'",
      url: " 'UrlDesc': '北京最权威的十大律师事务所(无血缘关系继承案) 苏大爷生前并没有生育子女",
      createDate: '2023-03-30 22:16:35',
      rulDesc: '也没有进行收养',
    },
    {
      id: '5d2147dd-d6cf-44ae-8947-c073b4cc0ec4',
      title: " '权威的英文_权威翻译_权威英语怎么说_海词词典'",
      urlname: " 'URL': 'dict.cn'",
      url: " 'UrlDesc': \"领袖必须是有权威的人。  The leader must be a person of authority.  她是语音学权威。  She's an authority on phonetics.  他的声音中带有权威的口气。  ...\"",
      createDate: '2023-03-30 22:16:35',
      rulDesc: " 'UrlName': '海词'",
    },
    {
      id: '4dcbbbcf-6557-4c14-a8c4-8078be1bdc5c',
      title: " '权威的英语怎么说_沪江英语学习网'",
      urlname: " 'URL': 'hjenglish.com'",
      url: " 'UrlDesc': '权威的英文:authorityauthoritative参考例句: arbiter of fashion时装方面的权威 They were symbols of authority and honor.它是权威和尊严的象征。 What auth...'",
      createDate: '2023-03-30 22:16:35',
      rulDesc: " 'UrlName': '沪江英语'",
    },
    {
      id: 'c65fdc3e-b4da-427c-b1e5-d2005889ffae',
      title: " '关于权威 - 知乎'",
      urlname: " 'URL': 'zhihu.com'",
      url: " 'UrlDesc': '无论哪一种事物、哪一项领域",
      createDate: '2023-03-30 22:16:35',
      rulDesc: '必定有对其相对熟悉的人',
    },
    {
      id: 'e6b3040f-e68b-4b71-88ff-b68fb69da8d3',
      title: " '“权威”英文翻译_“权威”英语怎么说写_汉英词典'",
      urlname: " 'URL': 'httpcn.com'",
      url: " 'UrlDesc': '权威[quan wei",
      createDate: '2023-03-30 22:16:35',
      rulDesc: '] 英语字典:权(quán',
    },
    {
      id: '6cd916a6-31ba-4ab5-a898-de08395799e6',
      title: " '[小小智慧树]《123》_CCTV节目官网-CCTV-14_央视网(cctv.com)'",
      urlname: " 'URL': 'cctv.com'",
      url: " 'UrlDesc': ''",
      createDate: '2023-03-31 09:43:06',
      rulDesc: " 'UrlName': ''",
    },
    {
      id: 'af9e67b3-268d-48c9-9b41-5e31f0d1d891',
      title: " '123-电视剧-高清完整正版视频在线观看-优酷'",
      urlname: " 'URL': 'youku.com'",
      url: " 'UrlDesc': ''",
      createDate: '2023-03-31 09:43:06',
      rulDesc: " 'UrlName': ''",
    },
    {
      id: 'b17c0a34-c808-45c3-b0e2-3e548f1a5846',
      title: " 'hao123_上网从这里开始'",
      urlname: " 'URL': 'hao123.com'",
      url: " 'UrlDesc': 'hao123是汇集全网优质网址及资源的中文上网导航。及时收录影视、音乐、小说、游戏等分类的网址和内容",
      createDate: '2023-03-31 09:43:06',
      rulDesc: '让您的网络生活更简单精彩。上网',
    },
    {
      id: 'a09ed6ee-d00a-4794-b949-c84a5cf9a2a4',
      title: " 'hao123导航-上网从这里开始'",
      urlname: " 'URL': 'hao123.com'",
      url: " 'UrlDesc': 'hao123是汇集全网优质网址及资源的中文上网导航。及时收录影视、音乐、小说、游戏等分类的网址和内容",
      createDate: '2023-03-31 09:43:06',
      rulDesc: '让您的网络生活更简单精彩。上网',
    },
    {
      id: 'c0a1ffb8-10d1-43c3-9bf7-2f6993ea106c',
      title: " 'hao123_上网从这里开始'",
      urlname: " 'URL': 'hao123.com'",
      url: " 'UrlDesc': 'hao123是汇集全网优质网址及资源的中文上网导航。及时收录影视、音乐、小说、游戏等分类的网址和内容",
      createDate: '2023-03-31 09:43:06',
      rulDesc: '让您的网络生活更简单精彩。上网',
    },
    {
      id: '73e0b075-a3b8-4d90-873c-5cab2bf107d5',
      title: " 'hao123下载站_提供最新最安全的免费软件资源下载、绿色软...'",
      urlname: " 'URL': 'hao123.com'",
      url: " 'UrlDesc': 'hao123网址导航 天气预报 泡泡网免费软件 多特软件站 IT168绿色软件 太平洋下载 天极下载 PC6软件下载 天空软件站 华军软件园 psp游戏下载 飞翔下载 东坡下载 清风手游网 126...'",
      createDate: '2023-03-31 09:43:06',
      rulDesc: " 'UrlName': 'hao123下载站'",
    },
    {
      id: '7fa5254d-e087-47fe-9873-9361dfaff9d2',
      title: " '北京123路_北京123路公交车路线_公交123路 上行-北京公交...'",
      urlname: " 'URL': 'mapbar.com'",
      url: " 'UrlDesc': '北京123路上行是从北京东直门枢纽站出发",
      createDate: '2023-03-31 09:43:06',
      rulDesc: '到北京金五星百货城的分段计价有人售票线路。途中共经过东直门枢纽站',
    },
    {
      id: '0e658a93-b19a-41c9-a356-a7c13ef72dac',
      title: " '掌上123网址导航'",
      urlname: " 'URL': 'zhangshang123.com'",
      url: " 'UrlDesc': '掌上123专注掌上网址导航",
      createDate: '2023-03-31 09:43:06',
      rulDesc: '掌上123网址导航',
    },
    {
      id: '2dabd5b5-7536-4816-b11f-0ff367e040c4',
      title: " 'hao123导航-上网从这里开始'",
      urlname: " 'URL': 'hao123.com'",
      url: " 'UrlDesc': 'hao123是汇集全网优质网址及资源的中文上网导航。及时收录影视、音乐、小说、游戏等分类的网址和内容",
      createDate: '2023-03-31 09:43:06',
      rulDesc: '让您的网络生活更简单精彩。上网',
    },
    {
      id: '4571dbe5-1b01-444a-a3c6-65c5a4f412b0',
      title: " '123是什么意思呢",
      urlname: "代表着什么? - 百度知道'",
      url: "  'baidu.com'",
      createDate: '2023-03-31 09:43:06',
      rulDesc:
        " '123代表人生从最低点开始越来越积极，最后取得了成功。单个含义：一、1代表刚正不阿的正义者，无论从任何角度去审视...'",
    },
    {
      id: '72b4ca8b-a4fe-479a-8395-d5a3760baea8',
      title: " '123网址之家手机版 123手机导航'",
      urlname: " 'URL': '1234wu.com'",
      url: " 'UrlDesc': '123网址之家",
      createDate: '2023-03-31 09:43:06',
      rulDesc: "手机上网从123导航开始。'",
    },
    {
      id: '44a40dee-f0be-435f-a480-c719e74e50ef',
      title: " 'hao123_上网从这里开始'",
      urlname: " 'URL': 'languang.com'",
      url: " 'UrlDesc': 'hao123是汇集全网优质网址及资源的中文上网导航。及时收录影视、音乐、小说、游戏等分类的网址和内容",
      createDate: '2023-03-31 09:43:06',
      rulDesc: '让您的网络生活更简单精彩。上网',
    },
    {
      id: '95ff5157-ef3c-4a23-9283-b7e5575c7372',
      title: " '123网校'",
      urlname: " 'URL': 'ablesky.com'",
      url: " 'UrlDesc': '123网校 课程4.5 老师4.5 服务4.5 课程 搜索课程 搜全站 搜本校 邮箱/手机号/用户名 密码 一周内自动登录忘记密码 登录 立即注册 第三方帐号登录 生命信息课程 公告 更多 标签 自然自生生命基础学...'",
      createDate: '2023-03-31 09:43:06',
      rulDesc: " 'UrlName': '789651vbnm.ablesky.com/'",
    },
    {
      id: '20d5332f-4111-4539-a7bd-0c7ee8f0ef17',
      title: " '您访问的页面不存在-hao123上网导航'",
      urlname: " 'URL': 'hao123.com'",
      url: " 'UrlDesc': '去首页看看  返回上页 意见反馈'",
      createDate: '2023-03-31 09:43:06',
      rulDesc: " 'UrlName': '3g.hao123.com/next/webs...'",
    },
    {
      id: '227646a4-4dc6-4be9-b303-b15dace0486b',
      title: " 'hao123_上网从这里开始'",
      urlname: " 'URL': 'baidu.com'",
      url: " 'UrlDesc': 'hao123是汇集全网优质网址及资源的中文上网导航。及时收录影视、音乐、小说、游戏等分类的网址和内容",
      createDate: '2023-03-31 09:43:06',
      rulDesc: '让您的网络生活更简单精彩。上网',
    },
    {
      id: '90d72007-0dbc-4aaf-9af8-8b57627bb235',
      title: " 'hao123_上网从这里开始'",
      urlname: " 'URL': 'baidu.com'",
      url: " 'UrlDesc': 'hao123是汇集全网优质网址及资源的中文上网导航。及时收录影视、音乐、小说、游戏等分类的网址和内容",
      createDate: '2023-03-31 09:43:06',
      rulDesc: '让您的网络生活更简单精彩。上网',
    },
    {
      id: '00b7e4a8-3e1a-4ee5-af59-7bae325df5c2',
      title: " '网址大全-hao123上网导航'",
      urlname: " 'URL': '91.com'",
      url: " 'UrlDesc': 'hao123是汇集全网优质网址及资源的中文上网导航。及时收录影视、音乐、小说、游戏等分类的网址和内容",
      createDate: '2023-03-31 09:43:06',
      rulDesc: '让您的网络生活更简单精彩。上网',
    },
  ];
  const columns = [
    {
      title: '关键词',
      hideInTable: true,
      key: 'something',
      dataIndex: 'something',
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
      key: 'page',
      dataIndex: 'page',
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
            label: 'Run test_测试',
            value: '2',
          },
          {
            label: '20页面',
            value: '20',
          },
          {
            label: '200页',
            value: '200',
          },
          {
            label: '500页',
            value: '500',
          },
          {
            label: '自动',
            value: '412',
          },
        ],
      },
    },
    {
      title: '网站标题',
      dataIndex: 'title',
      hideInSearch: true,
      key: 'title',
      ellipsis: true,
      width: 260,
      tip: '简介过长会自动收缩',
    },
    {
      disable: true,
      title: 'URL',
      dataIndex: 'URL',
      key: 'URL',
      filters: true,
      copyable: true,
      onFilter: true,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      disable: true,
      title: '网站简介',
      dataIndex: 'UrlDesc',
      key: 'UrlDesc',
      ellipsis: true,
      tip: '简介过长会自动收缩',
      hideInSearch: true,
    },
    {
      title: '搜索时间',
      width: 200,

      key: 'showTime',
      dataIndex: 'showTime',
      valueType: 'date',
      hideInSearch: true,
      // render: (t) => dataList_rul.createTime,
    },
    {
      width: 200,
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a key={record.id} onClick={() => openGetUrlInfo(record.URL)}>
          网站详情
        </a>,
        <a key={record.id} onClick={() => openHtml(record.URL)}>
          爱站查询
        </a>,
      ],
    },
  ];
  const openGetUrlInfo = (res_url) => {
    // setUrls_value({isShow:true,urls_value:res_url});
    // setUrls_value({ isShow: true, urls_value: 'www.aizhan.com' });
  };
  const openHtml = (url) => {
    //暂时性处理
    // const new_ruls = url.replace(/^https?:\/\//, '');
    window.open(`https://www.aizhan.com/cha/${url}`);
  };

  const getPython = (res, cookie) => {
    setTableLoading(true);
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
    <div>
      {/* <ProTable
        loading={tableLoading}
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
            return getPython(keyWord, KeyPage);
          }
        }}
        rowKey="url"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          // <Button key="button" icon={<PlusOutlined />} type="primary">
          //   新建
          // </Button>,
        ]}
      /> */}
      <Modal
        title={[<p key={urls_value.urls_value}>{urls_value.urls_value} 网站详情</p>]}
        open={urls_value.isShow}
        onOk={() => {
          setUrls_value({ isShow: false });
        }}
        footer={null}
        onCancel={() => {
          setUrls_value({ isShow: false });
        }}
      >
        <GetUrlInfo urls_value={urls_value.urls_value} />
      </Modal>
      <ProTable
        rowKey="id"
        search={true}
        manualRequest={true}
        request={getPython}
        // defaultData={Ddefa1n}
        columns={columns}
        revalidateOnFocus={false} //取消视图聚焦自动请求
      />
    </div>
  );
};
